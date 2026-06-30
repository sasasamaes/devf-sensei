import { notFound } from 'next/navigation';
import { loadPresentationBySlug, getAllPresentationSlugs } from '@/lib/presentation';
import { StudentLiveWrapper } from '@/components/student/student-live-wrapper';

interface LivePageProps {
  params: Promise<{ sessionId: string }>;
}

export async function generateStaticParams(): Promise<{ sessionId: string }[]> {
  const slugs = getAllPresentationSlugs();
  return slugs.map(slug => ({ sessionId: slug }));
}

export default async function LiveSessionPage({ params }: LivePageProps) {
  const { sessionId } = await params;
  const deck = loadPresentationBySlug(sessionId);

  if (!deck) {
    notFound();
  }

  return <StudentLiveWrapper deck={deck} sessionId={sessionId} />;
}
