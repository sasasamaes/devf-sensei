import modulo7 from './modules/modulo-7.json';
import type { Module, LessonNavigation } from '@/types';

export const modules: Module[] = [modulo7 as Module];

export function getModuleById(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

export function getLessonById(moduleId: string, lessonId: string) {
  const mod = getModuleById(moduleId);
  return mod?.lessons.find(l => l.id === lessonId);
}

export function getAllLessons() {
  return modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id })));
}

export function getAllModules(): Module[] {
  return modules;
}

export function getLessonNavigation(moduleId: string, lessonId: string): LessonNavigation {
  const mod = getModuleById(moduleId);
  if (!mod) return { previous: null, next: null };

  const currentIndex = mod.lessons.findIndex(l => l.id === lessonId);
  return {
    previous: currentIndex > 0
      ? { id: mod.lessons[currentIndex - 1].id, title: mod.lessons[currentIndex - 1].title }
      : null,
    next: currentIndex < mod.lessons.length - 1
      ? { id: mod.lessons[currentIndex + 1].id, title: mod.lessons[currentIndex + 1].title }
      : null,
  };
}

export function getLessonsByWeek(moduleId: string) {
  const mod = getModuleById(moduleId);
  if (!mod) return new Map<number, Module['lessons']>();

  const weeks = new Map<number, Module['lessons']>();
  mod.lessons.forEach(lesson => {
    const week = weeks.get(lesson.week) || [];
    week.push(lesson);
    weeks.set(lesson.week, week);
  });
  return weeks;
}
