import { NextRequest, NextResponse } from 'next/server';
import { loadPresentationBySlug } from '@/lib/presentation';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const deck = loadPresentationBySlug(slug);

  if (!deck) {
    return NextResponse.json({ error: 'Presentation not found' }, { status: 404 });
  }

  // Strip notes from slides for student view
  const studentSlides = deck.slides.map(slide => ({
    ...slide,
    notes: '',
  }));

  return NextResponse.json({
    ...deck,
    slides: studentSlides,
  });
}
