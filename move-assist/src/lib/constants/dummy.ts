import type { Schedule, TransportOption, NearbyPlace, WeatherData } from '@/types';

export const DUMMY_WEATHER: WeatherData = {
  temperature: 24,
  weatherCode: 2,
  windSpeed: 12,
  precipitation: 0.2,
  isRaining: false,
  isHot: false,
  isCold: false,
  description: '晴れ時々曇り',
  icon: '🌤',
};

export const DUMMY_SCHEDULES: Schedule[] = [
  {
    id: 'sch-001',
    title: '田中さんと打ち合わせ',
    category: 'meeting',
    startTime: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
    destination: {
      lat: 35.6762,
      lng: 139.6503,
      name: '渋谷ヒカリエ',
      address: '東京都渋谷区渋谷2-21-1',
    },
    memo: '資料を忘れずに',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sch-002',
    title: '新宿でランチ',
    category: 'lunch',
    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    destination: {
      lat: 35.6896,
      lng: 139.7006,
      name: '新宿駅周辺',
      address: '東京都新宿区新宿3丁目',
    },
    createdAt: new Date().toISOString(),
  },
];

export const DUMMY_TRANSPORT_OPTIONS: TransportOption[] = [
  {
    mode: 'transit',
    estimatedMinutes: 22,
    estimatedCost: 200,
    walkLoad: 'low',
    score: 88,
    reasons: ['時間通りに到着できる', '雨でも快適', '料金が安い'],
    warnings: [],
    externalUrl: 'https://www.google.com/maps/dir/',
  },
  {
    mode: 'taxi',
    estimatedMinutes: 18,
    estimatedCost: 1200,
    walkLoad: 'low',
    score: 72,
    reasons: ['最速で到着できる', '荷物が多くても楽', 'ドアツードア'],
    warnings: ['渋滞で遅れる可能性あり'],
  },
  {
    mode: 'car',
    estimatedMinutes: 25,
    estimatedCost: 400,
    walkLoad: 'low',
    score: 60,
    reasons: ['荷物が多い場合に便利'],
    warnings: ['駐車場代が別途かかる', '渋滞の可能性あり'],
  },
  {
    mode: 'bicycle',
    estimatedMinutes: 35,
    estimatedCost: 0,
    walkLoad: 'high',
    score: 45,
    reasons: ['無料で移動できる', '渋滞なし'],
    warnings: ['距離が長め', '到着後に汗をかく可能性'],
  },
  {
    mode: 'walk',
    estimatedMinutes: 65,
    estimatedCost: 0,
    walkLoad: 'high',
    score: 20,
    reasons: ['運動になる'],
    warnings: ['時間がかかりすぎる', '会議に間に合わない可能性'],
  },
];

export const DUMMY_NEARBY_PLACES: NearbyPlace[] = [
  {
    id: 'np-001',
    name: 'スターバックス 渋谷ヒカリエ店',
    category: 'cafe',
    distance: 50,
    walkMinutes: 1,
    description: '会議前の待機に最適',
    lat: 35.6595,
    lng: 139.7004,
  },
  {
    id: 'np-002',
    name: 'ローソン 渋谷ヒカリエ店',
    category: 'convenience',
    distance: 80,
    walkMinutes: 1,
    description: '飲み物・軽食の調達に',
    lat: 35.6594,
    lng: 139.7005,
  },
  {
    id: 'np-003',
    name: '渋谷マークシティ フードコート',
    category: 'lunch',
    distance: 300,
    walkMinutes: 4,
    description: '打ち合わせ後のランチに',
    lat: 35.6591,
    lng: 139.6977,
  },
];
