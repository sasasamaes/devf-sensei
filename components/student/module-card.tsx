'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { Module } from '@/types';

interface ModuleCardProps {
  module: Module;
  progress: number;
  mode: 'student' | 'sensei';
}

export function ModuleCard({ module: mod, progress, mode }: ModuleCardProps) {
  const basePath = `/${mode}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`${basePath}/${mod.id}`}>
        <Card className="cursor-pointer hover:shadow-md transition-shadow group">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg devf-gradient flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <Badge variant="secondary">Módulo {mod.number}</Badge>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {mod.title}
            </CardTitle>
            <CardDescription>{mod.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{mod.lessons.length} lecciones</span>
              <span className="text-muted-foreground">{mod.weeks} semanas</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{progress}% completado</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
