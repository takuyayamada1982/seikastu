"use client";

import { useEffect, useMemo, useState } from "react";
import type { TaskItem } from "@/lib/types";
import { addSchedule, loadSchedules } from "@/lib/storage/schedules";

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function useSchedules() {
  const [schedules, setSchedules] = useState<TaskItem[]>([]);

  useEffect(() => {
    setSchedules(loadSchedules());
  }, []);

  const nextSchedule = useMemo(() => {
    if (schedules.length === 0) return null;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const sorted = [...schedules].sort((a, b) => {
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });

    return (
      sorted.find((item) => timeToMinutes(item.startTime) >= currentMinutes) ?? sorted[0]
    );
  }, [schedules]);

  const createSchedule = (item: TaskItem) => {
    const next = addSchedule(item);
    setSchedules(next);
  };

  return {
    schedules,
    nextSchedule,
    createSchedule,
    setSchedules,
  };
}
