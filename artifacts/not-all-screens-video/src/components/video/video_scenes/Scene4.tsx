import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 4 (55s): The opportunity — 20 min/day, 100 hours/year
export function Scene4() {
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
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0, x: 0 }}
        animate={{ scale: 1.08, x: '2%' }}
        transition={{ duration: 56, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s4_opportunity.png`}
          className="w-full h-full object-cover"
          alt="Family with phone learning"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/85 via-[#3D1F0A]/20 to-transparent" />
      </motion.div>

      {/* Hopeful warm glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.2 : 0 }}
        transition={{ duration: 3 }}
        style={{ background: 'radial-gradient(ellipse at 40% 35%, #F5B942, transparent 60%)' }}
      />

      {/* "The Opportunity" heading */}
      <motion.div
        className="absolute top-12 left-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1.2, type: 'spring', damping: 20 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-12 bg-[#E8820C] rounded-full" />
          <p className="text-[3vw] font-black text-[#F5EDD6]"
            style={{ fontFamily: 'var(--font-display)' }}>
            The Opportunity
          </p>
        </div>
      </motion.div>

      {/* 20 minutes stat */}
      <motion.div
        className="absolute bottom-28 left-12 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.3, type: 'spring', damping: 18 }}
      >
        <div className="flex items-baseline gap-4 mb-3">
          <span className="text-[9vw] font-black text-[#E8820C] leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            20
          </span>
          <span className="text-[3.5vw] font-bold text-[#F5EDD6]"
            style={{ fontFamily: 'var(--font-display)' }}>
            min / day
          </span>
        </div>
        <p className="text-[2.2vw] text-[#F5EDD6]/80 font-light"
          style={{ fontFamily: 'var(--font-body)' }}>
          focused, adaptive, individual learning
        </p>
      </motion.div>

      {/* 100 hours stat */}
      <motion.div
        className="absolute bottom-10 right-12 z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1.2, type: 'spring', damping: 16 }}
      >
        <div className="bg-[#2E6B3E]/70 backdrop-blur-sm rounded-2xl px-8 py-5 text-center">
          <p className="text-[6vw] font-black text-[#F5EDD6] leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            100+
          </p>
          <p className="text-[1.8vw] text-[#F5EDD6]/80 font-light mt-1"
            style={{ fontFamily: 'var(--font-body)' }}>
            hours of learning / year
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
