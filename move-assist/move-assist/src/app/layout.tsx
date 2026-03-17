import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BottomNav } from '@/components/layout/BottomNav';
import { ScheduleProvider } from '@/lib/hooks/useSchedules';
import { LeafletStyles } from '@/components/ui/LeafletStyles';
import { ServiceWorkerRegister } from '@/components/ui/ServiceWorkerRegister';
import { AlarmBanner } from '@/components/ui/AlarmBanner';

export const metadata: Metadata = {
  title: 'MoveAssist - 移動判断アシスト',
  description: '現在地・目的地・予定・天気をもとに、最適な移動手段と到着後の行動を提案します',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MoveAssist',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ScheduleProvider>
          <LeafletStyles />
          <ServiceWorkerRegister />
          <AlarmBanner />
          <main className="min-h-screen bg-gray-50 max-w-lg mx-auto pb-20">
            {children}
          </main>
          <BottomNav />
        </ScheduleProvider>
      </body>
    </html>
  );
}
