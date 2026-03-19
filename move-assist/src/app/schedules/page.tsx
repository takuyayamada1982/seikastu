"use client";

import Link from "next/link";
import AppShell from "@/components/ui/AppShell";
import SectionCard from "@/components/ui/SectionCard";
import StatusPill from "@/components/ui/StatusPill";
import { CATEGORY_ICONS } from "@/lib/types";
import { useSchedules } from "@/lib/hooks/useSchedules";

export default function SchedulesPage() {
  const { schedules } = useSchedules();

  return (
    <AppShell title="予定一覧" description="保存した予定をサイバーUIで確認します。">
      <div className="mb-4">
        <Link
          href="/schedules/new"
          className="inline-flex w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-cyan-500/80 to-sky-500/80 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.32)]"
        >
          予定を追加する
        </Link>
      </div>

      {schedules.length === 0 ? (
        <SectionCard title="予定はまだありません">
          <p className="text-sm text-cyan-50/80">
            まずは予定を1件追加すると、ホームや比較画面に反映されます。
          </p>
        </SectionCard>
      ) : (
        <div className="space-y-4">
          {schedules.map((task) => (
            <Link key={task.id} href={`/schedules/${task.id}`} className="block">
              <SectionCard
                title={`${CATEGORY_ICONS[task.category]} ${task.title}`}
                action={<StatusPill label={task.category} tone="blue" />}
              >
                <div className="space-y-1">
                  <p className="text-sm text-cyan-50/78">{task.startTime}</p>
                  <p className="text-sm text-cyan-50/78">{task.destinationName}</p>
                  {task.memo ? (
                    <p className="text-sm text-cyan-100/55">{task.memo}</p>
                  ) : null}
                </div>
              </SectionCard>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
