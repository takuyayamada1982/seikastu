// ========== 予定・カテゴリ ==========
export type ScheduleCategory =
  | 'lunch'
  | 'cafe'
  | 'meeting'
  | 'hospital'
  | 'shopping'
  | 'pickup'
  | 'errand';

export const CATEGORY_LABELS: Record<ScheduleCategory, string> = {
  lunch: '昼食',
  cafe: 'カフェ',
  meeting: '会議',
  hospital: '通院',
  shopping: '買い物',
  pickup: '送迎',
  errand: '手続き',
};

export const CATEGORY_ICONS: Record<ScheduleCategory, string> = {
  lunch: '🍽',
  cafe: '☕',
  meeting: '💼',
  hospital: '🏥',
  shopping: '🛍',
  pickup: '🚗',
  errand: '📋',
};

export interface Location {
  lat: number;
  lng: number;
  name: string;
  address?: string;
}

export interface Schedule {
  id: string;
  title: string;
  category: ScheduleCategory;
  startTime: string; // ISO 8601
  destination: Location;
  memo?: string;
  createdAt: string;
}

// ========== 天気 ==========
export interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  precipitation: number;
  isRaining: boolean;
  isHot: boolean; // 30度超
  isCold: boolean; // 10度未満
  description: string;
  icon: string;
}

// ========== 移動候補 ==========
export type TransportMode = 'walk' | 'bicycle' | 'car' | 'taxi' | 'transit';

export const TRANSPORT_LABELS: Record<TransportMode, string> = {
  walk: '徒歩',
  bicycle: '自転車',
  car: '自家用車',
  taxi: 'タクシー',
  transit: '公共交通',
};

export const TRANSPORT_ICONS: Record<TransportMode, string> = {
  walk: '🚶',
  bicycle: '🚲',
  car: '🚗',
  taxi: '🚕',
  transit: '🚌',
};

export interface TransportOption {
  mode: TransportMode;
  estimatedMinutes: number;
  estimatedCost: number; // 円
  walkLoad: 'low' | 'medium' | 'high'; // 徒歩負荷
  score: number; // 0-100
  reasons: string[];
  warnings: string[];
  externalUrl?: string; // 外部地図アプリURL
}

// ========== 周辺提案 ==========
export type NearbyCategory = 'lunch' | 'cafe' | 'convenience' | 'rest' | 'other';

export interface NearbyPlace {
  id: string;
  name: string;
  category: NearbyCategory;
  distance: number; // meters
  walkMinutes: number;
  description?: string;
  lat: number;
  lng: number;
}

// ========== アプリ状態 ==========
export interface AppState {
  currentLocation: Location | null;
  locationError: string | null;
  weather: WeatherData | null;
  weatherError: string | null;
  schedules: Schedule[];
  selectedScheduleId: string | null;
}
