import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionBlockProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export function SectionBlock({ title, icon: Icon, children, className, accent }: SectionBlockProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className={cn(
        'flex items-center gap-2',
        accent && 'text-amber-600 dark:text-amber-400'
      )}>
        {Icon && <Icon className="h-5 w-5" />}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      {children}
    </div>
  );
}
