import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 2 (56.6s): One — Talk to your child and listen back
export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 14000),
      setTimeout(() => setPhase(3), 30000),
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
        transition={{ duration: 57, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s2_talk.png`}
          className="w-full h-full object-cover"
          alt="African father talking with his child"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D1F0A]/80 via-[#3D1F0A]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/50 via-transparent to-transparent" />
      </motion.div>

      {/* Left glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
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
            <span className="text-[2.5vw] font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>1</span>
          </div>
          <p className="text-[2.2vw] text-[#E8820C] font-semibold tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
            Talk to your child
          </p>
        </motion.div>

        <motion.h2
          className="text-[4vw] font-black text-[#F5EDD6] leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ x: -20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.2, type: 'spring', damping: 24 }}
        >
          Real conversation.{' '}
          <span className="text-[#E8820C]">Real listening.</span>
        </motion.h2>

        {/* Key insight */}
        <motion.div
          className="mt-6 border-l-4 border-[#E8820C] pl-5"
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.1vw] text-[#F5EDD6]/90 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Not just instructions — tell them what you're doing{' '}
            <span className="text-[#E8820C] font-semibold">and why</span>.
            Ask what they think. Then really listen.
          </p>
        </motion.div>

        {/* Research callout */}
        <motion.div
          className="mt-6 bg-[#2E6B3E]/20 border border-[#2E6B3E]/40 rounded-xl px-6 py-4"
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[1.8vw] text-[#F5EDD6]/85 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            South Africa & Brazil: children whose caregivers talked{' '}
            <span className="text-[#E8820C] font-semibold">with</span> them —
            even in high poverty — performed significantly better for years afterward.
          </p>
        </motion.div>

        {/* Simple closing */}
        <motion.p
          className="text-[2.0vw] text-[#F5EDD6]/75 mt-5 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          No book needed. No electricity. Just your{' '}
          <span className="text-[#E8820C] font-semibold">presence</span>.
        </motion.p>
      </div>
    </motion.div>
  );
}
