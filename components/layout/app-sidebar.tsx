'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Menu,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { modules, getLessonsByWeek } from '@/data';
import { useProgress } from '@/hooks/use-progress';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/types';

interface AppSidebarProps {
  mode: 'student' | 'sensei';
}

export function AppSidebar({ mode }: AppSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getModuleProgress } = useProgress();

  const basePath = `/${mode}`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Link href={basePath} className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg devf-gradient flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm">Dev.F</span>
            <div className="text-xs text-muted-foreground capitalize">{mode}</div>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {modules.map(mod => {
            const progress = getModuleProgress(mod.id, mod.lessons.length);
            const weeks = getLessonsByWeek(mod.id);
            const isActive = pathname.includes(mod.id);

            return (
              <div key={mod.id}>
                <Link href={`${basePath}/${mod.id}`}>
                  <div
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer',
                      isActive ? 'bg-accent' : 'hover:bg-accent/50'
                    )}
                  >
                    <BookOpen className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{mod.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {mod.lessons.length} lecciones
                      </div>
                    </div>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 shrink-0 transition-transform',
                        isActive && 'rotate-90'
                      )}
                    />
                  </div>
                </Link>

                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-4 mt-2 space-y-3"
                  >
                    <Progress value={progress} className="h-1.5" />

                    {Array.from(weeks.entries()).map(([week, lessons]) => (
                      <div key={week}>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-2 mb-1">
                          Semana {week}
                        </div>
                        <div className="space-y-0.5">
                          {lessons.map((lesson: Lesson) => {
                            const lessonPath = `${basePath}/${mod.id}/${lesson.id}`;
                            const isLessonActive = pathname === lessonPath;

                            return (
                              <Link key={lesson.id} href={lessonPath}>
                                <div
                                  className={cn(
                                    'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer',
                                    isLessonActive
                                      ? 'bg-accent font-medium'
                                      : 'hover:bg-accent/50 text-muted-foreground'
                                  )}
                                >
                                  {false && (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                                  )}
                                  <span className="truncate">
                                    L{lesson.number}. {lesson.title}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 shrink-0 border-r bg-card">
        <SidebarContent />
      </div>
    </>
  );
}
