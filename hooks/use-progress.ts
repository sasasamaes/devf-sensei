'use client';

import { useState, useEffect, useCallback } from 'react';

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('devf-progress');
    if (stored) setCompletedLessons(JSON.parse(stored));
  }, []);

  const toggleLesson = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      const next = prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      localStorage.setItem('devf-progress', JSON.stringify(next));
      return next;
    });
  }, []);

  const isCompleted = useCallback((lessonId: string) => {
    return completedLessons.includes(lessonId);
  }, [completedLessons]);

  const getModuleProgress = useCallback((moduleId: string, totalLessons: number) => {
    const completed = completedLessons.filter(id => id.startsWith(moduleId)).length;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  }, [completedLessons]);

  return { completedLessons, toggleLesson, isCompleted, getModuleProgress };
}
