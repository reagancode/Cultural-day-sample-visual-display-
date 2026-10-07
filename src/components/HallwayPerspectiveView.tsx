import React from 'react';
import { ColorTheme, AnimationSpeed } from '../types/mural';
import { MuralCanvas } from './MuralCanvas';
import { THEME_PALETTES } from '../data/culturalMotifs';

interface HallwayPerspectiveViewProps {
  theme: ColorTheme;
  speed: AnimationSpeed;
  beatIntensity: number;
  onSelectMotif: (motifId: string) => void;
  selectedMotifId?: string | null;
}

export const HallwayPerspectiveView: React.FC<HallwayPerspectiveViewProps> = ({
  theme,
  speed,
  beatIntensity,
  onSelectMotif,
  selectedMotifId,
}) => {
  const p = THEME_PALETTES[theme];

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] bg-[#1a1a1e] overflow-hidden rounded-xl border border-zinc-800 shadow-2xl flex flex-col justify-between">
      {/* Ceiling with Recessed LED Spotlights and Ductwork */}
      <div className="relative h-24 lg:h-28 w-full bg-[#2a2b30] border-b-4 border-[#121214] overflow-hidden z-20">
        {/* Architectural acoustic slatted ceiling texture */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #18181b, #18181b 4px, #3f3f46 4px, #3f3f46 8px)',
          }}
        />

        {/* Ceiling spotlights shining down onto the mural */}
        <div className="absolute inset-0 flex justify-around items-center px-12">
          {[1, 2, 3, 4, 5].map((lightIdx) => (
            <div key={lightIdx} className="relative flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-zinc-500 shadow-[0_0_20px_rgba(255,240,200,0.8)]" />
              {/* Downward light cone beam */}
              <div
                className="absolute top-8 w-40 h-80 pointer-events-none opacity-30"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,248,220,0.45), transparent)',
                  clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Hallway Perspective Chamber */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 lg:p-8 overflow-hidden"
        style={{
          perspective: '1300px',
        }}
      >
        {/* Wall Mural tilted at slight 3D perspective angle like in the hallway photo */}
        <div
          className="w-full max-w-6xl transition-transform duration-700 ease-out shadow-2xl"
          style={{
            transform: 'rotateY(-9deg) rotateX(2deg) scale(0.97)',
            transformOrigin: 'left center',
          }}
        >
          <MuralCanvas
            theme={theme}
            speed={speed}
            beatIntensity={beatIntensity}
            onSelectMotif={onSelectMotif}
            selectedMotifId={selectedMotifId}
          />
        </div>
      </div>

      {/* Modern Tiled Flooring with Reflections */}
      <div className="relative h-28 lg:h-36 w-full bg-gradient-to-b from-[#25252a] to-[#161619] border-t-4 border-[#121214] z-20 overflow-hidden">
        {/* Floor Tiles Perspective Grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '80px 40px',
            transform: 'perspective(400px) rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Glossy Floor Color Reflection from the Mural */}
        <div
          className="absolute inset-0 opacity-20 blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 0%, ${p.teal}, transparent 50%), radial-gradient(circle at 65% 0%, ${p.gold}, transparent 50%), radial-gradient(circle at 85% 0%, ${p.terracotta}, transparent 50%)`,
          }}
        />

        {/* Floor label marker */}
        <div className="absolute bottom-3 right-6 text-[11px] uppercase tracking-widest text-zinc-400 font-mono">
          Cultural Exhibition Hall · Uganda Independence Celebration
        </div>
      </div>
    </div>
  );
};
