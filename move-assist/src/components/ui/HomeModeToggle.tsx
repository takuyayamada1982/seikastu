"use client";

type HomeMode = "auto" | "home" | "outside";

type Props = {
  mode: HomeMode;
  onChange: (mode: HomeMode) => void;
};

const items: { key: HomeMode; label: string }[] = [
  { key: "auto", label: "自動" },
  { key: "home", label: "家" },
  { key: "outside", label: "外" },
];

export default function HomeModeToggle({ mode, onChange }: Props) {
  return (
    <div className="cyber-panel rounded-[24px] p-3">
      <div className="relative z-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/70">
          Break Mode
        </p>
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => {
            const active = item.key === mode;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onChange(item.key)}
                className={`rounded-[18px] px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? "cyber-btn text-cyan-50"
                    : "border border-cyan-400/10 bg-white/[0.03] text-cyan-100/65"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
