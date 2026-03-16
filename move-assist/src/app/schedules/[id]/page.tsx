'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSchedules } from '@/lib/hooks/useSchedules';
import { useLocation } from '@/lib/hooks/useLocation';
import { useWeather } from '@/lib/hooks/useWeather';
import { useTransport } from '@/lib/hooks/useTransport';
import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/types';
import { TransportCard } from '@/components/transport/TransportCard';
import { AlarmToggle } from '@/components/ui/AlarmToggle';
import { formatTime, formatMinutesUntil, getMinutesUntil } from '@/lib/utils/scoring';
import { buildMapUrl } from '@/lib/utils/geocoding';

const MapView = dynamic(
  () => import('@/components/ui/MapView').then((m) => m.MapView),
  { ssr: false, loading: () => <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" /> }
);

interface Props {
  params: Promise<{ id: string }>;
}

export default function ScheduleDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const { schedules, deleteSchedule } = useSchedules();
  const { location } = useLocation();
  const { weather } = useWeather(location);

  const schedule = schedules.find((s) => s.id === id);
  const { options: transportOptions, distanceKm } = useTransport({
    origin: location,
    schedule: schedule ?? null,
    weather,
  });

  if (!schedule) {
    return (
      <div className="px-4 pt-6 text-center">
        <p className="text-gray-500 mb-2">予定が見つかりませんでした</p>
        <Link href="/schedules" className="text-blue-600 text-sm">
          ← 一覧に戻る
        </Link>
      </div>
    );
  }

  const minutesUntil = getMinutesUntil(schedule.startTime);
  const topOption = transportOptions[0];
  const departureIn = topOption ? minutesUntil - topOption.estimatedMinutes : null;

  const handleDelete = () => {
    deleteSchedule(schedule.id);
    router.push('/schedules');
  };

  const mapUrl =
    location
      ? buildMapUrl(location, schedule.destination, 'transit')
      : `https://www.google.com/maps/search/?api=1&query=${schedule.destination.lat},${schedule.destination.lng}`;

  return (
    <div className="px-4 pt-6 pb-8 space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-lg shadow-sm"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 truncate">予定詳細</h1>
        <button
          onClick={handleDelete}
          className="text-xs text-red-500 font-medium px-3 py-1.5 border border-red-200 rounded-xl active:scale-95 transition-transform"
        >
          削除
        </button>
      </div>

      {/* 予定情報カード */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{CATEGORY_ICONS[schedule.category]}</span>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {CATEGORY_LABELS[schedule.category]}
          </span>
        </div>
        <h2 className="text-lg font-bold text-gray-900">{schedule.title}</h2>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span>🕐</span>
            <span>
              {formatTime(schedule.startTime)}
              <span
                className={`ml-2 text-xs font-medium ${
                  minutesUntil < 30
                    ? 'text-red-600'
                    : minutesUntil < 60
                    ? 'text-amber-600'
                    : 'text-gray-500'
                }`}
              >
                ({formatMinutesUntil(minutesUntil)})
              </span>
            </span>
          </div>
          <div className="flex items-start gap-2 text-gray-600">
            <span className="mt-0.5">📍</span>
            <div>
              <p>{schedule.destination.name}</p>
              {schedule.destination.address && (
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                  {schedule.destination.address}
                </p>
              )}
              {distanceKm !== null && (
                <p className="text-xs text-blue-600 mt-0.5">
                  現在地から直線約 {distanceKm.toFixed(1)} km
                </p>
              )}
            </div>
          </div>
          {schedule.memo && (
            <div className="flex items-start gap-2 text-gray-600">
              <span>📝</span>
              <p>{schedule.memo}</p>
            </div>
          )}
        </div>
      </div>

      {/* 地図 */}
      <section>
        <p className="text-xs text-gray-500 mb-1.5">ルートマップ</p>
        <MapView origin={location} destination={schedule.destination} height="160px" />
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block w-full text-center text-xs text-blue-600 font-medium bg-blue-50 rounded-xl py-2.5 active:bg-blue-100 transition-colors"
        >
          Google マップで開く →
        </a>
      </section>

      {/* 出発目安バナー */}
      {minutesUntil > 0 && topOption && departureIn !== null && (
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
              ? '🚨 今すぐ出発！'
              : departureIn < 5
              ? '🚨 まもなく出発時間！'
              : `🕐 出発目安：${formatMinutesUntil(departureIn)}`}
          </p>
          <p
            className={`text-xs mt-1 ${
              departureIn < 5 ? 'text-red-600' : departureIn < 15 ? 'text-amber-600' : 'text-blue-600'
            }`}
          >
            {schedule.destination.name} まで約 {topOption.estimatedMinutes} 分
          </p>
        </div>
      )}

      {/* 出発アラーム */}
      {minutesUntil > 0 && (
        <AlarmToggle schedule={schedule} schedules={schedules} />
      )}

      {/* おすすめ移動手段 */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-700">おすすめの移動手段</h3>
          <Link href="/compare" className="text-xs text-blue-600">
            すべて比較 →
          </Link>
        </div>
        <TransportCard option={transportOptions[0]} rank={0} />
      </section>

      {/* 周辺スポット導線 */}
      <Link href="/nearby" className="block">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform">
          <div>
            <p className="font-medium text-gray-900">到着後の周辺スポット</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {schedule.category === 'meeting'
                ? '待機カフェを探す'
                : schedule.category === 'lunch'
                ? 'ランチ候補を確認'
                : 'ランチ・カフェ・コンビニを確認'}
            </p>
          </div>
          <span className="text-2xl">📍</span>
        </div>
      </Link>
    </div>
  );
}
