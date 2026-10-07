import React from 'react';
import { CulturalMotif, ColorTheme } from '../types/mural';
import { THEME_PALETTES } from '../data/culturalMotifs';
import { X, Sparkles, Compass, Shield, BookOpen } from 'lucide-react';

interface MotifDetailModalProps {
  motif: CulturalMotif | null;
  onClose: () => void;
  theme: ColorTheme;
}

export const MotifDetailModal: React.FC<MotifDetailModalProps> = ({
  motif,
  onClose,
  theme,
}) => {
  if (!motif) return null;
  const p = THEME_PALETTES[theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#18181c] border-2 border-zinc-700 rounded-2xl shadow-2xl p-6 lg:p-8 text-[#FAF7F2] overflow-hidden"
        style={{
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px ${p.borderGlow}`,
        }}
      >
        {/* Top Decorative Kikoi Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-2 flex">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-[#F5B700]" />
          <div className="flex-1 bg-[#D63434]" />
          <div className="flex-1 bg-[#00A896]" />
          <div className="flex-1 bg-[#F5B700]" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800/80 hover:bg-zinc-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Content */}
        <div className="mt-2 pr-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5B700] font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Traditional Cultural Motif Analysis</span>
          </div>

          <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mt-2 leading-tight">
            {motif.title}
          </h3>

          <p className="text-sm font-medium italic text-zinc-400 mt-1">
            Luganda: {motif.lugandaTitle}
          </p>
        </div>

        {/* Description Deck */}
        <p className="text-sm text-zinc-300 mt-4 leading-relaxed border-l-2 border-[#F5B700] pl-3.5 py-1 bg-zinc-900/40 rounded-r-lg">
          {motif.shortDesc}
        </p>

        {/* Structured Knowledge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Symbolism */}
          <div className="bg-zinc-900/70 p-4 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              <Shield className="w-4 h-4 text-[#00A896]" />
              <span>Cultural Symbolism</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {motif.symbolism}
            </p>
          </div>

          {/* Regional Origin */}
          <div className="bg-zinc-900/70 p-4 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              <Compass className="w-4 h-4 text-[#F5B700]" />
              <span>Geographic & Heritage Roots</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {motif.culturalOrigin}
            </p>
          </div>
        </div>

        {/* Independence Day Section */}
        <div className="mt-4 bg-gradient-to-r from-red-950/40 via-zinc-900 to-amber-950/30 p-4 rounded-xl border border-red-900/40">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFD100] mb-1.5">
            <BookOpen className="w-4 h-4 text-[#D63434]" />
            <span>Uganda Independence Day Connection (Oct 9, 1962)</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed">
            {motif.independenceSignificance}
          </p>
        </div>

        {/* Visual Anchor Indicator */}
        <div className="mt-5 flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-800">
          <span>
            Visual Position: <strong className="text-zinc-200">{motif.visualAnchor}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#F5B700] hover:bg-[#e0a600] text-black font-semibold rounded-lg text-xs transition-colors"
          >
            Continue Visual Display
          </button>
        </div>
      </div>
    </div>
  );
};
