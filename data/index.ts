import modulo7 from './modules/modulo-7.json';
import { scriptDetails } from './script-details';
import type { Module, LessonNavigation, ScriptItem } from '@/types';

export const modules: Module[] = [modulo7 as Module];

export function getModuleById(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

export function getLessonById(moduleId: string, lessonId: string) {
  const mod = getModuleById(moduleId);
  const lesson = mod?.lessons.find(l => l.id === lessonId);
  if (!lesson) return lesson;

  // Merge script details if available
  const details = scriptDetails[lessonId];
  if (details && lesson.script) {
    lesson.script = lesson.script.map(item => {
      const match = details.find(d => d.time === item.time);
      return match ? { ...item, details: match.details } as ScriptItem : item;
    });
  }

  return lesson;
}

export function getAllLessons() {
  return modules.flatMap(m => m.lessons.map(l => {
    const lesson = { ...l, moduleId: m.id };
    const details = scriptDetails[lesson.id];
    if (details && lesson.script) {
      lesson.script = lesson.script.map(item => {
        const match = details.find(d => d.time === item.time);
        return match ? { ...item, details: match.details } as ScriptItem : item;
      });
    }
    return lesson;
  }));
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
