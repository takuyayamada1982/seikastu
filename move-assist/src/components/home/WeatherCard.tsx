import React from 'react';
import type { WeatherData } from '@/types';

interface WeatherCardProps {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function WeatherCard({ weather, loading, error }: WeatherCardProps) {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-4 animate-pulse">
        <div className="h-4 bg-sky-200 rounded w-24 mb-2" />
        <div className="h-8 bg-sky-200 rounded w-16" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <p className="text-sm text-gray-500">天気情報を取得できませんでした</p>
      </div>
    );
  }

  const alerts: string[] = [];
  if (weather.isRaining) alerts.push('雨');
  if (weather.isHot) alerts.push('猛暑');
  if (weather.isCold) alerts.push('寒い');

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-sky-700 font-medium mb-0.5">現在の天気</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-sky-900">{weather.temperature}°</span>
            <span className="text-sm text-sky-700 mb-1">{weather.description}</span>
          </div>
          <p className="text-xs text-sky-600 mt-1">
            風速 {weather.windSpeed} km/h
            {weather.precipitation > 0 && ` · 降水 ${weather.precipitation}mm`}
          </p>
        </div>
        <div className="text-5xl">{weather.icon}</div>
      </div>
      {alerts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {alerts.map((a) => (
            <span
              key={a}
              className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium"
            >
              ⚠️ {a}に注意
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
