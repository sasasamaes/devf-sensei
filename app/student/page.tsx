'use client';

import { motion } from 'framer-motion';
import { getAllModules } from '@/data';
import { ModuleCard } from '@/components/student/module-card';
import { useProgress } from '@/hooks/use-progress';

export default function StudentDashboard() {
  const allModules = getAllModules();
  const { getModuleProgress } = useProgress();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Módulos</h1>
        <p className="text-muted-foreground">
          Explora los módulos del bootcamp y sigue tu progreso
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allModules.map((mod, index) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ModuleCard
              module={mod}
              progress={getModuleProgress(mod.id, mod.lessons.length)}
              mode="student"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
