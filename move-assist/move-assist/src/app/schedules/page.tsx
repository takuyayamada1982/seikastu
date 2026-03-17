'use client';
import Link from 'next/link';
import { useSchedules } from '@/lib/hooks/useSchedules';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/types';
import { formatTime, formatMinutesUntil, getMinutesUntil } from '@/lib/utils/scoring';

export default function SchedulesPage() {
  const { schedules, deleteSchedule } = useSchedules();

  const sorted = [...schedules].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">予定一覧</h1>
        <Link
          href="/schedules/new"
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm active:scale-95 transition-transform"
        >
          ＋ 追加
        </Link>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-gray-500 text-sm">予定がありません</p>
          <Link
            href="/schedules/new"
            className="mt-4 inline-block text-blue-600 text-sm font-medium"
          >
            最初の予定を追加する →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((schedule) => {
            const minutes = getMinutesUntil(schedule.startTime);
            const isPast = minutes < 0;
            return (
              <div key={schedule.id} className="relative">
                <Link href={`/schedules/${schedule.id}`} className="block">
                  <div
                    className={`bg-white rounded-2xl border p-4 shadow-sm active:scale-[0.98] transition-transform ${
                      isPast ? 'opacity-50 border-gray-100' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{CATEGORY_ICONS[schedule.category]}</span>
                          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                            {CATEGORY_LABELS[schedule.category]}
                          </span>
                          {isPast && (
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                              終了
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900 truncate">{schedule.title}</p>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          📍 {schedule.destination.name}
                        </p>
                        {schedule.memo && (
                          <p className="text-xs text-gray-400 mt-0.5 truncate">
                            📝 {schedule.memo}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-base font-bold text-gray-900">
                          {formatTime(schedule.startTime)}
                        </p>
                        {!isPast && (
                          <p
                            className={`text-xs font-medium mt-0.5 ${
                              minutes < 30
                                ? 'text-red-600'
                                : minutes < 60
                                ? 'text-amber-600'
                                : 'text-gray-500'
                            }`}
                          >
                            {formatMinutesUntil(minutes)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => deleteSchedule(schedule.id)}
                  className="absolute top-3 right-3 w-7 h-7 text-gray-300 hover:text-red-400 flex items-center justify-center text-lg active:scale-90 transition-transform"
                  aria-label="削除"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
