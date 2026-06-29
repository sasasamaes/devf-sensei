import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import type { BreadcrumbItem } from '@/types';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dev.F', href: '/' },
    { label: 'Estudiante', href: '/student' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar mode="student" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header breadcrumbs={breadcrumbs} mode="student" />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
