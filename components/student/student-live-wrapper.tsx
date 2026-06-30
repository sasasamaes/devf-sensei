'use client';

import { useEffect } from 'react';
import { StudentFollowMode } from '@/components/student/student-follow-mode';
import { LiveSessionProvider, useLiveSession } from '@/providers/live-session-provider';
import type { SlideDeck } from '@/types';

interface StudentLiveWrapperProps {
  deck: SlideDeck;
  sessionId: string;
}

function FollowWithSession({ deck, sessionId }: { deck: SlideDeck; sessionId: string }) {
  const { joinSession } = useLiveSession();

  useEffect(() => {
    joinSession(sessionId);
  }, [joinSession, sessionId]);

  return <StudentFollowMode deck={deck} />;
}

export function StudentLiveWrapper({ deck, sessionId }: StudentLiveWrapperProps) {
  return (
    <LiveSessionProvider isSensei={false}>
      <FollowWithSession deck={deck} sessionId={sessionId} />
    </LiveSessionProvider>
  );
}
