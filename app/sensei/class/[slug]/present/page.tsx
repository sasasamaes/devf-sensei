import { notFound } from 'next/navigation';
import { loadPresentationBySlug, getAllPresentationSlugs } from '@/lib/presentation';
import { SenseiPresentWrapper } from '@/components/sensei/sensei-present-wrapper';

interface PresentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPresentationSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function SenseiPresentPage({ params }: PresentPageProps) {
  const { slug } = await params;
  const deck = loadPresentationBySlug(slug);

  if (!deck) {
    notFound();
  }

  return <SenseiPresentWrapper deck={deck} />;
}
