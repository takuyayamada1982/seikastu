import type { Schedule } from '@/types';

const SCHEDULES_KEY = 'move_assist_schedules';

export function loadSchedules(): Schedule[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SCHEDULES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Schedule[];
  } catch {
    return [];
  }
}

export function saveSchedules(schedules: Schedule[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
}

export function addSchedule(schedule: Schedule): Schedule[] {
  const schedules = loadSchedules();
  const updated = [...schedules, schedule];
  saveSchedules(updated);
  return updated;
}

export function deleteSchedule(id: string): Schedule[] {
  const schedules = loadSchedules();
  const updated = schedules.filter((s) => s.id !== id);
  saveSchedules(updated);
  return updated;
}

export function generateId(): string {
  return `sch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
