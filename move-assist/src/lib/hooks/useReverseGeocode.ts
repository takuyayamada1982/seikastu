'use client';
import { useState, useEffect } from 'react';
import type { Location } from '@/types';
import { reverseGeocode } from '@/lib/utils/reverseGeocode';

export function useReverseGeocode(location: Location | null): string {
  const [address, setAddress] = useState('現在地');

  useEffect(() => {
    if (!location) return;
    let cancelled = false;

    reverseGeocode(location.lat, location.lng)
      .then((addr) => { if (!cancelled) setAddress(addr); })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [location?.lat, location?.lng]);

  return address;
}
