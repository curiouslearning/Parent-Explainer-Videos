import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 5 (49.4s): Four — Let your child teach you
export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 16000),
      setTimeout(() => setPhase(3), 32000),
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
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 50, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s5_teach.png`}
          className="w-full h-full object-cover"
          alt="Child teaching parent with proud expression"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#3D1F0A]/80 via-[#3D1F0A]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/50 via-transparent to-transparent" />
      </motion.div>

      {/* Right glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.14 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 95% 50%, #E8820C, transparent 55%)' }}
      />

      {/* Right panel */}
      <div className="absolute right-0 top-0 bottom-0 w-[50%] z-10 flex flex-col justify-center px-12">
        {/* Number badge */}
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ x: 30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
          transition={{ duration: 1.0, type: 'spring', damping: 24 }}
        >
          <div className="w-14 h-14 rounded-full bg-[#E8820C] flex items-center justify-center shrink-0">
            <span className="text-[2.5vw] font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>4</span>
          </div>
          <p className="text-[2.2vw] text-[#E8820C] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
            Let them teach you
          </p>
        </motion.div>

        <motion.h2
          className="text-[4vw] font-black text-[#F5EDD6] leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ x: 20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          Let them be{' '}
          <span className="text-[#E8820C]">the expert</span>
        </motion.h2>

        <motion.div
          className="border-l-4 border-[#E8820C] pl-5 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.0vw] text-[#F5EDD6]/90 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Ask: "What did you learn? Can you teach me?" —
            then listen as if you don't know.{' '}
            <span className="text-[#E8820C] font-semibold">Even if you do.</span>
          </p>
        </motion.div>

        <motion.div
          className="bg-[#2E6B3E]/20 border border-[#2E6B3E]/40 rounded-xl px-6 py-4"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.0vw] text-[#F5EDD6]/90 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            When a child explains something, they move from{' '}
            <span className="text-[#E8820C] font-semibold">remembering</span>{' '}
            it to truly{' '}
            <span className="text-[#E8820C] font-semibold">understanding</span> it.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
