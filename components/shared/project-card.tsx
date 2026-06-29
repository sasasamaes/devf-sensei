import { Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionBlock } from '@/components/shared/section-block';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <SectionBlock title="Proyecto del día" icon={Briefcase}>
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <h4 className="font-medium mb-1">{project.title}</h4>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardContent>
      </Card>
    </SectionBlock>
  );
}
