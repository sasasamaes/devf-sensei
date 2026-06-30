'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pin, Presentation, CalendarClock, PenSquare, Play } from 'lucide-react';
import { getLessonById, getLessonNavigation } from '@/data';
import { SectionBlock } from '@/components/shared/section-block';
import { ObjectivesList } from '@/components/shared/objectives-list';
import { ProjectCard } from '@/components/shared/project-card';
import { PracticeCard } from '@/components/shared/practice-card';
import { DemoCard } from '@/components/shared/demo-card';
import { ClassContent } from '@/components/student/class-content';
import { LessonNavigation } from '@/components/shared/lesson-navigation';
import { ScriptTimeline } from '@/components/sensei/script-timeline';
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
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-6xl mx-auto">
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
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold break-words">{lesson.title}</h1>
            <Link href={presentationHref} className="shrink-0 self-start">
              <Button className="gap-2 w-full sm:w-auto">
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

        {/* Script / Lesson Plan — sensei only */}
        {lesson.script && lesson.script.length > 0 && (
          <SectionBlock title="Plan de Clase" icon={CalendarClock}>
            <ScriptTimeline script={lesson.script} />
          </SectionBlock>
        )}

        {/* Objectives */}
        <ObjectivesList objectives={lesson.objectives} />

        {/* Project */}
        <ProjectCard project={lesson.project} />

        {/* Practices */}
        {lesson.practices && lesson.practices.length > 0 && (
          <SectionBlock title="Prácticas" icon={PenSquare}>
            <div className="space-y-4">
              {lesson.practices.map((practice, i) => (
                <PracticeCard key={i} practice={practice} />
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Demos */}
        {lesson.demos && lesson.demos.length > 0 && (
          <SectionBlock title="Demostraciones" icon={Play}>
            <div className="space-y-4">
              {lesson.demos.map((demo, i) => (
                <DemoCard key={i} demo={demo} />
              ))}
            </div>
          </SectionBlock>
        )}

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
