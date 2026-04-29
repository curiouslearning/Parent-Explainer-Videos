import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';
import { Scene7 } from './video_scenes/Scene7';

export const SCENE_DURATIONS = {
  s1_opening: 25248 + 4000,
  s2_talk: 56568,
  s3_questions: 47256,
  s4_stories: 57456,
  s5_teach: 49368,
  s6_practise: 65616,
  s7_close: 23808 + 4000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  s1_opening: Scene1,
  s2_talk: Scene2,
  s3_questions: Scene3,
  s4_stories: Scene4,
  s5_teach: Scene5,
  s6_practise: Scene6,
  s7_close: Scene7,
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
  const { currentSceneKey } = useVideoPlayer({ durations, loop, playing });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: '#3D1F0A' }}
    >
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
