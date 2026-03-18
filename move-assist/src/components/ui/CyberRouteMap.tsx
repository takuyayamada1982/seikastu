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
              Route Visual
            </p>
            <p className="mt-1 text-sm font-semibold text-white">現在地 → 目的地</p>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200 neon-blue">
            {durationText}
          </div>
        </div>

        <div className="relative h-[260px] rounded-[24px] border border-cyan-400/10 bg-slate-950/55">
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="absolute left-[18%] top-[72%] z-20">
            <div className="absolute inset-0 m-auto h-8 w-8 rounded-full border border-cyan-300/30 animate-ring" />
            <div className="absolute inset-0 m-auto h-12 w-12 rounded-full border border-cyan-400/15 animate-ring [animation-delay:0.45s]" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.8)] animate-dot">
              ●
            </div>
            <div className="mt-2 rounded-xl border border-cyan-400/15 bg-slate-950/80 px-2 py-1 text-xs font-medium text-cyan-100">
              {fromLabel}
            </div>
          </div>

          <div className="absolute right-[14%] top-[18%] z-20">
            <div className="absolute inset-0 m-auto h-8 w-8 rounded-full border border-fuchsia-300/30 animate-ring" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-500 text-white shadow-[0_0_18px_rgba(217,70,239,0.7)] animate-dot">
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
              d="M18,74 C30,70 32,60 42,54 C51,49 50,38 60,33 C72,27 75,23 86,20"
              fill="none"
              stroke="rgba(34,211,238,0.95)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray="1.8 3.2"
              className="animate-route"
            />
          </svg>

          <div className="absolute left-[46%] top-[45%] rounded-2xl border border-cyan-400/15 bg-slate-950/85 px-3 py-2 text-xs font-semibold text-cyan-100 neon-blue">
            {durationText}
          </div>

          <div className="absolute bottom-3 left-3 rounded-xl border border-cyan-400/10 bg-slate-950/75 px-3 py-2 text-xs text-cyan-100/80">
            点線ルートは候補移動を示しています
          </div>
        </div>
      </div>
    </div>
  );
}
