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
      description="現在地・予定・天気から、今の最適な判断を提示します。"
    >
      <div className="space-y-4">
        <section className="cyber-panel cyber-outline rounded-[30px] p-5">
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
                  Live Assist
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white neon-text">
                  MOVE ASSIST
                </h2>
                <p className="mt-2 text-sm leading-6 text-cyan-50/70">
                  次の予定と現在条件から、今選ぶべき移動を提示します。
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-right neon-blue">
                <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/70">
                  Weather
                </p>
                <p className="mt-1 text-sm font-semibold text-cyan-50">
                  {weatherLoading ? "取得中" : `${weather.label} ${weather.temperatureText}`}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusPill
                label={
                  positionLoading
                    ? "現在地 取得中"
                    : position
                    ? "現在地 取得済み"
                    : "現在地 未取得"
                }
                tone="slate"
              />
              <StatusPill label={formatMinutesUntil(minutesUntil)} tone="green" />
              {nextSchedule ? (
                <StatusPill label={nextSchedule.category} tone="blue" />
              ) : null}
            </div>

            {positionError ? (
              <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/8 px-3 py-3 text-sm text-amber-200">
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
              一覧へ
            </Link>
          }
        >
          {nextSchedule ? (
            <div className="space-y-3">
              <div>
                <p className="text-base font-semibold text-white">
                  {CATEGORY_ICONS[nextSchedule.category]} {nextSchedule.title}
                </p>
                <p className="mt-1 text-sm text-cyan-100/70">
                  {nextSchedule.startTime} / {nextSchedule.destinationName}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <StatusPill label={nextSchedule.category} tone="slate" />
                <StatusPill label={formatMinutesUntil(minutesUntil)} tone="green" />
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
                className="inline-flex rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
              >
                予定を追加する
              </Link>
            </div>
          )}
        </SectionCard>

        <SectionCard
          title="今のおすすめ移動"
          action={
            <Link href="/compare" className="text-sm font-medium text-cyan-300">
              比較を見る
            </Link>
          }
        >
          <RouteCard route={bestRoute} badge={bestBadge} />
        </SectionCard>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/compare"
            className="cyber-panel rounded-[24px] p-4 text-left transition hover:translate-y-[-1px]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/70">
              Compare
            </p>
            <p className="mt-2 text-base font-semibold text-white">移動比較</p>
            <p className="mt-1 text-sm text-cyan-100/70">他の候補を見る</p>
          </Link>

          <Link
            href="/nearby"
            className="cyber-panel rounded-[24px] p-4 text-left transition hover:translate-y-[-1px]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300/70">
              Nearby
            </p>
            <p className="mt-2 text-base font-semibold text-white">到着後の提案</p>
            <p className="mt-1 text-sm text-cyan-100/70">周辺候補を見る</p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
