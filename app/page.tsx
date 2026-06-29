'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl w-full text-center space-y-8"
        >
          {/* Logo */}
          <motion.div variants={item} className="space-y-4">
            <div className="inline-flex h-16 w-16 rounded-2xl devf-gradient items-center justify-center shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="devf-text-gradient">Dev.F</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Plataforma de presentación de clases para el bootcamp de desarrollo web
            </p>
          </motion.div>

          {/* Feature badges */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
              <BookOpen className="h-4 w-4" />
              Módulos interactivos
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
              <Users className="h-4 w-4" />
              Estudiantes y Sensei
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/student" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8">
                Entrar como Estudiante
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sensei/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-8">
                Entrar como Sensei
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Footer hint */}
          <motion.p variants={item} className="text-sm text-muted-foreground">
            Bootcamp de desarrollo web full-stack
          </motion.p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>Dev.F &mdash; Aprende a programar desde cero hasta nivel profesional</p>
      </footer>
    </div>
  );
}
