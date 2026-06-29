'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeSnippet({ code, language, filename, className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('relative rounded-lg border bg-muted/50', className)}>
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b text-xs text-muted-foreground">
          <span className="font-mono">{filename}</span>
          <div className="flex items-center gap-2">
            {language && <span className="uppercase">{language}</span>}
          </div>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
