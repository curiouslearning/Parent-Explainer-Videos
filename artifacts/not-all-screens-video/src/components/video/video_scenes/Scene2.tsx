import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 2 (51.4s): Where that message comes from — research context matters
export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 18000),
      setTimeout(() => setPhase(3), 36000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Background image with slow pan */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0, x: 0 }}
        animate={{ scale: 1.08, x: '-3%' }}
        transition={{ duration: 52, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s2_context.png`}
          className="w-full h-full object-cover"
          alt="Screen time context comparison"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D1F0A]/70 via-transparent to-[#3D1F0A]/50" />
      </motion.div>

      {/* Deep terracotta top overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.18 : 0 }}
        transition={{ duration: 2 }}
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #C4500A, transparent 60%)' }}
      />

      {/* Floating "context matters" badge — top right */}
      <motion.div
        className="absolute top-12 right-14 z-10"
        initial={{ opacity: 0, x: 30 }}
        animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 1.2, type: 'spring', damping: 20 }}
      >
        <div className="bg-[#3D1F0A]/70 backdrop-blur-sm border border-[#E8820C]/40 rounded-2xl px-7 py-4">
          <p className="text-[2.2vw] text-[#E8820C] font-bold tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}>
            Context Matters
          </p>
        </div>
      </motion.div>

      {/* "Your family is different" message — mid scene */}
      <motion.div
        className="absolute bottom-24 left-12 z-10 max-w-[55%]"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-10 h-[3px] bg-[#E8820C] rounded-full mb-4" />
        <p className="text-[2.4vw] text-[#F5EDD6] font-light leading-snug"
          style={{ fontFamily: 'var(--font-body)' }}>
          The warning wasn't written
        </p>
        <p className="text-[2.8vw] text-[#F5EDD6] font-bold leading-snug"
          style={{ fontFamily: 'var(--font-display)' }}>
          for your family.
        </p>
      </motion.div>

      {/* Accent dot pulse — late scene */}
      <motion.div
        className="absolute bottom-12 right-12 w-4 h-4 rounded-full bg-[#2E6B3E]"
        animate={phase >= 3 ? {
          scale: [1, 1.8, 1],
          opacity: [0.6, 1, 0.6],
        } : { scale: 1, opacity: 0.6 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
