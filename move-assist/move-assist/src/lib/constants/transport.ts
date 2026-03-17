// Re-export constants used in components
// These live here to avoid circular imports

import type { TransportMode, NearbyCategory } from '@/types';

export const WALK_LOAD_LABELS: Record<'low' | 'medium' | 'high', string> = {
  low: '少',
  medium: '中',
  high: '多',
};

export const WALK_LOAD_COLORS: Record<'low' | 'medium' | 'high', string> = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-amber-600 bg-amber-50',
  high: 'text-red-600 bg-red-50',
};
