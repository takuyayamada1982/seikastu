"use client";

import Link from "next/link";
import AppShell from "@/components/ui/AppShell";
import RouteCard from "@/components/ui/RouteCard";
import SectionCard from "@/components/ui/SectionCard";
import StatusPill from "@/components/ui/StatusPill";
import { CATEGORY_ICONS } from "@/lib/types";
import { useCurrentPosition } from "@/lib/hooks/useCurrentPosition";
import { useSchedules } from "@/lib/hooks/useSchedules";
import { useWeather } from "@/lib/hooks/useWeather";
import { buildRouteOptions } from "@/lib/scoring/routes";

export default function HomePage() {
  const { nextSchedule } = useSchedules();
  const { position, loading: positionLoading, error: positionError } = useCurrentPosition();
  const { weather, loading: weatherLoading } = useWeather(position);

  const routes = buildRouteOptions(
    nextSchedule?.category ?? "会議",
    weather.label,
    nextSchedule?.startTime
  );
  const bestRoute = routes[0];

  return (
    <AppShell
      title="今どう動くか"
      description="現在地・予定・天気から、今のおすすめを確認するアプリです。"
    >
      <div className="space-y-4">
        <SectionCard
          title="現在の状況"
          action={<StatusPill label={weather.label} tone="blue" />}
        >
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              現在地:{" "}
              {positionLoading
                ? "取得中"
                : position
                ? `${position.latitude.toFixed(3)}, ${position.longitude.toFixed(3)}`
                : "未取得"}
            </p>
            <p>気温: {weatherLoading ? "取得中" : weather.temperatureText}</p>
            {positionError ? (
              <div className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {positionError}
              </div>
            ) : null}
            <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-800">
              {weather.note}
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="次の予定"
          action={
            <Link href="/schedules" className="text-sm font-medium text-blue-600">
              一覧へ
            </Link>
          }
        >
          {nextSchedule ? (
            <div className="space-y-2">
              <p className="text-base font-semibold text-slate-900">
                {CATEGORY_ICONS[nextSchedule.category]} {nextSchedule.title}
              </p>
              <p className="text-sm text-slate-600">
                {nextSchedule.startTime} / {nextSchedule.destinationName}
              </p>
              <p className="text-sm text-slate-600">カテゴリ: {nextSchedule.category}</p>
              {nextSchedule.memo ? (
                <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {nextSchedule.memo}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-700">予定がまだありません。</p>
              <Link
                href="/schedules/new"
                className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                予定を追加する
              </Link>
            </div>
          )}
        </SectionCard>

        <SectionCard
          title="今のおすすめ移動"
          action={
            <Link href="/compare" className="text-sm font-medium text-blue-600">
              比較を見る
            </Link>
          }
        >
          <RouteCard route={bestRoute} />
        </SectionCard>

        <SectionCard
          title="到着後の提案"
          action={
            <Link href="/nearby" className="text-sm font-medium text-blue-600">
              周辺候補へ
            </Link>
          }
        >
          <div className="space-y-2 text-sm text-slate-700">
            <p>・天気と予定カテゴリに合う場所を優先表示します。</p>
            <p>・到着後に取りやすい行動候補を表示します。</p>
            <p>・まずは近場・負担少なめを優先しています。</p>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
