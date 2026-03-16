import type { WeatherData } from '@/types';

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: '快晴',
  1: '晴れ',
  2: '晴れ時々曇り',
  3: '曇り',
  45: '霧',
  48: '霧',
  51: '小雨',
  53: '雨',
  55: '強い雨',
  61: '小雨',
  63: '雨',
  65: '強い雨',
  71: '小雪',
  73: '雪',
  75: '大雪',
  80: 'にわか雨',
  81: '雨',
  82: '強いにわか雨',
  95: '雷雨',
  99: '激しい雷雨',
};

const WMO_ICONS: Record<number, string> = {
  0: '☀️',
  1: '🌤',
  2: '⛅',
  3: '☁️',
  45: '🌫',
  48: '🌫',
  51: '🌦',
  53: '🌧',
  55: '🌧',
  61: '🌦',
  63: '🌧',
  65: '🌧',
  71: '🌨',
  73: '❄️',
  75: '❄️',
  80: '🌦',
  81: '🌧',
  82: '🌧',
  95: '⛈',
  99: '⛈',
};

export async function fetchWeather(lat: number, lng: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,precipitation&timezone=Asia%2FTokyo`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('天気情報の取得に失敗しました');
  const data = await res.json();

  const current = data.current;
  const code = current.weather_code as number;
  const temp = current.temperature_2m as number;
  const precip = current.precipitation as number;
  const wind = current.wind_speed_10m as number;

  const isRaining = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 99].includes(code);

  return {
    temperature: Math.round(temp),
    weatherCode: code,
    windSpeed: Math.round(wind),
    precipitation: precip,
    isRaining,
    isHot: temp >= 30,
    isCold: temp <= 10,
    description: WMO_DESCRIPTIONS[code] ?? '不明',
    icon: WMO_ICONS[code] ?? '🌡',
  };
}
