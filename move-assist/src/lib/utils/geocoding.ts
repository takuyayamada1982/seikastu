import type { Location } from '@/types';

export interface GeocodingResult {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

export async function geocodeAddress(query: string): Promise<GeocodingResult[]> {
  const encoded = encodeURIComponent(query);
  const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&addressdetails=1&limit=5&accept-language=ja&countrycodes=jp`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'MoveAssist/1.0 (PWA mobility app)',
    },
  });

  if (!res.ok) throw new Error('住所の検索に失敗しました');

  const data = await res.json();

  return data.map((item: Record<string, unknown>) => ({
    lat: parseFloat(item.lat as string),
    lng: parseFloat(item.lon as string),
    name: (item.display_name as string).split(',')[0].trim(),
    address: item.display_name as string,
  }));
}

/**
 * Haversine formula: 2点間の直線距離(km)
 */
export function calcDistanceKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Google Maps / Apple Maps deep-link URLs
 */
export function buildMapUrl(
  origin: Location,
  destination: Location,
  mode: 'transit' | 'walking' | 'bicycling' | 'driving'
): string {
  const dest = `${destination.lat},${destination.lng}`;
  const orig = `${origin.lat},${origin.lng}`;
  return `https://www.google.com/maps/dir/?api=1&origin=${orig}&destination=${dest}&travelmode=${mode}`;
}
