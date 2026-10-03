# ちゃりだんじょん公式サイト

公式サイト用の独立した静的サイトです。ゲーム本体は `C:\chari-dungeon-release-final`、このサイトは `C:\chari-dungeon-site` にあります。

## ローカルで見る

Node.js が入っている環境で、このフォルダーから実行します。外部パッケージのインストールは不要です。

```powershell
cd C:\chari-dungeon-site
npm run dev
```

ブラウザで http://127.0.0.1:4177 を開きます。ファイルを変更したらブラウザを再読み込みしてください。ポートを変更する場合は `PORT` 環境変数を指定します。

## ファイル

- `dist/index.html` — トップページ
- `dist/patch-notes.html` — 日付別パッチノート
- `dist/styles.css` — PC / スマートフォン共通デザイン
- `dist/main.js` — モバイルメニュー、装備紹介タブ、更新日の選択
- `dist/assets/` — このサイト専用にコピー・生成した画像
- `docs/patch-note-sources.md` — パッチノートの根拠となったゲームのコミット
- `docs/artwork.md` — 画像の出典と生成プロンプト

## パッチノートの追加

1. ゲーム本体の更新履歴と差分を確認します。日付は日本時間で統一してください。
2. `dist/patch-notes.html` の先頭記事を参考に、新しい `<article class="patch-article">` を記事一覧の先頭へ追加します。`id` は `YYYY-MM-DD`、見出しの ID も重複しないものにします。
3. 同じファイルの `.patch-nav` に新しい日付リンクを追加します。
4. `dist/main.js` の `markDate()` にある初期日付を最新の日付にします。
5. `dist/index.html` の `.news-grid` を最新3件に更新します。
6. メタ description と対象期間、`docs/patch-note-sources.md` の根拠も更新します。
7. `npm run check` を実行し、PC・スマートフォン幅で確認します。

独自のバージョン番号は付けず、ゲームの履歴で確認できる日付を使っています。未追跡の試作素材はパッチノートの対象に含めていません。

## 公開について

今回の初版はローカル用です。Gitリポジトリは初期化済みで、リモートは未設定です。`dist` の内容だけを静的ホスティングに配置できます。ビルド工程・サーバー側アプリ・データベースは不要です。GitHub Pagesのサブディレクトリ配置にも対応する相対パスで構成しています。

「今すぐプレイ」は現在の公開ゲーム `https://charizard0711.github.io/chari-dungeon/` を開きます。サイト自身にはアクセス計測・Cookie・フォームを追加していません。

## 確認

```powershell
npm run check
```

ローカルリンク、画像、アンカー、ARIA参照、JavaScript構文を確認します。ブラウザでも武器タブ、モバイルメニュー、パッチノートへの移動を確認してください。
