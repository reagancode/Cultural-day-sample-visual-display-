export type ColorTheme = 'authentic' | 'uganda-flag' | 'royal-barkcloth' | 'lake-victoria';

export type AnimationSpeed = 'paused' | 'calm' | 'festive' | 'dance';

export type DisplayView = 'mural' | 'hallway-perspective' | 'kikoi-tapestry' | 'story-guide';

export interface CulturalMotif {
  id: string;
  title: string;
  lugandaTitle: string;
  shortDesc: string;
  symbolism: string;
  culturalOrigin: string;
  independenceSignificance: string;
  visualAnchor: string;
}

export interface BeatTrigger {
  beatCount: number;
  intensity: number;
  drumType: 'bass' | 'tenor' | 'slap' | 'shaker';
}
