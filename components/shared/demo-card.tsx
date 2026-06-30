'use client';

import { useState } from 'react';
import { Play, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CodeSnippet } from '@/components/shared/code-snippet';
import { Button } from '@/components/ui/button';
import type { Demo } from '@/types';

interface DemoCardProps {
  demo: Demo;
}

export function DemoCard({ demo }: DemoCardProps) {
  const [codeVisible, setCodeVisible] = useState(false);

  return (
    <Card className="border-l-4 border-l-violet-500">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Play className="h-4 w-4 text-violet-600" />
              {demo.title}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{demo.description}</p>
          </div>
          {demo.duration && (
            <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">{demo.duration}</span>
          )}
        </div>
        {demo.code && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCodeVisible(!codeVisible)}
              className="text-xs gap-1 h-7 px-2"
            >
              <Code className="h-3.5 w-3.5" />
              {codeVisible ? 'Ocultar código' : 'Ver código'}
              {codeVisible ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
            {codeVisible && (
              <div className="text-xs">
                <CodeSnippet code={demo.code} language="jsx" />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
