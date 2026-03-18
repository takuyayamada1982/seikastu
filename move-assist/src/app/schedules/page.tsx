import Link from "next/link";
import AppShell from "@/components/ui/AppShell";
import SectionCard from "@/components/ui/SectionCard";
import StatusPill from "@/components/ui/StatusPill";
import { mockTasks } from "@/lib/data/mock";

export default function SchedulesPage() {
  return (
    <AppShell title="予定一覧" description="予定を確認して、移動判断につなげます。">
      <div className="mb-4">
        <Link
          href="/schedules/new"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm"
        >
          予定を追加する
        </Link>
      </div>

      <div className="space-y-4">
        {mockTasks.map((task) => (
          <Link key={task.id} href={`/schedules/${task.id}`} className="block">
            <SectionCard
              title={task.title}
              action={<StatusPill label={task.category} tone="blue" />}
            >
              <div className="space-y-1">
                <p className="text-sm text-slate-700">{task.startTime}</p>
                <p className="text-sm text-slate-700">{task.destinationName}</p>
                {task.memo ? (
                  <p className="line-clamp-2 text-sm text-slate-500">{task.memo}</p>
                ) : null}
              </div>
            </SectionCard>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
