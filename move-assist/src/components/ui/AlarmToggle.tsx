'use client';
import { useState } from 'react';
import { useDepartureAlarm, requestNotificationPermission } from '@/lib/hooks/useDepartureAlarm';
import type { Schedule } from '@/types';

const MINUTE_OPTIONS = [5, 10, 15, 20, 30] as const;

interface AlarmToggleProps {
  schedule: Schedule;
  schedules: Schedule[];
}

export function AlarmToggle({ schedule, schedules }: AlarmToggleProps) {
  const { setAlarm, getAlarm } = useDepartureAlarm(schedules);
  const current = getAlarm(schedule.id);
  const [selected, setSelected] = useState<number>(current?.minutesBefore ?? 15);
  const [enabled, setEnabled] = useState(current?.enabled ?? false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const handleToggle = async () => {
    if (!enabled) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        setPermissionDenied(true);
        // 通知拒否でもインアプリアラームは使えるので続行
      }
    }
    const next = !enabled;
    setEnabled(next);
    setAlarm(schedule.id, selected, next);
  };

  const handleChange = (min: number) => {
    setSelected(min);
    if (enabled) setAlarm(schedule.id, min, true);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-medium text-gray-900 text-sm">出発アラーム</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {enabled
              ? `出発 ${selected} 分前に通知します`
              : 'オフ'}
          </p>
        </div>
        {/* トグルスイッチ */}
        <button
          onClick={handleToggle}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            enabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
          aria-label="アラームのオン/オフ"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              enabled ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* 分数セレクター */}
      {enabled && (
        <div className="flex gap-2 flex-wrap">
          {MINUTE_OPTIONS.map((min) => (
            <button
              key={min}
              onClick={() => handleChange(min)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                selected === min
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              {min}分前
            </button>
          ))}
        </div>
      )}

      {permissionDenied && (
        <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
          <span>⚠️</span>
          通知が拒否されています。アプリ内バナーで通知します。
        </p>
      )}
    </div>
  );
}
