'use client';

import { useState } from 'react';
import {
  BookOpen,
  Monitor,
  Play,
  PenSquare,
  Star,
  MessageSquare,
  Coffee,
  LogOut,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ScriptItem } from '@/types';
import { CodeSnippet } from '@/components/shared/code-snippet';

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!script || script.length === 0) return null;

  return (
    <div className="space-y-0">
      {script.map((item, index) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;
        const isLast = index === script.length - 1;
        const isExpanded = expandedIndex === index;
        const hasDetails = !!item.details;

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
              <button
                onClick={() => hasDetails && toggleExpand(index)}
                className={`w-full text-left ${hasDetails ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-muted-foreground">{item.time}</span>
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}
                  >
                    {config.label}
                  </span>
                  {hasDetails && (
                    <span className="text-muted-foreground ml-auto">
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold">{item.section}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </button>

              {/* Expanded details */}
              {isExpanded && hasDetails && item.details && (
                <div className="mt-3 space-y-3 pl-0">
                  {item.details.split('\n\n').map((block, bi) => {
                    // Detect code blocks marked with ```lang
                    const codeMatch = block.match(/^```(\w*)\n([\s\S]*?)```$/);
                    if (codeMatch) {
                      return (
                        <CodeSnippet
                          key={bi}
                          code={codeMatch[2].trim()}
                          language={codeMatch[1] || 'text'}
                        />
                      );
                    }

                    // Detect bullet lists
                    if (block.trim().startsWith('- ') || block.trim().startsWith('* ')) {
                      return (
                        <ul key={bi} className="space-y-1">
                          {block.trim().split('\n').map((line, li) => (
                            <li key={li} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="text-foreground mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-muted-foreground" />
                              <span>{line.replace(/^[-*]\s+/, '')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    // Regular text
                    return (
                      <p key={bi} className="text-sm text-muted-foreground leading-relaxed">
                        {block.trim()}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
