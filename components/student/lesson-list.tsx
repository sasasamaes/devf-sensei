'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LessonItem } from '@/components/student/lesson-item';
import { getLessonsByWeek } from '@/data';
import type { Lesson } from '@/types';

interface LessonListProps {
  moduleId: string;
  mode: 'student' | 'sensei';
  completedLessons: string[];
}

export function LessonList({ moduleId, mode, completedLessons }: LessonListProps) {
  const weeks = getLessonsByWeek(moduleId);
  const defaultValues = Array.from(weeks.keys()).map(w => `week-${w}`);

  return (
    <Accordion type="multiple" defaultValue={defaultValues} className="space-y-4">
      {Array.from(weeks.entries()).map(([week, lessons]) => (
        <motion.div
          key={week}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: week * 0.05 }}
        >
          <AccordionItem value={`week-${week}`} className="border rounded-lg px-2">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="font-semibold">Semana {week}</span>
                <span className="text-sm text-muted-foreground">
                  {lessons.length} lecciones
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2 pb-1">
                {lessons.map((lesson: Lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    mode={mode}
                    isCompleted={completedLessons.includes(lesson.id)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}
