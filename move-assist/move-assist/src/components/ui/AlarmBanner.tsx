'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AlarmPayload {
  title: string;
  body: string;
  scheduleId: string;
}

export function AlarmBanner() {
  const router = useRouter();
  const [alarm, setAlarm] = useState<AlarmPayload | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<AlarmPayload>).detail;
      setAlarm(detail);
      // 8秒後に自動消去
      setTimeout(() => setAlarm(null), 8000);
    };
    window.addEventListener('move-assist:alarm', handler);
    return () => window.removeEventListener('move-assist:alarm', handler);
  }, []);

  if (!alarm) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-[9999] max-w-lg mx-auto animate-bounce-once">
      <div className="bg-red-600 text-white rounded-2xl shadow-2xl p-4 flex items-start gap-3">
        <span className="text-2xl shrink-0">🔔</span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-snug">{alarm.title}</p>
          <p className="text-xs text-red-100 mt-0.5">{alarm.body}</p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() => {
              router.push(`/schedules/${alarm.scheduleId}`);
              setAlarm(null);
            }}
            className="text-xs font-bold bg-white text-red-600 px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
          >
            確認
          </button>
          <button
            onClick={() => setAlarm(null)}
            className="text-xs text-red-200 px-3 py-1 rounded-lg"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
