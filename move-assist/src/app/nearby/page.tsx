"use client";

import AppShell from "@/components/ui/AppShell";
import SectionCard from "@/components/ui/SectionCard";
import StatusPill from "@/components/ui/StatusPill";
import { buildNearbySuggestions } from "@/lib/data/mock";
import { useSchedules } from "@/lib/hooks/useSchedules";

export default function NearbyPage() {
  const { nextSchedule } = useSchedules();
  const category = nextSchedule?.category ?? "会議";
  const suggestions = buildNearbySuggestions(category);

  return (
    <AppShell
      title="到着後の候補"
      description="予定カテゴリに合わせて、近くで取りやすい行動候補を表示します。"
    >
      <div className="mb-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
        予定カテゴリ: {category}
      </div>

      <div className="space-y-4">
        {suggestions.map((item) => (
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
