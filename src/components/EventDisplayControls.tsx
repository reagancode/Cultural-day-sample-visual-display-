import React from 'react';
import { ColorTheme, AnimationSpeed, DisplayView } from '../types/mural';
import { THEME_PALETTES } from '../data/culturalMotifs';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Palette,
  Eye,
  Sliders,
  Music,
} from 'lucide-react';

interface EventDisplayControlsProps {
  currentView: DisplayView;
  onViewChange: (view: DisplayView) => void;
  speed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
  theme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  audioPlaying: boolean;
  onToggleAudio: () => void;
  audioVolume: number;
  onVolumeChange: (vol: number) => void;
  onTriggerConfetti: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  presentationMode: boolean;
  onTogglePresentationMode: () => void;
}

export const EventDisplayControls: React.FC<EventDisplayControlsProps> = ({
  currentView,
  onViewChange,
  speed,
  onSpeedChange,
  theme,
  onThemeChange,
  audioPlaying,
  onToggleAudio,
  audioVolume,
  onVolumeChange,
  onTriggerConfetti,
  isFullscreen,
  onToggleFullscreen,
  presentationMode,
  onTogglePresentationMode,
}) => {
  const p = THEME_PALETTES[theme];

  const themesList: { id: ColorTheme; label: string }[] = [
    { id: 'authentic', label: 'Authentic Mural' },
    { id: 'uganda-flag', label: 'Independence Tri-Color' },
    { id: 'royal-barkcloth', label: 'Royal Barkcloth' },
    { id: 'lake-victoria', label: 'Lake Victoria' },
  ];

  const viewsList: { id: DisplayView; label: string }[] = [
    { id: 'mural', label: 'Panoramic Mural' },
    { id: 'hallway-perspective', label: 'Hallway 3D' },
    { id: 'kikoi-tapestry', label: 'Kikoi Weave' },
    { id: 'story-guide', label: 'Motifs & Story' },
  ];

  return (
    <div className="bg-[#18181c]/95 border border-zinc-700/80 rounded-2xl p-4 lg:p-5 shadow-2xl backdrop-blur-xl text-white">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left: View Modes */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800 shrink-0 w-full lg:w-auto overflow-x-auto">
          {viewsList.map((v) => (
            <button
              key={v.id}
              onClick={() => onViewChange(v.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                currentView === v.id
                  ? 'bg-[#F5B700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Center: Animation Speeds & Drums */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Play/Pause */}
          <button
            onClick={() => onSpeedChange(speed === 'paused' ? 'festive' : 'paused')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
            title="Toggle Visual Animation"
          >
            {speed === 'paused' ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#00A896]" />
                <span>Resume Motion</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-[#F5B700]" />
                <span>Pause Motion</span>
              </>
            )}
          </button>

          {/* Speed Selector */}
          {speed !== 'paused' && (
            <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
              {(['calm', 'festive', 'dance'] as AnimationSpeed[]).map((sp) => (
                <button
                  key={sp}
                  onClick={() => onSpeedChange(sp)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md capitalize transition-all ${
                    speed === sp
                      ? 'bg-zinc-200 text-black shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>
          )}

          {/* Audio Drum Synthesizer Control */}
          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={onToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                audioPlaying
                  ? 'bg-[#D63434] text-white shadow-md animate-pulse'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>{audioPlaying ? 'Ngoma Drums Active' : 'Play Drums'}</span>
            </button>

            {audioPlaying && (
              <div className="flex items-center gap-1 px-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioVolume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-16 accent-[#F5B700] h-1.5 cursor-pointer"
                  title="Drum Volume"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Themes & Presentation Utilities */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          {/* Theme Selector Dropdown / Pills */}
          <div className="relative group">
            <select
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as ColorTheme)}
              aria-label="Color Palette"
              className="bg-zinc-900 text-xs font-semibold text-zinc-200 border border-zinc-700 rounded-xl px-3 py-2 pr-7 cursor-pointer hover:border-[#F5B700] transition-colors focus:outline-none"
            >
              {themesList.map((th) => (
                <option key={th.id} value={th.id} className="bg-zinc-900 text-white">
                  {th.label}
                </option>
              ))}
            </select>
          </div>

          {/* Independence Confetti Blast */}
          <button
            onClick={onTriggerConfetti}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#D63434] via-[#F5B700] to-black hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95"
            title="Celebrate Uganda Independence"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span className="hidden sm:inline">Celebrate!</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={onTogglePresentationMode}
            className={`p-2 rounded-xl border transition-colors ${
              presentationMode
                ? 'bg-[#F5B700] text-black border-[#F5B700]'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white'
            }`}
            title={presentationMode ? 'Show Full Interface' : 'Stage Backdrop Mode (Clean Screen)'}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl border border-zinc-700 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Event Projection'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
