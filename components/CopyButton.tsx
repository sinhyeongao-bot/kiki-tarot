'use client';

import { useState } from 'react';

interface CopyButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function CopyButton({ onClick, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative">
      {/* Outer neon glow */}
      {!disabled && (
        <div
          className={`
            absolute -inset-1 rounded-full blur-md
            transition-all duration-500
            ${copied
              ? 'bg-emerald-500/30 opacity-60'
              : 'bg-purple-500/20 opacity-0 group-hover:opacity-40'
            }
          `}
        />
      )}

      {/* Middle glow layer */}
      {!disabled && (
        <div
          className={`
            absolute -inset-0.5 rounded-full
            transition-all duration-500
            ${copied
              ? 'bg-emerald-500/20 opacity-80'
              : 'bg-gradient-to-r from-purple-600/30 via-gold-primary/20 to-purple-600/30 opacity-0'
            }
          `}
        />
      )}

      <button
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative px-10 py-4 rounded-full font-cinzel font-semibold text-base tracking-widest
          transition-all duration-400 ease-out
          transform
          ${disabled
            ? 'bg-gray-900/60 text-gray-600 cursor-not-allowed border border-gray-800/50'
            : copied
              ? 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-emerald-200 border border-emerald-600/60'
              : `
                bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900
                text-gold-light border border-gold-600/60
                hover:border-gold-500/80 hover:scale-105
                active:scale-95
                ${isPressed ? 'scale-95' : ''}
              `
          }
        `}
      >
        {/* Inner glow effect for active state */}
        {!disabled && !copied && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        )}

        {/* Copied state shimmer */}
        {copied && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent -translate-x-full animate-[shimmer_1s_ease-in-out]" />
          </div>
        )}

        <span className="relative flex items-center gap-3">
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span className="shimmer-text">已复制到剪贴板</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  fill="currentColor"
                  d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                />
              </svg>
              <span>复制结果</span>
            </>
          )}
        </span>

        {/* Bottom border glow */}
        {!disabled && !copied && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
        )}
      </button>

      {/* Corner accents */}
      {!disabled && !copied && (
        <>
          <div className="absolute top-0 left-4 w-2 h-2 border-l border-t border-gold-500/40 rounded-tl" />
          <div className="absolute top-0 right-4 w-2 h-2 border-r border-t border-gold-500/40 rounded-tr" />
          <div className="absolute bottom-0 left-4 w-2 h-2 border-l border-b border-gold-500/40 rounded-bl" />
          <div className="absolute bottom-0 right-4 w-2 h-2 border-r border-b border-gold-500/40 rounded-br" />
        </>
      )}
    </div>
  );
}