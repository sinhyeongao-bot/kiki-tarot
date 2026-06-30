import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KIKI Tarot - 塔罗牌占卜助手',
  description: 'A mystical tarot card drawing assistant for generating structured spreads',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">✨</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-inter antialiased">
        {/* Mystical background elements */}
        <div className="mystical-orb" aria-hidden="true" />
        <div className="starfield" aria-hidden="true" />

        {/* Main content wrapper */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}