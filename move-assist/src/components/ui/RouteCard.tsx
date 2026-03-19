type Props = {
  label: string;
  tone?: "blue" | "green" | "amber" | "red" | "slate";
};

const toneClassMap: Record<NonNullable<Props["tone"]>, string> = {
  blue: "border-cyan-400/18 bg-cyan-400/10 text-cyan-100 neon-blue",
  green: "border-emerald-400/18 bg-emerald-400/10 text-emerald-100",
  amber: "border-amber-400/18 bg-amber-400/10 text-amber-100",
  red: "border-rose-400/18 bg-rose-400/10 text-rose-100",
  slate: "border-cyan-400/12 bg-white/[0.04] text-cyan-50/90",
};

export default function StatusPill({ label, tone = "slate" }: Props) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${toneClassMap[tone]}`}
    >
      {label}
    </span>
  );
}
