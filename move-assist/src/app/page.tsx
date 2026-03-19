"use client";

import Link from "next/link";
import AppShell from "@/components/ui/AppShell";
import CyberRouteMap from "@/components/ui/CyberRouteMap";
import RouteCard from "@/components/ui/RouteCard";
import SectionCard from "@/components/ui/SectionCard";
import StatusPill from "@/components/ui/StatusPill";
import { CATEGORY_ICONS } from "@/lib/types";
import { useCurrentPosition } from "@/lib/hooks/useCurrentPosition";
import { useSchedules } from "@/lib/hooks/useSchedules";
import { useWeather } from "@/lib/hooks/useWeather";
import {
  buildRouteOptions,
  formatMinutesUntil,
  getMinutesUntil,
  getRouteBadges,
} from "@/lib/scoring/routes";

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
  const badges = getRouteBadges(routes);
  const minutesUntil = getMinutesUntil(nextSchedule?.startTime);

  const bestBadge =
    bestRoute.id === badges.fastestId
      ? "最短"
      : bestRoute.id === badges.cheapestId
      ? "最安"
      : bestRoute.id === badges.easiestId
      ? "負担少"
      : undefined;

  return (
    <AppShell
      title="今どう動くか"
      description="現在地・予定・天気から、今の最適な移動を提示します。"
    >
      <div className="space-y-4">
        <section className="cyber-panel cyber-outline rounded-[30px] p-5">
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/72">
                  LIVE STATUS
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white neon-text">
                  MOVE ASSIST
                </h2>
                <p className="mt-2 text-sm leading-6 text-cyan-50/70">
                  サイバーUIで、次の予定と移動候補を即時に判断します。
                </p>
              </div>

              <StatusPill
                label={weatherLoading ? "取得中" : `${weather.label} ${weather.temperatureText}`}
                tone="blue"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-[22px] border border-cyan-400/10 bg-cyan-500/5 p-3">
                <p className="text-[11px] tracking-wide text-cyan-100/55">現在地</p>
                <p className="mt-1 text-sm font-semibold text-cyan-50">
                  {positionLoading ? "取得中" : position ? "取得済み" : "未取得"}
                </p>
              </div>
              <div className="rounded-[22px] border border-cyan-400/10 bg-cyan-500/5 p-3">
                <p className="text-[11px] tracking-wide text-cyan-100/55">天気</p>
                <p className="mt-1 text-sm font-semibold text-cyan-50">
                  {weatherLoading ? "取得中" : weather.label}
                </p>
              </div>
              <div className="rounded-[22px] border border-cyan-400/10 bg-cyan-500/5 p-3">
                <p className="text-[11px] tracking-wide text-cyan-100/55">開始まで</p>
                <p className="mt-1 text-sm font-semibold text-emerald-300">
                  {formatMinutesUntil(minutesUntil)}
                </p>
              </div>
            </div>

            {positionError ? (
              <div className="mt-4 rounded-2xl border border-amber-400/16 bg-amber-400/8 px-3 py-3 text-sm text-amber-200">
                {positionError}
              </div>
            ) : null}
          </div>
        </section>

        <CyberRouteMap
          fromLabel="現在地"
          toLabel={nextSchedule?.destinationName ?? "目的地未設定"}
          durationText={bestRoute.durationText}
        />

        <SectionCard
          title="次の予定"
          action={
            <Link href="/schedules" className="text-sm font-medium text-cyan-300">
              予定一覧
            </Link>
          }
        >
          {nextSchedule ? (
            <div className="space-y-3">
              <div className="rounded-[22px] border border-fuchsia-400/12 bg-fuchsia-500/[0.05] p-4">
                <p className="text-lg font-semibold text-white">
                  {CATEGORY_ICONS[nextSchedule.category]} {nextSchedule.title}
                </p>
                <p className="mt-2 text-sm text-cyan-100/72">
                  {nextSchedule.destinationName}
                </p>
                <p className="mt-1 text-base font-semibold text-cyan-300">
                  {nextSchedule.startTime} 開始
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusPill label={nextSchedule.category} tone="slate" />
                  <StatusPill label={formatMinutesUntil(minutesUntil)} tone="green" />
                </div>
              </div>

              {nextSchedule.memo ? (
                <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 px-3 py-3 text-sm text-cyan-50/80">
                  {nextSchedule.memo}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-cyan-50/80">予定がまだありません。</p>
              <Link
                href="/schedules/new"
                className="inline-flex rounded-2xl bg-gradient-to-r from-cyan-500/80 to-sky-500/80 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.32)]"
              >
                予定を追加する
              </Link>
            </div>
          )}
        </SectionCard>

        <SectionCard
          title="おすすめの移動"
          action={<StatusPill label={bestBadge ?? "候補"} tone="blue" />}
        >
          <RouteCard route={bestRoute} badge={bestBadge} />
        </SectionCard>

        <div className="grid grid-cols-3 gap-3">
          <Link
            href="/compare"
            className="cyber-panel rounded-[24px] p-4 text-center transition hover:translate-y-[-1px]"
          >
            <p className="text-sm font-semibold text-cyan-50">ルート比較</p>
          </Link>

          <Link
            href="/nearby"
            className="cyber-panel rounded-[24px] p-4 text-center transition hover:translate-y-[-1px]"
          >
            <p className="text-sm font-semibold text-cyan-50">周辺スポット</p>
          </Link>

          <Link
            href="/schedules"
            className="cyber-panel rounded-[24px] p-4 text-center transition hover:translate-y-[-1px]"
          >
            <p className="text-sm font-semibold text-cyan-50">予定一覧</p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
