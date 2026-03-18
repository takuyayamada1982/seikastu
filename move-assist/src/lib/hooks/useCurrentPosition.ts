"use client";

import { useEffect, useState } from "react";
import type { CurrentPosition } from "@/lib/types";

export function useCurrentPosition() {
  const [position, setPosition] = useState<CurrentPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("この端末では位置情報が使えません。");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (result) => {
        setPosition({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError("位置情報を取得できませんでした。");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  return { position, loading, error };
}
