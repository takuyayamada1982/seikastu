import AppShell from "@/components/ui/AppShell";

const categories = ["昼食", "カフェ", "会議", "通院", "買い物", "送迎", "手続き"];

export default function ScheduleNewPage() {
  return (
    <AppShell
      title="予定作成"
      description="まずは入力UIを固定し、後で保存機能をつなぎます。"
    >
      <form className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">予定名</label>
          <input
            type="text"
            placeholder="例: 昼食 / 打ち合わせ"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">カテゴリ</label>
          <select className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">開始時刻</label>
          <input
            type="time"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">目的地</label>
          <input
            type="text"
            placeholder="例: 新宿駅 / 丸の内オフィス"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">メモ</label>
          <textarea
            rows={4}
            placeholder="例: 10分前に着きたい / 駅近がよい"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm"
        >
          保存（次フェーズで接続）
        </button>
      </form>
    </AppShell>
  );
}
