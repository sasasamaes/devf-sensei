'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { SlideDeck, SlideIndices } from '@/types';

interface ClassSidebarProps {
  deck: SlideDeck;
  currentSlide: SlideIndices;
  onSlideSelect?: (index: number) => void;
}

export function ClassSidebar({ deck, currentSlide, onSlideSelect }: ClassSidebarProps) {
  const progress = Math.round(((currentSlide.h + 1) / deck.slides.length) * 100);

  return (
    <div className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-sm truncate">{deck.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Slide {currentSlide.h + 1} de {deck.slides.length}
        </p>
        <div className="mt-2 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {deck.slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onSlideSelect?.(index)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-md text-xs transition-colors',
                currentSlide.h === index
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary'
              )}
            >
              <span className="font-mono opacity-70 mr-2">{index + 1}</span>
              <span className="truncate block">Slide {index + 1}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
