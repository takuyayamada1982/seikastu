"use client";

import AppShell from "@/components/ui/AppShell";
import RouteCard from "@/components/ui/RouteCard";
import { useCurrentPosition } from "@/lib/hooks/useCurrentPosition";
import { useSchedules } from "@/lib/hooks/useSchedules";
import { useWeather } from "@/lib/hooks/useWeather";
import { buildRouteOptions } from "@/lib/scoring/routes";

export default function ComparePage() {
  const { nextSchedule } = useSchedules();
  const { position } = useCurrentPosition();
  const { weather } = useWeather(position);

  const routes = buildRouteOptions(
    nextSchedule?.category ?? "会議",
    weather.label,
    nextSchedule?.startTime
  );

  return (
    <AppShell
      title="移動比較"
      description="候補を見比べて、今の状況に合う移動を選びます。"
    >
      <div className="mb-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
        天気: {weather.label} / 次の予定: {nextSchedule?.title ?? "未設定"}
      </div>

      <div className="space-y-4">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </AppShell>
  );
}
