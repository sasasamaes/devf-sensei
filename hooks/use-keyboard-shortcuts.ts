'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcutOptions {
  onNext?: () => void;
  onPrev?: () => void;
  onSearch?: () => void;
  onFullscreen?: () => void;
  onToggleTimer?: () => void;
}

export function useKeyboardShortcuts(options: KeyboardShortcutOptions) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key === 'k') {
        e.preventDefault();
        options.onSearch?.();
      }
      if (mod && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        options.onFullscreen?.();
      }
      if (mod && e.key === 'ArrowRight') {
        e.preventDefault();
        options.onNext?.();
      }
      if (mod && e.key === 'ArrowLeft') {
        e.preventDefault();
        options.onPrev?.();
      }
      if (mod && e.key === 't') {
        e.preventDefault();
        options.onToggleTimer?.();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, router]);
}
