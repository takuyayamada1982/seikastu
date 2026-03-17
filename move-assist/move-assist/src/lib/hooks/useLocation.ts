'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Location } from '@/types';

interface UseLocationResult {
  location: Location | null;
  error: string | null;
  loading: boolean;
  refresh: () => void;
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('このブラウザは位置情報に対応していません');
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          name: '現在地',
        });
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? '位置情報の権限がありません'
            : err.code === 2
            ? '位置情報を取得できませんでした'
            : '位置情報の取得がタイムアウトしました'
        );
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, error, loading, refresh: fetchLocation };
}
