'use client';

import { useEffect, useState } from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { RevealPresentation } from './reveal-presentation';
import { SpeakerNotesPanel } from './speaker-notes-panel';
import { TimerWidget } from './timer-widget';
import { cn } from '@/lib/utils';
import type { Slide, SlideDeck, SlideIndices } from '@/types';

interface PresenterViewProps {
  deck: SlideDeck;
  currentSlide: SlideIndices;
  onSlideChange: (indices: SlideIndices) => void;
  isLive?: boolean;
  elapsedSeconds?: number;
  onStartSession?: () => void;
  onEndSession?: () => void;
  sessionId?: string | null;
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

function formatElapsed(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')];
  if (hours > 0) parts.unshift(hours.toString());
  return parts.join(':');
}

export function PresenterView({
  deck,
  currentSlide,
  onSlideChange,
  isLive = false,
  elapsedSeconds = 0,
  onStartSession,
  onEndSession,
  sessionId,
}: PresenterViewProps) {
  const [clock, setClock] = useState<string>(formatClock(new Date()));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentSlideData: Slide | undefined = deck.slides[currentSlide.h];
  const nextSlideData: Slide | undefined = deck.slides[currentSlide.h + 1];

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(formatClock(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-2 sm:p-4 min-h-0 relative">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="absolute top-2 right-2 z-50 h-8 w-8 rounded-md bg-background/80 border shadow-sm flex items-center justify-center hover:bg-accent lg:hidden"
          >
            {sidebarOpen ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </button>
          <RevealPresentation
            deck={deck}
            mode="sensei"
            initialSlide={currentSlide}
            onSlideChange={onSlideChange}
          />
        </div>
      </div>

      <aside className={cn(
        "w-80 border-l bg-card flex flex-col overflow-y-auto shrink-0",
        sidebarOpen ? "block" : "hidden lg:block"
      )}>
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Reloj</p>
              <p className="text-2xl font-mono font-semibold">{clock}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Transcurrido</p>
              <p className="text-2xl font-mono font-semibold">{formatElapsed(elapsedSeconds)}</p>
            </div>
          </div>

          <TimerWidget />

          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm font-medium">
              {isLive ? 'Sesión en vivo' : 'Sesión inactiva'}
            </span>
          </div>

          {sessionId && (
            <p className="text-xs text-muted-foreground break-all">
              ID: {sessionId}
            </p>
          )}

          <div className="flex gap-2">
            {!isLive ? (
              <button
                onClick={onStartSession}
                className="flex-1 bg-primary text-primary-foreground text-sm font-medium py-2 rounded-md hover:bg-primary/90"
              >
                Iniciar clase
              </button>
            ) : (
              <button
                onClick={onEndSession}
                className="flex-1 bg-destructive text-destructive-foreground text-sm font-medium py-2 rounded-md hover:bg-destructive/90"
              >
                Finalizar clase
              </button>
            )}
          </div>
        </div>

        <div className="p-4 border-b">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Próximo slide</p>
          <div className="aspect-video rounded-lg border bg-background overflow-hidden p-3 scale-95 origin-top-left">
            {nextSlideData ? (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: nextSlideData.html }}
              />
            ) : (
              <p className="text-muted-foreground text-sm">Último slide</p>
            )}
          </div>
        </div>

        <div className="flex-1 p-4 min-h-0 overflow-y-auto">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Notas del Sensei</p>
          <SpeakerNotesPanel notes={currentSlideData?.notes || ''} />
        </div>
      </aside>
    </div>
  );
}
