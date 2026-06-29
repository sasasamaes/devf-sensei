'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { modules } from '@/data';
import { FileText, BookOpen } from 'lucide-react';

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-9 w-9 md:w-auto px-3 text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline text-sm">Buscar...</span>
        <kbd className="hidden md:inline-flex items-center ml-2 px-1.5 py-0.5 text-xs border rounded">
          ⌘K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar módulos, lecciones..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          {modules.map(mod => (
            <CommandGroup key={mod.id} heading={mod.title}>
              <CommandItem
                onSelect={() => {
                  router.push(`/student/${mod.id}`);
                  setOpen(false);
                }}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>{mod.title} (Módulo)</span>
              </CommandItem>
              {mod.lessons.map(lesson => (
                <CommandItem
                  key={lesson.id}
                  onSelect={() => {
                    router.push(`/student/${mod.id}/${lesson.id}`);
                    setOpen(false);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Lección {lesson.number}: {lesson.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
