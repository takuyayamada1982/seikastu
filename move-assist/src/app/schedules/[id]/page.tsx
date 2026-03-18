"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import AppShell from "@/components/ui/AppShell";
import RouteCard from "@/components/ui/RouteCard";
import SectionCard from "@/components/ui/SectionCard";
import { CATEGORY_ICONS } from "@/lib/types";
import { findScheduleById } from "@/lib/storage/schedules";
import { buildRouteOptions } from "@/lib/scoring/routes";
import { buildNearbySuggestions, fallbackWeather } from "@/lib/data/mock";

export default function ScheduleDetailPage() {
  const params = useParams<{ id: string }>();
  const task = findScheduleById(params.id);

  if (!task) {
    return (
      <AppShell title="予定詳細" description="対象の予定が見つかりませんでした。">
        <SectionCard title="予定が見つかりません">
          <Link href="/schedules" className="text-sm font-medium text-blue-600">
            予定一覧へ戻る
          </Link>
        </SectionCard>
      </AppShell>
    );
  }

  const bestRoute = buildRouteOptions(task.category, fallbackWeather.label, task.startTime)[0];
  const suggestions = buildNearbySuggestions(task.category);

  return (
    <AppShell title="予定詳細" description="予定に対して、今のおすすめ判断を表示します。">
      <div className="space-y-4">
        <SectionCard title="予定情報">
          <div className="space-y-2">
            <p className="text-base font-semibold text-slate-900">
              {CATEGORY_ICONS[task.category]} {task.title}
            </p>
            <p className="text-sm text-slate-600">{task.startTime}</p>
            <p className="text-sm text-slate-600">{task.destinationName}</p>
            <p className="text-sm text-slate-600">カテゴリ: {task.category}</p>
            {task.memo ? (
              <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {task.memo}
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard
          title="おすすめ移動"
          action={
            <Link href="/compare" className="text-sm font-medium text-blue-600">
              比較へ
            </Link>
          }
        >
          <RouteCard route={bestRoute} />
        </SectionCard>

        <SectionCard
          title="到着後の候補"
          action={
            <Link href="/nearby" className="text-sm font-medium text-blue-600">
              周辺画面へ
            </Link>
          }
        >
          <div className="space-y-2 text-sm text-slate-700">
            {suggestions.slice(0, 3).map((item) => (
              <p key={item.id}>・{item.title}</p>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
