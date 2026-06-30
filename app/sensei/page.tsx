'use client';

import { motion } from 'framer-motion';
import { getAllModules } from '@/data';
import { ModuleCard } from '@/components/student/module-card';
import { useProgress } from '@/hooks/use-progress';

export default function SenseiDashboard() {
  const allModules = getAllModules();
  const { getModuleProgress } = useProgress();

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Panel del Sensei</h1>
        <p className="text-muted-foreground">
          Gestiona los módulos y accede a los recursos de enseñanza
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
              mode="sensei"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
