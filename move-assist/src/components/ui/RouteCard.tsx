import StatusPill from "@/components/ui/StatusPill";
import type { RouteOption } from "@/lib/types";

type RouteCardProps = {
  route: RouteOption;
};

export default function RouteCard({ route }: RouteCardProps) {
  const pillTone =
    route.scoreLabel === "おすすめ"
      ? "blue"
      : route.scoreLabel === "候補"
      ? "green"
      : "amber";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-slate-900">{route.type}</p>
          <p className="mt-1 text-sm text-slate-600">{route.reason}</p>
        </div>
        <StatusPill label={route.scoreLabel} tone={pillTone} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-[11px] text-slate-500">時間</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {route.durationText}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-[11px] text-slate-500">金額目安</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {route.costText}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-[11px] text-slate-500">徒歩負荷</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {route.walkingLevel}
          </p>
        </div>
      </div>

      {route.caution ? (
        <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
          注意: {route.caution}
        </div>
      ) : null}
    </div>
  );
}
