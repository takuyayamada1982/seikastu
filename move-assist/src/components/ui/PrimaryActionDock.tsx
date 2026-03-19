import Link from "next/link";

export default function PrimaryActionDock() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Link
        href="/compare"
        className="cyber-panel rounded-[24px] p-4 text-center transition hover:translate-y-[-1px]"
      >
        <p className="text-sm font-semibold text-cyan-50">ルート比較</p>
      </Link>

      <Link
        href="/nearby"
        className="cyber-panel rounded-[24px] p-4 text-center transition hover:translate-y-[-1px]"
      >
        <p className="text-sm font-semibold text-cyan-50">地図で確認</p>
      </Link>

      <Link
        href="/schedules"
        className="cyber-panel rounded-[24px] p-4 text-center transition hover:translate-y-[-1px]"
      >
        <p className="text-sm font-semibold text-cyan-50">到着後候補</p>
      </Link>
    </div>
  );
}
