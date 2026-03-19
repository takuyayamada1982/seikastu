"use client";

import AppShell from "@/components/ui/AppShell";
import CyberRouteMap from "@/components/ui/CyberRouteMap";
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
      description="複数候補をサイバーUIで比較します。"
    >
      <div className="space-y-4">
        <CyberRouteMap
          fromLabel="現在地"
          toLabel={nextSchedule?.destinationName ?? "目的地未設定"}
          durationText={routes[0]?.durationText ?? "推定"}
        />

        <div className="cyber-panel rounded-[26px] p-4">
          <div className="relative z-10 text-sm text-cyan-100/75">
            <p>天気: {weather.label}</p>
            <p>開始まで: {formatMinutesUntil(minutesUntil)}</p>
            <p>予定: {nextSchedule?.title ?? "未設定"}</p>
          </div>
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
      </div>
    </AppShell>
  );
}
