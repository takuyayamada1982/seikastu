'use client';
import dynamic from 'next/dynamic';
import { useLocation } from '@/lib/hooks/useLocation';
import { useWeather } from '@/lib/hooks/useWeather';
import { useSchedules } from '@/lib/hooks/useSchedules';
import { useTransport } from '@/lib/hooks/useTransport';
import { TransportCard } from '@/components/transport/TransportCard';
import { WeatherCard } from '@/components/home/WeatherCard';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/types';
import { formatTime, formatMinutesUntil, getMinutesUntil } from '@/lib/utils/scoring';
import { buildMapUrl } from '@/lib/utils/geocoding';

const MapView = dynamic(
  () => import('@/components/ui/MapView').then((m) => m.MapView),
  { ssr: false, loading: () => <div className="h-44 bg-gray-100 rounded-2xl animate-pulse" /> }
);

export default function ComparePage() {
  const { location } = useLocation();
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(location);
  const { nextSchedule } = useSchedules();
  const { options: transportOptions, distanceKm } = useTransport({
    origin: location,
    schedule: nextSchedule,
    weather,
  });

  return (
    <div className="px-4 pt-6 pb-8 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">移動手段を比較</h1>

      {/* 天気サマリ */}
      <WeatherCard weather={weather} loading={weatherLoading} error={weatherError} />

      {/* ルートマップ */}
      {nextSchedule && (
        <section>
          <p className="text-xs text-gray-500 mb-1.5">
            ルートマップ
            {distanceKm !== null && (
              <span className="ml-2 font-medium text-gray-700">
                直線距離 約{distanceKm.toFixed(1)} km
              </span>
            )}
          </p>
          <MapView origin={location} destination={nextSchedule.destination} height="176px" />
        </section>
      )}

      {/* 対象予定 */}
      {nextSchedule ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-3 flex items-center gap-3">
          <span className="text-xl">{CATEGORY_ICONS[nextSchedule.category]}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">比較対象の予定</p>
            <p className="font-semibold text-gray-900 truncate">{nextSchedule.title}</p>
            <p className="text-xs text-gray-500 truncate">📍 {nextSchedule.destination.name}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-bold">{formatTime(nextSchedule.startTime)}</p>
            <p className="text-xs text-gray-500">
              {formatMinutesUntil(getMinutesUntil(nextSchedule.startTime))}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-500 text-center">
          予定を登録するとより精度の高い比較ができます
        </div>
      )}

      {/* 外部アプリリンク群 */}
      {nextSchedule && location && (
        <div>
          <p className="text-xs text-gray-500 mb-2">外部アプリで詳細を確認</p>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { mode: 'transit', label: '公共交通', mapMode: 'transit' },
                { mode: 'walking', label: '徒歩', mapMode: 'walking' },
                { mode: 'bicycling', label: '自転車', mapMode: 'bicycling' },
                { mode: 'driving', label: '車/タクシー', mapMode: 'driving' },
              ] as const
            ).map(({ mode, label, mapMode }) => (
              <a
                key={mode}
                href={buildMapUrl(location, nextSchedule.destination, mapMode)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2 text-sm font-medium text-gray-700 active:bg-gray-50 transition-colors"
              >
                <span className="text-lg">
                  {mode === 'transit' ? '🚌' : mode === 'walking' ? '🚶' : mode === 'bicycling' ? '🚲' : '🚗'}
                </span>
                {label}
                <span className="ml-auto text-gray-400 text-xs">→</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 候補スコアカード一覧 */}
      <section>
        <p className="text-xs text-gray-500 mb-3">
          おすすめ順に表示 ·
          スコアは天気・時間・予定カテゴリに基づいて算出
        </p>
        <div className="space-y-3">
          {transportOptions.map((option, i) => (
            <TransportCard key={option.mode} option={option} rank={i} />
          ))}
        </div>
      </section>

      <p className="text-xs text-gray-400 text-center pb-2">
        所要時間・料金は目安です。実際の交通状況によって異なります。
      </p>
    </div>
  );
}
