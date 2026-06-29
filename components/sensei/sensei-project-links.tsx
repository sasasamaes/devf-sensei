import { ExternalLink, Link2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { SenseiProjectLink } from '@/types';

interface SenseiProjectLinksProps {
  links: SenseiProjectLink[];
}

export function SenseiProjectLinks({ links }: SenseiProjectLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <Card className="border-purple-200 dark:border-purple-900/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h3 className="font-semibold text-sm text-purple-700 dark:text-purple-400">
            Recursos del Sensei
          </h3>
        </div>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300 hover:underline group"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                <span>{link.title}</span>
              </a>
              {link.description && (
                <p className="text-xs text-muted-foreground ml-5 mt-0.5">
                  {link.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
