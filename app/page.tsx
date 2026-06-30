'use client';

import { useState } from 'react';
import { SpreadType, spreads, spreadNames, spreadNamesEN } from '@/data/tarot';
import { drawCards, formatSpreadForCopy, copyToClipboard, DrawnCard } from '@/utils/spread';
import SpreadSelector from '@/components/SpreadSelector';
import QuestionInput from '@/components/QuestionInput';
import CardDisplay from '@/components/CardDisplay';
import CopyButton from '@/components/CopyButton';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('three');
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [drawPressed, setDrawPressed] = useState(false);

  const handleDrawCards = () => {
    setIsDrawing(true);
    setDrawnCards([]);
    setHasDrawn(false);

    setTimeout(() => {
      const positions = spreads[selectedSpread];
      const cards = drawCards(selectedSpread, positions);
      setDrawnCards(cards);
      setHasDrawn(true);
      setIsDrawing(false);
    }, 400);
  };

  const handleDrawMouseDown = () => {
    setDrawPressed(true);
  };

  const handleDrawMouseUp = () => {
    setDrawPressed(false);
  };

  const handleDrawAgain = () => {
    setDrawnCards([]);
    setHasDrawn(false);
    setTimeout(() => {
      handleDrawCards();
    }, 100);
  };

  const handleCopy = () => {
    const formattedText = formatSpreadForCopy(
      question,
      selectedSpread,
      spreadNames[selectedSpread],
      spreadNamesEN[selectedSpread],
      drawnCards
    );
    copyToClipboard(formattedText);
  };

  return (
    <main className="min-h-screen py-8 px-4 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          {/* Mystical Logo */}
          <div className="mb-8 relative">
            <div className="inline-flex items-center justify-center w-24 h-24">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-dark/20 via-gold-primary/10 to-transparent animate-pulse" />
              {/* Inner logo */}
              <div className="relative w-20 h-20 rounded-full border border-gold-primary/40 flex items-center justify-center bg-gradient-to-br from-card-bg to-bg-secondary">
                <svg viewBox="0 0 100 100" className="w-12 h-12">
                  {/* Mystical eye symbol */}
                  <ellipse cx="50" cy="50" rx="35" ry="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-primary/60" />
                  <circle cx="50" cy="50" r="12" fill="currentColor" className="text-gold-primary" />
                  <circle cx="50" cy="50" r="5" fill="currentColor" className="text-gold-light" />
                  {/* Decorative rays */}
                  <path d="M50 25 L50 35 M50 65 L50 75 M25 50 L35 50 M65 50 L75 50" stroke="currentColor" strokeWidth="1" className="text-gold-primary/40" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-gradient-gold mb-4 tracking-wider">
            KIKI Tarot
          </h1>
          <p className="text-gold-primary/70 font-inter text-sm tracking-widest uppercase">
            命运的指引 · Guidance of Destiny
          </p>

          {/* Elegant divider */}
          <div className="mt-10 mx-auto w-48">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent" />
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gold-primary/50">
                <path fill="currentColor" d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z" />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold-primary/40 to-transparent" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Question Input */}
          <section className="glass rounded-2xl p-6 border border-gold-primary/10">
            <QuestionInput value={question} onChange={setQuestion} />
          </section>

          {/* Spread Selector */}
          <section className="glass rounded-2xl p-6 border border-gold-primary/10">
            <SpreadSelector selectedSpread={selectedSpread} onSelect={setSelectedSpread} />
          </section>

          {/* Draw Button or Card Display */}
          {!hasDrawn ? (
            <section className="text-center py-8">
              {/* Outer glow container */}
              <div className="relative inline-block">
                {/* Neon outer glow */}
                <div
                  className={`
                    absolute -inset-2 rounded-full
                    bg-gradient-to-r from-purple-600/40 via-gold-primary/50 to-purple-600/40
                    blur-lg
                    transition-all duration-500
                    ${isDrawing ? 'opacity-80 animate-pulse' : 'opacity-50'}
                  `}
                />
                {/* Inner glow layer */}
                <div
                  className={`
                    absolute -inset-1 rounded-full
                    bg-gradient-to-r from-gold-primary/30 to-amber-500/30
                    blur-md
                    transition-all duration-500
                    ${isDrawing ? 'opacity-100' : 'opacity-60'}
                  `}
                />

                <button
                  onClick={handleDrawCards}
                  onMouseDown={handleDrawMouseDown}
                  onMouseUp={handleDrawMouseUp}
                  onMouseLeave={handleDrawMouseUp}
                  disabled={isDrawing}
                  className={`
                    relative px-16 py-5 rounded-full font-cinzel font-bold text-xl tracking-widest
                    bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900
                    text-gold-light
                    border border-gold-600/70
                    transition-all duration-400 ease-out
                    transform
                    ${isDrawing
                      ? 'cursor-wait'
                      : `hover:scale-105 hover:border-gold-500/90 hover:text-amber-200 ${drawPressed ? 'scale-95' : ''}`
                    }
                  `}
                >
                  {/* Light sweep effect */}
                  {!isDrawing && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </div>
                  )}

                  {/* Inner glow line */}
                  <div className="absolute inset-x-4 bottom-3 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

                  <span className="relative flex items-center gap-4">
                    {isDrawing ? (
                      <>
                        <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span className="shimmer-text">洗牌中...</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700">
                          <path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                        </svg>
                        <span>开始抽牌</span>
                      </>
                    )}
                  </span>
                </button>

                {/* Corner accents */}
                {!isDrawing && (
                  <>
                    <div className="absolute top-1 left-6 w-3 h-3 border-l-2 border-t-2 border-gold-500/50 rounded-tl-sm" />
                    <div className="absolute top-1 right-6 w-3 h-3 border-r-2 border-t-2 border-gold-500/50 rounded-tr-sm" />
                    <div className="absolute bottom-1 left-6 w-3 h-3 border-l-2 border-b-2 border-gold-500/50 rounded-bl-sm" />
                    <div className="absolute bottom-1 right-6 w-3 h-3 border-r-2 border-b-2 border-gold-500/50 rounded-br-sm" />
                  </>
                )}
              </div>
            </section>
          ) : (
            <>
              {/* Card Display */}
              <section>
                <CardDisplay cards={drawnCards} onDrawAgain={handleDrawAgain} />
              </section>

              {/* Copy Button */}
              <section className="flex justify-center pt-4">
                <CopyButton onClick={handleCopy} disabled={!hasDrawn} />
              </section>
            </>
          )}

          {/* Footer */}
          <footer className="text-center pt-12 mt-8">
            <div className="divider mb-6" />
            <p className="text-gold-primary/40 text-xs font-inter tracking-wide">
              将结果复制到 ChatGPT · Gemini · Kimi 获取详细解读
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}