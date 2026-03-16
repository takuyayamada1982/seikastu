'use client';
import { useMemo } from 'react';
import type { Location, Schedule, WeatherData, TransportOption } from '@/types';
import { calcDistanceKm } from '@/lib/utils/geocoding';
import { scoreTransportOptions, getMinutesUntil } from '@/lib/utils/scoring';
import { DUMMY_TRANSPORT_OPTIONS } from '@/lib/constants/dummy';

interface UseTransportOptions {
  origin: Location | null;
  schedule: Schedule | null;
  weather: WeatherData | null;
}

interface UseTransportResult {
  options: TransportOption[];
  distanceKm: number | null;
  minutesUntilStart: number | null;
}

export function useTransport({ origin, schedule, weather }: UseTransportOptions): UseTransportResult {
  return useMemo(() => {
    if (!schedule) {
      return { options: DUMMY_TRANSPORT_OPTIONS, distanceKm: null, minutesUntilStart: null };
    }

    const minutesUntilStart = getMinutesUntil(schedule.startTime);

    if (!origin) {
      // 現在地未取得 → デフォルト距離でスコアリング
      const opts = scoreTransportOptions({
        distanceKm: 4.5,
        minutesUntilStart,
        weather,
        category: schedule.category,
      });
      return { options: opts, distanceKm: null, minutesUntilStart };
    }

    const distanceKm = calcDistanceKm(
      origin.lat, origin.lng,
      schedule.destination.lat, schedule.destination.lng
    );

    const options = scoreTransportOptions({
      distanceKm,
      minutesUntilStart,
      weather,
      category: schedule.category,
    });

    return { options, distanceKm, minutesUntilStart };
  }, [
    origin?.lat, origin?.lng,
    schedule?.id, schedule?.startTime,
    weather?.weatherCode, weather?.temperature,
  ]);
}
