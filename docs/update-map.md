# 更新マップ

旅行前に情報が確定したとき、どのファイルへ何を反映するかの作業マップ。公開版には予約番号、氏名、チケットQR、確認メール本文、パスポート/ESTA番号、保険証券番号、カード番号を入れない。

## 基本手順

1. 確定情報を確認する。
2. [confirmation-intake-form.md](confirmation-intake-form.md) で公開版に書く要点と非公開に残す情報を分ける。
3. 実番号やQRは [private-info-handbook.md](private-info-handbook.md) のルールで非公開控えへ保存する。
4. 公開版には時刻、場所、座席エリア、持ち物、支払い種別、判断ルールだけ反映する。
5. `index.html`や公開ルートのファイルを更新したら`public/`側へ同期する。
6. Merge Requestは`.gitlab/merge_request_templates/`のテンプレートを使う。
7. [publish-checklist.md](publish-checklist.md) または `./scripts/check_public.sh` の確認を通す。

## 更新チケット

### Sphereチケット購入後

| 更新先 | 書くこと |
| --- | --- |
| [share-summary.md](share-summary.md) | `チケット/最終導線確認待ち`を購入済みの要約へ変更 |
| [decision-control.md](decision-control.md) | Sphereチケットの状態を購入済みに変更 |
| [final-day-sphere.md](final-day-sphere.md) | 公演名、座席エリア、入場時刻、スマホ表示、バッグ注意 |
| [schedule.md](schedule.md) | 6/27のSphere行に座席エリアと入場時刻を反映 |
| [pocket-itinerary.md](pocket-itinerary.md) | 6/27の朝チェックにチケット表示確認を反映 |
| `index.html` / `public/index.html` | 予約タブ、日程タブ、資料タブの文言を更新 |

公開しない:

- チケットQR/バーコード。
- 正確な座席番号。
- Ticketmasterアカウント情報。

### ツアー最終案内が来た後

| 更新先 | 書くこと |
| --- | --- |
| [share-summary.md](share-summary.md) | 6/27夜の空港移動が確定したことを反映 |
| [decision-control.md](decision-control.md) | 6/27荷物・空港集合を確定済みに変更 |
| [final-day-sphere.md](final-day-sphere.md) | 空港集合時刻、集合場所、荷物預け/回収の時系列 |
| [final-day-luggage-airport-card.md](final-day-luggage-airport-card.md) | 最終案内の公開可能な時刻・場所・逆算ルール |
| [pocket-itinerary.md](pocket-itinerary.md) | 6/27夕方以降の時刻表 |
| [daily-briefings.md](daily-briefings.md) | 6/27朝に見る空港集合情報 |
| [final-travel-packet.md](final-travel-packet.md) | 出発前日チェックの空港集合欄 |
| `index.html` / `public/index.html` | 最終日導線とリスクボードの文言 |

公開しない:

- ツアー緊急連絡先の個別番号。
- 参加者名。
- 最終案内メール本文。

### Tag Team登録導線が確定した後

| 更新先 | 書くこと |
| --- | --- |
| [decision-control.md](decision-control.md) | Tag Team登録導線を確認済みに変更 |
| [tag-team-registration.md](tag-team-registration.md) | 登録場所、集合時刻、支払い方法、交代ルール |
| [poker-plan.md](poker-plan.md) | 6/24の実行方針 |
| [daily-briefings.md](daily-briefings.md) | 6/24朝に見る持ち物と集合時刻 |
| `index.html` / `public/index.html` | 予約タブ、日程タブ、準備タブの文言 |

公開しない:

- Caesars Rewards番号。
- WSOP LIVEアカウント情報。
- パスポート番号。

### 保険を確定した後

| 更新先 | 書くこと |
| --- | --- |
| [decision-control.md](decision-control.md) | 保険・緊急連絡を確定済みに変更 |
| [confirmation-sheet.md](confirmation-sheet.md) | 加入済み/クレカ付帯確認済みなどの状態 |
| [predeparture-countdown.md](predeparture-countdown.md) | 保険控え完了へ変更 |
| [final-travel-packet.md](final-travel-packet.md) | 紙/スマホに保存済みとして更新 |
| `index.html` / `public/index.html` | 準備タブの保険チェック文言 |

公開しない:

- 保険証券番号。
- 緊急窓口の個別契約番号。
- 本人情報。

### USD現金とカード構成を決めた後

| 更新先 | 書くこと |
| --- | --- |
| [share-summary.md](share-summary.md) | USD現金を基本レンジで可変運用すること |
| [decision-control.md](decision-control.md) | USD現金とカードを可変運用として更新 |
| [money-logistics.md](money-logistics.md) | 持参USDの基本レンジ、用途別の分け方 |
| [budget.md](budget.md) | 現地予算の標準案 |
| [final-travel-packet.md](final-travel-packet.md) | 紙/スマホのカード停止窓口チェック |
| `index.html` / `public/index.html` | お金タブと準備タブ |

公開しない:

- 実際の所持場所。
- カード番号。
- 暗証番号。

### 6/26フリー日の方針を決めた後

| 更新先 | 書くこと |
| --- | --- |
| [decision-control.md](decision-control.md) | 6/26候補をA/B/C案に確定 |
| [schedule.md](schedule.md) | 6/26の優先案 |
| [planning-board.md](planning-board.md) | 相談ボードの決定メモ |
| [daily-briefings.md](daily-briefings.md) | 6/26朝のおすすめ順 |
| `index.html` / `public/index.html` | 日程タブの6/26 |

公開しない:

- 個人の現金残や損失上限。
- カード利用可能枠。

## 最後に必ず見る

```bash
./scripts/check_public.sh
```
