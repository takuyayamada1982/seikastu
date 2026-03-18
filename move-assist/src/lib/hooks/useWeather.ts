"use client";

import { useEffect, useState } from "react";
import type { CurrentPosition, WeatherInfo, WeatherKind } from "@/lib/types";
import { fallbackWeather } from "@/lib/data/mock";

function mapWeatherCodeToLabel(code: number, temp: number): WeatherKind {
  if (temp >= 30) return "暑い";
  if ([61, 63, 65, 80, 81, 82, 95].includes(code)) return "雨";
  if ([1, 2, 3, 45, 48].includes(code)) return "くもり";
  return "晴れ";
}

function buildNote(label: WeatherKind) {
  switch (label) {
    case "雨":
      return "雨のため徒歩が長い移動は負担が高めです。";
    case "暑い":
      return "暑さがあるため徒歩や自転車はやや負担が高めです。";
    case "くもり":
      return "標準的な条件で移動候補を比較しています。";
    default:
      return "天気は比較的安定しています。";
  }
}

export function useWeather(position: CurrentPosition | null) {
  const [weather, setWeather] = useState<WeatherInfo>(fallbackWeather);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!position) return;

    const run = async () => {
      setLoading(true);
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${position.latitude}` +
          `&longitude=${position.longitude}&current=temperature_2m,weather_code`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("weather fetch failed");

        const data = await res.json();
        const temp = Number(data?.current?.temperature_2m ?? 0);
        const code = Number(data?.current?.weather_code ?? 0);
        const label = mapWeatherCodeToLabel(code, temp);

        setWeather({
          label,
          temperatureText: `${Math.round(temp)}°C`,
          note: buildNote(label),
        });
      } catch {
        setWeather(fallbackWeather);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [position]);

  return { weather, loading };
}
