'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useSchedules } from '@/lib/hooks/useSchedules';
import { CATEGORY_LABELS, CATEGORY_ICONS, type ScheduleCategory } from '@/types';
import { AddressSearchInput } from '@/components/ui/AddressSearchInput';
import type { GeocodingResult } from '@/lib/utils/geocoding';
import type { Location } from '@/types';

const MapView = dynamic(
  () => import('@/components/ui/MapView').then((m) => m.MapView),
  { ssr: false, loading: () => <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" /> }
);

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ScheduleCategory[];

function toLocalDatetimeValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function NewSchedulePage() {
  const router = useRouter();
  const { addSchedule } = useSchedules();
  const defaultTime = new Date(Date.now() + 60 * 60 * 1000);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ScheduleCategory>('meeting');
  const [startTime, setStartTime] = useState(toLocalDatetimeValue(defaultTime));
  const [destQuery, setDestQuery] = useState('');
  const [selectedDest, setSelectedDest] = useState<GeocodingResult | null>(null);
  const [memo, setMemo] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = '予定名を入力してください';
    if (!selectedDest) e.dest = '候補から目的地を選択してください';
    if (!startTime) e.startTime = '時刻を入力してください';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addSchedule({
      title: title.trim(),
      category,
      startTime: new Date(startTime).toISOString(),
      destination: {
        lat: selectedDest!.lat,
        lng: selectedDest!.lng,
        name: selectedDest!.name,
        address: selectedDest!.address,
      },
      memo: memo.trim() || undefined,
    });
    router.push('/schedules');
  };

  const destLocation: Location | null = selectedDest
    ? { lat: selectedDest.lat, lng: selectedDest.lng, name: selectedDest.name }
    : null;

  return (
    <div className="px-4 pt-6 pb-10">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-lg shadow-sm active:scale-95"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-gray-900">予定を追加</h1>
      </div>

      <div className="space-y-5">
        {/* 予定名 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            予定名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例：田中さんと打ち合わせ"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* カテゴリ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">カテゴリ</label>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs font-medium transition-colors active:scale-95 ${
                  category === cat
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                <span className="text-xl">{CATEGORY_ICONS[cat]}</span>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* 日時 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            日時 <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {errors.startTime && <p className="text-xs text-red-500 mt-1">{errors.startTime}</p>}
        </div>

        {/* 目的地検索 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            目的地 <span className="text-red-500">*</span>
          </label>
          <AddressSearchInput
            value={destQuery}
            onChange={(v) => {
              setDestQuery(v);
              if (selectedDest && v !== selectedDest.name) setSelectedDest(null);
            }}
            onSelect={(result) => {
              setSelectedDest(result);
              setDestQuery(result.name);
            }}
            error={errors.dest}
          />
          {selectedDest && (
            <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
              <span>✓</span>
              <span className="truncate">{selectedDest.address}</span>
            </p>
          )}
        </div>

        {/* 地図プレビュー */}
        {destLocation && (
          <div>
            <p className="text-xs text-gray-500 mb-1.5">目的地プレビュー</p>
            <MapView origin={null} destination={destLocation} height="160px" />
          </div>
        )}

        {/* メモ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            メモ{' '}
            <span className="text-gray-400 font-normal text-xs">（任意）</span>
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="例：資料を忘れずに"
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl text-base shadow-sm active:scale-[0.98] transition-transform"
        >
          予定を保存する
        </button>
      </div>
    </div>
  );
}
