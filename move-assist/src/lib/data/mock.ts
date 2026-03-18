export type TaskCategory =
  | "昼食"
  | "カフェ"
  | "会議"
  | "通院"
  | "買い物"
  | "送迎"
  | "手続き";

export type RouteType =
  | "徒歩"
  | "自転車"
  | "車"
  | "タクシー"
  | "公共交通";

export type WeatherKind = "晴れ" | "くもり" | "雨" | "暑い";

export type TaskItem = {
  id: string;
  title: string;
  category: TaskCategory;
  destinationName: string;
  startTime: string; // HH:mm
  memo?: string;
  createdAt: string;
};

export type RouteOption = {
  id: string;
  type: RouteType;
  durationMin: number;
  durationText: string;
  costYen: number;
  costText: string;
  walkingLevel: "少" | "中" | "多";
  score: number;
  scoreLabel: "おすすめ" | "候補" | "注意";
  reason: string;
  caution?: string;
};

export type NearbySuggestion = {
  id: string;
  type: "ランチ" | "カフェ" | "コンビニ" | "休憩" | "その他";
  title: string;
  description: string;
  distanceText: string;
};

export type WeatherInfo = {
  label: WeatherKind;
  temperatureText: string;
  note: string;
};

export type CurrentPosition = {
  latitude: number;
  longitude: number;
};

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  昼食: "昼食",
  カフェ: "カフェ",
  会議: "会議",
  通院: "通院",
  買い物: "買い物",
  送迎: "送迎",
  手続き: "手続き",
};

export const CATEGORY_ICONS: Record<TaskCategory, string> = {
  昼食: "🍽️",
  カフェ: "☕",
  会議: "💼",
  通院: "🏥",
  買い物: "🛍️",
  送迎: "🚗",
  手続き: "📝",
};
