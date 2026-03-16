'use client';
import { useState, useEffect } from 'react';
import type { WeatherData, Location } from '@/types';
import { fetchWeather } from '@/lib/utils/weather';

interface UseWeatherResult {
  weather: WeatherData | null;
  error: string | null;
  loading: boolean;
}

export function useWeather(location: Location | null): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    setError(null);
    fetchWeather(location.lat, location.lng)
      .then((w) => {
        setWeather(w);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message ?? '天気の取得に失敗しました');
        setLoading(false);
      });
  }, [location?.lat, location?.lng]);

  return { weather, error, loading };
}
