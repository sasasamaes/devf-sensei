'use client';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

export default function SenseiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/sensei/login');
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dev.F', href: '/' },
    { label: 'Sensei', href: '/sensei' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar mode="sensei" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          breadcrumbs={breadcrumbs}
          mode="sensei"
          rightContent={
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          }
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
