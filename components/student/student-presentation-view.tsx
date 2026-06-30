'use client';

import { useEffect, useState } from 'react';
import { RevealPresentation } from '@/components/sensei/reveal-presentation';
import { getLessonSlug } from '@/lib/presentation-utils';
import type { SlideDeck } from '@/types';

interface StudentPresentationViewProps {
  moduleId: string;
  lessonId: string;
}

export function StudentPresentationView({ moduleId, lessonId }: StudentPresentationViewProps) {
  const [deck, setDeck] = useState<SlideDeck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const slug = getLessonSlug(moduleId, lessonId);
    fetch(`/api/presentation/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setDeck(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [moduleId, lessonId]);

  if (loading) {
    return (
      <div className="rounded-lg border bg-muted/30 h-48 flex items-center justify-center">
        <p className="text-muted-foreground">Cargando presentación...</p>
      </div>
    );
  }

  if (error || !deck) {
    return null;
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="h-64 sm:h-80 md:h-96">
        <RevealPresentation
          deck={deck}
          mode="student"
          initialSlide={{ h: 0, v: 0 }}
          onSlideChange={() => {}}
        />
      </div>
    </div>
  );
}
