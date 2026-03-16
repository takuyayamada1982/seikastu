'use client';
import { useEffect, useRef } from 'react';
import type { Location } from '@/types';

interface MapViewProps {
  origin: Location | null;
  destination: Location | null;
  height?: string;
}

export function MapView({ origin, destination, height = '200px' }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let isMounted = true;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Leaflet デフォルトアイコン修正
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (!isMounted || !mapRef.current) return;

      const center = origin
        ? [origin.lat, origin.lng] as [number, number]
        : destination
        ? [destination.lat, destination.lng] as [number, number]
        : [35.6762, 139.6503] as [number, number];

      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: true,
      }).setView(center, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // 現在地マーカー
      const originIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;background:#2563eb;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        className: '',
      });

      // 目的地マーカー
      const destIcon = L.divIcon({
        html: `<div style="width:20px;height:20px;background:#dc2626;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        className: '',
      });

      const markers: L.Marker[] = [];

      if (origin) {
        const m = L.marker([origin.lat, origin.lng], { icon: originIcon })
          .addTo(map)
          .bindPopup('現在地');
        markers.push(m);
      }

      if (destination) {
        const m = L.marker([destination.lat, destination.lng], { icon: destIcon })
          .addTo(map)
          .bindPopup(destination.name);
        markers.push(m);
      }

      // 両方あれば範囲に合わせてズーム
      if (origin && destination) {
        const bounds = L.latLngBounds(
          [origin.lat, origin.lng],
          [destination.lat, destination.lng]
        );
        map.fitBounds(bounds, { padding: [40, 40] });
      }

      leafletMapRef.current = map;
    };

    initMap();

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [origin?.lat, origin?.lng, destination?.lat, destination?.lng]);

  return (
    <div
      ref={mapRef}
      style={{ height }}
      className="w-full rounded-2xl overflow-hidden border border-gray-200 z-0"
    />
  );
}
