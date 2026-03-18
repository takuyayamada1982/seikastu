import AppShell from "@/components/ui/AppShell";
import RouteCard from "@/components/ui/RouteCard";
import { mockRouteOptions } from "@/lib/data/mock";

export default function ComparePage() {
  return (
    <AppShell
      title="移動比較"
      description="候補を見比べて、今の状況に合う移動を選びます。"
    >
      <div className="space-y-4">
        {mockRouteOptions.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </AppShell>
  );
}
