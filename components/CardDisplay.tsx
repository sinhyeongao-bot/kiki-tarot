'use client';

import { DrawnCard } from '@/utils/spread';
import TarotCard from './TarotCard';

interface CardDisplayProps {
  cards: DrawnCard[];
  onDrawAgain: () => void;
}

export default function CardDisplay({ cards, onDrawAgain }: CardDisplayProps) {
  if (cards.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-5">
        {cards.map((card, index) => (
          <div key={`${card.cardId}-${index}`} className="animate-card-reveal">
            <TarotCard card={card} index={index} />
          </div>
        ))}
      </div>

      {/* Draw Again Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onDrawAgain}
          className="
            group px-6 py-2.5 rounded-full
            border border-gold-primary/20 text-gold-primary/70
            hover:border-gold-primary/40 hover:text-gold-light
            hover:bg-gold-primary/5
            font-cinzel text-sm tracking-wider
            transition-all duration-300
            flex items-center gap-2
          "
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500">
            <path
              fill="currentColor"
              d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
          </svg>
          重新抽牌
        </button>
      </div>
    </div>
  );
}