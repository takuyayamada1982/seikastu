import React from 'react';
import type { NearbyPlace, NearbyCategory } from '@/types';

const NEARBY_ICONS: Record<NearbyCategory, string> = {
  lunch: '🍽',
  cafe: '☕',
  convenience: '🏪',
  rest: '🛋',
  other: '📌',
};

const NEARBY_LABELS: Record<NearbyCategory, string> = {
  lunch: 'ランチ',
  cafe: 'カフェ',
  convenience: 'コンビニ',
  rest: '休憩',
  other: 'その他',
};

const CATEGORY_COLORS: Record<NearbyCategory, string> = {
  lunch: 'bg-orange-50 text-orange-700',
  cafe: 'bg-amber-50 text-amber-700',
  convenience: 'bg-blue-50 text-blue-700',
  rest: 'bg-green-50 text-green-700',
  other: 'bg-gray-50 text-gray-700',
};

interface NearbyPlaceCardProps {
  place: NearbyPlace;
}

export function NearbyPlaceCard({ place }: NearbyPlaceCardProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.lat},${place.lng}`;
  const appleUrl = `https://maps.apple.com/?q=${encodeURIComponent(place.name)}&ll=${place.lat},${place.lng}`;

  // 距離バー（最大600m想定）
  const barWidth = Math.min(100, Math.round((place.distance / 600) * 100));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* アイコン */}
          <div className="w-11 h-11 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
            {NEARBY_ICONS[place.category]}
          </div>

          {/* 情報 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[place.category]}`}
              >
                {NEARBY_LABELS[place.category]}
              </span>
            </div>
            <p className="font-semibold text-gray-900 text-sm truncate">{place.name}</p>
            {place.description && (
              <p className="text-xs text-gray-500 mt-0.5">{place.description}</p>
            )}
          </div>

          {/* 距離 */}
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-gray-800">
              {place.walkMinutes}分
            </p>
            <p className="text-xs text-gray-400">
              {place.distance >= 1000
                ? `${(place.distance / 1000).toFixed(1)}km`
                : `${place.distance}m`}
            </p>
          </div>
        </div>

        {/* 距離バー */}
        <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-400 rounded-full transition-all"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>

      {/* 地図リンクボタン群 */}
      <div className="border-t border-gray-100 grid grid-cols-2 divide-x divide-gray-100">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 text-center text-xs text-blue-600 font-medium active:bg-gray-50 transition-colors"
        >
          Google マップ
        </a>
        <a
          href={appleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 text-center text-xs text-blue-600 font-medium active:bg-gray-50 transition-colors"
        >
          Apple マップ
        </a>
      </div>
    </div>
  );
}
