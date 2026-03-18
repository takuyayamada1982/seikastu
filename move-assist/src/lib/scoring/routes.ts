import type { RouteOption, TaskCategory, WeatherKind } from "@/lib/types";

function buildBaseOptions(): RouteOption[] {
  return [
    {
      id: "route-public",
      type: "公共交通",
      durationMin: 36,
      durationText: "36分",
      costYen: 420,
      costText: "¥420",
      walkingLevel: "中",
      score: 70,
      scoreLabel: "候補",
      reason: "時間と費用のバランスが取りやすい候補です。",
    },
    {
      id: "route-taxi",
      type: "タクシー",
      durationMin: 22,
      durationText: "22分",
      costYen: 2300,
      costText: "¥2,300",
      walkingLevel: "少",
      score: 62,
      scoreLabel: "候補",
      reason: "徒歩が少なく、移動負荷を抑えやすい候補です。",
    },
    {
      id: "route-walk",
      type: "徒歩",
      durationMin: 58,
      durationText: "58分",
      costYen: 0,
      costText: "¥0",
      walkingLevel: "多",
      score: 45,
      scoreLabel: "注意",
      reason: "費用はかかりませんが、負荷が高めです。",
    },
    {
      id: "route-bike",
      type: "自転車",
      durationMin: 28,
      durationText: "28分",
      costYen: 0,
      costText: "¥0",
      walkingLevel: "少",
      score: 58,
      scoreLabel: "候補",
      reason: "短距離なら効率的ですが、天候の影響を受けます。",
    },
    {
      id: "route-car",
      type: "車",
      durationMin: 26,
      durationText: "26分",
      costYen: 600,
      costText: "¥600",
      walkingLevel: "少",
      score: 60,
      scoreLabel: "候補",
      reason: "比較的早く、歩行負荷も少なめの候補です。",
    },
  ];
}

function scoreToLabel(score: number): RouteOption["scoreLabel"] {
  if (score >= 72) return "おすすめ";
  if (score >= 55) return "候補";
  return "注意";
}

export function getMinutesUntil(startTime?: string) {
  if (!startTime) return null;
  const [h, m] = startTime.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return h * 60 + m - currentMinutes;
}

export function formatMinutesUntil(minutesUntil: number | null) {
  if (minutesUntil === null) return "未設定";
  if (minutesUntil < 0) return "開始時刻を過ぎています";
  if (minutesUntil === 0) return "まもなく開始";
  return `あと${minutesUntil}分`;
}

export function buildRouteOptions(
  category: TaskCategory,
  weather: WeatherKind,
  startTime?: string
): RouteOption[] {
  const items = buildBaseOptions().map((item) => ({ ...item }));
  const minutesUntil = getMinutesUntil(startTime) ?? 999;

  for (const item of items) {
    if (weather === "雨") {
      if (item.type === "徒歩") item.score -= 20;
      if (item.type === "自転車") item.score -= 15;
      if (item.type === "公共交通") item.score += 8;
      if (item.type === "タクシー") item.score += 10;
      if (item.type === "車") item.score += 6;
    }

    if (weather === "暑い") {
      if (item.type === "徒歩") item.score -= 18;
      if (item.type === "自転車") item.score -= 10;
      if (item.type === "公共交通") item.score += 6;
      if (item.type === "タクシー") item.score += 8;
    }

    if (minutesUntil <= 30) {
      if (item.durationMin <= 30) item.score += 10;
      if (item.durationMin > 40) item.score -= 15;
    }

    if (category === "会議" || category === "通院") {
      if (item.type === "公共交通") item.score += 5;
      if (item.type === "タクシー") item.score += 5;
      if (item.type === "徒歩") item.score -= 8;
    }

    if (category === "昼食") {
      if (item.type === "公共交通") item.score += 3;
      if (item.type === "徒歩") item.score -= 3;
    }

    item.scoreLabel = scoreToLabel(item.score);

    if (item.type === "公共交通") {
      item.reason =
        weather === "雨"
          ? "雨の日でも比較的安定して移動でき、費用とのバランスも取りやすいです。"
          : "時間と費用のバランスが良く、標準的に選びやすい候補です。";
      item.caution = "駅構内の移動が少し長い場合があります。";
    }

    if (item.type === "タクシー") {
      item.reason =
        minutesUntil <= 30
          ? "開始時刻が近いときでも余裕を作りやすい候補です。"
          : "徒歩負荷が少なく、悪天候時の負担も抑えやすいです。";
      item.caution = "料金は高めです。";
    }

    if (item.type === "徒歩") {
      item.reason =
        weather === "雨" || weather === "暑い"
          ? "費用はかかりませんが、今の天候では負荷が高めです。"
          : "費用を抑えられますが、時間はかかります。";
      item.caution = "天候や開始時刻によっては不向きです。";
    }

    if (item.type === "自転車") {
      item.reason =
        weather === "雨"
          ? "通常は効率的ですが、雨天時は滑りやすさに注意が必要です。"
          : "短距離移動ならスムーズな候補です。";
      item.caution = "天候や駐輪場所の確認が必要です。";
    }

    if (item.type === "車") {
      item.reason = "比較的早く移動しやすく、歩行負荷も少なめです。";
      item.caution = "駐車場所や渋滞の影響を受けることがあります。";
    }
  }

  return items.sort((a, b) => b.score - a.score);
}

export function getRouteBadges(routes: RouteOption[]) {
  if (routes.length === 0) {
    return {
      fastestId: "",
      cheapestId: "",
      easiestId: "",
    };
  }

  const fastest = [...routes].sort((a, b) => a.durationMin - b.durationMin)[0];
  const cheapest = [...routes].sort((a, b) => a.costYen - b.costYen)[0];
  const walkingRank = { 少: 0, 中: 1, 多: 2 } as const;
  const easiest = [...routes].sort(
    (a, b) => walkingRank[a.walkingLevel] - walkingRank[b.walkingLevel]
  )[0];

  return {
    fastestId: fastest.id,
    cheapestId: cheapest.id,
    easiestId: easiest.id,
  };
}
