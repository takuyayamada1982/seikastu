import Link from "next/link";
import StatusPill from "@/components/ui/StatusPill";
import type { TaskItem } from "@/lib/types";
import { CATEGORY_ICONS } from "@/lib/types";

type Props = {
  schedule: TaskItem | null;
  minutesLabel: string;
};

export default function NextScheduleHeroCard({ schedule, minutesLabel }: Props) {
  if (!schedule) {
    return (
      <section className="cyber-panel cyber-outline rounded-[30px] p-5">
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/70">
            Next Schedule
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">次の予定がありません</h2>
          <p className="mt-2 text-sm leading-6 text-cyan-50/72">
            まず予定を追加すると、移動提案と到着後候補が反映されます。
          </p>

          <div className="mt-4">
            <Link
              href="/schedules/new"
              className="inline-flex rounded-[22px] bg-gradient-to-r from-cyan-500/85 to-sky-500/85 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.28)]"
            >
              予定を追加する
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cyber-panel cyber-outline rounded-[30px] p-5">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/70">
              Next Schedule
            </p>
            <div className="mt-3 flex items-start gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-400/16 bg-fuchsia-500/10 text-2xl neon-purple">
                {CATEGORY_ICONS[schedule.category]}
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold text-white">{schedule.title}</h2>
                <p className="mt-1 text-base text-cyan-50/78">{schedule.destinationName}</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-300">
                  {schedule.startTime}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-400/18 bg-cyan-400/10 px-3 py-2 text-right neon-blue">
            <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/70">
              Start
            </p>
            <p className="mt-1 text-sm font-semibold text-cyan-50">{minutesLabel}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusPill label={schedule.category} tone="slate" />
          <StatusPill label="Googleカレンダー連携予定" tone="blue" />
        </div>

        {schedule.memo ? (
          <div className="mt-4 rounded-[22px] border border-cyan-400/10 bg-cyan-500/5 px-4 py-3 text-sm text-cyan-50/78">
            {schedule.memo}
          </div>
        ) : null}

        <div className="mt-4 flex gap-3">
          <Link
            href="/compare"
            className="cyber-btn inline-flex flex-1 items-center justify-center rounded-[22px] px-4 py-3 text-sm font-semibold text-cyan-50"
          >
            おすすめルートを見る
          </Link>
          <Link
            href="/schedules"
            className="inline-flex items-center justify-center rounded-[22px] border border-cyan-400/14 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-cyan-100/80"
          >
            予定一覧
          </Link>
        </div>
      </div>
    </section>
  );
}
