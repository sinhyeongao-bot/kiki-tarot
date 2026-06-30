'use client';

import React from 'react';
import { DrawnCard } from '@/utils/spread';

interface TarotCardProps {
  card: DrawnCard;
  index: number;
}

// Simplified SVG Icons for suits
const SuitIcons: Record<string, (reversed: boolean) => React.ReactNode> = {
  major: (reversed: boolean) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 ${reversed ? 'rotate-180' : ''}`}>
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-primary/50" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold-primary/70" />
      <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold-light/80" />
      <circle cx="50" cy="50" r="8" fill="currentColor" className="text-gold-primary" />
    </svg>
  ),
  wands: (reversed: boolean) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 ${reversed ? 'rotate-180' : ''}`}>
      <path d="M50 88 L50 32" stroke="currentColor" strokeWidth="6" className="text-amber-500/90" strokeLinecap="round" />
      <path d="M50 32 Q60 20 53 8 Q50 16 47 8 Q40 20 50 32" fill="currentColor" className="text-amber-400" />
      <path d="M32 70 L32 52" stroke="currentColor" strokeWidth="4" className="text-amber-500/70" strokeLinecap="round" />
      <path d="M68 74 L68 56" stroke="currentColor" strokeWidth="4" className="text-amber-500/70" strokeLinecap="round" />
    </svg>
  ),
  cups: (reversed: boolean) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 ${reversed ? 'rotate-180' : ''}`}>
      <path d="M30 40 Q30 28 50 28 Q70 28 70 40 L66 64 Q66 72 50 72 Q34 72 34 64 Z" fill="currentColor" className="text-cyan-400/90" />
      <ellipse cx="50" cy="28" rx="20" ry="5" fill="currentColor" className="text-cyan-500" />
      <path d="M50 72 Q50 82 50 88" stroke="currentColor" strokeWidth="4" className="text-cyan-400/80" strokeLinecap="round" />
    </svg>
  ),
  swords: (reversed: boolean) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 ${reversed ? 'rotate-180' : ''}`}>
      <path d="M50 12 L50 68" stroke="currentColor" strokeWidth="4" className="text-slate-300/90" />
      <path d="M34 26 L66 26" stroke="currentColor" strokeWidth="6" className="text-slate-400/90" />
      <path d="M44 68 L56 68 L50 82 Z" fill="currentColor" className="text-slate-300/90" />
      <circle cx="50" cy="38" r="3" fill="currentColor" className="text-slate-200" />
    </svg>
  ),
  pentacles: (reversed: boolean) => (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 ${reversed ? 'rotate-180' : ''}`}>
      <circle cx="50" cy="50" r="28" fill="currentColor" className="text-yellow-500/90" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="text-yellow-600" />
      <path d="M50 36 L50 64 M40 45 L60 45 M40 55 L60 55" stroke="currentColor" strokeWidth="1.5" className="text-yellow-600/80" />
    </svg>
  ),
};

// Special icons for major arcana
const majorArcanaIcons: Record<string, React.ReactNode> = {
  fool: (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <circle cx="50" cy="26" r="12" fill="currentColor" className="text-gold-light" />
      <path d="M40 38 Q50 50 60 38 L56 70 L44 70 Z" fill="currentColor" className="text-gold-primary" />
      <path d="M30 42 L20 32" stroke="currentColor" strokeWidth="2" className="text-gold-light/80" />
      <path d="M70 42 L80 32" stroke="currentColor" strokeWidth="2" className="text-gold-light/80" />
    </svg>
  ),
  magician: (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <path d="M50 15 L60 42 L88 50 L60 58 L50 85 L40 58 L12 50 L40 42 Z" fill="currentColor" className="text-gold-light" />
      <circle cx="50" cy="50" r="10" fill="currentColor" className="text-gold-primary" />
      <circle cx="50" cy="50" r="5" fill="currentColor" className="text-gold-light" />
    </svg>
  ),
  'high-priestess': (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <circle cx="50" cy="30" r="14" fill="currentColor" className="text-gold-light" />
      <path d="M34 44 L34 82 L66 82 L66 44 Q50 54 34 44" fill="currentColor" className="text-gold-primary" />
      <circle cx="50" cy="26" r="5" fill="currentColor" className="text-gold-dark" />
      <path d="M42 70 L50 78 L58 70" stroke="currentColor" strokeWidth="1.5" className="text-gold-light/60" fill="none" />
    </svg>
  ),
  empress: (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <path d="M28 40 Q50 18 72 40 L76 78 Q50 88 24 78 Z" fill="currentColor" className="text-gold-light" />
      <circle cx="50" cy="36" r="12" fill="currentColor" className="text-gold-primary" />
      <path d="M50 52 L50 72" stroke="currentColor" strokeWidth="3" className="text-gold-dark" />
    </svg>
  ),
  emperor: (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <rect x="28" y="36" width="44" height="50" fill="currentColor" className="text-gold-primary" />
      <circle cx="50" cy="22" r="14" fill="currentColor" className="text-gold-light" />
      <path d="M35 50 L65 50 M35 60 L65 60 M35 70 L65 70" stroke="currentColor" strokeWidth="2" className="text-gold-dark" />
    </svg>
  ),
};

export default function TarotCard({ card, index }: TarotCardProps) {
  const suitIcon = majorArcanaIcons[card.cardId] || SuitIcons[card.suit]?.(card.isReversed);

  return (
    <div
      className="relative group"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Outer glow layer */}
      <div
        className={`
          absolute -inset-1 rounded-2xl blur-sm
          transition-all duration-500 ease-out
          opacity-40 group-hover:opacity-70
          ${card.isReversed
            ? 'bg-gradient-to-br from-red-900 via-red-800 to-red-950'
            : 'bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700'
          }
        `}
      />

      {/* Middle glow layer */}
      <div
        className={`
          absolute -inset-0.5 rounded-xl
          transition-all duration-500 ease-out
          ${card.isReversed
            ? 'bg-gradient-to-br from-red-800/50 to-red-900/30'
            : 'bg-gradient-to-br from-yellow-500/30 to-amber-600/20'
          }
          blur-xs
        `}
      />

      {/* Main card container */}
      <div
        className={`
          relative w-[180px] md:w-[200px]
          rounded-xl overflow-hidden
          transition-all duration-500 ease-out
          transform-gpu
          group-hover:-translate-y-2 group-hover:scale-[1.03]
          ${card.isReversed ? 'bg-gradient-to-b from-red-950 via-red-900/95 to-stone-900' : 'bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950'}
        `}
      >
        {/* Outer golden border frame */}
        <div
          className={`
            absolute inset-0 rounded-xl
            border-[3px]
            transition-all duration-500
            ${card.isReversed
              ? 'border-red-700/80 group-hover:border-red-600/90'
              : 'border-amber-600/80 group-hover:border-amber-500/90'
            }
          `}
        />

        {/* Inner decorative border */}
        <div
          className={`
            absolute inset-[6px] rounded-lg
            border border-dashed
            transition-all duration-500
            ${card.isReversed
              ? 'border-red-800/50'
              : 'border-amber-700/50'
            }
          `}
        />

        {/* Top gradient bar with gold */}
        <div className={`
          h-2 w-full
          ${card.isReversed
            ? 'bg-gradient-to-r from-red-950 via-red-800 to-red-950'
            : 'bg-gradient-to-r from-amber-900 via-yellow-600 to-amber-900'
          }
        `} />

        {/* Position label with ornate styling */}
        <div className={`
          py-3 px-4 text-center relative
          ${card.isReversed ? 'bg-red-950/50' : 'bg-gradient-to-r from-amber-900/30 via-yellow-900/20 to-amber-900/30'}
        `}>
          {/* Decorative side lines */}
          <div className={`
            absolute top-1/2 left-4 right-4 h-px
            ${card.isReversed ? 'bg-gradient-to-r from-transparent via-red-700/50 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-600/50 to-transparent'}
          `} />
          <span className={`
            relative font-cinzel text-base font-semibold tracking-wider
            ${card.isReversed ? 'text-red-300' : 'text-amber-200'}
          `}>
            {card.position}
          </span>
          <span className={`
            block text-[10px] mt-0.5 tracking-widest uppercase
            ${card.isReversed ? 'text-red-400/70' : 'text-amber-500/80'}
          `}>
            {card.positionEN}
          </span>
        </div>

        {/* Card content area */}
        <div className={`p-5 flex flex-col items-center ${card.isReversed ? '' : ''}`}>
          {/* Icon container with subtle glow */}
          <div className={`
            relative mb-4
            ${card.isReversed ? '' : ''}
          `}>
            {/* Icon glow background */}
            <div className={`
              absolute inset-0 blur-xl rounded-full
              ${card.isReversed ? 'bg-red-500/10' : 'bg-amber-500/10'}
            `} />
            <div className={`
              relative
              ${card.isReversed ? 'rotate-180' : ''}
              text-gold-primary transition-transform duration-500
              group-hover:scale-110
            `}>
              {suitIcon}
            </div>
          </div>

          {/* Card name with premium styling */}
          <div className="text-center mb-3 relative">
            {/* Subtle underline decoration */}
            <div className={`
              absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-px
              ${card.isReversed ? 'bg-gradient-to-r from-transparent via-red-600 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-500 to-transparent'}
            `} />
            <h3 className={`
              text-lg font-bold font-cinzel leading-tight
              ${card.isReversed ? 'text-red-300' : 'text-amber-100'}
            `}>
              {card.cardNameCN}
            </h3>
            <p className={`
              text-[11px] font-inter mt-1.5 tracking-wide
              ${card.isReversed ? 'text-red-400/70' : 'text-amber-500/90'}
            `}>
              {card.cardNameEN}
            </p>
          </div>

          {/* Orientation badge - prominent and clear */}
          <div className={`
            mt-4 px-4 py-1.5 rounded-full
            text-[11px] font-cinzel font-semibold tracking-widest uppercase
            border-2
            transition-all duration-300
            ${card.isReversed
              ? 'bg-red-900/60 text-red-200 border-red-600/70 shadow-[0_0_15px_rgba(185,28,28,0.4)]'
              : 'bg-amber-900/50 text-amber-200 border-amber-600/60 shadow-[0_0_15px_rgba(217,119,6,0.3)]'
            }
          `}>
            {card.isReversed ? '逆位 REVERSED' : '正位 UPRIGHT'}
          </div>
        </div>

        {/* Bottom gradient bar with gold */}
        <div className={`
          h-2 w-full
          ${card.isReversed
            ? 'bg-gradient-to-r from-red-950 via-red-800 to-red-950'
            : 'bg-gradient-to-r from-amber-900 via-yellow-600 to-amber-900'
          }
        `} />

        {/* Corner ornaments */}
        <div className={`
          absolute top-[10px] left-[10px] w-2 h-2
          border-l-2 border-t-2 rounded-tl
          ${card.isReversed ? 'border-red-600/60' : 'border-amber-600/60'}
        `} />
        <div className={`
          absolute top-[10px] right-[10px] w-2 h-2
          border-r-2 border-t-2 rounded-tr
          ${card.isReversed ? 'border-red-600/60' : 'border-amber-600/60'}
        `} />
        <div className={`
          absolute bottom-[10px] left-[10px] w-2 h-2
          border-l-2 border-b-2 rounded-bl
          ${card.isReversed ? 'border-red-600/60' : 'border-amber-600/60'}
        `} />
        <div className={`
          absolute bottom-[10px] right-[10px] w-2 h-2
          border-r-2 border-b-2 rounded-br
          ${card.isReversed ? 'border-red-600/60' : 'border-amber-600/60'}
        `} />
      </div>

      {/* Card number badge - premium style */}
      <div className={`
        absolute -top-1.5 -left-1.5
        w-7 h-7 rounded-full
        flex items-center justify-center
        text-[12px] font-cinzel font-bold
        border-2
        shadow-lg
        transition-all duration-300
        ${card.isReversed
          ? 'bg-gradient-to-br from-red-800 to-red-950 text-red-200 border-red-600/70'
          : 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 border-amber-500/80'
        }
        group-hover:scale-110
      `}>
        {index + 1}
      </div>
    </div>
  );
}