'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pin, Presentation } from 'lucide-react';
import { getLessonById, getLessonNavigation } from '@/data';
import { SectionBlock } from '@/components/shared/section-block';
import { ObjectivesList } from '@/components/shared/objectives-list';
import { ProjectCard } from '@/components/shared/project-card';
import { ClassContent } from '@/components/student/class-content';
import { LessonNavigation } from '@/components/shared/lesson-navigation';
import { SenseiPanel } from '@/components/sensei/sensei-panel';
import { Button } from '@/components/ui/button';
import { getLessonSlug } from '@/lib/presentation-utils';

interface SenseiLessonPageProps {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export default function SenseiLessonPage({ params }: SenseiLessonPageProps) {
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

  const presentationHref = `/sensei/class/${getLessonSlug(resolvedParams.moduleId, resolvedParams.lessonId)}/present`;

  return (
    <div className="flex gap-6 p-6 max-w-[1400px] mx-auto">
      {/* Main content - same as student view */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 min-w-0 space-y-8"
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
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <Link href={presentationHref}>
              <Button className="gap-2 shrink-0">
                <Presentation className="h-4 w-4" />
                Presentar
              </Button>
            </Link>
          </div>
        </div>

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
        <LessonNavigation navigation={navigation} mode="sensei" />
      </motion.div>

      {/* Sensei panel - right sidebar */}
      <div className="hidden xl:block w-80 shrink-0">
        <div className="sticky top-6">
          <SenseiPanel lesson={lesson} />
        </div>
      </div>
    </div>
  );
}
