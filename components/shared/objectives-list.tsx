import { Target, CheckCircle2 } from 'lucide-react';
import { SectionBlock } from '@/components/shared/section-block';

interface ObjectivesListProps {
  objectives: string[];
}

export function ObjectivesList({ objectives }: ObjectivesListProps) {
  return (
    <SectionBlock title="Objetivos" icon={Target}>
      <ul className="space-y-2">
        {objectives.map((objective, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <span className="text-sm leading-relaxed">{objective}</span>
          </li>
        ))}
      </ul>
    </SectionBlock>
  );
}
