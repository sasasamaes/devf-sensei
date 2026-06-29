import { ScrollText, BookOpen, Video } from 'lucide-react';
import { SectionBlock } from '@/components/shared/section-block';
import { ResourceLink } from '@/components/shared/resource-link';
import type { Lesson } from '@/types';

interface ClassContentProps {
  lesson: Lesson;
}

export function ClassContent({ lesson }: ClassContentProps) {
  const hasReadings = lesson.readings && lesson.readings.length > 0;
  const hasVideos = lesson.videos && lesson.videos.length > 0;

  return (
    <div className="space-y-6">
      {hasReadings && (
        <SectionBlock title="Lecturas" icon={BookOpen}>
          <div className="space-y-2">
            {lesson.readings.map((reading, index) => (
              <ResourceLink
                key={index}
                title={reading.title}
                url={reading.url}
                description={reading.description}
                type="reading"
              />
            ))}
          </div>
        </SectionBlock>
      )}

      {hasVideos && (
        <SectionBlock title="Videos" icon={Video}>
          <div className="space-y-2">
            {lesson.videos.map((video, index) => (
              <ResourceLink
                key={index}
                title={video.title}
                url={video.url}
                description={video.description || video.duration}
                type="video"
              />
            ))}
          </div>
        </SectionBlock>
      )}
    </div>
  );
}
