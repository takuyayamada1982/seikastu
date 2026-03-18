import type { TaskItem } from "@/lib/types";

const STORAGE_KEY = "move-assist:schedules";

export function loadSchedules(): TaskItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TaskItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSchedules(items: TaskItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addSchedule(item: TaskItem) {
  const items = loadSchedules();
  const next = [item, ...items];
  saveSchedules(next);
  return next;
}

export function findScheduleById(id: string): TaskItem | null {
  const items = loadSchedules();
  return items.find((item) => item.id === id) ?? null;
}
