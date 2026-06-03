# GitLab Pages公開ガイド

GitLabで公開したあとに、友人へ共有して運用するためのガイド。公開URL、予約番号、個人名、確認メール本文、チケットQR、保険証券番号、カード番号はこのページに書かない。

## 公開後に最初に確認するURL

GitLab Pagesの公開URLが発行されたら、次のパスをスマホで確認する。

| 確認 | パス | 見ること |
| --- | --- | --- |
| トップ | `/` | タブ、画像、チェックリスト、印刷ボタン |
| 友人向けクイックスタート | `/docs/reader.html?doc=friend-quickstart.md` | URL受領後に最初の10分でやること |
| 公開用 最終案内書 | `/docs/reader.html?doc=final-briefing.md` | 旅行全体の見る順番と確定予定 |
| 旅の現在地ダッシュボード | `/docs/reader.html?doc=trip-status-dashboard.md` | 予約済みと未完実務の切り分け |
| 出発GO/NO-GOカード | `/docs/reader.html?doc=go-no-go-check.md` | 出発前日のGO/HOLD/NO-GO判定 |
| 荷物・空港集合カード | `/docs/reader.html?doc=final-day-luggage-airport-card.md` | 6/27荷物預け、回収、空港集合 |
| 友人へ送るメッセージ集 | `/docs/reader.html?doc=share-message-templates.md` | LINE/Slack/メール用の文面 |
| 今日の司令室 | `/docs/reader.html?doc=today-command.md` | 朝の3アクション |
| 日別コンシェルジュ | `/docs/reader.html?doc=daily-concierge.md` | 朝、移動前、寝る前の添乗メモ |
| 旅のミッションカード | `/docs/reader.html?doc=fun-mission-card.md` | 写真、食事、ポーカー、観光の楽しみ方 |
| 60秒SOSカード | `/docs/reader.html?doc=sos-quick-card.md` | 緊急時の最初の判断 |
| 毎朝マネーカード | `/docs/reader.html?doc=daily-money-card.md` | 財布配分と停止ライン |
| 体力・休憩カード | `/docs/reader.html?doc=condition-care-card.md` | 攻める/休むの判断 |
| 現地移動カード | `/docs/reader.html?doc=onsite-navigation-card.md` | Horseshoe、集合場所、Sphere、空港 |
| 共有用サマリー | `/docs/reader.html?doc=share-summary.md` | 友人に最初に送る概要 |
| ポケット旅程表 | `/docs/reader.html?doc=pocket-itinerary.md` | 現地で1枚で動けるか |
| 毎朝ブリーフィング | `/docs/reader.html?doc=daily-briefings.md` | 日別の朝チェック |
| 決定管制表 | `/docs/reader.html?doc=decision-control.md` | 未確定事項の優先順位 |
| 最終トラベルパック | `/docs/reader.html?doc=final-travel-packet.md` | 出発前日の保存/印刷 |
| 出発前最終チェック | `/docs/reader.html?doc=departure-readiness.md` | 出発できる状態か |
| 紙のミニカード | `/docs/reader.html?doc=paper-backup-card.md` | スマホ不調時の紙バックアップ。リーダーの`印刷`ボタンからA4 1枚で出す |
| 公開前チェック | `/docs/reader.html?doc=publish-checklist.md` | 個人情報混入チェック |
| オフライン表示 | `/offline.html` | 通信なしフォールバック |
| Service Worker | `/service-worker.js` | 200で取得できる |

## 友人へ送る順番

1. トップページの`送信用文面`ボタンで共有文面をコピーする。
2. `/docs/reader.html?doc=friend-quickstart.md` のURL。
3. `/docs/reader.html?doc=final-briefing.md` のURL。
4. `/docs/reader.html?doc=share-summary.md` のURL。
5. 必要なら `/docs/reader.html?doc=share-message-templates.md` の文面を使う。
6. 「予約番号やチケットQRはGitLabに置いていない。必要なものは各自のメール/Wallet/紙で持つ」と一言添える。
7. 現地で毎朝見るものとして `/docs/reader.html?doc=today-command.md`、`/docs/reader.html?doc=daily-concierge.md`、`/docs/reader.html?doc=sos-quick-card.md` を保存してもらう。
8. 余裕がある日の楽しみ方として `/docs/reader.html?doc=fun-mission-card.md` も保存してもらう。
9. 未決事項は `/docs/reader.html?doc=decision-control.md` を見ながら相談する。
10. 出発直前は `/docs/reader.html?doc=departure-readiness.md` と `/docs/reader.html?doc=final-travel-packet.md` を一緒に見る。

## GitLab側の確認

| 確認 | 内容 |
| --- | --- |
| Pages job | `main`ブランチでPages jobが成功している |
| validate job | MR/通常pushで`validate_public`が成功している |
| artifact | `public/`がPages artifactになっている |
| docsコピー | CI内で`docs/`が`public/docs/`へコピーされている |
| rootコピー | CI内で`index.html`、`styles.css`、`app.js`、PWA/オフライン関連、`assets/`が`public/`へコピーされている |
| CI環境 | `node:22-alpine`上で`bash`、`python3`、`ripgrep`を入れて公開チェックを実行している |
| URL | Pagesの公開URLをスマホで開ける |
| issue | 未決事項をIssue化する場合、個人情報を書いていない |

## Issueテンプレート

未決事項をIssue化する時は、`.gitlab/issue_templates/` のテンプレートを使う。テンプレートにも公開ルールを書いているので、予約番号、個人名、確認メール本文、チケットQR、カード/保険番号を入れない。

| テンプレート | 使う場面 |
| --- | --- |
| `Sphereチケット購入.md` | Sphereの座席、総額、Wallet表示 |
| `最終日荷物と空港集合.md` | 6/27荷物預け、空港集合、移動バッファ |
| `Tag Team登録確認.md` | WSOP LIVE、Caesars Rewards、登録/支払い |
| `USD現金とカード構成.md` | 現金レンジ、カード構成、ATM予備 |
| `海外旅行保険と緊急導線.md` | 保険、緊急窓口、非公開控え |
| `6月26日フリー日候補.md` | 休息、観光、Daily/フリーロール候補 |

## Merge Requestテンプレート

予定や予約状況を更新する時は、`.gitlab/merge_request_templates/` のテンプレートを使う。

| テンプレート | 使う場面 |
| --- | --- |
| `公開しおり更新.md` | 日程、持ち物、資料、表示改善など通常更新 |
| `予約購入反映.md` | Sphere、ツアー、保険、空港集合など確定情報の反映 |

MR本文では、公開した情報と公開していない情報を分けて書く。最後に`./scripts/check_public.sh`またはGitLab CIの`validate_public`が成功したことを確認する。

## 公開版の注意

- Markdown資料はトップページから`docs/reader.html?doc=...`経由で開く。GitLab Pages上でも見出し、表、リストとして読みやすい表示にする。
- 紙で持つ公開用カードは`/docs/reader.html?doc=paper-backup-card.md`を開き、リーダー上部の`印刷`ボタンから印刷する。予約番号、証券番号、個別連絡先などの実番号はGitLabに書かず、必要なら印刷後に手書きする。
- CIで公開物を`public/`へコピーするが、手元確認用に`index.html`、`styles.css`、`app.js`、PWA/オフライン関連は`public/`側も同期しておく。
- トップを一度スマホで開くと、主要ファイルはService Workerでキャッシュされる。完全な初回オフラインには対応しない。
- 旅程、資料、CSS、Service Worker対象を大きく更新した時は、`service-worker.js`の`CACHE_NAME`を上げて古いキャッシュを入れ替える。
- 予約票PDFやチケット画像はGitLabへ置かない。

## 共有メッセージ例

場面別の文面は `/docs/reader.html?doc=share-message-templates.md` を使う。

```text
WSOP 2026の公開しおりURLです。
まずトップと「友人向けクイックスタート」→「1枚サマリー」を見てください。
予約番号、チケットQR、保険/カード情報はGitLabには載せず、各自のメール/Wallet/紙で持つ運用にしています。
未決事項は「決定管制表」を見ながら潰していきます。
```

## 公開後に更新する時

| 変更 | 先に見る |
| --- | --- |
| Sphere購入 | `/docs/reader.html?doc=confirmation-intake-form.md` と `/docs/reader.html?doc=update-map.md` |
| 空港集合が確定 | `/docs/reader.html?doc=confirmation-intake-form.md` と `/docs/reader.html?doc=update-map.md` |
| Tag Team登録確認 | `/docs/reader.html?doc=tag-team-registration.md` と `/docs/reader.html?doc=update-map.md` |
| 保険/カード確定 | `/docs/reader.html?doc=confirmation-intake-form.md` と `/docs/reader.html?doc=private-info-handbook.md` |
| GitLabに出してよいか迷う | `/docs/reader.html?doc=publish-checklist.md` |

## 公開前コマンド

```bash
./scripts/build_public.sh
./scripts/check_public.sh
```

`check_public.sh`では、PDF混入、既知の予約情報、個別ESTA/パスポート由来メモ、古い旅行時刻/支払い表記、GitLab公開前提の表記ゆれ、GitLab Issue/MRテンプレートの公開安全チェック、JavaScript/Manifest構文、PWAアイコンサイズ、`public/`同期、トップ/リーダーの下部ナビ、資料リーダーのリンク先、資料リーダーの関連リンク/タイトル辞書、資料リーダーの印刷ボタン、資料リーダー下部ナビのスマホ表示、Markdown内部リンク、Service Workerキャッシュ対象、全Markdown資料のキャッシュ登録をまとめて確認する。GitLab CIでは`validate_public`と`pages`の両方でこのチェックを実行する。
