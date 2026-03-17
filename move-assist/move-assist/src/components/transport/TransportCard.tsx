import React from 'react';
import type { TransportOption } from '@/types';
import { TRANSPORT_LABELS, TRANSPORT_ICONS } from '@/types';
import { WALK_LOAD_LABELS, WALK_LOAD_COLORS } from '@/lib/constants/transport';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { cn } from '@/lib/utils/cn';

interface TransportCardProps {
  option: TransportOption;
  rank: number;
  compact?: boolean;
}

export function TransportCard({ option, rank, compact = false }: TransportCardProps) {
  const isTop = rank === 0;

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border p-4 shadow-sm',
        isTop ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200'
      )}
    >
      {isTop && (
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            ⭐ おすすめ
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="text-3xl">{TRANSPORT_ICONS[option.mode]}</div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900">{TRANSPORT_LABELS[option.mode]}</p>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
            <span>⏱ {option.estimatedMinutes}分</span>
            <span>💴 {option.estimatedCost > 0 ? `¥${option.estimatedCost}` : '無料'}</span>
            <span className={cn('text-xs px-1.5 py-0.5 rounded-full font-medium', WALK_LOAD_COLORS[option.walkLoad])}>
              歩{WALK_LOAD_LABELS[option.walkLoad]}
            </span>
          </div>
        </div>
        <ScoreRing score={option.score} />
      </div>

      {!compact && (
        <>
          <div className="mt-3 space-y-1">
            {option.reasons.map((r, i) => (
              <p key={i} className="text-xs text-green-700 flex items-start gap-1">
                <span className="mt-0.5">✓</span> {r}
              </p>
            ))}
            {option.warnings.map((w, i) => (
              <p key={i} className="text-xs text-amber-700 flex items-start gap-1">
                <span className="mt-0.5">⚠</span> {w}
              </p>
            ))}
          </div>

          {option.externalUrl && (
            <a
              href={option.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full text-center text-xs text-blue-600 font-medium bg-blue-50 rounded-xl py-2 active:bg-blue-100 transition-colors"
            >
              地図アプリで確認 →
            </a>
          )}
        </>
      )}
    </div>
  );
}
