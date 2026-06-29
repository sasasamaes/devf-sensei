export const SENSEI_PASSWORD = process.env.SENSEI_PASSWORD || 'devf-sensei-2024';

export const KEYBOARD_SHORTCUTS = {
  SEARCH: 'mod+k',
  FULLSCREEN: 'mod+shift+f',
  NEXT_LESSON: 'mod+arrowright',
  PREV_LESSON: 'mod+arrowleft',
  TOGGLE_TIMER: 'mod+t',
  TOGGLE_SIDEBAR: 'mod+b',
} as const;
