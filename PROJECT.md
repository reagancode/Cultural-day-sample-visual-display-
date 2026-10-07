# Uganda Independence Cultural Display & Geometric Mural

A responsive, animated cultural visual display and digital exhibition built for **Uganda Independence Day** celebrations (October 9). This project translates an authentic African architectural geometric mural into production-ready React and Tailwind CSS code, enriched with traditional Ugandan **Kikoi** woven textiles, royal regalia symbolism, and synthesized polyrhythmic drum choreography.

---

## 1. Project Overview

- **Occasion**: Uganda Independence Day Celebration (October 9, 1962).
- **Core Focus**: Pure visual and cultural design implementation of the geometric architectural mural with fluid animations and responsive layout.
- **Visual Identity**:
  - Bold black stained-glass/mural dividing lines ($6\text{px}$–$7\text{px}$).
  - Rich African chromatic palette: Sunshine Gold, Uganda Crimson, Deep Teal/Turquoise, Slate Navy, Terracotta Orange, Ivory, and Midnight Black.
  - Traditional Ugandan textile elements including **Kikoi** multi-stripe selvages and swaying hand-knotted macramé tassels.
  - Traditional motifs: **Engabo** (Royal Shield), **Ngoma** (Ceremonial Drum), **Ngaali** (Crested Crane), **Akasolya** (Thatch Truss Lattice), and **Ankole** geometric chevrons.

---

## 2. Key Features

### A. Panoramic Vector Mural Canvas
- Hand-crafted SVG architecture rendering every polygon, hatch pattern, and motif from the reference photograph with vector crispness across mobile screens, desktop monitors, and 4K/8K event stage projectors.
- Shimmering line hatchings (`animate-shimmer-hatch`), rhythmic breathing geometry, and interactive hover tooltips.

### B. Hallway 3D Architectural Perspective
- Recreates the exact spatial context of the reference photograph:
  - Tilted $3\text{D}$ perspective angle with perspective chamber depth.
  - Overhead architectural ceiling with slatted acoustic textures and recessed LED spotlights casting light cones.
  - Tiled showroom flooring with realistic specular color reflections bouncing off the mural.

### C. Traditional Kikoi Weave Loom
- Interactive East African textile anatomy customizer:
  - **Uganda Independence 1962 Kikoi**: Patriotic Black, Sunflower Gold, and Crimson Red stripes with white selvedge peace lines.
  - **Buganda Royal Ceremonial Kikoi**: Earthy terracotta, warm marigold, and barkcloth (*Olubugo*) tones.
  - **Modern African Geometric Weave**: Direct chromatic match to the architectural mural.
  - **Lake Victoria (*Nalubaale*) Kikoi**: Deep aquatic cobalt, turquoise, and sunset amber.
- Adjustable stripe density (*fine*, *standard*, *broad*) and fringe tassel length with live physics-inspired sway.

### D. Web Audio Polyrhythmic Drum Engine
- Zero external audio files; 100% synthesized in real time via the browser's Web Audio API.
- Generates authentic Ugandan drum grooves:
  - **Bass Ngoma**: Deep resonant boom ($110\text{Hz} \to 46\text{Hz}$ exponential pitch drop).
  - **Bakisimba Tenor**: Tuned melodic bounce ($140\text{Hz}$–$165\text{Hz}$).
  - **Engalabi Slap**: High-pitched snappy crack ($320\text{Hz}$ bandpass envelope).
  - **Ensaasi Gourd Shaker**: Filtered high-frequency seed rattle.
- Real-time beat synchronization: The concentric drum rings and center shield visually bounce and pulse in lockstep with the synthesized rhythm.

### E. Curatorial Motif Catalog & Modal Inspection
- Clicking any polygon or selecting a motif opens an in-depth curatorial breakdown:
  - **Luganda Name & Meaning**
  - **Historical & Ceremonial Roots**
  - **Independence Significance (1962)**
  - **Visual Position Anchor**

### F. Stage Projection & Celebration Tools
- **Stage Presentation Mode**: Cleans UI chrome for projection as an animated backdrop during events.
- **Uganda Independence Confetti Blast**: High-velocity canvas particle physics spraying black, yellow, red, gold, and turquoise ribbon streamers.
- **Keyboard Shortcuts**:
  - `Space`: Pause / Resume motion
  - `F`: Fullscreen toggle
  - `M`: Toggle traditional drum audio

---

## 3. Cultural Motifs & Symbolism

| Motif | Luganda Title | Origin | Symbolism |
| :--- | :--- | :--- | :--- |
| **The Sacred Diamond Shield** | *Engabo y'Obwakabaka* | Buganda & Bunyoro Royal Regalia | Sovereignty, ancestral protection, and courage. Centerpiece totem with nested triangular spirals and chevron belt. |
| **Ceremonial Royal Drum** | *Mujaguzo ne Ngoma* | Pan-Ugandan Sacred Drum Dynasties | Community heartbeat, royal proclamation, and the sound of freedom announcing the 1962 flag unfurling. |
| **Kikoi Striped Selvages** | *Olugoye lwa Kikoi* | East African Coastal & Inland Weavers | Interwoven lineages, unity of diverse peoples, and celebratory pride during festivals and weddings (*Kwanjula*). |
| **Crested Crane Sunburst** | *Ngaali y'Eggwanga* | National Seal / Balearica regulorum | National bird of Uganda. Grace, balance, moving forward without aggression, and the dawn of self-governance. |
| **Ankole Chevrons & Diagonals** | *Emikeeka n'Amasanganzira* | Southwestern Basketry & Beadcraft | Convergence of kingdoms, sacred cattle lineages (*Inyambo*), and harmonious geometric order. |
| **Architectural Thatch Truss** | *Akasolya n'Empagi Luwaga* | Kasubi UNESCO Architectural Master-Builders | Foundational constitutional integrity; the central pillar upholding the nation. |
| **Royal Beadwork Constellation** | *Obutiti n'Ensimbi z'Ennono* | Northern & Eastern Ceremonial Regalia | Prosperity, ancestral memory, and blessing across generations. |

---

## 4. Color Palettes

1. **Authentic Mural Palette**: The exact tones from the architectural photo (Teal `#00A896`, Sunshine Gold `#F5B700`, Terracotta `#D63434`, Indigo `#1D3557`, Ivory `#F4EBD9`).
2. **Independence Tri-Color**: National Flag colors celebrating Black, Sunflower Yellow, and Crimson Red with peace white highlights.
3. **Royal Barkcloth (*Olubugo*)**: Earth pigments honoring UNESCO Intangible Cultural Heritage cloth craft (Clay red, warm ochre, raw umber, ivory).
4. **Lake Victoria (*Nalubaale*) Waters**: Deep cobalt blues, cyan spray, sunset amber, and aquatic turquoise.

---

## 5. Technology Stack

- **Framework**: React 19 (TypeScript)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Audio Engine**: Native Web Audio API (real-time additive synthesis)
- **Animation**: CSS Keyframes + SVG Dashoffset animations + Canvas particle simulation
- **Build Tool**: Vite 8 + TSX

---

## 6. Project Architecture

```
├── index.html                      # HTML5 entry with Google Fonts (Syne, Plus Jakarta Sans)
├── metadata.json                   # Applet metadata & capability declarations
├── package.json                    # Dependencies & build scripts
├── vite.config.ts                  # Vite + Tailwind v4 configuration
├── tsconfig.json                   # TypeScript configuration
├── PROJECT.md                      # Project documentation (this file)
└── src/
    ├── main.tsx                    # Application bootstrap
    ├── App.tsx                     # Main layout, view switching, and keyboard listeners
    ├── index.css                   # Tailwind base imports & custom animation keyframes
    ├── types/
    │   └── mural.ts                # TypeScript interfaces for motifs, themes, and views
    ├── data/
    │   └── culturalMotifs.ts       # Curatorial knowledge base & 4 color theme definitions
    ├── utils/
    │   └── audioSynth.ts           # Web Audio API polyrhythmic drum synthesizer
    └── components/
        ├── MuralCanvas.tsx         # Master high-resolution SVG vector mural artwork
        ├── HallwayPerspectiveView.tsx # 3D perspective hallway with spotlights & reflections
        ├── KikoiBorders.tsx        # Woven Kikoi striped selvages with swaying tassels
        ├── KikoiShowcase.tsx       # Interactive Kikoi textile loom & customizer
        ├── StoryGuideView.tsx      # Curatorial catalog and symbol guide
        ├── EventDisplayControls.tsx# Floating event control dock (Audio, Speed, Themes)
        ├── MotifDetailModal.tsx    # Modal inspector for selected cultural motifs
        └── ConfettiCanvas.tsx      # Celebratory canvas particle confetti system
```

---

## 7. How to Run & Build

### Development
```bash
npm run dev
```
Launches the dev server at `http://localhost:3000`.

### Type Checking & Linting
```bash
npm run lint
```

### Production Build
```bash
npm run build
```
Creates an optimized static bundle in the `dist` folder.
