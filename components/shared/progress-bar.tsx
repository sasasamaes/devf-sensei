'use client';

import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ value, label, showPercentage = true }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          {showPercentage && <span className="font-medium">{value}%</span>}
        </div>
      )}
      <Progress value={value} className="h-2" />
    </div>
  );
}
