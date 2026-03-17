import type { NearbyPlace, NearbyCategory } from '@/types';

interface OverpassElement {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

/**
 * OSM タグ → アプリ内カテゴリ変換
 */
function toCategory(tags: Record<string, string>): NearbyCategory | null {
  const amenity = tags.amenity ?? '';
  const shop = tags.shop ?? '';

  if (amenity === 'restaurant' || amenity === 'food_court') return 'lunch';
  if (amenity === 'cafe') return 'cafe';
  if (amenity === 'convenience' || shop === 'convenience') return 'convenience';
  if (amenity === 'fast_food') return 'lunch';
  if (amenity === 'bench' || amenity === 'shelter' || amenity === 'waiting_area') return 'rest';
  if (shop === 'supermarket' || shop === 'grocery') return 'lunch';
  return null;
}

/**
 * 表示名を日本語優先で取得
 */
function getName(tags: Record<string, string>): string {
  return (
    tags['name:ja'] ??
    tags['name'] ??
    tags['brand'] ??
    '名称未設定'
  );
}

/**
 * カテゴリ別の説明文
 */
function getDescription(category: NearbyCategory, tags: Record<string, string>): string {
  const cuisine = tags.cuisine ? `料理: ${tags.cuisine}` : '';
  switch (category) {
    case 'lunch': return cuisine || 'ランチ・食事に';
    case 'cafe': return '休憩・作業に';
    case 'convenience': return '飲み物・軽食に';
    case 'rest': return '待ち時間に';
    default: return '';
  }
}

/**
 * 2点間の距離計算 (m)
 */
function distanceM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

/**
 * Overpass QL クエリを組み立て
 * amenity: restaurant, cafe, convenience, fast_food
 * shop: convenience, supermarket
 */
function buildQuery(lat: number, lng: number, radiusM: number): string {
  const filters = [
    'node[amenity=restaurant]',
    'node[amenity=cafe]',
    'node[amenity=fast_food]',
    'node[amenity=convenience]',
    'node[shop=convenience]',
    'way[amenity=restaurant]',
    'way[amenity=cafe]',
    'way[amenity=fast_food]',
    'way[shop=convenience]',
  ]
    .map((f) => `${f}(around:${radiusM},${lat},${lng});`)
    .join('\n');

  return `[out:json][timeout:10];\n(\n${filters}\n);\nout center tags 30;`;
}

export async function fetchNearbyPlaces(
  lat: number,
  lng: number,
  radiusM = 600
): Promise<NearbyPlace[]> {
  const query = buildQuery(lat, lng, radiusM);
  const encoded = encodeURIComponent(query);
  const url = `https://overpass-api.de/api/interpreter?data=${encoded}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!res.ok) throw new Error('周辺情報の取得に失敗しました');

  const data = await res.json();
  const elements: OverpassElement[] = data.elements ?? [];

  const places: NearbyPlace[] = [];

  for (const el of elements) {
    const tags = el.tags ?? {};
    const category = toCategory(tags);
    if (!category) continue;

    const elLat = el.lat ?? el.center?.lat;
    const elLng = el.lon ?? el.center?.lon;
    if (!elLat || !elLng) continue;

    const distance = distanceM(lat, lng, elLat, elLng);
    const walkMinutes = Math.max(1, Math.round(distance / 67)); // 80m/min

    places.push({
      id: `osm-${el.id}`,
      name: getName(tags),
      category,
      distance,
      walkMinutes,
      description: getDescription(category, tags),
      lat: elLat,
      lng: elLng,
    });
  }

  // 距離順ソート・重複名を除去
  const seen = new Set<string>();
  return places
    .sort((a, b) => a.distance - b.distance)
    .filter((p) => {
      if (seen.has(p.name)) return false;
      seen.add(p.name);
      return true;
    })
    .slice(0, 25);
}
