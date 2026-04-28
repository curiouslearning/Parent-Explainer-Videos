import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 2 (27s): The brain argument — "It's connecting sounds they already know"
export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 10000),
      setTimeout(() => setPhase(3), 20000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 28, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s2_brain.png`}
          className="w-full h-full object-cover"
          alt="Child at chalkboard with shapes"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D1F0A]/82 via-[#3D1F0A]/28 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/50 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 5% 50%, #E8820C, transparent 55%)' }}
      />

      <div className="absolute left-0 top-0 bottom-0 w-[52%] z-10 flex flex-col justify-center px-12">
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ x: -30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.0, type: 'spring', damping: 24 }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8820C]" />
          <p className="text-[2.2vw] text-[#E8820C] font-semibold tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
            How reading actually works
          </p>
        </motion.div>

        <motion.h2
          className="text-[4.2vw] font-black text-[#F5EDD6] leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ x: -20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.15 }}
        >
          Familiar sounds connect{' '}
          <span className="text-[#E8820C]">quickly</span>
        </motion.h2>

        <motion.div
          className="border-l-4 border-[#E8820C] pl-5 mb-6"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.1vw] text-[#F5EDD6]/90 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            The brain connects sounds it already knows to symbols on a page.
            In a familiar language, it says:{' '}
            <span className="text-[#E8820C] font-semibold italic">"I know that word — I just need to learn what it looks like."</span>
          </p>
        </motion.div>

        <motion.div
          className="bg-[#2E6B3E]/20 border border-[#2E6B3E]/40 rounded-xl px-6 py-4"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.0vw] text-[#F5EDD6]/85 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Learning to read in an unfamiliar language is like solving
            two puzzles at once. Progress is slower —
            and{' '}
            <span className="text-[#E8820C] font-semibold">far more children give up</span>.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
