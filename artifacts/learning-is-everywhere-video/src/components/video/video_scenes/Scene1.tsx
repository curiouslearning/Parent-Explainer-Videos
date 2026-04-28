import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 1 (35.4s): Opening — "Your child was born curious."
export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 14000),
      setTimeout(() => setPhase(3), 26000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Background image with slow zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 36, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s1_opening.png`}
          className="w-full h-full object-cover"
          alt="Curious African toddler exploring in sunlit yard"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/80 via-[#3D1F0A]/25 to-transparent" />
      </motion.div>

      {/* Warm sunrise glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.18 : 0 }}
        transition={{ duration: 3 }}
        style={{ background: 'radial-gradient(ellipse at 30% 70%, #E8820C, transparent 65%)' }}
      />

      {/* Title block */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 pb-16">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 1.2, type: 'spring', damping: 22 }}
        >
          <p
            className="text-[2.8vw] text-[#F5EDD6]/70 font-light leading-snug tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A message for families
          </p>
          <h1
            className="text-[5.5vw] font-black text-[#F5EDD6] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Learning Is{' '}
            <span className="text-[#E8820C]">Everywhere</span>
          </h1>
        </motion.div>

        <motion.div
          className="h-[3px] bg-[#E8820C] rounded-full mt-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '38%' }}
        />

        <motion.p
          className="text-[2.2vw] text-[#F5EDD6]/80 mt-5 leading-relaxed max-w-[55%]"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 1.0 }}
        >
          Curiosity, when it is welcomed, finds a way.
        </motion.p>
      </div>
    </motion.div>
  );
}
