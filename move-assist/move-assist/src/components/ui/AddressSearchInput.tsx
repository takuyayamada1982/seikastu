'use client';
import { useState, useRef, useEffect } from 'react';
import { useAddressSearch } from '@/lib/hooks/useAddressSearch';
import type { GeocodingResult } from '@/lib/utils/geocoding';

interface AddressSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (result: GeocodingResult) => void;
  placeholder?: string;
  error?: string;
}

export function AddressSearchInput({
  value,
  onChange,
  onSelect,
  placeholder = '目的地を入力（例：渋谷ヒカリエ）',
  error,
}: AddressSearchInputProps) {
  const { results, loading, search, clear } = useAddressSearch();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 外側クリックでドロップダウンを閉じる
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v);
    search(v);
    setOpen(true);
  };

  const handleSelect = (result: GeocodingResult) => {
    onChange(result.name);
    onSelect(result);
    clear();
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-10 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm animate-spin">
            ↻
          </span>
        )}
        {!loading && value && (
          <button
            type="button"
            onClick={() => { onChange(''); clear(); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {/* 検索候補ドロップダウン */}
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {results.map((result, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(result)}
              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 active:bg-gray-100 border-b last:border-b-0 border-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-900 truncate">{result.name}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{result.address}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
