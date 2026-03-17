# MoveAssist — 移動判断アシスト PWA

現在地・予定・天気から「今どの移動手段を選ぶか」を3秒で判断できるスマホ向け PWA。

---

## クイックスタート

```bash
unzip move-assist.zip
cd move-assist
npm install
npm run dev
# → http://localhost:3000
```

> 必要環境: **Node.js 18 以上**

本番ビルド:

```bash
npm run build
npm start
```

---

## PWA としてホーム画面に追加

| OS | 手順 |
|---|---|
| iOS Safari | 共有ボタン →「ホーム画面に追加」 |
| Android Chrome | メニュー →「ホーム画面に追加」 |
| Chrome (PC) | アドレスバー右端のインストールアイコン |

---

## 画面構成

| 画面 | パス | 主な機能 |
|---|---|---|
| ホーム | `/` | 現在地（逆ジオコーディング）・天気・次の予定・おすすめ移動・出発目安・地図 |
| 予定一覧 | `/schedules` | 予定の一覧表示・削除 |
| 予定作成 | `/schedules/new` | 住所検索（Nominatim）・カテゴリ・日時・地図プレビュー・localStorage保存 |
| 予定詳細 | `/schedules/[id]` | 地図・出発目安バナー・出発アラーム設定・おすすめ移動手段 |
| 移動比較 | `/compare` | 全移動手段スコア比較・天気サマリ・外部地図リンク |
| 周辺スポット | `/nearby` | OSM リアルデータ（レストラン・カフェ・コンビニ）・カテゴリフィルター |

---

## 技術スタック（すべて無料）

| 役割 | 技術 |
|---|---|
| フレームワーク | Next.js 14 App Router |
| 言語 | TypeScript |
| スタイル | Tailwind CSS |
| 地図 | Leaflet + OpenStreetMap |
| 現在地 | Browser Geolocation API |
| 逆ジオコーディング | Nominatim（無料・APIキー不要）|
| 住所検索 | Nominatim（600ms デバウンス）|
| 天気 | Open-Meteo（無料・APIキー不要）|
| 周辺スポット | OSM Overpass API（無料）|
| データ保存 | localStorage（バックエンドなし）|
| PWA | 自前 Service Worker |

---

## フォルダ構成

```
src/
├── app/
│   ├── page.tsx                     # ホーム
│   ├── compare/page.tsx             # 移動比較
│   ├── nearby/page.tsx              # 周辺スポット
│   └── schedules/
│       ├── page.tsx                 # 予定一覧
│       ├── new/page.tsx             # 予定作成
│       └── [id]/page.tsx            # 予定詳細
├── components/
│   ├── home/        WeatherCard, NextScheduleCard
│   ├── transport/   TransportCard（スコア・理由・警告）
│   ├── nearby/      NearbyPlaceCard（距離バー・地図リンク）
│   ├── layout/      BottomNav
│   └── ui/          MapView, AddressSearchInput, ScoreRing,
│                    AlarmBanner, AlarmToggle, LeafletStyles,
│                    ServiceWorkerRegister, Badge
└── lib/
    ├── hooks/
    │   ├── useLocation          Geolocation API
    │   ├── useReverseGeocode    現在地 → 住所名
    │   ├── useWeather           Open-Meteo
    │   ├── useSchedules         localStorage CRUD
    │   ├── useTransport         距離計算 + スコアリング
    │   ├── useNearbyPlaces      Overpass API + フォールバック
    │   ├── useAddressSearch     Nominatim + デバウンス
    │   └── useDepartureAlarm    アラーム管理
    ├── utils/
    │   ├── scoring.ts           移動候補スコアリングロジック
    │   ├── geocoding.ts         Nominatim + Haversine距離
    │   ├── reverseGeocode.ts    Nominatim逆ジオコーディング
    │   ├── overpass.ts          OSM Overpass周辺スポット取得
    │   ├── weather.ts           Open-Meteo APIラッパー
    │   ├── storage.ts           localStorage ユーティリティ
    │   └── cn.ts                Tailwind クラス結合
    └── constants/
        ├── dummy.ts             フォールバック用サンプルデータ
        └── transport.ts         移動手段定数
```

---

## スコアリングロジック概要

`src/lib/utils/scoring.ts` — 現在地〜目的地の直線距離をもとに5候補を評価。

| 評価軸 | ロジック |
|---|---|
| 時間余裕 | 予定開始まで15分未満 → 遅い手段を下げる |
| 天気 | 雨 → 徒歩・自転車を大幅減点、電車・タクシーを加点 |
| 気温 | 30℃超 → 長距離徒歩・自転車を減点 |
| 距離 | 0.8km未満は徒歩最優先、5km超は自転車を下げる |
| カテゴリ | 会議 → タクシー加点・徒歩汗問題を警告、通院 → タクシー優先 |

---

## 出発アラームの仕組み

1. 予定詳細画面でオン/オフ・分数（5〜30分前）を設定
2. `localStorage` に設定を保存（再起動後も維持）
3. 30秒ごとにバックグラウンドチェック
4. 時間になったら：
   - **Web Notifications 許可済み** → OS ネイティブ通知
   - **権限なし** → 画面上部にインアプリバナーをスライドイン表示

---

## 注意事項

- Nominatim 利用規約: 過剰リクエスト禁止 → 600ms デバウンス実装済み
- Overpass API: 混雑時にタイムアウトする場合あり → ダミーデータに自動フォールバック
- 所要時間・料金はすべて **目安** です（リアルタイム交通情報は非対応）
- Open-Meteo 商用利用時は Attribution が必要
