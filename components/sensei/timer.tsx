'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/hooks/use-timer';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function Timer() {
  const { isRunning, toggle, reset, formatTime } = useTimer();

  return (
    <Card className="border-amber-200 dark:border-amber-900/30">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Cronómetro
          </div>
          <div className="text-3xl font-mono font-bold tracking-wider">
            {formatTime()}
          </div>
          <div className="flex gap-2 mt-3 justify-center">
            <Button size="sm" variant={isRunning ? 'destructive' : 'default'} onClick={toggle}>
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Iniciar
                </>
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
