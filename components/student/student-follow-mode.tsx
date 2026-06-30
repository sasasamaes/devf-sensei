'use client';

import { RevealPresentation } from '@/components/sensei/reveal-presentation';
import { useLiveSession } from '@/hooks/use-live-session';
import type { SlideDeck } from '@/types';

interface StudentFollowModeProps {
  deck: SlideDeck;
}

export function StudentFollowMode({ deck }: StudentFollowModeProps) {
  const { currentSlide, isLive, sessionId } = useLiveSession();

  return (
    <div className="relative h-dvh w-full bg-background">
      <RevealPresentation
        deck={deck}
        mode="student"
        initialSlide={currentSlide}
        onSlideChange={() => {}}
      />

      {!isLive && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-500/90 text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          Esperando al Sensei{sessionId ? ` • ${sessionId}` : ''}
        </div>
      )}

      {isLive && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-green-500/90 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          En vivo
        </div>
      )}
    </div>
  );
}
