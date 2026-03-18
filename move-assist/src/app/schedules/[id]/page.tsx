import Link from "next/link";
import AppShell from "@/components/ui/AppShell";
import RouteCard from "@/components/ui/RouteCard";
import SectionCard from "@/components/ui/SectionCard";
import { mockRouteOptions, mockTasks } from "@/lib/data/mock";

type PageProps = {
  params: {
    id: string;
  };
};

export default function ScheduleDetailPage({ params }: PageProps) {
  const task = mockTasks.find((item) => item.id === params.id) ?? mockTasks[0];
  const bestRoute = mockRouteOptions[0];

  return (
    <AppShell title="予定詳細" description="予定に対して、今のおすすめ判断を表示します。">
      <div className="space-y-4">
        <SectionCard title="予定情報">
          <div className="space-y-2">
            <p className="text-base font-semibold text-slate-900">{task.title}</p>
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
          title="出発と注意点"
          action={
            <Link href="/nearby" className="text-sm font-medium text-blue-600">
              周辺候補へ
            </Link>
          }
        >
          <div className="space-y-2 text-sm text-slate-700">
            <p>・推奨出発目安: 11:50</p>
            <p>・雨のため、徒歩の長いルートは避けるのがおすすめです。</p>
            <p>・到着後は駅近のランチ候補を優先表示します。</p>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
