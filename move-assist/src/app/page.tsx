import AppShell from "@/components/ui/AppShell";
import SectionCard from "@/components/ui/SectionCard";
import StatusPill from "@/components/ui/StatusPill";

export default function HomePage() {
  return (
    <AppShell
      title="今どう動くか"
      description="現在地・予定・天気から、今のおすすめを確認するアプリです。"
    >
      <div className="space-y-4">
        <SectionCard
          title="現在の状況"
          action={<StatusPill label="準備中" tone="blue" />}
        >
          <div className="space-y-2 text-sm text-slate-700">
            <p>現在地、天気、予定の連携は次の手順で追加します。</p>
            <p>まずは土台を安定させます。</p>
          </div>
        </SectionCard>

        <SectionCard title="次の予定">
          <p className="text-sm text-slate-700">
            予定一覧と保存機能は次の手順で追加します。
          </p>
        </SectionCard>

        <SectionCard title="移動比較">
          <p className="text-sm text-slate-700">
            比較画面は次の手順で追加します。
          </p>
        </SectionCard>
      </div>
    </AppShell>
  );
}
