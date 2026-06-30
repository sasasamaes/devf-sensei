'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ChevronRight,
  Menu,
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
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b shrink-0">
        <Link href={basePath} className="flex items-center gap-2">
          <img src="/logo-devf-white.svg" alt="Dev.F" className="h-8" />
          <div className="min-w-0">
            <span className="font-bold text-sm truncate block">Dev.F</span>
            <div className="text-xs text-muted-foreground capitalize truncate">{mode}</div>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-4 space-y-6">
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
                      <div className="text-xs text-muted-foreground truncate">
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
                    className="ml-4 mt-2 space-y-3 overflow-hidden"
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
                                    'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer min-w-0',
                                    isLessonActive
                                      ? 'bg-accent font-medium'
                                      : 'hover:bg-accent/50 text-muted-foreground'
                                  )}
                                >
                                  <span className="truncate min-w-0">
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
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 max-w-[85vw] w-72">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 shrink-0 border-r bg-card overflow-hidden">
        <SidebarContent />
      </div>
    </>
  );
}
