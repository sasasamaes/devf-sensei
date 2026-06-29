import { ExternalLink, BookOpen, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Reading, Video as VideoType } from '@/types';

interface ResourceLinkProps {
  title: string;
  url: string;
  description?: string;
  type: 'reading' | 'video';
}

export function ResourceLink({ title, url, description, type }: ResourceLinkProps) {
  const Icon = type === 'video' ? Video : BookOpen;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-accent group'
      )}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-sm group-hover:text-foreground">{title}</span>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </a>
  );
}
