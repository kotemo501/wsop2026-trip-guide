# 確定情報反映フォーム

予約、購入、最終案内、保険、現金/カード構成が決まった時に、公開版へ書いてよい要点だけを抜き出すフォーム。予約番号、氏名、チケットQR、保険証券番号、カード番号、個人の連絡先、確認メール本文は書かない。

## 使い方

1. 予約票、購入画面、最終案内、保険控えを開く。
2. 非公開で持つものを先に [private-info-handbook.md](private-info-handbook.md) へ分ける。
3. このフォームの「公開版へ書く」だけを該当資料へ転記する。
4. 反映先は [update-map.md](update-map.md) を見る。
5. 最後に `./scripts/build_public.sh` と `./scripts/check_public.sh` を通す。

## 公開/非公開の即判定

| 情報 | 公開版へ書く | 非公開控えへ入れる |
| --- | --- | --- |
| 時刻 | 書く | 書いてもよい |
| 集合場所 | 書く | 書いてもよい |
| 支払い種別 | `card`, `cashless`, `cash`, `non-cash` 程度を書く | 詳細は非公開 |
| 予約番号/注文番号 | 書かない | 書く |
| 氏名/参加者名 | 書かない | 書く |
| QR/バーコード | 書かない | Wallet/アプリ/非公開保存 |
| 緊急連絡先 | 一般公開窓口だけ | 個別番号は非公開 |
| 座席 | エリア程度 | 正確な席番号は非公開 |
| 保険/カード | 加入済み、保存済みだけ | 証券番号、停止窓口、カード情報 |

## Sphere購入後

| 公開版へ書く | 内容 |
| --- | --- |
| 公演 | The Wizard of Oz at Sphere |
| 日時 | 2026-06-27(土) 14:00 |
| 入場目安 | 13:15-13:30 |
| 座席 | エリア程度 |
| チケット表示 | Wallet/公式アプリで表示できる |
| バッグ | 大きいバッグ、スーツケース不可前提 |
| 更新先 | [sphere-ticket-purchase-card.md](sphere-ticket-purchase-card.md), [final-day-sphere.md](final-day-sphere.md), [pocket-itinerary.md](pocket-itinerary.md), [share-summary.md](share-summary.md) |

非公開へ入れる:

- 注文番号。
- チケットQR/バーコード。
- 正確な席番号。
- Ticketmasterアカウント情報。
- 購入メール本文。

## ツアー最終案内が来た後

| 公開版へ書く | 内容 |
| --- | --- |
| 空港集合時刻 | 時刻だけ |
| 空港集合場所 | 場所名と移動の要点 |
| 荷物預け | Bell Deskかツアー指定場所か |
| 荷物回収 | 回収時刻と戻る先 |
| ホテル出発目安 | 集合時刻から逆算した安全側の時刻 |
| 更新先 | [final-day-luggage-airport-card.md](final-day-luggage-airport-card.md), [final-day-sphere.md](final-day-sphere.md), [pocket-itinerary.md](pocket-itinerary.md), [daily-briefings.md](daily-briefings.md), トップページ |

非公開へ入れる:

- 最終案内メール本文。
- ツアー緊急連絡先の個別番号。
- 予約番号。
- 参加者名。
- 添付PDFや画像そのもの。

## Tag Team登録確認後

| 公開版へ書く | 内容 |
| --- | --- |
| 登録状態 | 登録済み/当日現地登録 |
| 集合時刻 | 10:00目安など |
| 登録場所 | Versailles Ballroom方面など一般名 |
| 支払い方針 | 現金/カード/チップ等の概要 |
| 交代ルール | 2人で説明できる要点 |
| 更新先 | [tag-team-registration.md](tag-team-registration.md), [poker-plan.md](poker-plan.md), [daily-briefings.md](daily-briefings.md), トップページ |

非公開へ入れる:

- Caesars Rewards番号。
- WSOP LIVEアカウント情報。
- パスポート番号。
- 登録チケット/席番号/QR。

## 保険・カード確認後

| 公開版へ書く | 内容 |
| --- | --- |
| 保険 | 加入済み/確認済み |
| キャッシュレス診療 | 使い方を非公開控えで確認済み |
| カード停止 | 非公開控えと紙へ保存済み |
| 予備カード | 分散済み |
| 更新先 | [safety-wallet.md](safety-wallet.md), [final-travel-packet.md](final-travel-packet.md), [go-no-go-check.md](go-no-go-check.md), トップページ |

非公開へ入れる:

- 保険証券番号。
- 緊急窓口の個別番号。
- カード番号、暗証番号。
- 予備カードの保管場所の詳細。
- 本人情報。

## USD現金とカード構成決定後

| 公開版へ書く | 内容 |
| --- | --- |
| 持参USD | レンジだけ。例: `$1,800-$2,200` |
| 財布分け | Daily wallet、Poker固定、Emergencyを分ける |
| カード | メイン/予備/ATM用を分ける |
| 更新先 | [money-logistics.md](money-logistics.md), [daily-money-card.md](daily-money-card.md), [budget.md](budget.md), トップページ |

非公開へ入れる:

- 実際の所持場所。
- 封筒や財布の場所。
- カード番号、暗証番号、利用枠。
- 個人の損失上限。

## 反映後チェック

| チェック | 合格 |
| --- | --- |
| 公開版 | 時刻、場所、持ち物、支払い種別、判断ルールだけ |
| 非公開控え | 予約番号、QR、氏名、証券番号、カード情報がGitLab外 |
| 紙 | 必要な実番号は印刷後手書き、または別の非公開紙 |
| ビルド | `./scripts/build_public.sh`が通る |
| 公開チェック | `./scripts/check_public.sh`が通る |

## 関連

- 更新先一覧: [update-map.md](update-map.md)
- 非公開情報の持ち方: [private-info-handbook.md](private-info-handbook.md)
- 公開前チェック: [publish-checklist.md](publish-checklist.md)
- GO/NO-GO: [go-no-go-check.md](go-no-go-check.md)
