'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import type { SlideDeck, SlideIndices } from '@/types';

import 'reveal.js/reveal.css';
import 'reveal.js/theme/black.css';
import 'highlight.js/styles/atom-one-dark.css';

interface RevealPresentationProps {
  deck: SlideDeck;
  mode?: 'sensei' | 'student' | 'standalone';
  initialSlide?: SlideIndices;
  onSlideChange?: (indices: SlideIndices) => void;
  onReady?: () => void;
}

export function RevealPresentation({
  deck,
  mode = 'standalone',
  initialSlide = { h: 0, v: 0 },
  onSlideChange,
  onReady,
}: RevealPresentationProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const revealInstanceRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cleanup = () => {};

    async function init() {
      const Reveal = (await import('reveal.js')).default;
      const container = revealRef.current;
      if (!container) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const reveal = new (Reveal as any)(container, {
        hash: false,
        history: false,
        controls: true,
        progress: true,
        center: true,
        transition: 'slide',
        slideNumber: 'c/t',
        width: 1280,
        height: 720,
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2.0,
        keyboard: mode !== 'student',
        touch: mode !== 'student',
        mouseWheel: false,
        help: false,
      });

      revealInstanceRef.current = reveal;

      reveal.initialize().then(() => {
        reveal.slide(initialSlide.h, initialSlide.v);
        setIsReady(true);
        onReady?.();
      });

      reveal.on('slidechanged', (event: { indexh: number; indexv: number }) => {
        onSlideChange?.({ h: event.indexh, v: event.indexv });
      });

      cleanup = () => {
        try {
          reveal.destroy();
        } catch {
          // ignore cleanup errors
        }
      };
    }

    init();

    return () => cleanup();
  }, [deck, mode, initialSlide.h, initialSlide.v, onReady, onSlideChange]);

  useEffect(() => {
    if (revealInstanceRef.current) {
      try {
        const theme = resolvedTheme === 'dark' ? 'black' : 'white';
        const linkEl = document.getElementById('reveal-theme') as HTMLLinkElement;
        if (linkEl) {
          linkEl.href = `/reveal.js/theme/${theme}.css`;
        }
      } catch {
        // ignore
      }
    }
  }, [resolvedTheme]);

  return (
    <div className="reveal" ref={revealRef} style={{ height: '100%', width: '100%' }}>
      <div className="slides">
        {deck.slides.map((slide) => (
          <section key={slide.id} dangerouslySetInnerHTML={{ __html: slide.html }} />
        ))}
      </div>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Cargando presentación...</p>
        </div>
      )}
    </div>
  );
}
