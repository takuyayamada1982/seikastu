type Props = {
  fromLabel?: string;
  toLabel?: string;
  durationText?: string;
};

export default function CyberRouteMap({
  fromLabel = "現在地",
  toLabel = "目的地",
  durationText = "推定 22分",
}: Props) {
  return (
    <div className="cyber-panel grid-bg cyber-outline relative overflow-hidden rounded-[30px] p-4">
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/70">
              Navigation View
            </p>
            <p className="mt-1 text-base font-semibold text-white">現在地から目的地まで</p>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200 neon-blue">
            {durationText}
          </div>
        </div>

        <div className="relative h-[320px] rounded-[24px] border border-cyan-400/10 bg-slate-950/55">
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="absolute left-[14%] top-[74%] z-20">
            <div className="absolute inset-0 m-auto h-8 w-8 rounded-full border border-cyan-300/30 animate-ring" />
            <div className="absolute inset-0 m-auto h-12 w-12 rounded-full border border-cyan-400/15 animate-ring [animation-delay:0.45s]" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.8)] animate-dot">
              ●
            </div>
            <div className="mt-2 rounded-xl border border-cyan-400/15 bg-slate-950/80 px-2 py-1 text-xs font-medium text-cyan-100">
              {fromLabel}
            </div>
          </div>

          <div className="absolute right-[12%] top-[16%] z-20">
            <div className="absolute inset-0 m-auto h-8 w-8 rounded-full border border-fuchsia-300/30 animate-ring" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-500 text-white shadow-[0_0_18px_rgba(217,70,239,0.72)] animate-dot">
              ●
            </div>
            <div className="mt-2 rounded-xl border border-fuchsia-400/20 bg-slate-950/80 px-2 py-1 text-xs font-medium text-fuchsia-100">
              {toLabel}
            </div>
          </div>

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M14,76 C24,73 28,68 34,62 C41,56 43,50 49,44 C55,38 58,33 65,28 C73,22 79,18 88,16"
              fill="none"
              stroke="rgba(34,211,238,0.96)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="1.8 3.3"
              className="animate-route"
            />
          </svg>

          <div className="absolute left-[45%] top-[46%] rounded-2xl border border-cyan-400/16 bg-slate-950/90 px-3 py-2 text-xs font-semibold text-cyan-100 neon-blue">
            約 {durationText}
          </div>

          <div className="absolute bottom-3 left-3 rounded-xl border border-emerald-400/18 bg-emerald-400/8 px-3 py-2 text-xs text-emerald-200">
            ● ルート探索完了・候補を表示中
          </div>
        </div>
      </div>
    </div>
  );
}
