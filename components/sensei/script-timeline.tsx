import {
  BookOpen,
  Monitor,
  Play,
  PenSquare,
  Star,
  MessageSquare,
  Coffee,
  LogOut,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ScriptItem } from '@/types';

const typeConfig: Record<
  ScriptItem['type'],
  { icon: LucideIcon; color: string; bg: string; label: string }
> = {
  intro: {
    icon: BookOpen,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    label: 'Introducción',
  },
  explanation: {
    icon: Monitor,
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    label: 'Explicación',
  },
  demo: {
    icon: Play,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    label: 'Demo',
  },
  practice: {
    icon: PenSquare,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    label: 'Práctica',
  },
  review: {
    icon: Star,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    label: 'Revisión',
  },
  qa: {
    icon: MessageSquare,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-900/30',
    label: 'Preguntas',
  },
  break: {
    icon: Coffee,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    label: 'Descanso',
  },
  closing: {
    icon: LogOut,
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-900/30',
    label: 'Cierre',
  },
};

interface ScriptTimelineProps {
  script: ScriptItem[];
}

export function ScriptTimeline({ script }: ScriptTimelineProps) {
  if (!script || script.length === 0) return null;

  return (
    <div className="space-y-0">
      {script.map((item, index) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;
        const isLast = index === script.length - 1;

        return (
          <div key={index} className="flex gap-3 relative">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
            )}

            {/* Icon */}
            <div
              className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full ${config.bg} flex items-center justify-center`}
            >
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>

            {/* Content */}
            <div className="flex-1 pb-4 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-mono text-muted-foreground">{item.time}</span>
                <span
                  className={`text-xs font-medium px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}
                >
                  {config.label}
                </span>
              </div>
              <h4 className="text-sm font-semibold">{item.section}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
