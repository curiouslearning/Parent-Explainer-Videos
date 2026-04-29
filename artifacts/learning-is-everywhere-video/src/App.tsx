import { useState, useEffect, useRef, useCallback } from 'react';
import VideoWithControls from '@/components/video/VideoWithControls';

interface Video {
  id: string;
  num: number;
  title: string;
  description: string;
  type: 'youtube' | 'internal' | 'inline';
  youtubeId?: string;
  path?: string;
  thumbnail: string;
  duration?: string;
}

const VIDEOS: Video[] = [
  {
    id: 'welcome',
    num: 1,
    title: 'Welcome to the Series',
    description: 'An introduction from Curious Learning about how this video series can help you support your child\'s literacy journey.',
    type: 'youtube',
    youtubeId: 'o82z2CBF76s',
    thumbnail: 'https://img.youtube.com/vi/o82z2CBF76s/maxresdefault.jpg',
    duration: '',
  },
  {
    id: 'how-children-read',
    num: 2,
    title: 'How Children Learn to Read',
    description: 'What happens in the brain when a child learns to read — and simple things you can do at home to help.',
    type: 'internal',
    path: '/how-children-read-video/',
    thumbnail: '/how-children-read-video/images/s1_opening.png',
    duration: '~5 min',
  },
  {
    id: 'language-matters',
    num: 3,
    title: 'Why Your Language Matters Most',
    description: 'Children who learn to read in their home language first go on to do better in all subjects.',
    type: 'internal',
    path: '/language-matters-video/',
    thumbnail: '/language-matters-video/images/s1_opening.png',
    duration: '~2.5 min',
  },
  {
    id: 'not-all-screens',
    num: 4,
    title: 'Not All Screens Are Equal',
    description: 'There is a big difference between passive screen time and active educational use. Here\'s what to look for.',
    type: 'internal',
    path: '/not-all-screens-video/',
    thumbnail: '/not-all-screens-video/images/s1_opening.png',
    duration: '~4 min',
  },
  {
    id: 'five-things',
    num: 5,
    title: 'Five Things You Already Do',
    description: 'Without knowing it, you are already doing five things that science says make a real difference to your child\'s learning.',
    type: 'internal',
    path: '/five-things-video/',
    thumbnail: '/five-things-video/images/s1_opening.png',
    duration: '~5.5 min',
  },
  {
    id: 'learning-everywhere',
    num: 6,
    title: 'Learning Is Everywhere',
    description: 'Everyday moments are learning opportunities. Discover how to turn ordinary time into something extraordinary.',
    type: 'inline',
    thumbnail: `${import.meta.env.BASE_URL}images/s1_opening.png`,
    duration: '~4 min',
  },
];

function useWatched() {
  const [watched, setWatched] = useState<Set<string>>(() => {
    try {
      const stored = sessionStorage.getItem('curious-watched');
      return new Set(stored ? (JSON.parse(stored) as string[]) : []);
    } catch {
      return new Set<string>();
    }
  });

  const markWatched = useCallback((id: string) => {
    setWatched(prev => {
      const next = new Set(prev);
      next.add(id);
      try {
        sessionStorage.setItem('curious-watched', JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  return { watched, markWatched };
}

export default function App() {
  const { watched, markWatched } = useWatched();
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const openVideo = useCallback((v: Video) => setActiveVideo(v), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeVideo(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeVideo]);

  return (
    <div className="min-h-screen bg-[#F5EDD6]">
      <header className="bg-[#3D1F0A] text-white px-6 py-6 md:py-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-[#E8820C] mb-2 tracking-tight">
            Curious Learning
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium">Parent Explainer Videos</p>
          <p className="text-sm text-white/55 mt-2">
            A short video series to help you support your child's literacy journey
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map(v => (
            <VideoCard
              key={v.id}
              video={v}
              watched={watched.has(v.id)}
              onOpen={() => openVideo(v)}
            />
          ))}
        </div>
        <p className="text-center text-xs text-[#9B7860] mt-10">
          Progress is tracked for this browser session only.
        </p>
      </main>

      {activeVideo && (
        <VideoPlayer
          video={activeVideo}
          onClose={closeVideo}
          onWatched={() => markWatched(activeVideo.id)}
        />
      )}
    </div>
  );
}

function VideoCard({
  video,
  watched,
  onOpen,
}: {
  video: Video;
  watched: boolean;
  onOpen: () => void;
}) {
  const isComingSoon = video.type === 'youtube' && !video.youtubeId;

  return (
    <button
      onClick={isComingSoon ? undefined : onOpen}
      disabled={isComingSoon}
      className={[
        'group relative flex flex-col rounded-2xl overflow-hidden text-left transition-all duration-200 bg-white',
        isComingSoon
          ? 'opacity-60 cursor-not-allowed shadow-sm ring-1 ring-[#EADCB5]'
          : 'shadow-md cursor-pointer hover:-translate-y-1 hover:shadow-xl active:scale-[0.97] active:shadow-md',
        watched
          ? 'ring-2 ring-[#2E6B3E]'
          : isComingSoon
          ? ''
          : 'ring-1 ring-[#EADCB5] hover:ring-[#E8820C]',
      ].join(' ')}
    >
      <div className="relative w-full aspect-video bg-[#3D1F0A] overflow-hidden">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#3D1F0A]" />
        )}

        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#E8820C] flex items-center justify-center text-white font-bold text-sm shadow">
          {video.num}
        </div>

        {watched && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2E6B3E] flex items-center justify-center shadow">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {!isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 group-active:bg-black/40 transition-colors duration-200">
            <div className="w-12 h-12 rounded-full bg-white/70 group-hover:bg-white/95 group-active:bg-white flex items-center justify-center transition-all duration-200 shadow-md">
              <svg
                className="w-6 h-6 text-[#3D1F0A] ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1.5 rounded-full">
              Coming soon
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-display font-bold text-[#3D1F0A] text-base leading-snug mb-1">
          {video.title}
        </h2>
        <p className="text-sm text-[#6B4423] leading-snug flex-1">{video.description}</p>
        <div className="mt-3 flex items-center gap-2">
          {video.duration && (
            <span className="text-xs text-[#9B7860]">{video.duration}</span>
          )}
          {watched && (
            <span className="text-xs text-[#2E6B3E] font-semibold ml-auto">✓ Watched</span>
          )}
        </div>
      </div>
    </button>
  );
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: HTMLIFrameElement | HTMLElement | string,
        opts: {
          videoId?: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onStateChange?: (e: { data: number }) => void;
            onReady?: () => void;
          };
        },
      ) => { destroy(): void };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

function VideoPlayer({
  video,
  onClose,
  onWatched,
}: {
  video: Video;
  onClose: () => void;
  onWatched: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<{ destroy(): void } | null>(null);

  useEffect(() => {
    if (video.type !== 'internal') return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'VIDEO_ENDED') onWatched();
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [video.type, onWatched]);

  useEffect(() => {
    if (video.type !== 'youtube' || !video.youtubeId) return;

    const attachPlayer = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      try {
        playerRef.current = new window.YT.Player(iframe, {
          events: {
            onStateChange: ({ data }: { data: number }) => {
              if (data === 0) onWatched();
            },
          },
        });
      } catch {}
    };

    if (window.YT?.Player) {
      requestAnimationFrame(attachPlayer);
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        requestAnimationFrame(attachPlayer);
      };
      if (!document.getElementById('yt-api')) {
        const s = document.createElement('script');
        s.id = 'yt-api';
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      }
    }

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, [video, onWatched]);

  const ytSrc = video.youtubeId
    ? `https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1&autoplay=1&rel=0&modestbranding=1`
    : '';

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1a0905] shrink-0 border-b border-white/10">
        <button
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 rounded-full transition-colors shrink-0"
          aria-label="Back to menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <span className="font-display text-white font-semibold truncate text-sm md:text-base">
          {video.num}. {video.title}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center bg-black overflow-hidden">
        {video.type === 'youtube' ? (
          <div className="w-full h-full flex items-center justify-center p-0">
            <iframe
              ref={iframeRef}
              src={ytSrc}
              className="w-full h-full"
              style={{ maxHeight: 'calc(100vh - 56px)' }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          </div>
        ) : video.type === 'inline' ? (
          <div className="w-full h-full">
            <VideoWithControls onEnded={onWatched} />
          </div>
        ) : (
          <iframe
            src={video.path}
            className="w-full h-full"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            title={video.title}
          />
        )}
      </div>
    </div>
  );
}
