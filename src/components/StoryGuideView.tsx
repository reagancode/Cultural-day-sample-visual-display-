import React from 'react';
import { CULTURAL_MOTIFS, THEME_PALETTES } from '../data/culturalMotifs';
import { ColorTheme } from '../types/mural';
import { Shield, Sparkles, BookOpen } from 'lucide-react';

interface StoryGuideViewProps {
  theme: ColorTheme;
  onSelectMotif: (id: string) => void;
}

export const StoryGuideView: React.FC<StoryGuideViewProps> = ({ theme, onSelectMotif }) => {
  const p = THEME_PALETTES[theme];

  return (
    <div className="bg-[#18181c] border border-zinc-800 rounded-xl p-6 lg:p-10 shadow-2xl text-[#FAF7F2]">
      {/* Curatorial Header */}
      <div className="max-w-3xl border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5B700] font-semibold mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Curatorial Monograph & Pattern Catalog</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-white">
          The Geometry of Freedom: Uganda Cultural Mural
        </h2>
        <p className="text-base text-zinc-300 mt-3 leading-relaxed">
          On October 9, 1962, Uganda lowered the Union Jack and raised the Black, Yellow, and Red flag at Kololo Independence Grounds. This architectural mural translates centuries of African geometric traditions—from Kasubi thatch lattices to Ankole beadwork and royal ceremonial drums—into a monument of modern independence.
        </p>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {CULTURAL_MOTIFS.map((motif, index) => (
          <div
            key={motif.id}
            onClick={() => onSelectMotif(motif.id)}
            className="group cursor-pointer bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-[#F5B700]/60 p-6 rounded-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              {/* Index & Luganda name */}
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span className="font-mono text-[#F5B700]">0{index + 1}.</span>
                <span className="italic">{motif.lugandaTitle}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-display font-bold text-white group-hover:text-[#F5B700] transition-colors">
                {motif.title}
              </h3>

              {/* Short summary */}
              <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed">
                {motif.shortDesc}
              </p>

              {/* Symbolism breakdown */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80">
                <div className="text-[11px] font-semibold text-[#00A896] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  <span>Cultural Meaning</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal line-clamp-3">
                  {motif.symbolism}
                </p>
              </div>
            </div>

            {/* Bottom Anchor button */}
            <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400 text-[11px] truncate max-w-[170px]">
                {motif.visualAnchor}
              </span>
              <span className="text-[#F5B700] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Explore →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
