# コンシェルジュ台帳

旅行代理店の担当者メモのように、旅全体の状態、見る順番、未確定の扱いを1枚にまとめる。公開版なので、予約番号、参加者名、チケットQR、保険証券番号、カード情報は書かない。

## この旅の状態

| 区分 | 状態 | 見る場所 |
| --- | --- | --- |
| 拠点 | Horseshoe Las Vegas滞在。WSOP、Grand Canyon、Sphereの拠点 | [share-summary.md](share-summary.md) |
| Grand Canyon | 6/25 South Rim予約済み。05:05 Horseshoe pickup | [confirmed-bookings.md](confirmed-bookings.md), [grand-canyon.md](grand-canyon.md) |
| WSOP | 6/23 Daily、6/24 Tag Team方針。Tag Team登録導線は現地確認前提 | [tag-team-registration.md](tag-team-registration.md) |
| 最終日 | 6/27 14:00 Sphere方針。チケットは友人担当待ち、荷物/空港集合は最終案内待ち | [final-day-sphere.md](final-day-sphere.md) |
| 安全 | 予約番号、QR、保険、カード停止窓口はGitLab外で持つ | [private-info-handbook.md](private-info-handbook.md) |
| スマホ | 公開しおり、非公開控え、SOS手順を出発前に保存 | [smartphone-setup.md](smartphone-setup.md) |

## 友人に渡す順番

| 順 | 渡すもの | 目的 |
| --- | --- | --- |
| 1 | [友人向けクイックスタート](friend-quickstart.md) | URLを受け取った直後に10分で保存・非公開控えを分ける |
| 2 | [公開用 最終案内書](final-briefing.md) | 旅行代理店の最終案内書のように、見る順番と確定予定を共有 |
| 3 | [共有用1枚サマリー](share-summary.md) | 旅行の全体像と未決事項を共有 |
| 4 | トップページ | スマホで日程、予約、SOS、持ち物へ移動 |
| 5 | [スマホセットアップ手順](smartphone-setup.md) | 出発前にホーム画面、非公開控え、オフライン確認を済ませる |
| 6 | [現地ポケット旅程表](pocket-itinerary.md) | 現地で今日の動きを見る |
| 7 | [現地サポート手順](travel-support-playbook.md) | 遅刻、紛失、体調不良、予定変更時に見る |

## 出発までに潰す順番

| 優先 | 項目 | 完了したと言える状態 | 更新先 |
| --- | --- | --- | --- |
| S | Sphereチケット | 友人側の購入/確保後、スマホで表示でき、座席エリアと入場時刻を公開版へ反映済み | [final-day-sphere.md](final-day-sphere.md), [pocket-itinerary.md](pocket-itinerary.md) |
| S | 6/27荷物・空港集合 | 荷物預け、回収、空港集合場所/時刻が1本の時系列になっている | [final-day-sphere.md](final-day-sphere.md), [daily-briefings.md](daily-briefings.md) |
| S | Tag Team登録 | 現地確認後、2人とも登録方法、支払い、集合目安、交代ルールを説明できる | [tag-team-registration.md](tag-team-registration.md) |
| S | 保険・カード停止 | dカード GOLD U付帯を確認し、足りない場合は追加保険を検討。窓口はGitLab外と紙で確認できる | [safety-wallet.md](safety-wallet.md), [final-travel-packet.md](final-travel-packet.md) |
| A | USD現金とカード | 固定額ではなく、基本レンジと用途別財布で運用する | [money-logistics.md](money-logistics.md), [budget.md](budget.md) |
| A | 6/26フリー日 | 疲労別のA/B/C案を朝に選べる | [free-day-plan.md](free-day-plan.md), [schedule.md](schedule.md), [daily-briefings.md](daily-briefings.md) |

## 当日サポートの見方

| 状況 | 開くもの | 最初の判断 |
| --- | --- | --- |
| 朝に何をするか見る | [daily-concierge.md](daily-concierge.md) | 縦読みで今日の優先順位だけ確認 |
| 旅行全体の案内を見る | [final-briefing.md](final-briefing.md) | 確定予定、未完、緊急時の入口を見る |
| 今日の全体を見る | [pocket-itinerary.md](pocket-itinerary.md) | 時刻、集合、夜の方針を見る |
| 予約の集合場所を見る | [confirmed-bookings.md](confirmed-bookings.md) | 予約番号は非公開控えから開く |
| 遅れそう | [travel-support-playbook.md](travel-support-playbook.md) | 相方へ連絡し、予約系は非公開メールから会社へ連絡 |
| 最終日が押した | [final-day-sphere.md](final-day-sphere.md) | 観光より荷物回収と空港集合を優先 |

## 公開版へ書いてよい情報

- 集合時刻、集合場所、入場時刻。
- 座席エリアのざっくりした情報。
- 持ち物、支払い種別、カード払い/現金不可などの行動情報。
- 未確定/確定済みの状態。
- 判断ルールと更新先。

## 公開版へ書かない情報

- 予約番号。
- 参加者名。
- チケットQR、バーコード、確認メール本文。
- パスポート/ESTA番号。
- 保険証券番号、カード番号、暗証番号。
- 個別契約に紐づく緊急連絡番号。

## 更新時の作業順

1. 新しい情報が公開してよい内容か、非公開控えに入れる内容かを分ける。
2. 非公開情報は [private-info-handbook.md](private-info-handbook.md) のルールで保存する。
3. 公開情報は [update-map.md](update-map.md) に沿って該当資料へ反映する。
4. `./scripts/build_public.sh` を実行する。
5. `./scripts/check_public.sh` を通す。
