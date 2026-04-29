// Video player hook - handles recording lifecycle, scene advancement, and looping

import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    startRecording?: () => Promise<void>;
    stopRecording?: () => void;
  }
}

export interface SceneDurations {
  [key: string]: number;
}

export interface UseVideoPlayerOptions {
  durations: SceneDurations;
  onVideoEnd?: () => void;
  loop?: boolean;
  playing?: boolean;
}

export interface UseVideoPlayerReturn {
  currentScene: number;
  totalScenes: number;
  currentSceneKey: string;
  hasEnded: boolean;
}

export function useVideoPlayer(options: UseVideoPlayerOptions): UseVideoPlayerReturn {
  const { durations, onVideoEnd, loop = true, playing = true } = options;

  // Captured once on mount -- durations must be a static object
  const sceneKeys = useRef(Object.keys(durations)).current;
  const totalScenes = sceneKeys.length;
  const durationsArray = useRef(Object.values(durations)).current;

  const [currentScene, setCurrentScene] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  // Track elapsed time within the current scene so pause/resume works correctly
  const elapsedRef = useRef(0);
  const timerStartRef = useRef<number | null>(null);

  // Start recording on mount
  useEffect(() => {
    window.startRecording?.();
  }, []);

  // Scene advancement -- pauses when playing=false
  useEffect(() => {
    if (!playing) {
      if (timerStartRef.current !== null) {
        elapsedRef.current += Date.now() - timerStartRef.current;
        timerStartRef.current = null;
      }
      return;
    }

    if (hasEnded && !loop) return;

    const currentDuration = durationsArray[currentScene];
    const remaining = Math.max(0, currentDuration - elapsedRef.current);

    timerStartRef.current = Date.now();
    const timer = setTimeout(() => {
      elapsedRef.current = 0;
      timerStartRef.current = null;

      if (currentScene >= totalScenes - 1) {
        if (!hasEnded) {
          window.stopRecording?.();
          setHasEnded(true);
          onVideoEnd?.();
        }
        if (loop) {
          setCurrentScene(0);
        }
      } else {
        setCurrentScene(prev => prev + 1);
      }
    }, remaining);

    return () => {
      clearTimeout(timer);
      if (timerStartRef.current !== null) {
        elapsedRef.current += Date.now() - timerStartRef.current;
        timerStartRef.current = null;
      }
    };
  }, [currentScene, totalScenes, durationsArray, hasEnded, loop, onVideoEnd, playing]);

  return {
    currentScene,
    totalScenes,
    currentSceneKey: sceneKeys[currentScene],
    hasEnded,
  };
}

export function useSceneTimer(events: Array<{ time: number; callback: () => void }>) {
  const firedRef = useRef<Set<number>>(new Set());
  const callbacksRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    callbacksRef.current = events.map(e => e.callback);
  }, [events]);

  const scheduleKey = events.map((event, i) => `${i}:${event.time}`).join('|');

  useEffect(() => {
    firedRef.current = new Set();

    const timers = events.map(({ time }, index) => {
      return setTimeout(() => {
        if (!firedRef.current.has(index)) {
          firedRef.current.add(index);
          callbacksRef.current[index]?.();
        }
      }, time);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [scheduleKey]);
}
