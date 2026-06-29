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
