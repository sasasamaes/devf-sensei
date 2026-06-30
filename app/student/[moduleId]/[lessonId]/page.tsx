'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';
import { getLessonById, getLessonNavigation } from '@/data';
import { SectionBlock } from '@/components/shared/section-block';
import { ObjectivesList } from '@/components/shared/objectives-list';
import { ProjectCard } from '@/components/shared/project-card';
import { ClassContent } from '@/components/student/class-content';
import { LessonNavigation } from '@/components/shared/lesson-navigation';
import { StudentPresentationView } from '@/components/student/student-presentation-view';

interface LessonPageProps {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export default function StudentLessonPage({ params }: LessonPageProps) {
  const resolvedParams = React.use(params);
  const lesson = getLessonById(resolvedParams.moduleId, resolvedParams.lessonId);
  const navigation = getLessonNavigation(resolvedParams.moduleId, resolvedParams.lessonId);

  if (!lesson) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Lección no encontrada
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 sm:p-6 max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Semana {lesson.week}</span>
          <span>•</span>
          <span>Lección {lesson.number}</span>
          {lesson.duration && (
            <>
              <span>•</span>
              <span>{lesson.duration}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
      </div>

      {/* Slides */}
      <StudentPresentationView
        moduleId={resolvedParams.moduleId}
        lessonId={resolvedParams.lessonId}
      />

      {/* Description */}
      <SectionBlock title="Descripción" icon={Pin}>
        <p className="text-muted-foreground leading-relaxed">{lesson.description}</p>
      </SectionBlock>

      {/* Objectives */}
      <ObjectivesList objectives={lesson.objectives} />

      {/* Project */}
      <ProjectCard project={lesson.project} />

      {/* Readings & Videos */}
      <ClassContent lesson={lesson} />

      {/* Navigation */}
      <LessonNavigation navigation={navigation} mode="student" />
    </motion.div>
  );
}
