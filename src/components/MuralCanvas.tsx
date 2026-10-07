import React, { useState } from 'react';
import { ColorTheme, AnimationSpeed } from '../types/mural';
import { THEME_PALETTES, CULTURAL_MOTIFS } from '../data/culturalMotifs';

interface MuralCanvasProps {
  theme: ColorTheme;
  speed: AnimationSpeed;
  beatIntensity?: number;
  onSelectMotif: (motifId: string) => void;
  selectedMotifId?: string | null;
  interactive?: boolean;
}

export const MuralCanvas: React.FC<MuralCanvasProps> = ({
  theme,
  speed,
  beatIntensity = 0,
  onSelectMotif,
  selectedMotifId,
  interactive = true,
}) => {
  const [hoveredMotif, setHoveredMotif] = useState<string | null>(null);
  const p = THEME_PALETTES[theme];

  const isAnimated = speed !== 'paused';
  const animClass = (baseClass: string) => (isAnimated ? baseClass : '');

  // Calculate beat pulse scale for drum beat
  const drumScale = 1 + beatIntensity * 0.04;
  const drumRingScale = 1 + beatIntensity * 0.08;

  const handleMotifClick = (id: string) => {
    if (interactive) {
      onSelectMotif(id);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-2xl border-4 border-[#18181b] bg-[#111113]">
      {/* Interactive Tooltip Overlay */}
      {hoveredMotif && (
        <div className="absolute top-4 left-4 z-30 pointer-events-none transition-all duration-300">
          <div className="bg-[#18181c]/95 border border-[#F5B700]/70 text-white px-3.5 py-1.5 rounded-md shadow-xl backdrop-blur-md flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5B700] animate-ping" />
            <span className="font-semibold text-xs tracking-wider text-[#FAF7F2]">
              {CULTURAL_MOTIFS.find((m) => m.id === hoveredMotif)?.title || 'Cultural Motif'}
            </span>
            <span className="text-[10px] text-zinc-400">· Click to explore</span>
          </div>
        </div>
      )}

      {/* Main SVG Architectural Mural Vector Canvas */}
      <svg
        viewBox="0 0 1920 820"
        className="w-full h-auto block select-none transition-colors duration-700"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: beatIntensity > 0.5 ? 'drop-shadow(0 0 10px rgba(245, 183, 0, 0.25))' : 'none',
        }}
      >
        <defs>
          {/* Subtle architectural concrete/plaster texture filter */}
          <filter id="plaster-texture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" />
            <feComposite in2="SourceGraphic" in="gl" operator="over" />
          </filter>

          {/* Golden glow filter for selected/active motif */}
          <filter id="motif-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feFlood floodColor="#F5B700" floodOpacity="0.8" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pattern: Parallel Vertical Hatching */}
          <pattern id="pattern-vertical-hatch" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill={p.teal} />
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="16"
              stroke="#111111"
              strokeWidth="3.5"
              className={animClass('animate-shimmer-hatch')}
            />
          </pattern>

          {/* Pattern: Parallel Diagonal Hatching (Chevron Angle) */}
          <pattern id="pattern-diag-hatch" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="20" height="20" fill={p.navy} />
            <line
              x1="0"
              y1="10"
              x2="20"
              y2="10"
              stroke={p.tealLight}
              strokeWidth="3"
              className={animClass('animate-shimmer-hatch')}
            />
          </pattern>

          {/* Pattern: Dense Horizontal Striped Hatching (Red Block) */}
          <pattern id="pattern-horiz-stripes" width="100" height="16" patternUnits="userSpaceOnUse">
            <rect width="100" height="16" fill={p.terracotta} />
            <line x1="0" y1="8" x2="100" y2="8" stroke="#111111" strokeWidth="4.5" />
          </pattern>

          {/* Pattern: Golden Beadwork Dots on Navy */}
          <pattern id="pattern-beadwork" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill={p.navyDark} />
            <circle cx="8" cy="8" r="3.2" fill={p.gold} />
            <circle cx="20" cy="20" r="3.2" fill={p.gold} />
            <circle cx="20" cy="8" r="1.5" fill={p.ivory} opacity="0.6" />
          </pattern>

          {/* Pattern: Chevron Herringbone Zigzag */}
          <pattern id="pattern-zigzag" width="30" height="20" patternUnits="userSpaceOnUse">
            <rect width="30" height="20" fill={p.gold} />
            <path
              d="M0,10 L15,0 L30,10 L15,20 Z"
              fill="none"
              stroke="#111111"
              strokeWidth="3"
            />
          </pattern>

          {/* Kikoi Woven Slats Pattern */}
          <pattern id="pattern-kikoi-slats" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="10" fill={p.gold} />
            <rect y="10" width="40" height="10" fill={p.terracotta} />
            <rect y="20" width="40" height="10" fill={p.teal} />
            <rect y="30" width="40" height="10" fill={p.orange} />
            <line x1="0" y1="0" x2="40" y2="0" stroke="#111111" strokeWidth="2" />
            <line x1="0" y1="10" x2="40" y2="10" stroke="#111111" strokeWidth="2" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="#111111" strokeWidth="2" />
            <line x1="0" y1="30" x2="40" y2="30" stroke="#111111" strokeWidth="2" />
          </pattern>
        </defs>

        {/* Global Structural Outlines Group: Bold 6px black stained-glass/mural lines */}
        <g stroke="#111111" strokeWidth="6.5" strokeLinejoin="miter" strokeLinecap="square">

          {/* ========================================================
              SECTION 1: LEFT WING - ARCS, CHEVRONS, BEADWORK & SUNBURST
             ======================================================== */}

          {/* 1A. Top-Left Arc Quadrant & Concentric Curves */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredMotif('sunburst-crane')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('sunburst-crane')}
            filter={selectedMotifId === 'sunburst-crane' ? 'url(#motif-glow)' : undefined}
          >
            {/* Outer Arc Wedge in Gold */}
            <path
              d="M0,0 L220,0 C220,120 120,220 0,220 Z"
              fill={p.gold}
            />
            {/* Middle Arc Stripe in Terracotta */}
            <path
              d="M0,0 L160,0 C160,88 88,160 0,160 Z"
              fill={p.terracotta}
            />
            {/* Inner Dark Navy Arc Core */}
            <path
              d="M0,0 L100,0 C100,55 55,100 0,100 Z"
              fill={p.navyDark}
            />
            {/* Radiating Spoke Lines in Arc */}
            <line x1="0" y1="0" x2="190" y2="100" stroke="#111111" strokeWidth="4.5" />
            <line x1="0" y1="0" x2="100" y2="190" stroke="#111111" strokeWidth="4.5" />
          </g>

          {/* 1B. Upper-Left Diagonal Chevron & Vertical Hatching Panel */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredMotif('ankole-chevrons')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('ankole-chevrons')}
            filter={selectedMotifId === 'ankole-chevrons' ? 'url(#motif-glow)' : undefined}
          >
            {/* Triangle with Vertical Hatching */}
            <polygon
              points="220,0 620,0 220,200"
              fill="url(#pattern-vertical-hatch)"
            />
            {/* Chevron Zigzag Border Strip */}
            <polygon
              points="220,200 620,0 660,110 320,250"
              fill={p.gold}
            />
            {/* Zigzag teeth path inside strip */}
            <path
              d="M230,195 L270,160 L310,195 L350,155 L390,185 L430,145 L470,175 L510,135 L550,165 L590,125 L630,155"
              fill="none"
              stroke="#111111"
              strokeWidth="5"
            />
          </g>

          {/* 1C. Inverted Turquoise / Navy Triangle with Nested Triangular Hatching */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredMotif('totem-shield')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('totem-shield')}
          >
            {/* Large Inverted Polygon */}
            <polygon
              points="0,220 220,220 320,250 220,440 0,440"
              fill={p.teal}
            />
            {/* Inner Diagonal Hatched Triangle */}
            <polygon
              points="30,250 200,250 115,400"
              fill="url(#pattern-diag-hatch)"
            />
            {/* Concentric triangular contour lines */}
            <polygon
              points="55,270 175,270 115,370"
              fill="none"
              stroke={p.gold}
              strokeWidth="4"
            />
            <polygon
              points="80,290 150,290 115,340"
              fill={p.terracotta}
              stroke="#111111"
              strokeWidth="3.5"
            />
          </g>

          {/* 1D. Terracotta Orange Diagonal Wedge */}
          <polygon
            points="220,200 660,110 660,430 220,440"
            fill={p.terracotta}
          />

          {/* 1E. Lower-Left Section: Beadwork Constellation Panel */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredMotif('beadwork-constellation')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('beadwork-constellation')}
            filter={selectedMotifId === 'beadwork-constellation' ? 'url(#motif-glow)' : undefined}
          >
            {/* Beadwork Polka Dot Fill Panel */}
            <polygon
              points="0,440 220,440 220,630 0,630"
              fill="url(#pattern-beadwork)"
            />
            {/* Diagonal chevron divider bands with bead dots */}
            <line x1="0" y1="460" x2="220" y2="610" stroke={p.gold} strokeWidth="4" />
            <line x1="0" y1="480" x2="220" y2="630" stroke="#111111" strokeWidth="4" />
          </g>

          {/* 1F. Crested Crane Sunburst Crescent & Golden Arches (Bottom Left) */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredMotif('sunburst-crane')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('sunburst-crane')}
            filter={selectedMotifId === 'sunburst-crane' ? 'url(#motif-glow)' : undefined}
          >
            {/* Outer Golden Arches */}
            <path
              d="M0,630 L220,630 C220,735 120,820 0,820 Z"
              fill={p.gold}
            />
            {/* Inner Red Half-Disc with Crest Teeth */}
            <path
              d="M0,680 L180,680 C180,755 95,820 0,820 Z"
              fill={p.terracotta}
            />
            {/* Radiating Sunburst Triangular Teeth (Crested Crane Crown) */}
            <polygon points="20,680 40,730 60,680" fill={p.gold} />
            <polygon points="60,680 80,735 100,680" fill={p.gold} />
            <polygon points="100,680 120,735 140,680" fill={p.gold} />
            <polygon points="140,680 155,730 170,680" fill={p.gold} />

            {/* Deep Navy Ground Arch */}
            <path
              d="M0,740 L110,740 C110,784 55,820 0,820 Z"
              fill={p.navyDark}
            />
          </g>

          {/* 1G. Mid-Lower Triangle with Diagonals */}
          <polygon
            points="220,440 660,430 450,710 220,630"
            fill={p.navy}
          />
          {/* Inner Teal Wedge */}
          <polygon
            points="250,470 580,460 430,680 250,600"
            fill={p.teal}
          />
          {/* Diagonal hatch lines in teal polygon */}
          <line x1="280" y1="480" x2="430" y2="630" stroke="#111111" strokeWidth="5" />
          <line x1="330" y1="480" x2="470" y2="620" stroke="#111111" strokeWidth="5" />
          <line x1="380" y1="480" x2="520" y2="610" stroke="#111111" strokeWidth="5" />
          <line x1="430" y1="480" x2="560" y2="600" stroke="#111111" strokeWidth="5" />

          {/* Lower Golden Segment */}
          <polygon
            points="220,630 450,710 320,820 0,820"
            fill={p.gold}
          />
          <polygon
            points="320,820 450,710 660,820"
            fill={p.terracotta}
          />


          {/* ========================================================
              SECTION 2: CENTER-LEFT TRANSITION & THE ARCHITECTURAL TRUSS
             ======================================================== */}

          {/* 2A. Upper Turquoise Polygon & Gold Triangle */}
          <polygon
            points="620,0 860,0 860,300 660,110"
            fill={p.gold}
          />
          <polygon
            points="660,110 860,300 660,430"
            fill={p.teal}
          />
          {/* Terracotta Chevron Insert */}
          <polygon
            points="700,200 820,290 700,370"
            fill={p.orange}
            stroke="#111111"
            strokeWidth="5"
          />

          {/* 2B. Horizontal Ribbed Panel (Kikoi Woven Weft Block) */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredMotif('kikoi-weave')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('kikoi-weave')}
            filter={selectedMotifId === 'kikoi-weave' ? 'url(#motif-glow)' : undefined}
          >
            <rect
              x="660"
              y="430"
              width="200"
              height="280"
              fill="url(#pattern-horiz-stripes)"
            />
            {/* Highlighting border around the Kikoi ribbed panel */}
            <rect
              x="660"
              y="430"
              width="200"
              height="280"
              fill="none"
              stroke="#111111"
              strokeWidth="6.5"
            />
          </g>

          {/* 2C. Lower Gold Triangle with Inner Terracotta Accent */}
          <polygon
            points="660,710 860,710 860,820 660,820"
            fill={p.gold}
          />
          <polygon
            points="700,820 760,740 820,820"
            fill={p.terracotta}
          />

          {/* 2D. Akasolya: Architectural White Lattice Truss (Vertical Column) */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:opacity-95"
            onMouseEnter={() => setHoveredMotif('vertical-truss')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('vertical-truss')}
            filter={selectedMotifId === 'vertical-truss' ? 'url(#motif-glow)' : undefined}
          >
            {/* White Column Base */}
            <rect
              x="860"
              y="300"
              width="85"
              height="520"
              fill="#FFFFFF"
            />
            {/* Vertical column boundary lines */}
            <line x1="860" y1="300" x2="860" y2="820" stroke="#111111" strokeWidth="6" />
            <line x1="945" y1="300" x2="945" y2="820" stroke="#111111" strokeWidth="6" />

            {/* Repeating X-Lattice cells */}
            {[300, 370, 440, 510, 580, 650, 720].map((y, idx) => (
              <g key={idx}>
                {/* Horizontal dividing rung */}
                <line x1="860" y1={y + 70} x2="945" y2={y + 70} stroke="#111111" strokeWidth="4.5" />
                {/* Diagonal "X" cross lines */}
                <line x1="860" y1={y} x2="945" y2={y + 70} stroke="#111111" strokeWidth="4" />
                <line x1="945" y1={y} x2="860" y2={y + 70} stroke="#111111" strokeWidth="4" />
              </g>
            ))}
          </g>

          {/* Diagonal Ochre connector above the truss */}
          <polygon
            points="860,0 1020,0 945,300 860,300"
            fill={p.teal}
          />
          {/* Yellow wedge adjacent */}
          <polygon
            points="945,240 1020,0 1080,180"
            fill={p.gold}
          />


          {/* ========================================================
              SECTION 3: CENTERPIECE - THE SACRED DIAMOND TOTEM & DIAGONALS
             ======================================================== */}

          {/* 3A. Diagonal Stripes flanking left of the diamond */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredMotif('ankole-chevrons')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('ankole-chevrons')}
          >
            {/* Diagonal Turquoise Stripe */}
            <polygon
              points="945,300 1080,180 1160,280 945,450"
              fill={p.teal}
            />
            {/* Diagonal Terracotta Stripe */}
            <polygon
              points="945,450 1160,280 1195,335 945,550"
              fill={p.terracotta}
            />
            {/* Diagonal Sunshine Yellow Stripe */}
            <polygon
              points="945,550 1195,335 1240,410 945,690"
              fill={p.gold}
            />
            {/* Diagonal Navy Stripe */}
            <polygon
              points="945,690 1240,410 1150,600 945,820"
              fill={p.navy}
            />
          </g>

          {/* 3B. THE SACRED ENGABO DIAMOND TOTEM (CENTERPIECE SHIELD) */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
            onMouseEnter={() => setHoveredMotif('totem-shield')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('totem-shield')}
            filter={selectedMotifId === 'totem-shield' ? 'url(#motif-glow)' : undefined}
            style={{
              transformOrigin: '1240px 450px',
              transform: `scale(${drumScale})`,
              transition: 'transform 0.12s ease-out',
            }}
          >
            {/* Outer Diamond White Border */}
            <polygon
              points="1240,240 1370,450 1240,660 1110,450"
              fill="#FFFFFF"
              stroke="#111111"
              strokeWidth="7"
            />

            {/* Inner Bold Black Diamond Frame */}
            <polygon
              points="1240,265 1345,450 1240,635 1135,450"
              fill={p.wallColor}
              stroke="#111111"
              strokeWidth="5"
            />

            {/* TOP APEX: Concentric Nested Triangles (Pyramid / Spiral) */}
            {/* Outer Gold Triangle */}
            <polygon
              points="1240,285 1315,405 1165,405"
              fill={p.gold}
              stroke="#111111"
              strokeWidth="4"
            />
            {/* Middle Teal Triangle */}
            <polygon
              points="1240,315 1290,395 1190,395"
              fill={p.teal}
              stroke="#111111"
              strokeWidth="3.5"
            />
            {/* Inner Terracotta Triangle with Eye */}
            <polygon
              points="1240,340 1270,385 1210,385"
              fill={p.terracotta}
              stroke="#111111"
              strokeWidth="3"
            />
            <circle cx="1240" cy="365" r="4" fill="#FFFFFF" />

            {/* CENTER WAIST: White Chevron Zigzag Belt ("W W W / M M M") */}
            <rect
              x="1128"
              y="412"
              width="224"
              height="40"
              fill="#FFFFFF"
              stroke="#111111"
              strokeWidth="5"
            />
            {/* Crisp Chevron / Diamond Zigzag Hieroglyphic path */}
            <path
              d="M1135,432 L1152,414 L1169,432 L1186,414 L1203,432 L1220,414 L1237,432 L1254,414 L1271,432 L1288,414 L1305,432 L1322,414 L1339,432 L1350,422"
              fill="none"
              stroke="#111111"
              strokeWidth="4.5"
            />
            <path
              d="M1135,432 L1152,450 L1169,432 L1186,450 L1203,432 L1220,450 L1237,432 L1254,450 L1271,432 L1288,450 L1305,432 L1322,450 L1339,432"
              fill="none"
              stroke="#111111"
              strokeWidth="4.5"
            />

            {/* BOTTOM APEX: Inverted Nested Triangles */}
            {/* Outer Terracotta Inverted Triangle */}
            <polygon
              points="1240,615 1315,455 1165,455"
              fill={p.terracotta}
              stroke="#111111"
              strokeWidth="4"
            />
            {/* Middle Teal Inverted Triangle */}
            <polygon
              points="1240,585 1290,465 1190,465"
              fill={p.teal}
              stroke="#111111"
              strokeWidth="3.5"
            />
            {/* Inner Gold Inverted Triangle */}
            <polygon
              points="1240,560 1270,475 1210,475"
              fill={p.gold}
              stroke="#111111"
              strokeWidth="3"
            />
          </g>

          {/* Lower Turquoise Inverted Triangle beneath the Shield */}
          <polygon
            points="1240,660 1370,450 1300,740"
            fill={p.teal}
          />
          <polygon
            points="1240,660 1150,600 1200,820 1300,820"
            fill={p.teal}
          />


          {/* ========================================================
              SECTION 4: RIGHT FLANK - HORIZONTAL SLATS & ROYAL DRUM
             ======================================================== */}

          {/* 4A. Upper Multicolored Horizontal Slat Grid (Kikoi Slats) */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredMotif('kikoi-weave')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('kikoi-weave')}
            filter={selectedMotifId === 'kikoi-weave' ? 'url(#motif-glow)' : undefined}
          >
            {/* Slats container polygon */}
            <polygon
              points="1370,300 1510,310 1510,480 1370,450"
              fill="url(#pattern-kikoi-slats)"
            />
            {/* Slats frame */}
            <polygon
              points="1370,300 1510,310 1510,480 1370,450"
              fill="none"
              stroke="#111111"
              strokeWidth="6"
            />
          </g>

          {/* Diagonal ochre cap above slats */}
          <polygon
            points="1020,0 1510,0 1510,310 1370,300 1240,240 1080,180"
            fill={p.gold}
          />
          {/* Crimson wedge at top right ceiling */}
          <polygon
            points="1280,0 1510,0 1480,220"
            fill={p.terracotta}
          />

          {/* 4B. NGOMA: THE CEREMONIAL ROYAL DRUM / BULLSEYE TARGET */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredMotif('royal-drum')}
            onMouseLeave={() => setHoveredMotif(null)}
            onClick={() => handleMotifClick('royal-drum')}
            filter={selectedMotifId === 'royal-drum' ? 'url(#motif-glow)' : undefined}
            style={{
              transformOrigin: '1430px 620px',
              transform: `scale(${drumRingScale})`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Outer Terracotta Arch & Polygon Foundation */}
            <polygon
              points="1370,450 1510,480 1520,730 1350,730"
              fill={p.orange}
            />

            {/* Concentric Drum Rings: Outer Ring (Terracotta / Orange) */}
            <circle
              cx="1430"
              cy="620"
              r="76"
              fill={p.terracotta}
              stroke="#111111"
              strokeWidth="6"
            />

            {/* Middle Ring (Ivory / Chalk White) */}
            <circle
              cx="1430"
              cy="620"
              r="54"
              fill={p.ivory}
              stroke="#111111"
              strokeWidth="5"
            />

            {/* Inner Ring (Deep Midnight Slate / Navy) */}
            <circle
              cx="1430"
              cy="620"
              r="34"
              fill={p.navyDark}
              stroke="#111111"
              strokeWidth="4.5"
            />

            {/* Center Drum Hub with Cardinal Cross / Royal Peg Mark */}
            <circle
              cx="1430"
              cy="620"
              r="14"
              fill="#FFFFFF"
              stroke="#111111"
              strokeWidth="3.5"
            />
            {/* 4-direction cross peg */}
            <line x1="1430" y1="610" x2="1430" y2="630" stroke="#111111" strokeWidth="2.5" />
            <line x1="1420" y1="620" x2="1440" y2="620" stroke="#111111" strokeWidth="2.5" />
          </g>

          {/* Lower Triangles at Right Base */}
          <polygon
            points="1300,740 1430,730 1520,730 1520,820 1200,820"
            fill={p.navy}
          />
          <polygon
            points="1350,820 1440,750 1520,820"
            fill={p.gold}
          />


          {/* ========================================================
              SECTION 5: FAR RIGHT WING - CULTURAL PATTERN & HALLWAY EXTENSION
             ======================================================== */}

          {/* Crimson & Maroon Heritage Wallpaper panel */}
          <polygon
            points="1510,0 1720,0 1720,820 1510,820"
            fill={p.redDark}
          />

          {/* Traditional motif filigree linework on right panel */}
          <path
            d="M1520,100 C1560,70 1600,140 1640,110 C1680,80 1710,130 1710,180"
            fill="none"
            stroke={p.gold}
            strokeWidth="3.5"
            opacity="0.85"
          />
          <path
            d="M1520,250 C1570,220 1610,290 1660,260 C1700,230 1710,290 1710,340"
            fill="none"
            stroke={p.gold}
            strokeWidth="3.5"
            opacity="0.85"
          />
          <path
            d="M1520,400 C1560,370 1620,440 1660,410 C1700,380 1710,430 1710,490"
            fill="none"
            stroke={p.gold}
            strokeWidth="3.5"
            opacity="0.85"
          />

          {/* Yellow Chevron Triangular Inset */}
          <polygon
            points="1510,420 1620,380 1600,540 1510,500"
            fill={p.gold}
            stroke="#111111"
            strokeWidth="5"
          />

          {/* Bottom Right Golden Corner */}
          <polygon
            points="1510,680 1640,650 1720,720 1720,820 1510,820"
            fill={p.gold}
          />


          {/* ========================================================
              SECTION 6: ARCHITECTURAL PILLAR (MURAL-WRAPPED COLUMN)
              (Directly matching the freestanding pillar in the photo!)
             ======================================================== */}
          <g className="cursor-pointer" onClick={() => handleMotifClick('ankole-chevrons')}>
            {/* Column Body Frame */}
            <rect
              x="1760"
              y="120"
              width="140"
              height="700"
              fill={p.wallColor}
              stroke="#111111"
              strokeWidth="7"
            />
            {/* Top Ceiling Joint */}
            <polygon
              points="1740,120 1920,120 1900,90 1760,90"
              fill="#2A2A2E"
              stroke="#111111"
              strokeWidth="4"
            />

            {/* Alternating Diagonal Chevron Bands wrapped around the pillar */}
            {[
              { y: 120, color: p.gold },
              { y: 180, color: p.terracotta },
              { y: 240, color: p.teal },
              { y: 300, color: p.navyDark },
              { y: 360, color: p.gold },
              { y: 420, color: p.terracotta },
              { y: 480, color: p.teal },
              { y: 540, color: p.navyDark },
              { y: 600, color: p.gold },
              { y: 660, color: p.terracotta },
              { y: 720, color: p.teal },
              { y: 780, color: p.navyDark },
            ].map((stripe, idx) => (
              <polygon
                key={idx}
                points={`1760,${stripe.y} 1900,${stripe.y + 70} 1900,${stripe.y + 115} 1760,${stripe.y + 45}`}
                fill={stripe.color}
                stroke="#111111"
                strokeWidth="4"
              />
            ))}
          </g>

        </g>
      </svg>
    </div>
  );
};
