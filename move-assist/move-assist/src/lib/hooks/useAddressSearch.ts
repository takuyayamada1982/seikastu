'use client';
import { useState, useCallback, useRef } from 'react';
import { geocodeAddress, type GeocodingResult } from '@/lib/utils/geocoding';

interface UseAddressSearchResult {
  results: GeocodingResult[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
  clear: () => void;
}

export function useAddressSearch(): UseAddressSearchResult {
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((query: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await geocodeAddress(query);
        setResults(res);
      } catch (e) {
        setError((e as Error).message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 600); // 600ms debounce (Nominatim利用規約に配慮)
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, search, clear };
}
