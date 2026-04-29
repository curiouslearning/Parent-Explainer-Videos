import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';

export const SCENE_DURATIONS: Record<string, number> = {
  s1_opening: 24216,
  s2_context: 51408,
  s3_research: 68256,
  s4_opportunity: 54960,
  s5_active: 56712,
  s6_close: 44560,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  s1_opening: Scene1,
  s2_context: Scene2,
  s3_research: Scene3,
  s4_opportunity: Scene4,
  s5_active: Scene5,
  s6_close: Scene6,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  playing = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  playing?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop, playing });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-dark)] text-[var(--color-text-primary)]">
      {/* Persistent ambient background layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[70vw] h-[70vw] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-secondary), transparent)' }}
          animate={{ x: ['-10%', '30%', '-5%'], y: ['-5%', '20%', '-15%'], scale: [1, 1.15, 0.95] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[50vw] h-[50vw] rounded-full opacity-10 blur-3xl right-0 bottom-0"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent)' }}
          animate={{ x: ['5%', '-20%', '10%'], y: ['5%', '-10%', '0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Scene-reactive accent line */}
        <motion.div
          className="absolute h-[3px] bg-[var(--color-secondary)] rounded-full"
          animate={{
            left: ['8%', '20%', '50%', '25%', '12%', '45%'][sceneIndex] ?? '8%',
            width: ['30%', '55%', '20%', '50%', '40%', '25%'][sceneIndex] ?? '30%',
            top: ['25%', '70%', '40%', '15%', '80%', '55%'][sceneIndex] ?? '25%',
            opacity: 0.4,
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <AnimatePresence initial={false} mode="wait">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
