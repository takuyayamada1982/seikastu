/**
 * 緯度経度 → 住所名（逆ジオコーディング）
 * Nominatim / OpenStreetMap（無料・APIキー不要）
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ja&zoom=16`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'MoveAssist/1.0' },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) return '現在地';

  const data = await res.json();
  const addr = data.address ?? {};

  // 日本語住所の組み立て（詳細度順に優先）
  const parts = [
    addr.neighbourhood,
    addr.suburb,
    addr.quarter,
    addr.city_district,
    addr.town ?? addr.city ?? addr.village ?? addr.municipality,
    addr.county ?? addr.state,
  ].filter(Boolean);

  if (parts.length === 0) return data.display_name?.split(',')[0] ?? '現在地';

  // 末尾2〜3要素を使う（例：「代々木上原・渋谷区」）
  return parts.slice(-3).join(' ');
}
