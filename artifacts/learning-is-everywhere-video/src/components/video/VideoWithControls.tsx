import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from '@/hooks/useSceneControls';

const SCENE_KEYS_ORDERED = Object.keys(SCENE_DURATIONS) as Array<keyof typeof SCENE_DURATIONS>;
const TOTAL_DURATION_MS = (Object.values(SCENE_DURATIONS) as number[]).reduce((a, b) => a + b, 0);

function getSceneAudioSrc(sceneKey: string): string {
  return `${import.meta.env.BASE_URL}audio/${sceneKey}.mp3`;
}

function playWhenReady(audio: HTMLAudioElement): void {
  if (audio.readyState >= 3) {
    audio.play().catch(() => {});
  } else {
    audio.addEventListener('canplay', () => { audio.play().catch(() => {}); }, { once: true });
  }
}

interface VideoWithControlsProps {
  onEnded?: () => void;
}

export default function VideoWithControls({ onEnded }: VideoWithControlsProps = {}) {
  const { activeIndex, mountKey, durations, onSceneChange, jumpTo: jumpToScene } = useSceneControls(SCENE_DURATIONS);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioKeyRef = useRef<string>(SCENE_KEYS_ORDERED[0]);
  const playingRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const setPlayingBoth = useCallback((val: boolean) => {
    playingRef.current = val;
    setPlaying(val);
  }, []);

  const handleSceneChange = useCallback((rawKey: string) => {
    onSceneChange(rawKey);
    const clean = rawKey.replace(/_r[12]$/, '');
    currentAudioKeyRef.current = clean;
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = getSceneAudioSrc(clean);
    audio.load();
    if (playingRef.current) {
      playWhenReady(audio);
    }
  }, [onSceneChange]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingRef.current) {
      audio.pause();
      setPlayingBoth(false);
    } else {
      if (!audio.src || audio.src === window.location.href) {
        audio.src = getSceneAudioSrc(currentAudioKeyRef.current);
        audio.load();
      }
      setPlayingBoth(true);
      playWhenReady(audio);
    }
  }, [setPlayingBoth]);

  const rewind = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = getSceneAudioSrc(SCENE_KEYS_ORDERED[0]);
      audio.load();
    }
    currentAudioKeyRef.current = SCENE_KEYS_ORDERED[0];
    setPlayingBoth(false);
    setProgress(0);
    jumpToScene(0);
  }, [jumpToScene, setPlayingBoth]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      if (activeIndexRef.current === SCENE_KEYS_ORDERED.length - 1) {
        setPlayingBoth(false);
        onEnded?.();
        window.parent?.postMessage({ type: 'VIDEO_ENDED' }, '*');
      }
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [setPlayingBoth, onEnded]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const idx = activeIndexRef.current;
      const priorMs = SCENE_KEYS_ORDERED.slice(0, idx).reduce(
        (a, k) => a + (SCENE_DURATIONS[k as keyof typeof SCENE_DURATIONS] ?? 0), 0
      );
      setProgress(Math.min(1, (priorMs + audio.currentTime * 1000) / TOTAL_DURATION_MS));
    }, 100);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="relative w-full h-screen bg-black">
      <audio ref={audioRef} preload="auto" />

      <VideoTemplate
        key={mountKey}
        durations={durations}
        loop={false}
        playing={playing}
        onSceneChange={handleSceneChange}
      />

      <button
        onClick={togglePlay}
        className="absolute inset-0 z-40 w-full h-full cursor-pointer bg-transparent"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </div>
        )}
      </button>

      <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none">
        <div className="px-3 pb-2">
          <button
            onClick={(e) => { e.stopPropagation(); rewind(); }}
            className="pointer-events-auto w-9 h-9 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm border border-white/20 transition-colors"
            title="Restart"
            aria-label="Restart from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full h-1.5 bg-white/25 pointer-events-auto">
          <div
            className="h-full bg-white"
            style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
          />
        </div>
      </div>
    </div>
  );
}
