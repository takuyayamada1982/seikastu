'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSchedules } from '@/lib/hooks/useSchedules';
import { useLocation } from '@/lib/hooks/useLocation';
import { useNearbyPlaces } from '@/lib/hooks/useNearbyPlaces';
import { NearbyPlaceCard } from '@/components/nearby/NearbyPlaceCard';
import type { NearbyCategory } from '@/types';
import { cn } from '@/lib/utils/cn';

const MapView = dynamic(
  () => import('@/components/ui/MapView').then((m) => m.MapView),
  { ssr: false, loading: () => <div className="h-44 bg-gray-100 rounded-2xl animate-pulse" /> }
);

const FILTER_OPTIONS: { label: string; value: NearbyCategory | 'all' }[] = [
  { label: 'すべて', value: 'all' },
  { label: 'ランチ', value: 'lunch' },
  { label: 'カフェ', value: 'cafe' },
  { label: 'コンビニ', value: 'convenience' },
  { label: '休憩', value: 'rest' },
];

const NEARBY_ICONS: Record<NearbyCategory, string> = {
  lunch: '🍽',
  cafe: '☕',
  convenience: '🏪',
  rest: '🛋',
  other: '📌',
};

export default function NearbyPage() {
  const { nextSchedule } = useSchedules();
  const { location } = useLocation();
  const [filter, setFilter] = useState<NearbyCategory | 'all'>('all');

  // 目的地があれば目的地周辺、なければ現在地周辺
  const targetLocation = nextSchedule?.destination
    ? {
        lat: nextSchedule.destination.lat,
        lng: nextSchedule.destination.lng,
        name: nextSchedule.destination.name,
      }
    : location;

  const { places, loading, error, isReal } = useNearbyPlaces(targetLocation);

  const filtered =
    filter === 'all' ? places : places.filter((p) => p.category === filter);

  // カテゴリ別カウント
  const counts = places.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="px-4 pt-6 pb-8 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">周辺スポット</h1>

      {/* 目的地/現在地表示 */}
      {targetLocation ? (
        <div className="bg-blue-50 rounded-2xl p-3 border border-blue-100 flex items-center gap-2">
          <span className="text-base">📍</span>
          <div className="min-w-0">
            <p className="text-xs text-blue-600 font-medium">
              {nextSchedule ? '目的地周辺' : '現在地周辺'}
            </p>
            <p className="font-semibold text-blue-900 text-sm truncate">
              {targetLocation.name}
            </p>
          </div>
          {isReal && (
            <span className="ml-auto shrink-0 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
              ライブ
            </span>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-500 text-center">
          位置情報を許可すると周辺スポットが表示されます
        </div>
      )}

      {/* 地図（目的地 or 現在地） */}
      {targetLocation && (
        <MapView
          origin={location}
          destination={nextSchedule?.destination ?? null}
          height="176px"
        />
      )}

      {/* フィルタータブ */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {FILTER_OPTIONS.map(({ label, value }) => {
          const count = value === 'all' ? places.length : (counts[value] ?? 0);
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={cn(
                'shrink-0 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1.5',
                filter === value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200'
              )}
            >
              {value !== 'all' && (
                <span className="text-base leading-none">
                  {NEARBY_ICONS[value as NearbyCategory]}
                </span>
              )}
              {label}
              {count > 0 && (
                <span
                  className={cn(
                    'text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center',
                    filter === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-500'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ローディング */}
      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* エラー */}
      {!loading && error && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-sm text-amber-700">
          ⚠️ {error}（サンプルデータを表示中）
        </div>
      )}

      {/* スポット一覧 */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">
          このカテゴリのスポットは見つかりませんでした
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((place) => (
            <NearbyPlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}

      {!loading && !isReal && places.length > 0 && (
        <p className="text-xs text-gray-400 text-center">
          ※ サンプルデータを表示しています（位置情報を許可するとリアルデータに切り替わります）
        </p>
      )}
    </div>
  );
}
