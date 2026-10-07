/**
 * Uganda Independence Cultural Display & Geometric Mural
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { ColorTheme, AnimationSpeed, DisplayView } from './types/mural';
import { THEME_PALETTES, CULTURAL_MOTIFS } from './data/culturalMotifs';
import { MuralCanvas } from './components/MuralCanvas';
import { HallwayPerspectiveView } from './components/HallwayPerspectiveView';
import { KikoiBorder } from './components/KikoiBorders';
import { KikoiShowcase } from './components/KikoiShowcase';
import { StoryGuideView } from './components/StoryGuideView';
import { EventDisplayControls } from './components/EventDisplayControls';
import { MotifDetailModal } from './components/MotifDetailModal';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { UgandanDrumEngine } from './utils/audioSynth';
import { Sparkles, Maximize2, Flag, Compass, Music2 } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ColorTheme>('authentic');
  const [speed, setSpeed] = useState<AnimationSpeed>('festive');
  const [view, setView] = useState<DisplayView>('mural');
  const [selectedMotifId, setSelectedMotifId] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.6);
  const [beatIntensity, setBeatIntensity] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);

  const drumEngineRef = useRef<UgandanDrumEngine | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, startTransition] = useTransition();

  // Initialize Web Audio drum engine
  useEffect(() => {
    const engine = new UgandanDrumEngine();
    engine.setOnBeat((step, drumType) => {
      // Trigger visual beat pulse
      setBeatIntensity(drumType === 'bass' ? 1.0 : 0.6);
      setTimeout(() => {
        setBeatIntensity(0);
      }, 140);
    });
    drumEngineRef.current = engine;

    return () => {
      engine.stop();
    };
  }, []);

  // Update tempo and volume when settings change
  useEffect(() => {
    if (drumEngineRef.current) {
      if (speed !== 'paused') {
        drumEngineRef.current.setTempo(speed);
      }
      drumEngineRef.current.setVolume(audioVolume);
    }
  }, [speed, audioVolume]);

  const toggleAudio = () => {
    if (!drumEngineRef.current) return;
    const isNowPlaying = drumEngineRef.current.toggle();
    setAudioPlaying(isNowPlaying);
  };

  const handleTriggerConfetti = () => {
    setShowConfetti(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard shortcut listeners (Space = pause/play, F = fullscreen, M = audio)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;

      if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleAudio();
      } else if (e.code === 'Space') {
        e.preventDefault();
        setSpeed((prev) => (prev === 'paused' ? 'festive' : 'paused'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFullscreen, toggleAudio]);

  const activeMotif = CULTURAL_MOTIFS.find((m) => m.id === selectedMotifId) || null;
  const currentPalette = THEME_PALETTES[theme];

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col transition-colors duration-700 bg-[#121215] text-[#FAF7F2] font-sans overflow-x-hidden"
      style={{
        backgroundColor: currentPalette.primaryBg,
      }}
    >
      {/* Confetti Celebration Particle Layer */}
      <ConfettiCanvas
        active={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Cultural Motif Inspection Dialog */}
      <MotifDetailModal
        motif={activeMotif}
        onClose={() => setSelectedMotifId(null)}
        theme={theme}
      />

      {/* Top Bar Navigation (Zero-Pill, 3-Zone Contract) */}
      {!presentationMode && (
        <header className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-zinc-800/80 bg-black/40 backdrop-blur-md z-30 sticky top-0">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFD100] border-2 border-red-600 shadow-[0_0_10px_rgba(255,209,0,0.8)]" />
            <a
              href="/"
              className="text-lg lg:text-xl font-display font-black tracking-tight text-white hover:text-[#F5B700] transition-colors"
            >
              UGANDA INDEPENDENCE CULTURAL DISPLAY
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <button
              onClick={() => setView('mural')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                view === 'mural' ? 'text-[#F5B700] border-[#F5B700]' : 'border-transparent'
              }`}
            >
              Panoramic Mural
            </button>
            <button
              onClick={() => setView('hallway-perspective')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                view === 'hallway-perspective' ? 'text-[#F5B700] border-[#F5B700]' : 'border-transparent'
              }`}
            >
              Hallway 3D View
            </button>
            <button
              onClick={() => setView('kikoi-tapestry')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                view === 'kikoi-tapestry' ? 'text-[#F5B700] border-[#F5B700]' : 'border-transparent'
              }`}
            >
              Kikoi Weave Loom
            </button>
            <button
              onClick={() => setView('story-guide')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                view === 'story-guide' ? 'text-[#F5B700] border-[#F5B700]' : 'border-transparent'
              }`}
            >
              Symbol Catalog
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPresentationMode(true)}
              className="px-4 py-2 text-xs font-bold text-black bg-[#F5B700] hover:bg-[#e0a600] rounded-lg transition-transform active:scale-95 shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Stage Projection</span>
            </button>
          </div>
        </header>
      )}

      {/* Floating Exit Button when in Presentation Mode */}
      {presentationMode && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <button
            onClick={() => setPresentationMode(false)}
            className="px-4 py-2 bg-black/80 text-white hover:bg-zinc-800 text-xs font-bold rounded-xl border border-zinc-700 backdrop-blur-md shadow-2xl transition-all"
          >
            Exit Stage Mode (Esc)
          </button>
        </div>
      )}

      {/* Main Content Arena */}
      <main className="flex-1 flex flex-col justify-center px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        {/* Curatorial Event Kicker (Hidden in presentation mode) */}
        {!presentationMode && (
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium tracking-wider mb-1.5">
                <Flag className="w-3.5 h-3.5 text-[#D63434]" />
                <span className="text-[#FFD100] font-semibold">9th October 1962</span>
                <span aria-hidden="true">·</span>
                <span>Kololo Independence Jubilee</span>
                <span aria-hidden="true">·</span>
                <span>The Pearl of Africa</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-display font-extrabold tracking-tight text-white">
                The Heritage Mural & Kikoi Display
              </h1>
              <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
                An authentic digital translation of the iconic East African geometric mural art: featuring the sacred Engabo diamond shield, ceremonial Ngoma drums, Ankole chevron weaves, and traditional Kikoi tassels in motion.
              </p>
            </div>

            {/* Quick motif highlight hint */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-zinc-800">
              <Compass className="w-4 h-4 text-[#F5B700]" />
              <span>Click any geometric panel on the mural to inspect its cultural meaning</span>
            </div>
          </div>
        )}

        {/* Master Display Container */}
        <div className="relative w-full flex flex-col gap-2">
          {/* Top Authentic Kikoi Border with Swaying Tassels */}
          <KikoiBorder
            theme={theme}
            position="top"
            showTassels={true}
            animated={speed !== 'paused'}
          />

          {/* Dynamic View Render */}
          <div className="relative w-full transition-all duration-500">
            {view === 'mural' && (
              <MuralCanvas
                theme={theme}
                speed={speed}
                beatIntensity={beatIntensity}
                onSelectMotif={(id) => setSelectedMotifId(id)}
                selectedMotifId={selectedMotifId}
                interactive={true}
              />
            )}

            {view === 'hallway-perspective' && (
              <HallwayPerspectiveView
                theme={theme}
                speed={speed}
                beatIntensity={beatIntensity}
                onSelectMotif={(id) => setSelectedMotifId(id)}
                selectedMotifId={selectedMotifId}
              />
            )}

            {view === 'kikoi-tapestry' && (
              <KikoiShowcase
                theme={theme}
                onApplyTheme={(th) => {
                  setTheme(th);
                  setView('mural');
                }}
              />
            )}

            {view === 'story-guide' && (
              <StoryGuideView
                theme={theme}
                onSelectMotif={(id) => {
                  setSelectedMotifId(id);
                }}
              />
            )}
          </div>

          {/* Bottom Authentic Kikoi Border with Swaying Tassels */}
          <KikoiBorder
            theme={theme}
            position="bottom"
            showTassels={true}
            animated={speed !== 'paused'}
          />
        </div>

        {/* Comprehensive Event Display Controls Bar */}
        <div className="mt-6 z-20">
          <EventDisplayControls
            currentView={view}
            onViewChange={setView}
            speed={speed}
            onSpeedChange={setSpeed}
            theme={theme}
            onThemeChange={setTheme}
            audioPlaying={audioPlaying}
            onToggleAudio={toggleAudio}
            audioVolume={audioVolume}
            onVolumeChange={setAudioVolume}
            onTriggerConfetti={handleTriggerConfetti}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            presentationMode={presentationMode}
            onTogglePresentationMode={() => setPresentationMode(!presentationMode)}
          />
        </div>

        {/* Quick Cultural Motif Pills Ribbon (Below display for easy touch access) */}
        {!presentationMode && (
          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 font-semibold uppercase tracking-wider">
              <span>Direct Motif Spotlight</span>
              <span className="text-[11px] text-zinc-500">Keyboard: [Space] Pause/Play · [M] Drums · [F] Fullscreen</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {CULTURAL_MOTIFS.map((motif) => (
                <button
                  key={motif.id}
                  onClick={() => setSelectedMotifId(motif.id)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all text-left flex items-center gap-2 ${
                    selectedMotifId === motif.id
                      ? 'bg-[#F5B700] text-black border-[#F5B700] font-bold shadow-lg'
                      : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedMotifId === motif.id ? 'bg-black' : 'bg-[#F5B700]'
                    }`}
                  />
                  <span>{motif.title.split(':')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Quiet Institutional Footer */}
      {!presentationMode && (
        <footer className="border-t border-zinc-800/80 py-6 px-6 lg:px-12 bg-black/40 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">Republic of Uganda</span>
            <span aria-hidden="true">·</span>
            <span>Independence Day Cultural Exhibition</span>
            <span aria-hidden="true">·</span>
            <span>For God and My Country</span>
          </div>
          <div>
            <span>Honoring African Geometric Architecture, Kikoi Textiles & Royal Heraldry</span>
          </div>
        </footer>
      )}
    </div>
  );
}
