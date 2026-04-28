import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Repeat, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from '@/hooks/useSceneControls';

const BASE = import.meta.env.BASE_URL;
const SCENE_KEYS = Object.keys(SCENE_DURATIONS) as (keyof typeof SCENE_DURATIONS)[];

const PROGRESS_TICK_MS = 60;

function ProgressSegments({
  sceneKeys,
  activeIndex,
  activeDuration,
  tick,
  onJumpTo,
}: {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  tick: number;
  onJumpTo: (i: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const start = performance.now();
    const id = window.setInterval(() => {
      setElapsed(performance.now() - start);
    }, PROGRESS_TICK_MS);
    return () => window.clearInterval(id);
  }, [tick]);

  const progress = activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;

  return (
    <div className="flex-1 flex items-center gap-1.5">
      {sceneKeys.map((key, i) => {
        const isActive = i === activeIndex;
        const fill = isActive ? progress * 100 : i < activeIndex ? 100 : 0;
        return (
          <button
            key={key}
            onClick={() => onJumpTo(i)}
            className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-4 hover:bg-white/25 transition-all relative min-h-[12px]"
            aria-label={`Jump to scene ${i + 1}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <div
              className="absolute inset-y-0 left-0 bg-white/90 rounded-full transition-[width] duration-100"
              style={{ width: `${fill}%` }}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const isAutoplay = isIframed && new URLSearchParams(window.location.search).get('autoplay') === '1';

  const {
    sceneKeys, activeIndex, locked, mountKey, tick,
    durations, activeDuration, onSceneChange, jumpTo, toggleLock,
  } = useSceneControls(SCENE_DURATIONS);

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const lastSceneKeyRef = useRef<string>('');
  const autoplayDoneRef = useRef(false);

  // Load audio on scene change
  useEffect(() => {
    if (!isIframed) return;
    const sceneKey = SCENE_KEYS[activeIndex];
    if (!sceneKey || sceneKey === lastSceneKeyRef.current) return;
    lastSceneKeyRef.current = sceneKey;

    const audio = audioRef.current;
    if (!audio) return;

    setAudioReady(false);
    audio.src = `${BASE}audio/${sceneKey}.mp3`;
    audio.load();
    audio.oncanplaythrough = () => {
      setAudioReady(true);
      if (playing) {
        audio.play().catch(() => {});
      }
    };
  }, [activeIndex, isIframed, playing]);

  // Handle audio end — stop at last scene and notify hub
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      const isLast = activeIndex === SCENE_KEYS.length - 1;
      if (isLast) {
        setPlaying(false);
        window.parent?.postMessage({ type: 'VIDEO_ENDED' }, '*');
      }
    };
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [activeIndex]);

  // Auto-start when audio is ready on first load (hub autoplay)
  useEffect(() => {
    if (!isAutoplay || autoplayDoneRef.current || !audioReady) return;
    autoplayDoneRef.current = true;
    setPlaying(true);
  }, [isAutoplay, audioReady]);

  // Sync play/pause with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing && audioReady) {
      audio.play().catch(() => {});
    } else if (!playing) {
      audio.pause();
    }
  }, [playing, audioReady]);

  // Sync mute
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = muted;
  }, [muted]);

  // jumpTo should also reset audio
  const handleJumpTo = useCallback((index: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = '';
    }
    lastSceneKeyRef.current = '';
    setAudioReady(false);
    jumpTo(index);
  }, [jumpTo]);

  // Collapsed bar state
  const sensorRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setHovering(true);
  }, []);
  const handlePointerLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setHovering(false);
  }, []);
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return;
    if (collapsed) setTapPinned(true);
  }, [collapsed]);
  const handleToggleCollapsed = useCallback(() => {
    setCollapsed(c => {
      if (!c) { setHovering(false); setTapPinned(false); }
      return !c;
    });
  }, []);

  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const onDocPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      const sensor = sensorRef.current;
      if (sensor && !sensor.contains(e.target as Node)) setTapPinned(false);
    };
    document.addEventListener('pointerdown', onDocPointerDown);
    return () => document.removeEventListener('pointerdown', onDocPointerDown);
  }, [collapsed, tapPinned]);

  const barVisible = !collapsed || hovering || tapPinned;

  // Export path
  if (!isIframed) return <VideoTemplate />;

  return (
    <div className="relative w-full h-screen bg-[#3D1F0A]">
      <audio ref={audioRef} preload="auto" />

      <VideoTemplate
        key={mountKey}
        durations={durations}
        loop={locked}
        onSceneChange={onSceneChange}
      />

      {/* Sensor + control bar */}
      <div
        ref={sensorRef}
        className="absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-end"
        style={{ height: '25%' }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        <div className="flex-1 w-full" aria-hidden="true" />

        <div
          className={`flex items-center gap-3 bg-black/50 backdrop-blur-sm px-5 py-4 transition-all duration-200 ease-out ${
            barVisible
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-full opacity-0 pointer-events-none'
          }`}
          aria-hidden={!barVisible}
        >
          {/* Play/Pause */}
          <button
            onClick={() => setPlaying(p => !p)}
            className="w-14 h-14 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-lg shrink-0"
            title={playing ? 'Pause' : 'Play'}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>

          {/* Mute */}
          <button
            onClick={() => setMuted(m => !m)}
            className="w-14 h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors rounded-lg shrink-0"
            title={muted ? 'Unmute' : 'Mute'}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
          </button>

          <div className="w-px self-stretch bg-white/15" aria-hidden="true" />

          {/* Scene lock */}
          <button
            onClick={toggleLock}
            className={`w-14 h-14 flex items-center justify-center transition-colors rounded-lg shrink-0 ${
              locked
                ? 'text-white bg-white/15 hover:bg-white/25'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            title={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
            aria-label={locked ? 'Loop current scene: on' : 'Loop current scene: off'}
            aria-pressed={locked}
          >
            <Repeat className="w-8 h-8" />
          </button>

          <div className="w-px self-stretch bg-white/15" aria-hidden="true" />

          <ProgressSegments
            sceneKeys={sceneKeys}
            activeIndex={activeIndex}
            activeDuration={activeDuration}
            tick={tick}
            onJumpTo={handleJumpTo}
          />

          <div className="text-xl text-white/60 font-mono tabular-nums shrink-0">
            {activeIndex + 1}/{sceneKeys.length}
          </div>

          <button
            onClick={handleToggleCollapsed}
            className="w-14 h-14 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors rounded-lg shrink-0"
            title={collapsed ? 'Show controls' : 'Hide controls'}
            aria-label={collapsed ? 'Show controls' : 'Hide controls'}
            aria-expanded={!collapsed}
          >
            {collapsed ? <ChevronUp className="w-10 h-10" /> : <ChevronDown className="w-10 h-10" />}
          </button>
        </div>
      </div>
    </div>
  );
}
