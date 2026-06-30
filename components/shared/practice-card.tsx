import { PenSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Practice } from '@/types';

interface PracticeCardProps {
  practice: Practice;
}

export function PracticeCard({ practice }: PracticeCardProps) {
  return (
    <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <PenSquare className="h-4 w-4 text-emerald-600" />
              {practice.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{practice.description}</p>
          </div>
          {practice.duration && (
            <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">{practice.duration}</span>
          )}
        </div>
        <ul className="space-y-1.5">
          {practice.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
