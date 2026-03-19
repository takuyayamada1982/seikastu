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
      title="到着後の提案"
      description="周辺候補も同じサイバートーンで表示します。"
    >
      <div className="space-y-4">
        {suggestions.map((item) => (
          <SectionCard
            key={item.id}
            title={item.title}
            action={<StatusPill label={item.type} tone="green" />}
          >
            <div className="space-y-2">
              <p className="text-sm text-cyan-50/78">{item.description}</p>
              <p className="text-sm text-cyan-200/55">{item.distanceText}</p>
            </div>
          </SectionCard>
        ))}
      </div>
    </AppShell>
  );
}
