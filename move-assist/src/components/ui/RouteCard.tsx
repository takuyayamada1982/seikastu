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
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-xl neon-blue">
                {routeIcon(route.type)}
              </div>
              <div>
                <p className="text-xl font-bold text-white">{route.type}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {badge ? <StatusPill label={badge} tone="slate" /> : null}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-cyan-50/72">{route.reason}</p>
          </div>

          <StatusPill label={route.scoreLabel} tone={pillTone} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3 text-center">
            <p className="text-[11px] tracking-wide text-cyan-100/50">時間</p>
            <p className="mt-1 text-base font-semibold text-cyan-50">{route.durationText}</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3 text-center">
            <p className="text-[11px] tracking-wide text-cyan-100/50">金額目安</p>
            <p className="mt-1 text-base font-semibold text-cyan-50">{route.costText}</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3 text-center">
            <p className="text-[11px] tracking-wide text-cyan-100/50">徒歩負荷</p>
            <p className="mt-1 text-base font-semibold text-cyan-50">{route.walkingLevel}</p>
          </div>
        </div>

        <button className="mt-4 w-full rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/25 via-sky-500/20 to-fuchsia-500/18 px-4 py-3 text-sm font-semibold text-cyan-50 shadow-[0_0_20px_rgba(34,211,238,0.16)]">
          このルートを選択
        </button>

        {route.caution ? (
          <div className="mt-4 rounded-2xl border border-amber-400/16 bg-amber-400/8 px-3 py-3 text-sm text-amber-200">
            ⚠ {route.caution}
          </div>
        ) : null}
      </div>
    </div>
  );
}
