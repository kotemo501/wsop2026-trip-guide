# WSOP 2026 ラスベガス旅のしおり

友人2人で「世界のヨコサワ WSOP 2026 ツアー」に参加する前提の公開用しおりです。GitHub Pagesで公開し、予定・予算・候補・ToDoを更新していくための土台です。

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
- 最終日6/27(土)は14:00のSphere公演と他カジノ見学をして、夜の空港移動に備える。
- 食事は聖地巡礼系のお店以外、カップ麺・軽食・スーパー調達で節約する。

## まず決めること

| 優先度 | 決めること | 期限目安 | メモ |
| --- | --- | --- | --- |
| 高 | 持参USD現金の目安 | 予約後すぐ | `$1/$2`キャッシュ候補も含めて不足しないようにする |
| 高 | WSOP本戦に何本出るか | 2026-05末 | 帰国便までに終わるイベントだけ選ぶ |
| 高 | 6/24 Tag Teamの登録・集合ルール確認 | 2026-05末 | 帰国便までに完結する参加確定イベント |
| 高 | 6/26フリー日の候補 | 2026-06上旬 | 休息、お土産、カジノ散歩、Daily、フリーロール、キャッシュを残す |
| 中 | 節約食の買い出し・設備確認 | 出発前 | お湯、電子レンジ、冷蔵庫、近隣CVS/Walgreens |
| 中 | ESTA、パスポート、海外保険 | 2026-05中 | ESTAは申請済み想定なので有効期限確認 |

## ファイル構成

- [docs/trip-guide.md](docs/trip-guide.md): 公開ページの元原稿。まずここを整える
- [index.html](index.html): GitHub Pagesで公開するトップページ
- [public/index.html](public/index.html): 静的公開向けの同内容バックアップ
- [docs/planning-board.md](docs/planning-board.md): 友人と画面を見ながら決める相談ページ
- [docs/schedule.md](docs/schedule.md): 日別スケジュール案
- [docs/options.md](docs/options.md): ポーカー・観光・食事・休憩の候補リスト
- [docs/budget.md](docs/budget.md): 現地予算とポーカー・観光の費用感
- [docs/money-logistics.md](docs/money-logistics.md): 現金・カード・ATM・ポーカー資金の持ち方
- [docs/poker-plan.md](docs/poker-plan.md): WSOP、Daily Deepstack、キャッシュゲーム方針
- [docs/tourism-and-food.md](docs/tourism-and-food.md): 観光・食事候補
- [docs/grand-canyon.md](docs/grand-canyon.md): 6/25にGrand Canyonツアーを入れる場合の候補・費用・ToDo
- [docs/flight-baggage.md](docs/flight-baggage.md): 飛行機・荷物FAQ
- [docs/decisions.md](docs/decisions.md): 友人と決めることリスト
- [docs/confirmation-sheet.md](docs/confirmation-sheet.md): 確認して回答を書き込むシート
- [docs/sources.md](docs/sources.md): 参照元

## GitHubでの運用案

- GitHub Pagesはリポジトリ直下の`index.html`を公開する想定。HTML/CSS/ブラウザ上のJavaScriptは使えるが、サーバー側の処理やデータベースは標準では動かない。
- Issue: 「6/24 Tag Teamの登録確認」「観光候補を決める」「1日ごとの予算上限」など、決める単位で立てる。
- ラベル: `decision`, `poker`, `tourism`, `budget`, `booking`, `todo`
- Merge Request: 予定を変えるときは `docs/schedule.md` を更新して、理由をMR本文に残す。
- Milestone: `出発前`, `現地1日目`, `現地中`, `帰国後`
