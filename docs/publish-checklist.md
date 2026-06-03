# GitLab公開前チェック

GitLab Pagesで公開する前に見るチェックリスト。公開版は旅行サポート用なので、行動に必要な情報だけ載せ、個人情報や予約票そのものは載せない。

## 公開してよい情報

| 種類 | 例 |
| --- | --- |
| 日時 | 2026-06-25 05:05 pickup、2026-06-27 14:00 Sphere |
| 集合場所 | Horseshoe Rideshare Lot、Flamingo Road側North Entrance |
| 行動メモ | 13:15入場列、荷物はBell Desk、Grand Canyon feeは入場時non-cash |
| 概算費用 | Grand Canyon fee `$100/人`、Tag Team `$500/人`想定 |
| 公式URL | WSOP、Sphere、Ticketmaster、NPS、ZIPAIR |

## 公開しない情報

| 種類 | 置き場所 |
| --- | --- |
| 予約票PDF | 各自のメール、Wallet、ローカル保存、紙 |
| 予約番号 | 非公開メモ |
| 参加者名 | 非公開メモ |
| パスポート/ESTA番号 | 非公開メモと紙 |
| クレカ番号/保険証券番号 | 非公開メモと紙 |
| 確認メール本文 | メール/非公開ストレージ |

## ローカルだけに置く場所

リポジトリ直下で非公開控えを扱う場合は、`.gitignore`済みの次の場所だけに置く。

| 用途 | 置き場所例 |
| --- | --- |
| 予約票、確認メール、チケット画像 | `local-private/`, `private/`, `reservations/`, `tickets/`, `wallet/` |
| 保険、カード停止、パスポート/ESTA控え | `insurance/`, `cards/`, `passports/`, `esta/` |
| スクリーンショット | `screenshots-private/` |

公開版へ転記する時は、[confirmation-intake-form.md](confirmation-intake-form.md) で時刻、場所、支払い種別、持ち物、判断ルールだけを抜き出す。

## コミット前の確認コマンド

通常はこれだけ実行する:

```bash
./scripts/build_public.sh
./scripts/check_public.sh
```

個別に確認したい場合:

```bash
rg -n "予約番号|参加者名|確認メール|パスポート番号|ESTA番号|保険証券|カード番号|\\.pdf|@|\\+1-" .
find . -name '*.pdf' -maxdepth 4 -print
./scripts/build_public.sh
cmp -s index.html public/index.html
cmp -s styles.css public/styles.css
cmp -s app.js public/app.js
cmp -s manifest.webmanifest public/manifest.webmanifest
cmp -s offline.html public/offline.html
cmp -s service-worker.js public/service-worker.js
cmp -s favicon.ico public/favicon.ico
cmp -s robots.txt public/robots.txt
cmp -s assets/app-icon-192.png public/assets/app-icon-192.png
cmp -s assets/app-icon-512.png public/assets/app-icon-512.png
cmp -s docs/reader.html public/docs/reader.html
cmp -s docs/pocket-itinerary.md public/docs/pocket-itinerary.md
node --check docs/reader.js
node --check service-worker.js
python3 -m json.tool manifest.webmanifest
```

期待結果:

- `rg`は公開してよい一般文脈だけ。番号、氏名、メール本文、直連絡先、PDFリンクが出たら修正。
- `find`はPDFなし。
- `cmp`は終了コード0。`public/docs/`の資料も同期されている。
- Manifestのアイコンは`192x192`と`512x512`の正方形。
- `./scripts/build_public.sh`でトップと資料リーダーの`Updated`日付がJSTの今日に更新される。
- `robots.txt`と`noindex`で、検索エンジンに拾われにくい設定になっている。
- `./scripts/check_public.sh`でトップの資料リンク、GitLab Issue/MRテンプレートの公開安全チェック、個別ESTA/パスポート由来メモの混入、GitLab公開前提の表記ゆれ、スマホ下部ナビ、資料リーダーの関連リンク/タイトル辞書、資料リーダーの印刷ボタン、資料リーダー下部ナビのスマホ表示、Markdown同士の内部リンク、Service Workerのキャッシュ対象、全Markdown資料のキャッシュ登録を検証する。
- 旅程、資料、CSS、Service Worker対象を大きく更新したら、`service-worker.js`の`CACHE_NAME`を上げて古いキャッシュを入れ替える。
- `node --check`と`json.tool`はエラーなし。

## Pages公開確認

GitLab CIでは`index.html`、`styles.css`、`app.js`、PWA/オフライン関連ファイル、`assets/`、`docs/`を`public/`へコピーして公開する。手元で`public/`へ同期し忘れても、CI側で公開物を作り直す。

`validate_public` jobは通常push/MRで公開前チェックを実行し、`pages` jobは`main`ブランチで同じチェックを通したうえで`public/`を公開する。

公開後に確認するURL:

| 確認 | パス |
| --- | --- |
| トップ | `/` |
| 友人向けクイックスタート | `/docs/reader.html?doc=friend-quickstart.md` |
| 公開用 最終案内書 | `/docs/reader.html?doc=final-briefing.md` |
| 旅の現在地ダッシュボード | `/docs/reader.html?doc=trip-status-dashboard.md` |
| 出発GO/NO-GOカード | `/docs/reader.html?doc=go-no-go-check.md` |
| 荷物・空港集合カード | `/docs/reader.html?doc=final-day-luggage-airport-card.md` |
| 友人へ送るメッセージ集 | `/docs/reader.html?doc=share-message-templates.md` |
| 今日の司令室 | `/docs/reader.html?doc=today-command.md` |
| 日別コンシェルジュ | `/docs/reader.html?doc=daily-concierge.md` |
| 旅のミッションカード | `/docs/reader.html?doc=fun-mission-card.md` |
| 60秒SOSカード | `/docs/reader.html?doc=sos-quick-card.md` |
| 毎朝マネーカード | `/docs/reader.html?doc=daily-money-card.md` |
| 体力・休憩カード | `/docs/reader.html?doc=condition-care-card.md` |
| 現地移動カード | `/docs/reader.html?doc=onsite-navigation-card.md` |
| 資料リーダー | `/docs/reader.html?doc=pocket-itinerary.md` |
| 共有用1枚サマリー | `/docs/reader.html?doc=share-summary.md` |
| 更新マップ | `/docs/reader.html?doc=update-map.md` |
| 確定情報反映フォーム | `/docs/reader.html?doc=confirmation-intake-form.md` |
| 毎朝ブリーフィング | `/docs/reader.html?doc=daily-briefings.md` |
| 決定管制表 | `/docs/reader.html?doc=decision-control.md` |
| 最終トラベルパック | `/docs/reader.html?doc=final-travel-packet.md` |
| 出発前最終チェック | `/docs/reader.html?doc=departure-readiness.md` |
| 紙のミニカード | `/docs/reader.html?doc=paper-backup-card.md` |
| Tag Team詳細 | `/docs/reader.html?doc=tag-team-registration.md` |
| Sphere最終日 | `/docs/reader.html?doc=final-day-sphere.md` |
| Grand Canyon | `/docs/reader.html?doc=grand-canyon.md` |
| 非公開情報の持ち方 | `/docs/reader.html?doc=private-info-handbook.md` |
| オフライン表示 | `/offline.html` |
| Manifest | `/manifest.webmanifest` |
| Service Worker | `/service-worker.js` |

スマホ確認:

- トップを一度開いたあと、ホーム画面追加が選べるか確認する。
- トップの`送信用文面`、`最終案内`、`1枚サマリー`のコピーボタンが押せるか確認する。
- `docs/reader.html?doc=final-briefing.md`で旅行全体の見る順番が縦読みできるか確認する。
- `docs/reader.html?doc=trip-status-dashboard.md`で予約済みと未完実務が分けて読めるか確認する。
- `docs/reader.html?doc=share-message-templates.md`で共有文面が個人情報なしで読めるか確認する。
- `docs/reader.html?doc=today-command.md`で朝の3アクションが縦読みできるか確認する。
- `docs/reader.html?doc=daily-concierge.md`で日別の添乗メモが縦に読めるか確認する。
- `docs/reader.html?doc=fun-mission-card.md`で日別ミッションが縦に読めるか確認する。
- `docs/reader.html?doc=sos-quick-card.md`で緊急時の最初の60秒がすぐ読めるか確認する。
- `docs/reader.html?doc=pocket-itinerary.md`で見出し、表、下部ナビが読めるか確認する。
- `docs/reader.html?doc=paper-backup-card.md`で`印刷`ボタンが見え、A4 1枚の紙ミニカードを印刷できるか確認する。
- 電波が弱い前提で、一度開いたトップ/資料がキャッシュから読めるか確認する。

## 出発前に更新するもの

| 優先 | 更新 |
| --- | --- |
| 高 | Sphereチケット購入後、座席方針とスマホ表示だけ公開版へ反映 |
| 高 | ツアー最終案内の空港集合時刻・場所を公開版へ反映 |
| 高 | Tag Team登録が済んだら「登録済み」に更新。予約/個人番号は載せない |
| 中 | 保険加入状況は「加入済み」だけ公開版へ反映。証券番号は載せない |
| 中 | USD現金の持参額はレンジで反映。実際の所持場所は載せない |
