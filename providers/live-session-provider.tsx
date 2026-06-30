'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { LiveSessionContextValue, LiveSessionEvent, LiveSessionMessage, SlideIndices } from '@/types';

const CHANNEL_NAME = 'devf-live-session';

const LiveSessionContext = createContext<LiveSessionContextValue | null>(null);

export function LiveSessionProvider({
  children,
  isSensei = false,
}: {
  children: ReactNode;
  isSensei?: boolean;
}) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<SlideIndices>({ h: 0, v: 0 });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
  }, [clearTimer]);

  const broadcast = useCallback((event: LiveSessionEvent, indices: SlideIndices) => {
    if (!sessionId) return;

    const message: LiveSessionMessage = {
      event,
      sessionId,
      indices,
      timestamp: Date.now(),
    };

    const payload = JSON.stringify(message);

    if (channelRef.current) {
      channelRef.current.postMessage(payload);
    } else if (typeof window !== 'undefined') {
      window.localStorage.setItem(`devf-live-${sessionId}`, payload);
      window.localStorage.removeItem(`devf-live-${sessionId}`);
    }
  }, [sessionId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;
    }

    const handleMessage = (raw: string) => {
      try {
        const message: LiveSessionMessage = JSON.parse(raw);
        if (message.sessionId !== sessionId) return;

        if (message.event === 'presentationStarted') {
          setIsLive(true);
          if (!isSensei) {
            setStartTime(Date.now());
            setElapsedSeconds(0);
            startTimer();
          }
        }

        if (message.event === 'presentationEnded' || message.event === 'presentationPaused') {
          setIsLive(false);
          clearTimer();
        }

        if (message.event === 'slideChanged') {
          setCurrentSlide(message.indices);
        }
      } catch {
        // ignore malformed messages
      }
    };

    const onChannelMessage = (event: MessageEvent) => handleMessage(event.data);
    const onStorageMessage = (event: StorageEvent) => {
      if (event.key?.startsWith('devf-live-') && event.newValue) {
        handleMessage(event.newValue);
      }
    };

    channel?.addEventListener('message', onChannelMessage);
    window.addEventListener('storage', onStorageMessage);

    return () => {
      channel?.removeEventListener('message', onChannelMessage);
      channel?.close();
      window.removeEventListener('storage', onStorageMessage);
      channelRef.current = null;
      clearTimer();
    };
  }, [sessionId, isSensei, startTimer, clearTimer]);

  const startSession = useCallback((id: string) => {
    setSessionId(id);
    setIsLive(true);
    setStartTime(Date.now());
    setElapsedSeconds(0);
    setCurrentSlide({ h: 0, v: 0 });
    startTimer();
    broadcast('presentationStarted', { h: 0, v: 0 });
  }, [broadcast, startTimer]);

  const endSession = useCallback(() => {
    broadcast('presentationEnded', currentSlide);
    setIsLive(false);
    clearTimer();
    setStartTime(null);
  }, [broadcast, clearTimer, currentSlide]);

  const pauseSession = useCallback(() => {
    broadcast('presentationPaused', currentSlide);
    setIsLive(false);
    clearTimer();
  }, [broadcast, clearTimer, currentSlide]);

  const resumeSession = useCallback(() => {
    setIsLive(true);
    startTimer();
    broadcast('presentationStarted', currentSlide);
  }, [broadcast, currentSlide, startTimer]);

  const changeSlide = useCallback((indices: SlideIndices) => {
    setCurrentSlide(indices);
    if (isSensei && isLive) {
      broadcast('slideChanged', indices);
    }
  }, [broadcast, isLive, isSensei]);

  const joinSession = useCallback((id: string) => {
    setSessionId(id);
    setCurrentSlide({ h: 0, v: 0 });
  }, []);

  return (
    <LiveSessionContext.Provider
      value={{
        sessionId,
        isSensei,
        isLive,
        currentSlide,
        startTime,
        elapsedSeconds,
        startSession,
        endSession,
        pauseSession,
        resumeSession,
        changeSlide,
        joinSession,
      }}
    >
      {children}
    </LiveSessionContext.Provider>
  );
}

export function useLiveSession(): LiveSessionContextValue {
  const context = useContext(LiveSessionContext);
  if (!context) {
    throw new Error('useLiveSession must be used within LiveSessionProvider');
  }
  return context;
}
