import React from 'react';
import Link from 'next/link';
import type { Schedule } from '@/types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/types';
import { formatTime, formatMinutesUntil, getMinutesUntil } from '@/lib/utils/scoring';

interface NextScheduleCardProps {
  schedule: Schedule | null;
}

export function NextScheduleCard({ schedule }: NextScheduleCardProps) {
  if (!schedule) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">予定がありません</p>
          <p className="text-xs text-gray-400 mt-0.5">タップして予定を追加</p>
        </div>
        <Link
          href="/schedules/new"
          className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-sm"
        >
          +
        </Link>
      </div>
    );
  }

  const minutes = getMinutesUntil(schedule.startTime);

  return (
    <Link href={`/schedules/${schedule.id}`} className="block">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm active:scale-[0.98] transition-transform">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{CATEGORY_ICONS[schedule.category]}</span>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {CATEGORY_LABELS[schedule.category]}
              </span>
            </div>
            <p className="font-semibold text-gray-900 truncate">{schedule.title}</p>
            <p className="text-xs text-gray-500 mt-1 truncate">
              📍 {schedule.destination.name}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-base font-bold text-gray-900">{formatTime(schedule.startTime)}</p>
            <p
              className={`text-xs font-medium mt-0.5 ${
                minutes < 30 ? 'text-red-600' : minutes < 60 ? 'text-amber-600' : 'text-gray-500'
              }`}
            >
              {formatMinutesUntil(minutes)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
