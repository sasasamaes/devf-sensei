'use client';

import { Maximize2, Minimize2, Keyboard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFullscreen } from '@/hooks/use-fullscreen';

export function PresentationControls() {
  const { isFullscreen, toggle } = useFullscreen();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Presentación
        </div>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={toggle}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4 mr-2" />
                Salir de pantalla completa
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4 mr-2" />
                Pantalla completa
              </>
            )}
          </Button>

          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1.5 mb-2">
              <Keyboard className="h-3.5 w-3.5" />
              <span className="font-medium">Atajos de teclado</span>
            </div>
            <div className="flex justify-between">
              <span>Buscar</span>
              <kbd className="px-1 py-0.5 bg-background rounded border text-[10px]">⌘K</kbd>
            </div>
            <div className="flex justify-between">
              <span>Siguiente</span>
              <kbd className="px-1 py-0.5 bg-background rounded border text-[10px]">⌘→</kbd>
            </div>
            <div className="flex justify-between">
              <span>Anterior</span>
              <kbd className="px-1 py-0.5 bg-background rounded border text-[10px]">⌘←</kbd>
            </div>
            <div className="flex justify-between">
              <span>Fullscreen</span>
              <kbd className="px-1 py-0.5 bg-background rounded border text-[10px]">⌘⇧F</kbd>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
