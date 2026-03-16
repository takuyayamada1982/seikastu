'use client';
import { useState, useEffect } from 'react';
import type { NearbyPlace, Location } from '@/types';
import { fetchNearbyPlaces } from '@/lib/utils/overpass';
import { DUMMY_NEARBY_PLACES } from '@/lib/constants/dummy';

interface UseNearbyPlacesResult {
  places: NearbyPlace[];
  loading: boolean;
  error: string | null;
  isReal: boolean; // true = OSMから取得, false = ダミー
}

export function useNearbyPlaces(location: Location | null): UseNearbyPlacesResult {
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isReal, setIsReal] = useState(false);

  useEffect(() => {
    if (!location) {
      setPlaces(DUMMY_NEARBY_PLACES);
      setIsReal(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchNearbyPlaces(location.lat, location.lng)
      .then((result) => {
        if (cancelled) return;
        if (result.length > 0) {
          setPlaces(result);
          setIsReal(true);
        } else {
          // 結果0件はダミーにフォールバック
          setPlaces(DUMMY_NEARBY_PLACES);
          setIsReal(false);
        }
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message ?? '周辺情報の取得に失敗しました');
        setPlaces(DUMMY_NEARBY_PLACES);
        setIsReal(false);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [location?.lat, location?.lng]);

  return { places, loading, error, isReal };
}
