// === Core Entities ===
export interface Module {
  id: string;
  title: string;
  number: number;
  description: string;
  weeks: number;
  lessons: Lesson[];
  icon?: string;
  color?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  number: number;
  week: number;
  description: string;
  objectives: string[];
  project: Project;
  senseiTips: string[];
  readings: Reading[];
  videos: Video[];
  senseiProjectLinks: SenseiProjectLink[];
  practices?: Practice[];
  demos?: Demo[];
  script?: ScriptItem[];
  duration?: string;
}

// === Content Types ===
export interface Project {
  title: string;
  description: string;
  starterUrl?: string;
  solutionUrl?: string;
}

export interface Reading {
  title: string;
  url: string;
  description?: string;
  type: 'documentation' | 'article' | 'tutorial' | 'reference';
}

export interface Video {
  title: string;
  url: string;
  description?: string;
  duration?: string;
  platform: 'youtube' | 'loom' | 'vimeo' | 'other';
}

export interface SenseiProjectLink {
  title: string;
  url: string;
  description?: string;
}

export interface Practice {
  title: string;
  description: string;
  steps: string[];
  duration?: string;
}

export interface Demo {
  title: string;
  description: string;
  code?: string;
  duration?: string;
}

export interface ScriptItem {
  time: string;
  section: string;
  description: string;
  details?: string;
  type: 'intro' | 'explanation' | 'demo' | 'practice' | 'review' | 'qa' | 'break' | 'closing';
}

// === Auth Types ===
export interface AuthState {
  isSensei: boolean;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

// === Progress Types ===
export interface ProgressState {
  completedLessons: string[];
  toggleLesson: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  getModuleProgress: (moduleId: string, totalLessons: number) => number;
}

// === Navigation Types ===
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface LessonNavigation {
  previous: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}

// === Search Types ===
export interface SearchResult {
  type: 'module' | 'lesson';
  id: string;
  title: string;
  description: string;
  href: string;
  moduleId?: string;
}

// === Presentation Types ===
export interface Slide {
  id: string;
  html: string;
  notes: string;
  isVerticalSection?: boolean;
  parentIndex?: number;
}

export interface SlideDeck {
  title: string;
  duration?: number;
  sessionId: string;
  slides: Slide[];
  moduleId: string;
  lessonId: string;
  slug: string;
}

export interface SlideIndices {
  h: number;
  v: number;
}

// === Live Session Types ===
export type LiveSessionEvent =
  | 'slideChanged'
  | 'presentationStarted'
  | 'presentationPaused'
  | 'presentationEnded';

export interface LiveSessionMessage {
  event: LiveSessionEvent;
  sessionId: string;
  indices: SlideIndices;
  timestamp: number;
}

export interface LiveSessionState {
  sessionId: string | null;
  isLive: boolean;
  currentSlide: SlideIndices;
  startTime: number | null;
  elapsedSeconds: number;
}

export interface LiveSessionContextValue {
  sessionId: string | null;
  isSensei: boolean;
  isLive: boolean;
  currentSlide: SlideIndices;
  startTime: number | null;
  elapsedSeconds: number;
  startSession: (sessionId: string) => void;
  endSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  changeSlide: (indices: SlideIndices) => void;
  joinSession: (sessionId: string) => void;
}
