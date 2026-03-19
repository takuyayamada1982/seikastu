type Props = {
  stateLabel: "休憩中" | "出発準備" | "移動中" | "到着済み" | "予定なし";
  subLabel: string;
};

function stateMeta(stateLabel: Props["stateLabel"]) {
  switch (stateLabel) {
    case "休憩中":
      return { icon: "☕", tone: "text-cyan-200", glow: "neon-blue" };
    case "出発準備":
      return { icon: "🧭", tone: "text-emerald-300", glow: "neon-blue" };
    case "移動中":
      return { icon: "🚆", tone: "text-fuchsia-300", glow: "neon-purple" };
    case "到着済み":
      return { icon: "✅", tone: "text-emerald-300", glow: "neon-blue" };
    default:
      return { icon: "•", tone: "text-cyan-100", glow: "neon-blue" };
  }
}

export default function CurrentStateBanner({ stateLabel, subLabel }: Props) {
  const meta = stateMeta(stateLabel);

  return (
    <section className="cyber-panel cyber-outline rounded-[28px] p-4">
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-xl ${meta.glow}`}
          >
            {meta.icon}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/70">
              Current State
            </p>
            <p className={`mt-1 text-lg font-bold ${meta.tone}`}>{stateLabel}</p>
            <p className="mt-1 text-sm text-cyan-50/68">{subLabel}</p>
          </div>
        </div>

        <div className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          LIVE
        </div>
      </div>
    </section>
  );
}
