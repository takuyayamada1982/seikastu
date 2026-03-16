'use client';
import dynamic from 'next/dynamic';
import { useLocation } from '@/lib/hooks/useLocation';
import { useWeather } from '@/lib/hooks/useWeather';
import { useSchedules } from '@/lib/hooks/useSchedules';
import { useTransport } from '@/lib/hooks/useTransport';
import { useReverseGeocode } from '@/lib/hooks/useReverseGeocode';
import { WeatherCard } from '@/components/home/WeatherCard';
import { NextScheduleCard } from '@/components/home/NextScheduleCard';
import { TransportCard } from '@/components/transport/TransportCard';
import { formatMinutesUntil, getMinutesUntil } from '@/lib/utils/scoring';
import Link from 'next/link';

const MapView = dynamic(
  () => import('@/components/ui/MapView').then((m) => m.MapView),
  { ssr: false, loading: () => <div className="h-44 bg-gray-100 rounded-2xl animate-pulse" /> }
);

export default function HomePage() {
  const { location, error: locError, loading: locLoading, refresh } = useLocation();
  const { weather, error: weatherError, loading: weatherLoading } = useWeather(location);
  const { nextSchedule } = useSchedules();
  const { options: transportOptions, distanceKm, minutesUntilStart } = useTransport({
    origin: location,
    schedule: nextSchedule,
    weather,
  });
  const locationName = useReverseGeocode(location);

  const topOption = transportOptions[0];
  const departureIn =
    topOption && minutesUntilStart !== null
      ? minutesUntilStart - topOption.estimatedMinutes
      : null;

  return (
    <div className="px-4 pt-6 space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">MoveAssist</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {locLoading
              ? '📡 位置情報を取得中...'
              : locError
              ? `⚠️ ${locError}`
              : location
              ? `📍 ${locationName}`
              : '位置情報なし'}
          </p>
        </div>
        <button
          onClick={refresh}
          className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          aria-label="更新"
        >
          <span className="text-lg">🔄</span>
        </button>
      </div>

      {/* 天気 */}
      <WeatherCard weather={weather} loading={weatherLoading} error={weatherError} />

      {/* 次の予定 */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-700">次の予定</h2>
          <Link href="/schedules" className="text-xs text-blue-600">
            すべて見る →
          </Link>
        </div>
        <NextScheduleCard schedule={nextSchedule} />
      </section>

      {/* 地図：現在地〜目的地 */}
      {nextSchedule && (
        <section>
          <p className="text-xs text-gray-500 mb-1.5">
            ルートマップ
            {distanceKm !== null && (
              <span className="ml-2 text-gray-700 font-medium">
                直線距離 約{distanceKm.toFixed(1)} km
              </span>
            )}
          </p>
          <MapView
            origin={location}
            destination={nextSchedule.destination}
            height="176px"
          />
        </section>
      )}

      {/* 出発目安バナー */}
      {nextSchedule && topOption && departureIn !== null && minutesUntilStart !== null && minutesUntilStart > 0 && (
        <div
          className={`rounded-2xl p-4 ${
            departureIn < 5
              ? 'bg-red-50 border border-red-200'
              : departureIn < 15
              ? 'bg-amber-50 border border-amber-200'
              : 'bg-blue-50 border border-blue-100'
          }`}
        >
          <p
            className={`text-sm font-bold ${
              departureIn < 5 ? 'text-red-700' : departureIn < 15 ? 'text-amber-700' : 'text-blue-700'
            }`}
          >
            {departureIn < 0
              ? '🚨 今すぐ出発してください！'
              : departureIn < 5
              ? '🚨 まもなく出発時間です！'
              : `🕐 出発目安：${formatMinutesUntil(departureIn)}`}
          </p>
          <p
            className={`text-xs mt-1 ${
              departureIn < 5 ? 'text-red-600' : departureIn < 15 ? 'text-amber-600' : 'text-blue-600'
            }`}
          >
            {nextSchedule.destination.name} まで約 {topOption.estimatedMinutes} 分
          </p>
        </div>
      )}

      {/* おすすめ移動手段 */}
      {topOption && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-700">おすすめの移動手段</h2>
            <Link href="/compare" className="text-xs text-blue-600">
              全候補を比較 →
            </Link>
          </div>
          <TransportCard option={topOption} rank={0} />
        </section>
      )}

      {/* 周辺候補への導線 */}
      <Link href="/nearby" className="block">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform">
          <div>
            <p className="font-medium text-gray-900">到着後の周辺スポット</p>
            <p className="text-xs text-gray-500 mt-0.5">ランチ・カフェ・コンビニを確認</p>
          </div>
          <span className="text-2xl">📍</span>
        </div>
      </Link>
    </div>
  );
}
