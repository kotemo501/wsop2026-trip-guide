# 決定管制表

出発までに残っている判断を、優先順位・期限・更新先つきで管理するページ。公開版なので、予約番号、氏名、確認メール本文、パスポート/ESTA番号、カード/保険番号は書かない。

## 判断順

1. 帰国便と最終日導線に関わるものを先に決める。
2. 予約・購入が必要なものを次に決める。
3. 当日判断でよいものは候補だけ残す。
4. 決まったら、公開版には時刻・場所・持ち物・支払い種別だけ反映する。

## S: 先に潰す

| 項目 | 状態 | 次の一手 | 完了条件 | 更新先 |
| --- | --- | --- | --- | --- |
| Sphereチケット | 友人担当待ち | 友人側で6/27(土) 14:00 The Wizard of Ozの購入/確保状況を確認 | モバイルチケットを表示できる。座席エリアと入場時刻を公開版へ反映 | [final-day-sphere.md](final-day-sphere.md), [schedule.md](schedule.md), トップページ |
| 6/27荷物・空港集合 | 未確定 | ツアー最終案内で集合時刻、場所、荷物預け可否を見る | Sphere後に荷物回収して空港集合へ行く時系列が完成 | [final-day-sphere.md](final-day-sphere.md), [pocket-itinerary.md](pocket-itinerary.md), トップページ |
| Tag Team登録導線 | 現地確認前提 | 6/23に会場導線を確認し、6/24は10:00目安でregistration / verificationへ向かう | 6/24 10:00に何を持ってどこへ行くか説明できる | [tag-team-registration.md](tag-team-registration.md), [poker-plan.md](poker-plan.md) |
| 保険・緊急連絡 | dカード GOLD U付帯確認中 | 付帯保険の補償範囲と緊急窓口を確認し、足りなければ追加保険を検討 | 医療、盗難、遅延時に連絡先と補償範囲を見られる | [confirmation-sheet.md](confirmation-sheet.md), [predeparture-countdown.md](predeparture-countdown.md) |

## A: 出発1週間前まで

| 項目 | 状態 | 次の一手 | 完了条件 | 更新先 |
| --- | --- | --- | --- | --- |
| USD現金とカード | 可変運用 | `$1,800-$2,200`を基本レンジに、ポーカー量で調整。生活用/Emergencyは分ける | 持参USDレンジ、カード2枚、ATM予備、暗証番号確認が完了 | [money-logistics.md](money-logistics.md), [budget.md](budget.md) |
| 6/26フリー日 | A/B/C案あり | 朝の体力で [free-day-plan.md](free-day-plan.md) から選ぶ | Grand Canyon疲労に応じてA回復/B散歩/Cポーカー追加を説明できる | [free-day-plan.md](free-day-plan.md), [schedule.md](schedule.md), [planning-board.md](planning-board.md) |
| 節約食・買い出し | 方針あり | 水、軽食、カップ麺、カフェイン、胃薬の初日買い出しを決める | 到着日に何を買うか迷わない | [tourism-and-food.md](tourism-and-food.md), [predeparture-countdown.md](predeparture-countdown.md) |
| 荷物重量 | 未測定 | 機内持込、預け荷物、モバイルバッテリー、液体類を確認 | 出発前日に重さと手荷物配置が決まる | [flight-baggage.md](flight-baggage.md), [final-travel-packet.md](final-travel-packet.md) |

## B: 当日判断でよい

| 項目 | 判断ルール |
| --- | --- |
| 6/23 Daily後キャッシュ | 体力、眠気、翌日のTag Team準備で判断。深夜まで打たない |
| 6/24 Tag Team敗退後 | 翌朝Grand Canyon 04:15起床なので、基本は軽食と休息 |
| 6/26 Daily/フリーロール/キャッシュ | Grand Canyon疲れが残っていれば休息とお土産を優先 |
| 6/27近場散歩 | 午前だけ。荷物回収と空港集合を優先し、遠い場所へ広げない |
| 聖地巡礼ご飯 | ラーメン1回 + 中華1回を基本。予約で時間を縛りすぎない |

## 完了ログ

| 決定 | 状態 |
| --- | --- |
| Grand Canyon South Rim | 予約済み。National Park Express。6/25 05:05 Horseshoe pickup |
| Grand Canyon非米国居住者fee | `$100/人`を公園入場時にnon-cashで別途支払い |
| 6/23 Daily Deepstack | 13:00 `$250 Daily Deepstack NLH`に参加 |
| 6/24 Tag Team | 参加確定。登録導線は現地確認前提 |
| Mystery Millions | 帰国便と衝突するため候補から外す |
| 6/27 Sphere | 14:00 The Wizard of Ozを見る方針。チケットは友人担当待ち |
| 食事方針 | 通常食は節約、聖地巡礼系だけ外食予算を使う |

## GitLab Issueへ切る単位

| Issue | 優先 | ラベル | 参照 |
| --- | --- | --- | --- |
| Sphereチケット購入と表示確認 | S | `todo`, `booking`, `tourism` | [gitlab-issues.md](gitlab-issues.md) |
| 6/27荷物預けと空港集合 | S | `todo`, `booking`, `logistics` | [gitlab-issues.md](gitlab-issues.md) |
| Tag Team登録・支払い・交代ルール | S | `todo`, `poker` | [gitlab-issues.md](gitlab-issues.md) |
| 海外旅行保険と緊急連絡先 | S | `todo`, `booking`, `safety` | [gitlab-issues.md](gitlab-issues.md) |
| USD現金とカード構成 | A | `decision`, `budget`, `poker` | [gitlab-issues.md](gitlab-issues.md) |
| 6/26フリー日の候補決定 | A | `decision`, `tourism`, `poker` | [gitlab-issues.md](gitlab-issues.md) |

## 更新ルール

- 実番号や個人情報を含む判断は、まず [private-info-handbook.md](private-info-handbook.md) のルールで非公開控えへ入れる。
- 公開版には、時刻、集合場所、移動、持ち物、支払い種別、判断ルールだけを書く。
- 決定後は [final-travel-packet.md](final-travel-packet.md) の更新先も確認する。
- コミット前に [publish-checklist.md](publish-checklist.md) を通す。
