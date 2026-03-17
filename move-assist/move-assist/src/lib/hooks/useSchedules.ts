'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Schedule } from '@/types';
import { loadSchedules, saveSchedules, generateId } from '@/lib/utils/storage';

interface ScheduleContextType {
  schedules: Schedule[];
  addSchedule: (data: Omit<Schedule, 'id' | 'createdAt'>) => void;
  deleteSchedule: (id: string) => void;
  nextSchedule: Schedule | null;
}

const ScheduleContext = createContext<ScheduleContextType | null>(null);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    setSchedules(loadSchedules());
  }, []);

  const addSchedule = useCallback((data: Omit<Schedule, 'id' | 'createdAt'>) => {
    const schedule: Schedule = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setSchedules((prev) => {
      const updated = [...prev, schedule];
      saveSchedules(updated);
      return updated;
    });
  }, []);

  const deleteSchedule = useCallback((id: string) => {
    setSchedules((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveSchedules(updated);
      return updated;
    });
  }, []);

  const now = Date.now();
  const nextSchedule =
    schedules
      .filter((s) => new Date(s.startTime).getTime() > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0] ?? null;

  return (
    <ScheduleContext.Provider value={{ schedules, addSchedule, deleteSchedule, nextSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedules() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useSchedules must be used within ScheduleProvider');
  return ctx;
}
