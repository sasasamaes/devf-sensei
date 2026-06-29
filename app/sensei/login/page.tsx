'use client';

import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';

export default function SenseiLoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/sensei';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <LoginForm redirect={redirect} />
    </div>
  );
}
