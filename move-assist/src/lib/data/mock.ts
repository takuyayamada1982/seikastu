import {
  NearbySuggestion,
  RouteOption,
  TaskItem,
  WeatherInfo,
} from "@/lib/types";

export const mockWeather: WeatherInfo = {
  label: "雨",
  temperatureText: "13°C",
  note: "雨のため徒歩が長い移動は負担が高めです。",
};

export const mockTasks: TaskItem[] = [
  {
    id: "task-1",
    title: "昼食",
    category: "昼食",
    destinationName: "新宿駅周辺",
    startTime: "12:30",
    memo: "駅近、混みすぎない店が良い",
  },
  {
    id: "task-2",
    title: "打ち合わせ",
    category: "会議",
    destinationName: "丸の内オフィス",
    startTime: "14:00",
    memo: "10分前到着を優先",
  },
];

export const mockRouteOptions: RouteOption[] = [
  {
    id: "route-1",
    type: "公共交通",
    durationText: "36分",
    costText: "¥420",
    walkingLevel: "中",
    scoreLabel: "おすすめ",
    reason: "雨の日でも比較的安定して移動でき、予定に間に合いやすいです。",
    caution: "駅構内の移動が少し長めです。",
  },
  {
    id: "route-2",
    type: "タクシー",
    durationText: "22分",
    costText: "¥2,300",
    walkingLevel: "少",
    scoreLabel: "候補",
    reason: "徒歩が少なく、悪天候時の負担が小さいです。",
    caution: "料金が高めです。",
  },
  {
    id: "route-3",
    type: "徒歩",
    durationText: "58分",
    costText: "¥0",
    walkingLevel: "多",
    scoreLabel: "注意",
    reason: "費用はかかりませんが、雨の日には不向きです。",
    caution: "天候と時間の両面でおすすめしにくいです。",
  },
];

export const mockNearbySuggestions: NearbySuggestion[] = [
  {
    id: "nearby-1",
    type: "ランチ",
    title: "駅直結の和食ランチ",
    description: "雨の日でも移動しやすく、待ち時間が比較的短い候補です。",
    distanceText: "徒歩3分",
  },
  {
    id: "nearby-2",
    type: "カフェ",
    title: "会議前に使いやすい静かなカフェ",
    description: "電源あり、短時間待機向きです。",
    distanceText: "徒歩4分",
  },
  {
    id: "nearby-3",
    type: "コンビニ",
    title: "駅前コンビニ",
    description: "飲み物やちょっとした買い物向けです。",
    distanceText: "徒歩2分",
  },
];
