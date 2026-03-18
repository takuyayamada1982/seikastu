import Link from "next/link";
import AppShell from "@/components/ui/AppShell";
import RouteCard from "@/components/ui/RouteCard";
import SectionCard from "@/components/ui/SectionCard";
import StatusPill from "@/components/ui/StatusPill";
import { mockRouteOptions, mockTasks, mockWeather } from "@/lib/data/mock";

export default function HomePage() {
  const nextTask = mockTasks[0];
  const bestRoute = mockRouteOptions[0];

  return (
    <AppShell
      title="今どう動くか"
      description="現在地・予定・天気から、今のおすすめをすぐ確認できます。"
    >
      <div className="space-y-4">
        <SectionCard
          title="現在の状況"
          action={<StatusPill label={mockWeather.label} tone="blue" />}
        >
          <div className="space-y-2">
            <p className="text-sm text-slate-600">現在地: 八王子駅付近（ダミー表示）</p>
            <p className="text-sm text-slate-600">気温: {mockWeather.temperatureText}</p>
            <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-800">
              {mockWeather.note}
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
          <div className="space-y-2">
            <p className="text-base font-semibold text-slate-900">{nextTask.title}</p>
            <p className="text-sm text-slate-600">
              {nextTask.startTime} / {nextTask.destinationName}
            </p>
            <p className="text-sm text-slate-600">カテゴリ: {nextTask.category}</p>
            {nextTask.memo ? (
              <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {nextTask.memo}
              </div>
            ) : null}
          </div>
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
            <p>・雨なので駅直結または徒歩5分以内の候補を優先</p>
            <p>・昼食予定のため、混雑しすぎないランチ候補を提案</p>
            <p>・余裕があるならカフェ候補も確認</p>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
