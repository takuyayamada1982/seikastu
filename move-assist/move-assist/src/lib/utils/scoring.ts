import type {
  TransportOption,
  TransportMode,
  WeatherData,
  ScheduleCategory,
} from '@/types';

interface ScoringInput {
  distanceKm: number;
  minutesUntilStart: number;
  weather: WeatherData | null;
  category: ScheduleCategory;
}

function getBaseMinutes(mode: TransportMode, distanceKm: number): number {
  const speeds: Record<TransportMode, number> = {
    walk: 4,      // 4 km/h
    bicycle: 12,  // 12 km/h
    car: 30,      // 30 km/h (市街地)
    taxi: 30,
    transit: 25,  // 乗り換え含む
  };
  return Math.round((distanceKm / speeds[mode]) * 60);
}

function getBaseCost(mode: TransportMode, distanceKm: number): number {
  switch (mode) {
    case 'walk':
    case 'bicycle':
      return 0;
    case 'transit':
      if (distanceKm < 3) return 180;
      if (distanceKm < 8) return 220;
      return 300;
    case 'car':
      return Math.round(distanceKm * 15 + 200); // ガス代概算
    case 'taxi':
      return Math.round(700 + distanceKm * 100); // 基本料金+距離
    default:
      return 0;
  }
}

export function scoreTransportOptions(input: ScoringInput): TransportOption[] {
  const { distanceKm, minutesUntilStart, weather, category } = input;
  const modes: TransportMode[] = ['walk', 'bicycle', 'car', 'taxi', 'transit'];

  return modes.map((mode) => {
    const estimatedMinutes = getBaseMinutes(mode, distanceKm);
    const estimatedCost = getBaseCost(mode, distanceKm);
    const walkLoad =
      mode === 'walk' || mode === 'bicycle'
        ? distanceKm > 2
          ? 'high'
          : distanceKm > 0.8
          ? 'medium'
          : 'low'
        : 'low';

    let score = 50;
    const reasons: string[] = [];
    const warnings: string[] = [];

    // 時間余裕
    const buffer = minutesUntilStart - estimatedMinutes;
    if (buffer < 5) {
      score -= 30;
      warnings.push('時間がかなり厳しい');
    } else if (buffer < 15) {
      score -= 10;
      warnings.push('余裕が少ない');
    } else if (buffer > 30) {
      score += 5;
      reasons.push('時間に余裕を持って到着できる');
    }

    // 天気評価
    if (weather?.isRaining) {
      if (mode === 'walk') { score -= 25; warnings.push('雨で濡れる'); }
      if (mode === 'bicycle') { score -= 30; warnings.push('雨で危険・濡れる'); }
      if (mode === 'transit' || mode === 'taxi') { score += 15; reasons.push('雨でも快適'); }
    }
    if (weather?.isHot) {
      if (mode === 'walk' && distanceKm > 1) { score -= 15; warnings.push('暑さで体力消耗'); }
      if (mode === 'bicycle' && distanceKm > 2) { score -= 10; warnings.push('到着後に汗をかく'); }
    }

    // モード別加点
    if (mode === 'transit') {
      score += 10;
      reasons.push('料金が安い');
    }
    if (mode === 'taxi' && minutesUntilStart < 30) {
      score += 15;
      reasons.push('急いでいるときに最適');
    }
    if (mode === 'walk' && distanceKm < 0.8) {
      score += 20;
      reasons.push('近距離は徒歩が一番楽');
    }
    if (mode === 'bicycle' && !weather?.isRaining && distanceKm > 1 && distanceKm < 5) {
      score += 10;
      reasons.push('この距離なら自転車が効率的');
    }

    // カテゴリ適合
    if (category === 'meeting') {
      if (mode === 'taxi') { score += 10; reasons.push('清潔・快適に到着できる'); }
      if (mode === 'walk' && distanceKm > 1.5) { score -= 10; warnings.push('汗をかいて会議に出ることになる'); }
    }
    if (category === 'hospital') {
      if (mode === 'taxi') { score += 15; reasons.push('体調が悪いときに安心'); }
      if (mode === 'walk' && distanceKm > 1) { score -= 15; warnings.push('体に負担がかかる'); }
    }
    if (estimatedCost === 0 && mode !== 'transit') {
      reasons.push('経済的な移動手段');
    }

    // 外部URL (Google Maps)
    const externalUrl =
      mode === 'transit'
        ? `https://www.google.com/maps/dir/?api=1&travelmode=transit`
        : mode === 'walk'
        ? `https://www.google.com/maps/dir/?api=1&travelmode=walking`
        : mode === 'bicycle'
        ? `https://www.google.com/maps/dir/?api=1&travelmode=bicycling`
        : mode === 'car' || mode === 'taxi'
        ? `https://www.google.com/maps/dir/?api=1&travelmode=driving`
        : undefined;

    // 理由が空なら基本説明を追加
    if (reasons.length === 0) {
      if (estimatedCost === 0) reasons.push('無料で移動できる');
      else reasons.push(`約${estimatedMinutes}分で到着できる`);
    }

    return {
      mode,
      estimatedMinutes,
      estimatedCost,
      walkLoad,
      score: Math.max(0, Math.min(100, score)),
      reasons,
      warnings,
      externalUrl,
    };
  }).sort((a, b) => b.score - a.score);
}

export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function getMinutesUntil(isoString: string): number {
  return Math.round((new Date(isoString).getTime() - Date.now()) / 60000);
}

export function formatMinutesUntil(minutes: number): string {
  if (minutes < 0) return '終了';
  if (minutes < 60) return `${minutes}分後`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}時間${m}分後` : `${h}時間後`;
}
