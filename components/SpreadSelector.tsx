'use client';

import React from 'react';
import { SpreadType, spreadNames, spreads } from '@/data/tarot';

interface SpreadSelectorProps {
  selectedSpread: SpreadType;
  onSelect: (spread: SpreadType) => void;
}

// Minimal spread icons
const spreadIcons: Record<SpreadType, React.ReactNode> = {
  single: (
    <svg viewBox="0 0 40 40" className="w-7 h-7">
      <rect x="10" y="8" width="20" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="21" r="5" fill="currentColor" />
    </svg>
  ),
  three: (
    <svg viewBox="0 0 40 40" className="w-7 h-7">
      <rect x="4" y="22" width="10" height="14" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="15" y="22" width="10" height="14" rx="1" fill="currentColor" />
      <rect x="26" y="22" width="10" height="14" rx="1" fill="currentColor" opacity="0.5" />
      <path d="M9 22 L20 10 L31 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  relationship: (
    <svg viewBox="0 0 40 40" className="w-7 h-7">
      <circle cx="12" cy="14" r="5" fill="currentColor" />
      <circle cx="28" cy="14" r="5" fill="currentColor" />
      <path d="M12 19 L12 28 L20 32 L28 28 L28 19" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  five: (
    <svg viewBox="0 0 40 40" className="w-7 h-7">
      <circle cx="20" cy="8" r="4" fill="currentColor" />
      <circle cx="8" cy="20" r="4" fill="currentColor" />
      <circle cx="32" cy="20" r="4" fill="currentColor" />
      <circle cx="13" cy="34" r="4" fill="currentColor" />
      <circle cx="27" cy="34" r="4" fill="currentColor" />
    </svg>
  ),
};

export default function SpreadSelector({ selectedSpread, onSelect }: SpreadSelectorProps) {
  const spreadTypes: SpreadType[] = ['single', 'three', 'relationship', 'five'];

  return (
    <div className="w-full">
      <h2 className="text-base font-cinzel text-gold-light/80 mb-5 text-center tracking-wider">
        选择牌阵
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {spreadTypes.map((spread) => {
          const isSelected = selectedSpread === spread;
          const positionCount = spreads[spread].length;

          return (
            <button
              key={spread}
              onClick={() => onSelect(spread)}
              className={`
                relative p-4 rounded-xl transition-all duration-300
                flex flex-col items-center gap-2
                ${isSelected
                  ? 'bg-gold-primary/10 border border-gold-primary/40 glow-gold-hover'
                  : 'bg-transparent border border-gold-primary/15 hover:border-gold-primary/30 hover:bg-gold-primary/5'
                }
              `}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold-primary rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-bg-primary">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              )}

              {/* Icon */}
              <div className={`transition-colors duration-300 ${isSelected ? 'text-gold-light' : 'text-gold-primary/60'}`}>
                {spreadIcons[spread]}
              </div>

              {/* Name */}
              <div className="text-center">
                <span className={`block font-cinzel text-sm font-medium transition-colors duration-300 ${isSelected ? 'text-gold-light' : 'text-gold-primary/80'}`}>
                  {spreadNames[spread]}
                </span>
              </div>

              {/* Card count */}
              <div className={`
                mt-1 text-[10px] tracking-wider uppercase
                ${isSelected ? 'text-gold-primary/80' : 'text-gold-primary/50'}
              `}>
                {positionCount} cards
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}