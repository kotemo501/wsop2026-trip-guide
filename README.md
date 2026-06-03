# WSOP 2026 ラスベガス旅のしおり

友人2人で「世界のヨコサワ WSOP 2026 ツアー」に参加する前提の公開用しおりです。GitLab Pagesで公開し、予定・予算・候補・ToDoを更新していくための土台です。

## まず見るもの

GitLab PagesのURLを開いたら、友人にはこの順番で見てもらう。

| 順 | 開くもの | 目的 |
| --- | --- | --- |
| 1 | トップページ | 今日、予約、SOS、旅程への入口 |
| 2 | `/docs/reader.html?doc=friend-quickstart.md` | URLを受け取った直後の10分セットアップ |
| 3 | `/docs/reader.html?doc=share-summary.md` | 旅の全体像、固定予定、未確定タスク |
| 4 | `/docs/reader.html?doc=final-briefing.md` | 旅行代理店の最終案内書として見る順番 |
| 5 | `/docs/reader.html?doc=go-no-go-check.md` | 出発前日のGO/HOLD/NO-GO判定 |

スマホではトップ下部ナビの`今日`、`添乗`、`予約`、`SOS`、`旅程`を入口にする。Markdown資料はリーダー上で読み、リーダー下部ナビの`今日`、`予約`、`SOS`、`旅程`から戻れる。

## 未確定の扱い

未確定でも、担当、確認タイミング、代替手段、更新先が決まっていれば`HOLD`として運用する。Sphereは友人担当待ち、6/27荷物/空港集合はツアー最終案内待ち、Tag Teamは現地確認、保険/カードはdカード GOLD U付帯確認中、USD現金は可変レンジ運用として扱う。

公開版には時刻、集合場所、持ち物、支払い種別、判断ルールだけを書く。予約番号、参加者名、予約票PDF、チケットQR、保険/カード番号、個人の連絡先はGitLabに置かない。

## 旅の前提

| 項目 | 内容 |
| --- | --- |
| ツアー | ZIPAIRチャーター直行便で行くラスベガス8日間ツアー |
| 出発 | 2026-06-22(月) 成田発、ラスベガス着 |
| 滞在 | ホースシュー・ラスベガス 5連泊 |
| 現地最終日 | 2026-06-27(土) 夜に空港へ |
| 帰国 | 2026-06-29(月) 朝 成田着 |
| 主目的 | WSOP体験、低めのトーナメント、キャッシュゲーム、観光 |

## 今回の基本方針

- 帰国便は動かせない前提。2026-06-27(土)夜の空港移動に影響する予定、または6/28(日)以降に勝ち残る可能性があるトーナメントは選ばない。
- 6/23(火)は13:00の`$250 Daily Deepstack NLH`に参加し、敗退後はキャッシュゲームを候補にする。
- WSOP公式イベントは `$1,000 Tag Team` に参加する。
- `$1,000 Mystery Millions` はDay 2が帰国移動後の2026-06-28(日)になるため、候補から外す。
- 高額イベントは見学・雰囲気重視にして、実プレイはTag Team、Daily Deepstack、サテライト、キャッシュゲームを組み合わせる。
- Daily Deepstackは `$250`、`$400`、`$200` の時間帯があり、今回の旅程ではかなり有力。
- 6/22(月) 18:00-21:00のウェルカムパーティーは参加する。
- 6/26(金)はフリー日。休息、お土産、カジノ散歩、Daily、フリーロール、キャッシュを候補にする。
- 最終日6/27(土)は14:00のSphere公演を軸にし、近場だけを軽く見て夜の空港移動に備える。
- 食事は聖地巡礼系のお店以外、カップ麺・軽食・スーパー調達で節約する。

## 次に潰すこと

| 優先度 | 決めること | 期限目安 | メモ |
| --- | --- | --- | --- |
| S | Sphereチケット | 友人担当待ち | 6/27(土) 14:00 The Wizard of Oz、座席エリア、スマホ表示を確定後に反映する |
| S | 6/27荷物・空港集合 | ツアー最終案内後すぐ | 荷物預け、Sphere後の回収、空港集合時刻を1本の時系列にする |
| S | 6/24 Tag Team登録導線 | 現地確認前提 | 6/23に会場導線を見て、6/24は10:00目安で動く |
| S | 保険・緊急連絡 | 出発前 | dカード GOLD U付帯を確認し、足りなければ追加保険を検討。番号は非公開控えと紙に保存 |
| A | USD現金とカード | 可変運用 | `$1,800-$2,200`基本レンジを、ポーカー量に応じて調整。生活用/Emergencyは分ける |
| A | 6/26フリー日の候補 | 出発前 | Grand Canyon翌日なので、休息/お土産/Daily/キャッシュを体力で選ぶ |

## 公開・共有の最短導線

GitLab Pagesへ出す前は、まずこの順番で確認する。

1. [docs/publish-checklist.md](docs/publish-checklist.md) で公開してよい情報と出してはいけない情報を確認する。
2. `./scripts/build_public.sh` を実行して `public/` を同期する。
3. `./scripts/check_public.sh` を実行して、PDF、既知の予約情報、古い時刻/支払い表記、リンク、Service Worker対象を確認する。
4. [docs/gitlab-pages-guide.md](docs/gitlab-pages-guide.md) の「公開後に最初に確認するURL」をスマホで開く。
5. トップページの`送信用文面`、または [docs/share-message-templates.md](docs/share-message-templates.md) を使って友人へ共有する。

非公開控えをこの作業ディレクトリ内で扱う場合は、`.gitignore`済みの`local-private/`、`private/`、`reservations/`、`tickets/`、`wallet/`、`insurance/`、`cards/`、`passports/`、`esta/`だけを使う。公開版へ反映する時は [docs/confirmation-intake-form.md](docs/confirmation-intake-form.md) で公開してよい要点だけを抜き出す。

## ファイル構成

- [docs/trip-guide.md](docs/trip-guide.md): 公開ページの元原稿。まずここを整える
- [index.html](index.html): GitLab Pagesで公開するトップページ
- [public/index.html](public/index.html): 静的公開向けの同内容バックアップ
- [docs/planning-board.md](docs/planning-board.md): 友人と画面を見ながら決める相談ページ
- [docs/friend-quickstart.md](docs/friend-quickstart.md): GitLab PagesのURLを受け取った友人が最初の10分でやること
- [docs/final-briefing.md](docs/final-briefing.md): 旅行代理店の最終案内書のように見る順番、確定予定、未完、緊急時の入口をまとめる公開用1枚
- [docs/trip-status-dashboard.md](docs/trip-status-dashboard.md): 予約済み、公開しおりとして使えるもの、未完実務、次の作業順を分けて見る現在地
- [docs/share-summary.md](docs/share-summary.md): 友人に最初に共有する1枚サマリー
- [docs/share-message-templates.md](docs/share-message-templates.md): LINE/Slack/メールで送れる公開用メッセージ集
- [docs/concierge-handoff.md](docs/concierge-handoff.md): 旅行全体の状態、見る順番、引き継ぎ方をまとめるコンシェルジュ台帳
- [docs/go-no-go-check.md](docs/go-no-go-check.md): 出発前日にGO/HOLD/NO-GOを判定する公開用カード
- [docs/decision-control.md](docs/decision-control.md): 未確定事項を優先順位、次の一手、更新先つきで管理する管制表
- [docs/update-map.md](docs/update-map.md): 予約・購入・確認後にどの資料へ何を反映するかの更新マップ
- [docs/confirmation-intake-form.md](docs/confirmation-intake-form.md): 確定情報を公開版へ安全に転記するための反映フォーム
- [docs/predeparture-countdown.md](docs/predeparture-countdown.md): 出発前にいつ何を潰すかを時系列で見る司令室
- [docs/departure-readiness.md](docs/departure-readiness.md): 出発前日に公開しおり、非公開控え、スマホ、紙、荷物の合格判定をする最終チェック
- [docs/final-travel-packet.md](docs/final-travel-packet.md): 出発前日に印刷・オフライン保存する最終パック
- [docs/paper-backup-card.md](docs/paper-backup-card.md): スマホ紛失・電池切れ時に動くための印刷用ミニカード
- [docs/schedule.md](docs/schedule.md): 日別スケジュール案
- [docs/daily-briefings.md](docs/daily-briefings.md): 現地で毎朝読む日別ブリーフィング
- [docs/daily-concierge.md](docs/daily-concierge.md): スマホで縦に読む日別の添乗員メモ
- [docs/today-command.md](docs/today-command.md): 現地で朝起きて最初に見る日別3アクション
- [docs/condition-care-card.md](docs/condition-care-card.md): 睡眠・水・食事・暑さで攻める日か休む日かを決める体力カード
- [docs/onsite-navigation-card.md](docs/onsite-navigation-card.md): Horseshoe、WSOP、Grand Canyon集合、Sphere、空港集合の移動優先カード
- [docs/free-day-plan.md](docs/free-day-plan.md): 6/26フリー日を疲労別A/B/Cで選ぶ当日判断メモ
- [docs/fun-mission-card.md](docs/fun-mission-card.md): 写真、食事、ポーカー、観光を日別に楽しむためのミッションカード
- [docs/confirmed-bookings.md](docs/confirmed-bookings.md): 予約済み一覧。公開版には予約番号、個人名、予約票PDFを載せない
- [docs/pocket-itinerary.md](docs/pocket-itinerary.md): 現地でまず見る1枚旅程表
- [docs/sos-quick-card.md](docs/sos-quick-card.md): 現地で焦った時に最初の60秒だけ見るSOSカード
- [docs/travel-support-playbook.md](docs/travel-support-playbook.md): 遅刻、紛失、体調不良、予定変更時の公開用行動手順
- [docs/private-info-handbook.md](docs/private-info-handbook.md): 予約番号や個人情報を公開版に載せずに持つための運用メモ
- [docs/smartphone-setup.md](docs/smartphone-setup.md): 公開しおり、非公開控え、SOS手順をスマホへ入れる手順
- [docs/safety-wallet.md](docs/safety-wallet.md): 保険、カード停止、Emergency現金、緊急導線をGitLab外で整える手順
- [docs/reader.html](docs/reader.html): GitLab Pages上でMarkdown資料をスマホ向けに読むための静的リーダー
- [docs/sphere-ticket-purchase-card.md](docs/sphere-ticket-purchase-card.md): 6/27 14:00 Sphereチケット購入時に見る公式URL、座席、Wallet、公開反映メモ
- [docs/final-day-luggage-airport-card.md](docs/final-day-luggage-airport-card.md): 6/27荷物預け、荷物回収、空港集合を1本化する公開用カード
- [docs/options.md](docs/options.md): ポーカー・観光・食事・休憩の候補リスト
- [docs/budget.md](docs/budget.md): 現地予算とポーカー・観光の費用感
- [docs/money-logistics.md](docs/money-logistics.md): 現金・カード・ATM・ポーカー資金の持ち方
- [docs/daily-money-card.md](docs/daily-money-card.md): 現地で毎朝見る財布配分と使いすぎ停止ルール
- [docs/poker-plan.md](docs/poker-plan.md): WSOP、Daily Deepstack、キャッシュゲーム方針
- [docs/tourism-and-food.md](docs/tourism-and-food.md): 観光・食事候補
- [docs/grand-canyon.md](docs/grand-canyon.md): 6/25にGrand Canyonツアーを入れる場合の候補・費用・ToDo
- [docs/grand-canyon-reservation-manual.md](docs/grand-canyon-reservation-manual.md): Horseshoe滞在から6/25 South Rimバスツアーを予約する手順
- [docs/tag-team-registration.md](docs/tag-team-registration.md): 6/24 Tag Team登録と交代ルール
- [docs/final-day-sphere.md](docs/final-day-sphere.md): 6/27 Sphere、荷物、空港導線
- [docs/publish-checklist.md](docs/publish-checklist.md): GitLab公開前の安全チェック
- [docs/gitlab-pages-guide.md](docs/gitlab-pages-guide.md): GitLab Pages公開後の確認・友人共有手順
- [docs/gitlab-issues.md](docs/gitlab-issues.md): 未決事項のIssueたたき台
- [docs/flight-baggage.md](docs/flight-baggage.md): 飛行機・荷物FAQ
- [docs/departure-arrival.md](docs/departure-arrival.md): 成田出発、機内、ラスベガス到着、Horseshoe初動の導線
- [docs/decisions.md](docs/decisions.md): 友人と決めることリスト
- [docs/confirmation-sheet.md](docs/confirmation-sheet.md): 確認して回答を書き込むシート
- [docs/sources.md](docs/sources.md): 参照元

## GitLabでの運用案

- GitLab Pagesは静的ファイルとして`public/`を公開する想定。HTML/CSS/ブラウザ上のJavaScriptは使えるが、サーバー側の処理やデータベースは標準では動かない。
- 公開前は `./scripts/build_public.sh` で`public/`を生成し、`./scripts/check_public.sh` を実行する。
- `public/docs/`は生成物として扱う。CIでも`docs/`を`public/docs/`へコピーして公開する。
- 予約票PDF、予約番号、参加者名、確認メール、直接連絡先はコミットしない。集合場所・集合時刻・追加支払いのような行動に必要な情報だけ公開版へ転記する。
- Issue: 「6/24 Tag Teamの登録確認」「観光候補を決める」「1日ごとの予算上限」など、決める単位で立てる。
- Issue作成時は `.gitlab/issue_templates/` の公開用テンプレートを使う。
- ラベル: `decision`, `poker`, `tourism`, `budget`, `booking`, `todo`
- Merge Request: 予定を変えるときは `.gitlab/merge_request_templates/` のテンプレートを使い、理由と公開前チェック結果をMR本文に残す。
- Milestone: `出発前`, `現地1日目`, `現地中`, `帰国後`
