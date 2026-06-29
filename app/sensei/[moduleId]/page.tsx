'use client';

import React from 'react';
import { getModuleById } from '@/data';
import { LessonList } from '@/components/student/lesson-list';
import { ProgressBar } from '@/components/shared/progress-bar';
import { useProgress } from '@/hooks/use-progress';

interface SenseiModulePageProps {
  params: Promise<{ moduleId: string }>;
}

export default function SenseiModulePage({ params }: SenseiModulePageProps) {
  const resolvedParams = React.use(params);
  const mod = getModuleById(resolvedParams.moduleId);
  const { completedLessons, getModuleProgress } = useProgress();

  if (!mod) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Módulo no encontrado
      </div>
    );
  }

  const progress = getModuleProgress(mod.id, mod.lessons.length);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{mod.title}</h1>
        <p className="text-muted-foreground">{mod.description}</p>
        <ProgressBar value={progress} label="Progreso del módulo" />
      </div>

      <LessonList
        moduleId={mod.id}
        mode="sensei"
        completedLessons={completedLessons}
      />
    </div>
  );
}
