'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LessonNavigation } from '@/types';

interface LessonNavigationProps {
  navigation: LessonNavigation;
  mode: 'student' | 'sensei';
}

export function LessonNavigation({ navigation, mode }: LessonNavigationProps) {
  const basePath = `/${mode}`;

  return (
    <div className="flex items-center justify-between gap-4 pt-6 border-t">
      {navigation.previous ? (
        <Link href={`${basePath}/${navigation.previous.id.split('-').slice(0, 2).join('/')}/${navigation.previous.id}`}>
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {navigation.next ? (
        <Link href={`${basePath}/${navigation.next.id.split('-').slice(0, 2).join('/')}/${navigation.next.id}`}>
          <Button variant="outline" size="sm">
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
