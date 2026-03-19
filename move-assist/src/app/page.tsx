"use client";

import AppShell from "@/components/ui/AppShell";
import AlertPanel from "@/components/ui/AlertPanel";
import CurrentStateBanner from "@/components/ui/CurrentStateBanner";
import CyberRouteMap from "@/components/ui/CyberRouteMap";
import NextScheduleHeroCard from "@/components/ui/NextScheduleHeroCard";
import PrimaryActionDock from "@/components/ui/PrimaryActionDock";
import RecommendationTripleCards from "@/components/ui/RecommendationTripleCards";
import { useCurrentPosition } from "@/lib/hooks/useCurrentPosition";
import { useSchedules } from "@/lib/hooks/useSchedules";
import { useWeather } from "@/lib/hooks/useWeather";
import {
  buildRouteOptions,
  formatMinutesUntil,
  getMinutesUntil,
  getRouteBadges,
} from "@/lib/scoring/routes";

function resolveStateLabel(minutesUntil: number | null) {
  if (minutesUntil === null) return "予定なし" as const;
  if (minutesUntil < 0) return "到着済み" as const;
  if (minutesUntil <= 20) return "移動中" as const;
  if (minutesUntil <= 60) return "出発準備" as const;
  return "休憩中" as const;
}

function resolveStateSubLabel(
  minutesUntil: number | null,
  hasPosition: boolean,
  weatherLabel: string
) {
  if (minutesUntil === null) return "まず予定を追加すると提案が始まります。";
  if (!hasPosition) return "位置情報を取得すると提案精度が上がります。";
  if (minutesUntil < 0) return "予定時刻を過ぎています。現在の状況を確認してください。";
  if (minutesUntil <= 20) return `まもなく開始です。${weatherLabel}条件で移動候補を表示中。`;
  if (minutesUntil <= 60) return `そろそろ出発準備です。${weatherLabel}条件を反映しています。`;
  return "まだ余裕があります。次の予定に向けて候補を準備しています。";
}

function resolveAlert(minutesUntil: number | null, weatherLabel: string) {
  if (minutesUntil === null) {
    return {
      title: "次の予定が未設定です",
      detail: "Googleカレンダー連携または予定追加で、移動提案を開始できます。",
    };
  }

  if (minutesUntil <= 15 && minutesUntil >= 0) {
    return {
      title: "そろそろ出発時間です",
      detail: "出発は15分前が目安です。今の候補から選ぶのがおすすめです。",
    };
  }

  if (weatherLabel === "雨") {
    return {
      title: "雨のため徒歩候補は注意です",
      detail: "公共交通やタクシーを優先して比較しています。",
    };
  }

  return {
    title: "今の予定に合わせて候補を更新中です",
    detail: "開始時刻と天気を踏まえて最大3件の候補を表示しています。",
  };
}

export default function HomePage() {
  const { nextSchedule } = useSchedules();
  const { position } = useCurrentPosition();
  const { weather } = useWeather(position);

  const routes = buildRouteOptions(
    nextSchedule?.category ?? "会議",
    weather.label,
    nextSchedule?.startTime
  );

  const minutesUntil = getMinutesUntil(nextSchedule?.startTime);
  const minutesLabel = formatMinutesUntil(minutesUntil);
  const stateLabel = resolveStateLabel(minutesUntil);
  const stateSubLabel = resolveStateSubLabel(minutesUntil, !!position, weather.label);
  const alert = resolveAlert(minutesUntil, weather.label);
  const badges = getRouteBadges(routes);

  return (
    <AppShell
      title="今どう動くか"
      description="予定を起点に、今やるべき移動と行動を見やすく提示します。"
    >
      <div className="space-y-4">
        <CurrentStateBanner stateLabel={stateLabel} subLabel={stateSubLabel} />

        <NextScheduleHeroCard schedule={nextSchedule} minutesLabel={minutesLabel} />

        <AlertPanel title={alert.title} detail={alert.detail} />

        <CyberRouteMap
          fromLabel="現在地"
          toLabel={nextSchedule?.destinationName ?? "目的地未設定"}
          durationText={routes[0]?.durationText ?? "未算出"}
        />

        <RecommendationTripleCards
          routes={routes}
          fastestId={badges.fastestId}
          cheapestId={badges.cheapestId}
          easiestId={badges.easiestId}
        />

        <PrimaryActionDock />
      </div>
    </AppShell>
  );
}
