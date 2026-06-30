'use client';

import { PresenterView } from '@/components/sensei/presenter-view';
import { LiveSessionProvider, useLiveSession } from '@/providers/live-session-provider';
import type { SlideDeck } from '@/types';

interface SenseiPresentWrapperProps {
  deck: SlideDeck;
}

function PresenterWithSession({ deck }: { deck: SlideDeck }) {
  const {
    sessionId,
    isLive,
    currentSlide,
    elapsedSeconds,
    startSession,
    endSession,
    changeSlide,
  } = useLiveSession();

  return (
    <PresenterView
      deck={deck}
      currentSlide={currentSlide}
      onSlideChange={changeSlide}
      isLive={isLive}
      elapsedSeconds={elapsedSeconds}
      onStartSession={() => startSession(deck.sessionId)}
      onEndSession={endSession}
      sessionId={sessionId}
    />
  );
}

export function SenseiPresentWrapper({ deck }: SenseiPresentWrapperProps) {
  return (
    <LiveSessionProvider isSensei>
      <PresenterWithSession deck={deck} />
    </LiveSessionProvider>
  );
}
