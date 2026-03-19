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

const fieldClassName =
  "w-full rounded-[22px] border border-cyan-400/18 bg-slate-950/70 px-4 py-3 text-sm text-cyan-50 outline-none placeholder:text-cyan-100/35 shadow-[0_0_0_1px_rgba(34,211,238,0.04)] transition focus:border-cyan-300/45 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_0_18px_rgba(34,211,238,0.12)]";

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
        <div className="cyber-panel rounded-[28px] p-4">
          <div className="relative z-10">
            <label className="mb-2 block text-sm font-medium text-cyan-100/80">
              予定名
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 昼食 / 打ち合わせ"
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="cyber-panel rounded-[28px] p-4">
          <div className="relative z-10">
            <label className="mb-2 block text-sm font-medium text-cyan-100/80">
              カテゴリ
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className={fieldClassName}
            >
              {categories.map((item) => (
                <option key={item} value={item} className="bg-slate-950 text-cyan-50">
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="cyber-panel rounded-[28px] p-4">
          <div className="relative z-10">
            <label className="mb-2 block text-sm font-medium text-cyan-100/80">
              開始時刻
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="cyber-panel rounded-[28px] p-4">
          <div className="relative z-10">
            <label className="mb-2 block text-sm font-medium text-cyan-100/80">
              目的地
            </label>
            <input
              type="text"
              value={destinationName}
              onChange={(e) => setDestinationName(e.target.value)}
              placeholder="例: 新宿駅 / 丸の内オフィス"
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="cyber-panel rounded-[28px] p-4">
          <div className="relative z-10">
            <label className="mb-2 block text-sm font-medium text-cyan-100/80">
              メモ
            </label>
            <textarea
              rows={4}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="例: 10分前に着きたい / 駅近がよい"
              className={fieldClassName}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-[24px] border border-cyan-300/25 bg-gradient-to-r from-cyan-500/80 to-sky-500/80 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.28)]"
        >
          保存する
        </button>
      </form>
    </AppShell>
  );
}
