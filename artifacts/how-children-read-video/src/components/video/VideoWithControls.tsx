import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from '@/hooks/useSceneControls';

const SCENE_KEYS_ORDERED = Object.keys(SCENE_DURATIONS) as Array<keyof typeof SCENE_DURATIONS>;

export default function VideoWithControls() {
  const { activeIndex, mountKey, durations, onSceneChange, jumpTo: jumpToScene } = useSceneControls(SCENE_DURATIONS);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSrc = `${import.meta.env.BASE_URL}audio/narration.mp3`;
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
  }, [onSceneChange]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingRef.current) {
      audio.pause();
      setPlayingBoth(false);
    } else {
      screen.orientation?.lock?.('landscape').catch?.(() => {});
      const tryPlay = () => {
        audio.play().then(() => setPlayingBoth(true)).catch(() => {});
      };
      if (audio.readyState >= 3) {
        tryPlay();
      } else {
        audio.addEventListener('canplaythrough', tryPlay, { once: true });
      }
    }
  }, [setPlayingBoth]);

  const rewind = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlayingBoth(false);
    setProgress(0);
    jumpToScene(0);
  }, [jumpToScene, setPlayingBoth]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      setPlayingBoth(false);
      window.parent?.postMessage({ type: 'VIDEO_ENDED' }, '*');
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [setPlayingBoth]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      setProgress(Math.min(1, audio.currentTime / audio.duration));
    }, 100);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    return () => { try { screen.orientation?.unlock?.(); } catch {} };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black">
      <audio ref={audioRef} src={audioSrc} preload="auto" />

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

      <div
        className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="px-3 pb-2">
          <button
            onClick={(e) => { e.stopPropagation(); rewind(); }}
            className="pointer-events-auto w-11 h-11 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 active:bg-black/80 rounded-full backdrop-blur-sm border border-white/20 transition-colors"
            title="Restart"
            aria-label="Restart from beginning"
          >
            <RotateCcw className="w-5 h-5" />
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
