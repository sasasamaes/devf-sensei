'use client';

import { Timer } from '@/components/sensei/timer';
import { SenseiTips } from '@/components/sensei/sensei-tips';
import { SenseiProjectLinks } from '@/components/sensei/sensei-project-links';
import { PresentationControls } from '@/components/sensei/presentation-controls';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Lesson } from '@/types';

interface SenseiPanelProps {
  lesson: Lesson;
}

export function SenseiPanel({ lesson }: SenseiPanelProps) {
  return (
    <div className="space-y-4">
      <Timer />
      <SenseiTips tips={lesson.senseiTips} />
      <SenseiProjectLinks links={lesson.senseiProjectLinks} />
      <PresentationControls />
    </div>
  );
}
