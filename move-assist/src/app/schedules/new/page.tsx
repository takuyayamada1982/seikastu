"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AppShell from "@/components/ui/AppShell";
import type { TaskCategory, TaskItem } from "@/lib/types";
import { useSchedules } from "@/lib/hooks/useSchedules";

const categories: TaskCategory[] = [
  "昼食",
  "カフェ",
  "会議",
  "通院",
  "買い物",
  "送迎",
  "手続き",
];

export default function ScheduleNewPage() {
  const router = useRouter();
  const { createSchedule } = useSchedules();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("会議");
  const [startTime, setStartTime] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !startTime || !destinationName) {
      alert("予定名・開始時刻・目的地を入力してください。");
      return;
    }

    const item: TaskItem = {
      id: crypto.randomUUID(),
      title,
      category,
      startTime,
      destinationName,
      memo: memo || undefined,
      createdAt: new Date().toISOString(),
    };

    createSchedule(item);
    router.push("/schedules");
  };

  return (
    <AppShell
      title="予定作成"
      description="予定を保存すると、ホームや比較画面に反映されます。"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">予定名</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例: 昼食 / 打ち合わせ"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">開始時刻</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">目的地</label>
          <input
            type="text"
            value={destinationName}
            onChange={(e) => setDestinationName(e.target.value)}
            placeholder="例: 新宿駅 / 丸の内オフィス"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">メモ</label>
          <textarea
            rows={4}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="例: 10分前に着きたい / 駅近がよい"
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm"
        >
          保存する
        </button>
      </form>
    </AppShell>
  );
}
