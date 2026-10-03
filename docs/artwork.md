# 画像素材

## トップ画像の差し替え — 氷晶王ベヒーモス

ユーザー指定により、トップを「剣士が15階層のボスに立ち向かう場面」に変更しました。

- 現在のトップ画像: `dist/assets/hero-behemoth-v2.webp`（1672×941）。
- 内蔵 `image_gen` を使用し、参照画像3点から1回生成。WebP圧縮して配置。
- ボスはゲームの `src/scenes/GameScene.ts` にある15階の「氷晶王ベヒーモス」（`m_ice_behemoth`）を確認。
- ボスの正面・方向別スプライトと、既存の冒険者イラストを参照。氷晶の巨腕を振り上げるボスに、茶髪・青緑のマントの剣士が両手の銀剣で対峙する構図。
- プロンプト: [behemoth-hero-prompt.txt](behemoth-hero-prompt.txt)。凍った地下闘技場、砕ける氷、蒼色の光、手描きの日本ファンタジー画調。文字・UIなし。
- 原本: `C:\Users\masam\.codex\generated_images\01a0ff8d-b1d7-7620-a364-e7b6af5d04b7\exec-dc62fb9e-a804-417f-9ccc-47ebdff5ae67.png`。
- 旧トップの `hero.webp` は保存。スマホでは対峙する2体が上部に見える配置に調整。

## 新規イラスト

内蔵 `image_gen` で2枚を生成。各1回、再生成なし。透過なし、原寸1672×941。Web表示用にWebPへ圧縮しています。

- `dist/assets/hero.webp`: 221,662 bytes。地下古城へ向かう冒険者。
- `dist/assets/world.webp`: 355,320 bytes。水没した大聖堂。

生成プロンプト要約:

1. 茶髪・青緑のマント・革鎧・剣とランタンを持つ冒険者を右側に配置。巨大な地下古城、青緑の亀裂、琥珀色の灯火、霧。左45%は暗い余白。高品質な絵画調、日本ファンタジー、文字・UI・ロゴ・透かしなし。
2. 地下の水没したゴシック聖堂。巨大なアーチ、壊れた石橋、青緑に光る水面、遠い灯火、霧の奥のドラゴン。紺・青緑・金の絵画調、文字・UI・透かしなし。

ゲームの既存冒険者イラスト（`public/assets/ui/departure-title-v1/background.webp`）をキャラクターの視覚的参照として使用。League of Legendsの固有キャラクターや画像は使用していません。

生成PNGの原本:

- `C:\Users\masam\.codex\generated_images\01a0ff8d-b1d7-7620-a364-e7b6af5d04b7\exec-2780d5a6-6c04-40d6-919f-bb05cf941bbe.png`
- `C:\Users\masam\.codex\generated_images\01a0ff8d-b1d7-7620-a364-e7b6af5d04b7\exec-ffeb3d53-7abd-404a-9ba0-c1fefd3323e4.png`

## ゲーム本体からコピーした素材

元フォルダー: `C:\chari-dungeon-release-final`。サイト側に独立したコピーを保存。

| サイトの素材 | ゲームの素材 |
| --- | --- |
| game-logo.webp | public/assets/ui/map-title-v1/logo.webp |
| departure.webp | public/assets/ui/departure-title-v1/background.webp |
| castle.webp | public/assets/ui/obsidian-v1/loading.webp |
| favicon.png | public/icons/sword-blue-32.png |
| arcadia.png | public/assets/weapons/hero-sword-v1.png |
| bow.png | public/assets/weapons/bow.png |
| dagger.png | public/assets/weapons/dagger.png |
| equipment-codex.webp | public/assets/ui/generated/nav-equipment-codex.png を640pxへ縮小 |
| gameplay.webp | 2026-10-03の公開ゲームを1280×800で撮影。通常の1階・HP100の探索画面 |

トップと世界紹介の大きな絵はコンセプトアートです。「IN-GAME SCREENSHOT」と示した画像だけがゲーム画面です。
