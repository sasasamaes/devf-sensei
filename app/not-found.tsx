import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold devf-text-gradient">404</h1>
        <h2 className="text-2xl font-semibold">Página no encontrada</h2>
        <p className="text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}
