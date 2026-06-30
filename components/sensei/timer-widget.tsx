'use client';

import { useEffect, useState } from 'react';

export function TimerWidget() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const format = (total: number) => {
    const mins = Math.floor(total / 60).toString().padStart(2, '0');
    const secs = (total % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 rounded-md border bg-background px-3 py-2 text-center font-mono text-lg">
        {format(seconds)}
      </div>
      <button
        onClick={() => setRunning(r => !r)}
        className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80"
      >
        {running ? 'Pausar' : 'Iniciar'}
      </button>
      <button
        onClick={() => { setRunning(false); setSeconds(0); }}
        className="px-3 py-2 rounded-md bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80"
      >
        Reiniciar
      </button>
    </div>
  );
}
