import React from 'react';
import { ColorTheme } from '../types/mural';
import { THEME_PALETTES } from '../data/culturalMotifs';

interface KikoiBorderProps {
  theme: ColorTheme;
  position?: 'top' | 'bottom';
  showTassels?: boolean;
  animated?: boolean;
}

export const KikoiBorder: React.FC<KikoiBorderProps> = ({
  theme,
  position = 'top',
  showTassels = true,
  animated = true,
}) => {
  const currentPalette = THEME_PALETTES[theme];

  // Colors for the authentic Kikoi striped selvage
  const stripes = [
    { color: '#111111', height: 'h-1.5' }, // Black
    { color: '#F5B700', height: 'h-2' },   // Sunshine Gold
    { color: '#D63434', height: 'h-1.5' }, // Crimson
    { color: '#00A896', height: 'h-1' },   // Turquoise
    { color: '#E76F51', height: 'h-1.5' }, // Terracotta
    { color: '#FFFFFF', height: 'h-0.5' }, // Ivory pinstripe
    { color: '#F5B700', height: 'h-1' },   // Gold pinstripe
    { color: '#111111', height: 'h-2.5' }, // Base Black band
  ];

  // Number of tassels based on width
  const tasselCount = 36;

  return (
    <div className={`relative w-full overflow-hidden select-none z-10 ${position === 'top' ? 'mb-2' : 'mt-2'}`}>
      {/* Kikoi Woven Striped Selvage Band */}
      <div className="flex flex-col w-full shadow-md border-y border-black/40">
        {stripes.map((stripe, idx) => (
          <div
            key={idx}
            className={`w-full ${stripe.height} transition-colors duration-700`}
            style={{
              backgroundColor:
                idx === 1
                  ? currentPalette.gold
                  : idx === 2
                  ? currentPalette.terracotta
                  : idx === 3
                  ? currentPalette.teal
                  : idx === 4
                  ? currentPalette.orange
                  : stripe.color,
            }}
          />
        ))}
      </div>

      {/* Decorative Woven Kikoi Fabric texture & knotted tassels */}
      {showTassels && (
        <div
          className={`flex justify-between items-start px-2 w-full overflow-hidden ${
            position === 'top' ? 'rotate-180 -mt-1' : '-mt-0.5'
          }`}
          style={{ height: '36px' }}
        >
          {Array.from({ length: tasselCount }).map((_, i) => {
            const isAlt = i % 2 === 0;
            const tasselColor =
              i % 4 === 0
                ? currentPalette.gold
                : i % 4 === 1
                ? currentPalette.terracotta
                : i % 4 === 2
                ? currentPalette.teal
                : '#111111';

            return (
              <div
                key={i}
                className={`flex flex-col items-center shrink-0 ${
                  animated ? (isAlt ? 'animate-tassel-1' : 'animate-tassel-2') : ''
                }`}
                style={{ width: `${100 / tasselCount}%` }}
              >
                {/* Knotted macramé bead */}
                <div
                  className="w-1.5 h-1.5 rounded-full border border-black/30 shadow-xs"
                  style={{ backgroundColor: tasselColor }}
                />
                {/* Fringe strands */}
                <div
                  className="w-0.5 opacity-80"
                  style={{
                    height: `${20 + (i % 5) * 2}px`,
                    backgroundColor: tasselColor,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
