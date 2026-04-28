import { useCallback, useMemo, useState } from 'react';

const REPEAT_SUFFIX_RE = /_r[12]$/;

export function stripRepeatSuffix(key: string): string {
  return key.replace(REPEAT_SUFFIX_RE, '');
}

function rotateFromIndex(
  durations: Record<string, number>,
  startIndex: number,
): Record<string, number> {
  const keys = Object.keys(durations);
  if (startIndex <= 0) return durations;
  const result: Record<string, number> = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[(startIndex + i) % keys.length];
    result[key] = durations[key];
  }
  return result;
}

function buildLockedDurations(key: string, duration: number): Record<string, number> {
  return { [`${key}_r1`]: duration, [`${key}_r2`]: duration };
}

export function useSceneControls(baseDurations: Record<string, number>) {
  const sceneKeys = useMemo(() => Object.keys(baseDurations), [baseDurations]);

  // jumpIndex drives the durations rotation — only changes on explicit user jumps
  const [jumpIndex, setJumpIndex] = useState(0);
  // displayIndex tracks the currently-playing scene for the UI progress bar
  const [displayIndex, setDisplayIndex] = useState(0);

  const [locked, setLocked] = useState(false);
  const [mountKey, setMountKey] = useState(0);
  const [tick, setTick] = useState(0);

  // durations only recompute when jumpIndex or locked state changes,
  // NOT on every natural scene transition — this prevents the video player
  // from resetting mid-playback when scenes advance normally
  const durations = useMemo(() => {
    if (locked) {
      const key = sceneKeys[jumpIndex];
      return buildLockedDurations(key, baseDurations[key]);
    }
    return rotateFromIndex(baseDurations, jumpIndex);
  }, [locked, jumpIndex, sceneKeys, baseDurations]);

  // Called by VideoTemplate on every natural scene change — only updates the UI
  const onSceneChange = useCallback(
    (rawKey: string) => {
      const clean = stripRepeatSuffix(rawKey);
      const idx = sceneKeys.indexOf(clean);
      if (idx >= 0) setDisplayIndex(idx);
      setTick((t) => t + 1);
    },
    [sceneKeys],
  );

  // Called when the user explicitly clicks a scene segment
  const jumpTo = useCallback((index: number) => {
    setJumpIndex(index);
    setDisplayIndex(index);
    setMountKey((k) => k + 1);
    setTick((t) => t + 1);
  }, []);

  const toggleLock = useCallback(() => {
    setLocked((prev) => !prev);
    setMountKey((k) => k + 1);
    setTick((t) => t + 1);
  }, []);

  return {
    sceneKeys,
    activeIndex: displayIndex,
    locked,
    mountKey,
    tick,
    durations,
    activeDuration: baseDurations[sceneKeys[displayIndex]] ?? 0,
    onSceneChange,
    jumpTo,
    toggleLock,
  };
}
