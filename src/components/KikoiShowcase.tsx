import React, { useState } from 'react';
import { ColorTheme } from '../types/mural';
import { THEME_PALETTES } from '../data/culturalMotifs';
import { Sparkles, Layers, Sliders } from 'lucide-react';

interface KikoiShowcaseProps {
  theme: ColorTheme;
  onApplyTheme: (theme: ColorTheme) => void;
}

export const KikoiShowcase: React.FC<KikoiShowcaseProps> = ({ theme, onApplyTheme }) => {
  const [selectedPreset, setSelectedPreset] = useState<'independence' | 'kwanjula' | 'safari' | 'victoria'>('independence');
  const [tasselLength, setTasselLength] = useState<number>(36);
  const [density, setDensity] = useState<'standard' | 'fine' | 'broad'>('standard');

  const p = THEME_PALETTES[theme];

  const presets = [
    {
      id: 'independence',
      name: 'Uganda Independence 1962 Kikoi',
      themeMatch: 'uganda-flag' as ColorTheme,
      tag: 'National Pride',
      description: 'Bold Black, Sunflower Gold, and Crimson Red stripes with crisp white peace selvedge lines, commemorating October 9, 1962.',
      stripes: ['#000000', '#FFD100', '#D63434', '#FFFFFF', '#000000', '#FFD100', '#D63434'],
    },
    {
      id: 'kwanjula',
      name: 'Buganda Royal Ceremonial Kikoi',
      themeMatch: 'royal-barkcloth' as ColorTheme,
      tag: 'Kwanjula Wedding',
      description: 'Earthy terracotta, warm marigold, and barkcloth brown accents worn with Gomasi and Kanzu regalia.',
      stripes: ['#1C1512', '#C98A2C', '#9E3D24', '#FAF5EE', '#C98A2C', '#6A2312'],
    },
    {
      id: 'safari',
      name: 'Modern African Geometric Weave',
      themeMatch: 'authentic' as ColorTheme,
      tag: 'Mural Inspiration',
      description: 'The exact high-contrast palette from the architectural mural: turquoise teal, vibrant gold, terracotta, and deep indigo.',
      stripes: ['#1D3557', '#00A896', '#F5B700', '#D63434', '#E76F51', '#F4EBD9'],
    },
    {
      id: 'victoria',
      name: 'Lake Nalubaale (Victoria) Kikoi',
      themeMatch: 'lake-victoria' as ColorTheme,
      tag: 'Aquatic Heritage',
      description: 'Deep cobalt lake blues with shimmering sunset amber and turquoise spray borders.',
      stripes: ['#03045E', '#00B4D8', '#F39C12', '#CAF0F8', '#00B4D8', '#03045E'],
    },
  ];

  const activePresetData = presets.find((pr) => pr.id === selectedPreset) || presets[0];

  return (
    <div className="bg-[#18181c] border border-zinc-800 rounded-xl p-6 lg:p-8 shadow-2xl text-[#FAF7F2]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5B700] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Traditional East African Textile Architecture</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-white">
            The Living Kikoi & Barkcloth Heritage
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Kikoi is the iconic hand-woven cotton textile of East Africa, famous for its vivid parallel border stripes and knotted hand-twisted tassels. Explore how these woven geometries translate directly into modern African mural art.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {presets.map((pr) => (
            <button
              key={pr.id}
              onClick={() => {
                setSelectedPreset(pr.id as typeof selectedPreset);
                onApplyTheme(pr.themeMatch);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedPreset === pr.id
                  ? 'bg-[#F5B700] text-black font-semibold shadow-md'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {pr.name.split(' ')[0]} {pr.name.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Interactive Loom Display */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Woven Fabric Preview */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative bg-[#111113] p-6 rounded-xl border border-zinc-800 shadow-inner overflow-hidden">
            {/* Woven Fabric Body */}
            <div
              className="relative w-full h-80 rounded-lg shadow-2xl overflow-hidden flex flex-col justify-between"
              style={{
                backgroundColor: activePresetData.stripes[0],
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            >
              {/* Top Kikoi Selvage Border */}
              <div className="flex flex-col w-full shadow-md">
                {activePresetData.stripes.map((c, i) => (
                  <div
                    key={i}
                    className="w-full transition-all duration-500"
                    style={{
                      height: `${density === 'fine' ? 4 : density === 'broad' ? 12 : 7}px`,
                      backgroundColor: c,
                    }}
                  />
                ))}
              </div>

              {/* Center Medallion / Woven Motif */}
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="border-4 border-dashed border-white/20 p-8 rounded-lg flex flex-col items-center backdrop-blur-xs text-center max-w-md">
                  <span className="text-xs uppercase tracking-widest text-[#F5B700] font-semibold">
                    {activePresetData.tag}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mt-1">
                    {activePresetData.name}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                    {activePresetData.description}
                  </p>
                </div>
              </div>

              {/* Bottom Kikoi Selvage Border */}
              <div className="flex flex-col w-full shadow-md">
                {[...activePresetData.stripes].reverse().map((c, i) => (
                  <div
                    key={i}
                    className="w-full transition-all duration-500"
                    style={{
                      height: `${density === 'fine' ? 4 : density === 'broad' ? 12 : 7}px`,
                      backgroundColor: c,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hand-Knotted Tassels along bottom edge */}
            <div className="flex justify-between items-start px-2 w-full pt-1 overflow-hidden" style={{ height: `${tasselLength + 16}px` }}>
              {Array.from({ length: 32 }).map((_, idx) => {
                const color = activePresetData.stripes[idx % activePresetData.stripes.length];
                const isAlt = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center ${isAlt ? 'animate-tassel-1' : 'animate-tassel-2'}`}
                    style={{ width: `${100 / 32}%` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full border border-black/40 shadow-xs"
                      style={{ backgroundColor: color }}
                    />
                    <div
                      className="w-0.5 opacity-90 shadow-sm"
                      style={{
                        height: `${tasselLength}px`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Textile Anatomy & Controls */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-zinc-900/60 p-5 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sliders className="w-4 h-4 text-[#F5B700]" />
            <span>Kikoi Weave Customizer</span>
          </div>

          {/* Stripe Density */}
          <div>
            <label className="text-xs text-zinc-400 block mb-2 font-medium">
              Selvage Stripe Width
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['fine', 'standard', 'broad'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDensity(d)}
                  className={`py-1.5 px-3 rounded-lg text-xs capitalize font-medium transition-all ${
                    density === d
                      ? 'bg-zinc-100 text-black font-semibold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Tassel Length Slider */}
          <div>
            <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
              <span>Tassel Fringe Length</span>
              <span className="font-mono text-zinc-200">{tasselLength}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              value={tasselLength}
              onChange={(e) => setTasselLength(Number(e.target.value))}
              className="w-full accent-[#F5B700] cursor-pointer"
            />
          </div>

          {/* Cultural Knowledge Cards */}
          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <div className="flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">Warp & Weft Philosophy</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                  In Ugandan tradition, individual threads are weak alone, but woven together into Kikoi stripes, they form an unbreakable fabric of community solidarity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#D63434] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">Independence Celebrations</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                  On October 9, Ugandans proudly wear Kikoi wraps, Gomesi with colorful sashes, and Kanzu robes, uniting tradition with patriotic celebration.
                </p>
              </div>
            </div>
          </div>

          {/* Apply to Mural Button */}
          <button
            onClick={() => onApplyTheme(activePresetData.themeMatch)}
            className="w-full py-2.5 px-4 bg-[#F5B700] hover:bg-[#e0a600] text-black font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-md"
          >
            Apply This Color Palette to Mural Wall
          </button>
        </div>
      </div>
    </div>
  );
};
