'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Schedule } from '@/types';

const ALARM_KEY = 'move_assist_alarms';

interface AlarmConfig {
  scheduleId: string;
  minutesBefore: number; // 何分前に通知するか
  enabled: boolean;
}

function loadAlarms(): AlarmConfig[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(ALARM_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveAlarms(alarms: AlarmConfig[]): void {
  localStorage.setItem(ALARM_KEY, JSON.stringify(alarms));
}

export function useDepartureAlarm(schedules: Schedule[]) {
  const [alarms, setAlarms] = useState<AlarmConfig[]>([]);
  const [firedAlarms, setFiredAlarms] = useState<Set<string>>(new Set());

  // 初期ロード
  useEffect(() => {
    setAlarms(loadAlarms());
  }, []);

  // アラーム設定の更新
  const setAlarm = useCallback(
    (scheduleId: string, minutesBefore: number, enabled: boolean) => {
      setAlarms((prev) => {
        const filtered = prev.filter((a) => a.scheduleId !== scheduleId);
        const updated = enabled
          ? [...filtered, { scheduleId, minutesBefore, enabled }]
          : filtered;
        saveAlarms(updated);
        return updated;
      });
    },
    []
  );

  const getAlarm = useCallback(
    (scheduleId: string): AlarmConfig | null =>
      alarms.find((a) => a.scheduleId === scheduleId) ?? null,
    [alarms]
  );

  // 定期チェック（30秒ごと）
  useEffect(() => {
    const check = () => {
      const now = Date.now();
      for (const alarm of alarms) {
        if (!alarm.enabled) continue;
        const schedule = schedules.find((s) => s.id === alarm.scheduleId);
        if (!schedule) continue;

        const startMs = new Date(schedule.startTime).getTime();
        const alarmMs = startMs - alarm.minutesBefore * 60 * 1000;
        const key = `${alarm.scheduleId}-${alarm.minutesBefore}`;

        if (now >= alarmMs && now < alarmMs + 35000 && !firedAlarms.has(key)) {
          setFiredAlarms((prev) => new Set(prev).add(key));
          fireNotification(schedule, alarm.minutesBefore);
        }
      }
    };

    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [alarms, schedules, firedAlarms]);

  return { setAlarm, getAlarm };
}

function fireNotification(schedule: Schedule, minutesBefore: number) {
  const title =
    minutesBefore === 0
      ? `🚨 今すぐ出発！「${schedule.title}」`
      : `🔔 出発${minutesBefore}分前：「${schedule.title}」`;

  const body = `📍 ${schedule.destination.name} へ向かってください`;

  // Web Notifications API
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/icons/icon-192.png' });
    return;
  }

  // 権限未取得 → インアプリバナー（カスタムイベント）
  window.dispatchEvent(
    new CustomEvent('move-assist:alarm', { detail: { title, body, scheduleId: schedule.id } })
  );
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}
