// universeThemes.js
export const UNIVERSE_THEMES = {
  cosmic: {
    primary: 'text-purple-400',
    accent: 'bg-indigo-600',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.5)]',
    wallpaper: '/assets/bg/cosmic-void.jpg',
    overlay: 'bg-gradient-to-b from-transparent to-black/80',
    parallaxSpeed: 0.05
  },
  noir: {
    primary: 'text-gray-200',
    accent: 'bg-red-800',
    glow: 'shadow-[0_0_20px_rgba(255,0,0,0.2)]',
    wallpaper: '/assets/bg/rainy-street.jpg',
    overlay: 'grayscale contrast-125 mix-blend-multiply',
    parallaxSpeed: 0.02
  },
  // ... other themes: fantasy, manga, horror, etc.
};

// studioThemes.js
export const STUDIO_STATES = {
  BLANK: 'BLANK',
  STORY: 'STORY_ACTIVATION',
  CHARACTER: 'CHARACTER_AWAKENING',
  PANEL: 'PANEL_WORKSHOP',
  MARKETING: 'MARKETING_LAB',
  CREDITS: 'CREDITS_ROOM',
  PR: 'PR_ROOM',
  SOCIAL: 'SOCIAL_COMMAND',
};