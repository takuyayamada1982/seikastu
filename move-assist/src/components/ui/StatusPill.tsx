type Props = {
  label: string;
  tone?: "blue" | "green" | "amber" | "red" | "slate";
};

const toneClassMap: Record<NonNullable<Props["tone"]>, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
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
