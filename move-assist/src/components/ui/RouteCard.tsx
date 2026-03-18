import StatusPill from "@/components/ui/StatusPill";
import type { RouteOption } from "@/lib/types";

type RouteCardProps = {
  route: RouteOption;
  badge?: "最短" | "最安" | "負担少";
};

function routeIcon(type: string) {
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

export default function RouteCard({ route, badge }: RouteCardProps) {
  const pillTone =
    route.scoreLabel === "おすすめ"
      ? "blue"
      : route.scoreLabel === "候補"
      ? "green"
      : "amber";

  return (
    <div className="cyber-panel cyber-outline animate-float-soft rounded-[28px] p-4">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-xl neon-blue">
                {routeIcon(route.type)}
              </div>
              <div>
                <p className="text-base font-bold text-white">{route.type}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {badge ? <StatusPill label={badge} tone="slate" /> : null}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-cyan-50/70">{route.reason}</p>
          </div>

          <StatusPill label={route.scoreLabel} tone={pillTone} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3">
            <p className="text-[11px] tracking-wide text-cyan-100/55">時間</p>
            <p className="mt-1 text-sm font-semibold text-cyan-50">{route.durationText}</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3">
            <p className="text-[11px] tracking-wide text-cyan-100/55">金額目安</p>
            <p className="mt-1 text-sm font-semibold text-cyan-50">{route.costText}</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3">
            <p className="text-[11px] tracking-wide text-cyan-100/55">徒歩負荷</p>
            <p className="mt-1 text-sm font-semibold text-cyan-50">{route.walkingLevel}</p>
          </div>
        </div>

        {route.caution ? (
          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/8 px-3 py-3 text-sm text-amber-200">
            注意: {route.caution}
          </div>
        ) : null}
      </div>
    </div>
  );
}
