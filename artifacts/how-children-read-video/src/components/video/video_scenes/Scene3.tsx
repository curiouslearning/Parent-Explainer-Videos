import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 3 (55s): Feed the Monster — letter-sound matching
export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 15000),
      setTimeout(() => setPhase(3), 35000),
      setTimeout(() => setPhase(4), 48000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 55, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s3_feed_monster.png`}
          className="w-full h-full object-cover"
          alt="Child playing Feed the Monster"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/70 via-[#3D1F0A]/10 to-transparent" />
      </motion.div>

      {/* App name badge */}
      <motion.div
        className="absolute top-10 right-10 z-10"
        initial={{ x: 60, opacity: 0 }}
        animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
        transition={{ duration: 0.9, type: 'spring', damping: 20 }}
      >
        <div className="bg-[#E8820C] text-white px-6 py-3 rounded-2xl text-[2.5vw] font-black shadow-lg">
          Feed the Monster
        </div>
      </motion.div>

      {/* Letter-sound connection animation */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10">
        {['A', 'B', 'C', 'D'].map((letter, i) => (
          <motion.div
            key={letter}
            className="flex items-center gap-4 mb-4"
            initial={{ x: -80, opacity: 0 }}
            animate={phase >= 2 ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
            transition={{ duration: 0.7, delay: i * 0.3, type: 'spring', damping: 18 }}
          >
            <div className="w-14 h-14 bg-[#E8820C] rounded-xl flex items-center justify-center">
              <span className="text-[3vw] font-black text-white">{letter}</span>
            </div>
            <motion.div
              className="h-0.5 bg-[#F5EDD6]/60"
              initial={{ scaleX: 0 }}
              animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: i * 0.3 + 0.3 }}
              style={{ width: '3vw', transformOrigin: 'left' }}
            />
            <span className="text-[1.8vw] text-[#F5EDD6]/80 font-medium">/{letter.toLowerCase()}/</span>
          </motion.div>
        ))}
      </div>

      {/* Key message */}
      <motion.div
        className="absolute bottom-16 left-10 right-10 z-10"
        initial={{ y: 40, opacity: 0 }}
        animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 1.2, type: 'spring', damping: 20 }}
      >
        <div className="bg-[#3D1F0A]/80 backdrop-blur-sm rounded-2xl px-8 py-5 border-l-4 border-[#2E6B3E]">
          <p className="text-[2.5vw] text-[#F5EDD6] font-semibold">
            Simple. Playful. Building the foundation reading requires.
          </p>
        </div>
      </motion.div>

      {/* Patience note */}
      <motion.div
        className="absolute top-10 left-10 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <div className="bg-[#2E6B3E]/85 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-[30vw]">
          <p className="text-[2vw] text-[#F5EDD6] font-medium leading-snug">
            Patient in a way that is very hard for any person to be
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
