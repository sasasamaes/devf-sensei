'use client';

import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';

export default function SenseiLoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/sensei';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 w-full">
        <img src="/logo-devf-white.svg" alt="Dev.F" className="h-12" />
        <LoginForm redirect={redirect} />
      </div>
    </div>
  );
}
