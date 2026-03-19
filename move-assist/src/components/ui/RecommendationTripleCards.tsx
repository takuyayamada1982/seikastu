import type { RouteOption } from "@/lib/types";

type Props = {
  routes: RouteOption[];
  fastestId: string;
  cheapestId: string;
  easiestId: string;
};

function titleForRoute(route: RouteOption, fastestId: string, cheapestId: string, easiestId: string) {
  if (route.id === fastestId) return "最短";
  if (route.id === cheapestId) return "最安";
  if (route.id === easiestId) return "負担少";
  return "候補";
}

function iconForRoute(type: string) {
  switch (type) {
    case "公共交通":
      return "🚆";
    case "タクシー":
      return "🚕";
    case "徒歩":
      return "🚶";
    case "自転車":
      return "🚲";
    case "車":
      return "🚗";
    default:
      return "➜";
  }
}

export default function RecommendationTripleCards({
  routes,
  fastestId,
  cheapestId,
  easiestId,
}: Props) {
  return (
    <section className="cyber-panel cyber-outline rounded-[28px] p-4">
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white neon-text">おすすめの移動</h2>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/70">
            Top 3
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {routes.slice(0, 3).map((route) => (
            <div
              key={route.id}
              className="rounded-[24px] border border-cyan-400/12 bg-slate-950/55 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-2xl">{iconForRoute(route.type)}</div>
                <div className="rounded-full border border-cyan-400/14 bg-cyan-400/10 px-2 py-1 text-[11px] font-semibold text-cyan-100">
                  {titleForRoute(route, fastestId, cheapestId, easiestId)}
                </div>
              </div>

              <p className="mt-3 text-lg font-semibold text-white">{route.type}</p>
              <p className="mt-3 text-2xl font-bold text-cyan-300">{route.durationText}</p>
              <p className="mt-1 text-sm text-cyan-50/72">{route.costText}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
