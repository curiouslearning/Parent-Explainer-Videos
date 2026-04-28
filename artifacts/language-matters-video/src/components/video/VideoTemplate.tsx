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
  s1_opening: 18000,
  s2_brain: 25000,
  s3_research: 20000,
  s4_identity: 20000,
  s5_reassurance: 22000,
  s6_cta: 15000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  s1_opening: Scene1,
  s2_brain: Scene2,
  s3_research: Scene3,
  s4_identity: Scene4,
  s5_reassurance: Scene5,
  s6_cta: Scene6,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-light)] text-[var(--color-text-primary)]">
      {/* Persistent Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute w-[80vw] h-[80vw] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent)' }}
          animate={{ x: ['-20%', '40%', '-10%'], y: ['-10%', '30%', '-20%'], scale: [1, 1.2, 0.9] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute w-[60vw] h-[60vw] rounded-full opacity-15 blur-3xl right-0 bottom-0"
          style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)' }}
          animate={{ x: ['10%', '-30%', '5%'], y: ['10%', '-20%', '0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>

        {/* Scene-reactive persistent accent bar */}
        <motion.div
          className="absolute h-[3px] bg-[var(--color-accent)]"
          animate={{
            left: ['5%', '15%', '55%', '30%', '10%', '40%'][sceneIndex] ?? '5%',
            width: ['35%', '60%', '25%', '55%', '45%', '30%'][sceneIndex] ?? '35%',
            top: ['30%', '65%', '45%', '20%', '75%', '50%'][sceneIndex] ?? '30%',
            opacity: 0.5,
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <AnimatePresence initial={false} mode="wait">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
