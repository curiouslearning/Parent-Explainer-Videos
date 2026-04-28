import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 4 (57.5s): Three — Tell stories and ask them to tell stories back
export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 16000),
      setTimeout(() => setPhase(3), 32000),
      setTimeout(() => setPhase(4), 46000),
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
        transition={{ duration: 58, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s4_stories.png`}
          className="w-full h-full object-cover"
          alt="Mother and child reading together"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D1F0A]/82 via-[#3D1F0A]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/55 via-transparent to-transparent" />
      </motion.div>

      {/* Left glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.16 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 5% 50%, #E8820C, transparent 55%)' }}
      />

      {/* Left panel */}
      <div className="absolute left-0 top-0 bottom-0 w-[52%] z-10 flex flex-col justify-center px-12">
        {/* Number badge */}
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ x: -30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
          transition={{ duration: 1.0, type: 'spring', damping: 24 }}
        >
          <div className="w-14 h-14 rounded-full bg-[#E8820C] flex items-center justify-center shrink-0">
            <span className="text-[2.5vw] font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>3</span>
          </div>
          <p className="text-[2.2vw] text-[#E8820C] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
            Tell stories
          </p>
        </motion.div>

        <motion.h2
          className="text-[4vw] font-black text-[#F5EDD6] leading-tight mb-5"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ x: -20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          Stories are{' '}
          <span className="text-[#E8820C]">how knowledge travels</span>
        </motion.h2>

        <motion.div
          className="border-l-4 border-[#E8820C] pl-5 mb-6"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.0vw] text-[#F5EDD6]/90 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Randomised trials in South Africa: storytelling with young children{' '}
            <span className="text-[#E8820C] font-semibold">significantly improved</span>{' '}
            vocabulary and language development.
          </p>
        </motion.div>

        <motion.div
          className="bg-[#F5EDD6]/8 border border-[#E8820C]/30 rounded-xl px-6 py-4 mb-5"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[1.9vw] text-[#F5EDD6]/85 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Then ask them to retell it: What happened first? What next?
            What was the person feeling?
          </p>
        </motion.div>

        <motion.p
          className="text-[2.0vw] text-[#2E6B3E] font-semibold"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          No book needed. And it costs nothing.
        </motion.p>
      </div>
    </motion.div>
  );
}
