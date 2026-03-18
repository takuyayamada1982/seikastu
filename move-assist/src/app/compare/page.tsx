"use client";

import AppShell from "@/components/ui/AppShell";
import RouteCard from "@/components/ui/RouteCard";
import { useCurrentPosition } from "@/lib/hooks/useCurrentPosition";
import { useSchedules } from "@/lib/hooks/useSchedules";
import { useWeather } from "@/lib/hooks/useWeather";
import {
  buildRouteOptions,
  formatMinutesUntil,
  getMinutesUntil,
  getRouteBadges,
} from "@/lib/scoring/routes";

export default function ComparePage() {
  const { nextSchedule } = useSchedules();
  const { position } = useCurrentPosition();
  const { weather } = useWeather(position);

  const routes = buildRouteOptions(
    nextSchedule?.category ?? "会議",
    weather.label,
    nextSchedule?.startTime
  );
  const badges = getRouteBadges(routes);
  const minutesUntil = getMinutesUntil(nextSchedule?.startTime);

  return (
    <AppShell
      title="移動比較"
      description="候補を見比べて、今の状況に合う移動を選びます。"
    >
      <div className="mb-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
        <p>天気: {weather.label}</p>
        <p>次の予定: {nextSchedule?.title ?? "未設定"}</p>
        <p>開始まで: {formatMinutesUntil(minutesUntil)}</p>
      </div>

      <div className="space-y-4">
        {routes.map((route) => {
          const badge =
            route.id === badges.fastestId
              ? "最短"
              : route.id === badges.cheapestId
              ? "最安"
              : route.id === badges.easiestId
              ? "負担少"
              : undefined;

          return <RouteCard key={route.id} route={route} badge={badge} />;
        })}
      </div>
    </AppShell>
  );
}
