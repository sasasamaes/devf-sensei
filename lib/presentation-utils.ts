import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
import type { Slide } from '@/types';

export function getLessonSlug(moduleId: string, lessonId: string): string {
  return `${moduleId}--${lessonId}`;
}

export function parseLessonSlug(slug: string): { moduleId: string; lessonId: string } | null {
  const [moduleId, lessonId] = slug.split('--');
  if (!moduleId || !lessonId) return null;
  return { moduleId, lessonId };
}

const NOTE_REGEX = /\n?Note:\s*([\s\S]*?)(?=\n\n|$)/i;

function extractNotes(slideContent: string): { content: string; notes: string } {
  const match = NOTE_REGEX.exec(slideContent);
  if (!match) return { content: slideContent, notes: '' };

  const notes = match[1].trim();
  const content = slideContent.replace(match[0], '').trim();
  return { content, notes };
}

function highlightCode(code: string, language?: string): string {
  if (language && hljs.getLanguage(language)) {
    try {
      return hljs.highlight(code, { language }).value;
    } catch {
      // fallback to auto
    }
  }
  return hljs.highlightAuto(code).value;
}

const renderer = new marked.Renderer();
renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  const language = lang || 'plaintext';
  const highlighted = highlightCode(text, language);
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

marked.setOptions({
  renderer,
  gfm: true,
  breaks: false,
});

export function parseMarkdownToSlides(raw: string): { slides: Slide[]; title: string; duration?: number; sessionId?: string } {
  const parsed = matter(raw);
  const title = (parsed.data.title as string) || 'Clase';
  const duration = parsed.data.duration ? Number(parsed.data.duration) : undefined;
  const sessionId = (parsed.data.sessionId as string) || 'default-session';

  const slideSections = parsed.content.split(/^---\s*$/m).filter(Boolean);

  const slides: Slide[] = slideSections.map((section, index) => {
    const { content, notes } = extractNotes(section);
    const html = marked.parse(content.trim()) as string;

    return {
      id: `slide-${index}`,
      html,
      notes,
    };
  });

  return { slides, title, duration, sessionId };
}

export function indicesToString(indices: { h: number; v: number }): string {
  return `${indices.h}.${indices.v}`;
}

export function stringToIndices(value: string): { h: number; v: number } {
  const [h, v] = value.split('.');
  return { h: Number(h) || 0, v: Number(v) || 0 };
}
