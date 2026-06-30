import fs from 'fs';
import path from 'path';
import type { SlideDeck } from '@/types';
import { getLessonSlug, parseLessonSlug, parseMarkdownToSlides } from './presentation-utils';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export { getLessonSlug, parseLessonSlug };

export function getLessonContentPath(moduleId: string, lessonId: string): string {
  return path.join(CONTENT_DIR, moduleId, `${lessonId}.md`);
}

export function lessonContentExists(moduleId: string, lessonId: string): boolean {
  return fs.existsSync(getLessonContentPath(moduleId, lessonId));
}

export function getAllPresentationSlugs(): string[] {
  const slugs: string[] = [];
  if (!fs.existsSync(CONTENT_DIR)) return slugs;

  const modules = fs.readdirSync(CONTENT_DIR);
  for (const moduleId of modules) {
    const modulePath = path.join(CONTENT_DIR, moduleId);
    if (!fs.statSync(modulePath).isDirectory()) continue;

    const files = fs.readdirSync(modulePath);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const lessonId = file.replace('.md', '');
        slugs.push(getLessonSlug(moduleId, lessonId));
      }
    }
  }

  return slugs;
}

export function loadPresentationBySlug(slug: string): SlideDeck | null {
  const parsed = parseLessonSlug(slug);
  if (!parsed) return null;

  const { moduleId, lessonId } = parsed;
  const filePath = getLessonContentPath(moduleId, lessonId);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { slides, title, duration, sessionId } = parseMarkdownToSlides(raw);

  return {
    title,
    duration,
    sessionId: sessionId || getLessonSlug(moduleId, lessonId),
    slides,
    moduleId,
    lessonId,
    slug,
  };
}

export function loadPresentationByIds(moduleId: string, lessonId: string): SlideDeck | null {
  const slug = getLessonSlug(moduleId, lessonId);
  return loadPresentationBySlug(slug);
}

export function getNextSlideIndices(deck: SlideDeck, indices: { h: number; v: number }): { h: number; v: number } | null {
  if (indices.h < deck.slides.length - 1) {
    return { h: indices.h + 1, v: 0 };
  }
  return null;
}

export function getPreviousSlideIndices(deck: SlideDeck, indices: { h: number; v: number }): { h: number; v: number } | null {
  if (indices.h > 0) {
    return { h: indices.h - 1, v: 0 };
  }
  return null;
}
