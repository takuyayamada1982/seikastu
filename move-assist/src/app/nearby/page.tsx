import AppShell from "@/components/ui/AppShell";
import SectionCard from "@/components/ui/SectionCard";
import StatusPill from "@/components/ui/StatusPill";
import { mockNearbySuggestions } from "@/lib/data/mock";

export default function NearbyPage() {
  return (
    <AppShell
      title="到着後の候補"
      description="予定カテゴリに合わせて、近くで取りやすい行動候補を表示します。"
    >
      <div className="space-y-4">
        {mockNearbySuggestions.map((item) => (
          <SectionCard
            key={item.id}
            title={item.title}
            action={<StatusPill label={item.type} tone="green" />}
          >
            <div className="space-y-2">
              <p className="text-sm text-slate-700">{item.description}</p>
              <p className="text-sm text-slate-500">{item.distanceText}</p>
            </div>
          </SectionCard>
        ))}
      </div>
    </AppShell>
  );
}
