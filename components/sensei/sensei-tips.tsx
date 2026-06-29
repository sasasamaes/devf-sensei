import { Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SenseiTipsProps {
  tips: string[];
}

export function SenseiTips({ tips }: SenseiTipsProps) {
  if (!tips || tips.length === 0) return null;

  return (
    <Card className="border-amber-200 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-semibold text-sm text-amber-700 dark:text-amber-400">
            Consejos para la clase
          </h3>
        </div>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-amber-500 mt-1">•</span>
              <span className="text-amber-800 dark:text-amber-300">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
