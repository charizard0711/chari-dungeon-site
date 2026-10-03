import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../dist', import.meta.url));
const errors = [];
const files = [];
async function walk(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) await walk(path); else files.push(path);
  }
}
await walk(root);
const pages = new Map();
for (const file of files.filter(file => extname(file) === '.html')) {
  const html = await readFile(file, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${file}: duplicate IDs`);
  if (!html.includes('<html lang="ja">')) errors.push(`${file}: missing Japanese language`);
  if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${file}: expected one h1`);
  for (const match of html.matchAll(/<img\b([^>]+)>/g)) if (!/\balt="[^"]*"/.test(match[1])) errors.push(`${file}: image has no alt`);
  for (const match of html.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g)) {
    for (const id of match[1].split(' ')) if (!ids.includes(id)) errors.push(`${file}: missing aria target ${id}`);
  }
  pages.set(file, { html, ids });
}
for (const [file, { html }] of pages) {
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(https?:|mailto:|data:)/.test(value)) continue;
    const [pathname, hash] = value.split('#');
    let path = pathname ? resolve(dirname(file), pathname) : file;
    if (pathname.endsWith('/')) path = resolve(path, 'index.html');
    try { await access(path); } catch { errors.push(`${relative(root, file)}: missing ${value}`); continue; }
    if (hash && pages.has(path) && !pages.get(path).ids.includes(hash)) errors.push(`${relative(root, file)}: missing anchor ${value}`);
  }
}
for (const file of files.filter(file => extname(file) === '.css')) {
  const css = await readFile(file, 'utf8');
  for (const match of css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) {
    if (match[1].startsWith('data:')) continue;
    try { await access(resolve(dirname(file), match[1])); } catch { errors.push(`CSS asset missing: ${match[1]}`); }
  }
}
for (const file of files.filter(file => extname(file) === '.js')) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) errors.push(result.stderr);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`OK: ${pages.size} HTML pages; local assets, links, anchors, ARIA targets and JavaScript syntax verified.`);
