'use client';

import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { SearchCommand } from '@/components/layout/search-command';
import type { BreadcrumbItem } from '@/types';

interface HeaderProps {
  breadcrumbs: BreadcrumbItem[];
  mode?: 'student' | 'sensei';
  rightContent?: React.ReactNode;
}

export function Header({ breadcrumbs, mode, rightContent }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-2 sm:gap-3 px-3 sm:px-4">
        <div className="flex-1 min-w-0">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="flex items-center gap-2">
          {rightContent}
          <SearchCommand />
          <ThemeToggle />
          {mode === 'sensei' && (
            <div className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              Sensei
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
