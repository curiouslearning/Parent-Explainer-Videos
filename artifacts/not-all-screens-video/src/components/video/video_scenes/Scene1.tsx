import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 1 (26.7s): Opening — "You've probably heard that screens are bad for children."
export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 22000),
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
        animate={{ scale: 1.1 }}
        transition={{ duration: 45, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s1_opening.png`}
          className="w-full h-full object-cover"
          alt="African mother and child with phone"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/85 via-[#3D1F0A]/30 to-transparent" />
      </motion.div>

      {/* Warm radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.2 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 25% 65%, #E8820C, transparent 65%)' }}
      />

      {/* Title card */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 pb-16">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 1.2, type: 'spring', damping: 22 }}
        >
          <p className="text-[2.8vw] text-[#F5EDD6]/75 font-light leading-snug tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--font-body)' }}>
            A message for families
          </p>
          <h1 className="text-[5.5vw] font-black text-[#F5EDD6] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}>
            Not All Screens{' '}
            <span className="text-[#E8820C]">Are Equal</span>
          </h1>
        </motion.div>

        <motion.div
          className="h-[3px] bg-[#E8820C] rounded-full mt-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '38%' }}
        />
      </div>
    </motion.div>
  );
}
