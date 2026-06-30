'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

interface SpeakerNotesPanelProps {
  notes: string;
}

export function SpeakerNotesPanel({ notes }: SpeakerNotesPanelProps) {
  if (!notes.trim()) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No hay notas para este slide.
      </p>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="text-sm leading-relaxed whitespace-pre-wrap">
        {notes}
      </div>
    </ScrollArea>
  );
}
