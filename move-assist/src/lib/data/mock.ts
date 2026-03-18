import type { NearbySuggestion, TaskItem, WeatherInfo } from "@/lib/types";

export const fallbackWeather: WeatherInfo = {
  label: "くもり",
  temperatureText: "--°C",
  note: "天気情報を取得できないため、標準条件で候補を表示しています。",
};

export const sampleTasks: TaskItem[] = [
  {
    id: "sample-1",
    title: "昼食",
    category: "昼食",
    destinationName: "新宿駅周辺",
    startTime: "12:30",
    memo: "駅近、混みすぎない店が良い",
    createdAt: new Date().toISOString(),
  },
];

export function buildNearbySuggestions(category: TaskItem["category"]): NearbySuggestion[] {
  switch (category) {
    case "昼食":
      return [
        {
          id: "lunch-1",
          type: "ランチ",
          title: "駅直結の和食ランチ",
          description: "雨の日でも移動しやすく、待ち時間が比較的短い候補です。",
          distanceText: "徒歩3分",
        },
        {
          id: "lunch-2",
          type: "カフェ",
          title: "食後に寄りやすいカフェ",
          description: "席数が多く、短時間の休憩向きです。",
          distanceText: "徒歩4分",
        },
        {
          id: "lunch-3",
          type: "コンビニ",
          title: "駅前コンビニ",
          description: "軽食や飲み物の購入向けです。",
          distanceText: "徒歩2分",
        },
      ];

    case "会議":
      return [
        {
          id: "meeting-1",
          type: "カフェ",
          title: "打ち合わせ前に待機しやすい静かなカフェ",
          description: "電源あり、短時間待機向きです。",
          distanceText: "徒歩4分",
        },
        {
          id: "meeting-2",
          type: "休憩",
          title: "ロビーラウンジ",
          description: "会議前の最終確認をしやすい場所です。",
          distanceText: "徒歩2分",
        },
        {
          id: "meeting-3",
          type: "コンビニ",
          title: "資料印刷もできるコンビニ",
          description: "飲み物や忘れ物対応にも便利です。",
          distanceText: "徒歩3分",
        },
      ];

    case "通院":
      return [
        {
          id: "clinic-1",
          type: "休憩",
          title: "座って待ちやすいベンチスペース",
          description: "歩行負荷を抑えたいとき向きです。",
          distanceText: "徒歩2分",
        },
        {
          id: "clinic-2",
          type: "コンビニ",
          title: "病院近くのコンビニ",
          description: "水分補給や支払い前の準備に便利です。",
          distanceText: "徒歩3分",
        },
        {
          id: "clinic-3",
          type: "その他",
          title: "薬局",
          description: "受診後の動線として使いやすい候補です。",
          distanceText: "徒歩1分",
        },
      ];

    default:
      return [
        {
          id: "generic-1",
          type: "カフェ",
          title: "近くで入りやすいカフェ",
          description: "ちょっとした待機や休憩向けです。",
          distanceText: "徒歩4分",
        },
        {
          id: "generic-2",
          type: "コンビニ",
          title: "最寄りコンビニ",
          description: "ちょっとした買い物向けです。",
          distanceText: "徒歩2分",
        },
        {
          id: "generic-3",
          type: "休憩",
          title: "休憩しやすいスペース",
          description: "次の行動に移る前に立ち寄りやすい候補です。",
          distanceText: "徒歩5分",
        },
      ];
  }
}
