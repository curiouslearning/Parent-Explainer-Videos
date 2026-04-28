import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 1 (21s): Opening — "You don't need to read..."
export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 10000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Background image with slow zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 21, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s1_opening.png`}
          className="w-full h-full object-cover"
          alt="Mother speaking to child"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/80 via-[#3D1F0A]/20 to-transparent" />
      </motion.div>

      {/* Warm overlay glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
        transition={{ duration: 2 }}
        style={{ background: 'radial-gradient(ellipse at 30% 60%, #E8820C, transparent 70%)' }}
      />

      {/* Title card bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 pb-16">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 1.2, type: 'spring', damping: 22 }}
        >
          <p className="text-[2.8vw] text-[#F5EDD6]/80 font-light leading-snug tracking-wide uppercase mb-2">
            A message for families
          </p>
          <h1 className="text-[5.5vw] font-black text-[#F5EDD6] leading-tight">
            How Children{' '}
            <span className="text-[#E8820C]">Learn to Read</span>
          </h1>
        </motion.div>

        {/* Accent line */}
        <motion.div
          className="h-1 bg-[#E8820C] rounded-full mt-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '40%' }}
        />
      </div>
    </motion.div>
  );
}
