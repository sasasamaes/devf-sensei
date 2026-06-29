'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/types';

interface LessonItemProps {
  lesson: Lesson;
  mode: 'student' | 'sensei';
  isCompleted: boolean;
}

export function LessonItem({ lesson, mode, isCompleted }: LessonItemProps) {
  const basePath = `/${mode}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
    >
      <Link href={`${basePath}/${lesson.moduleId}/${lesson.id}`}>
        <div
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-accent group cursor-pointer',
            isCompleted && 'border-green-200 dark:border-green-900/30'
          )}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                L{lesson.number}
              </Badge>
              <span className={cn(
                'font-medium text-sm truncate',
                isCompleted && 'text-muted-foreground'
              )}>
                {lesson.title}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
              {lesson.description}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {lesson.duration && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {lesson.duration}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
