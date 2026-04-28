import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 6 (65.6s): Five — Let them practise and let them get things wrong
export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 18000),
      setTimeout(() => setPhase(3), 36000),
      setTimeout(() => setPhase(4), 52000),
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
        transition={{ duration: 66, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s6_practise.png`}
          className="w-full h-full object-cover"
          alt="Parent watching child practise patiently"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D1F0A]/82 via-[#3D1F0A]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/55 via-transparent to-transparent" />
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
            <span className="text-[2.5vw] font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>5</span>
          </div>
          <p className="text-[2.2vw] text-[#E8820C] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
            Let them practise
          </p>
        </motion.div>

        <motion.h2
          className="text-[4vw] font-black text-[#F5EDD6] leading-tight mb-5"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ x: -20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          And let them{' '}
          <span className="text-[#E8820C]">get things wrong</span>
        </motion.h2>

        <motion.div
          className="border-l-4 border-[#E8820C] pl-5 mb-5"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.0vw] text-[#F5EDD6]/90 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Resist jumping in with the answer.{' '}
            <span className="text-[#E8820C] font-semibold">Wait.</span>{' '}
            That moment of struggle is where learning actually happens in the brain.
          </p>
        </motion.div>

        <motion.div
          className="bg-[#F5EDD6]/8 border border-[#E8820C]/30 rounded-xl px-6 py-4 mb-5"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[1.9vw] text-[#F5EDD6]/85 leading-relaxed italic" style={{ fontFamily: 'var(--font-body)' }}>
            "That's interesting — what made you think that?
            Let's try again together."
          </p>
        </motion.div>

        <motion.p
          className="text-[1.9vw] text-[#F5EDD6]/80 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          Parents who engage regularly: children are{' '}
          <span className="text-[#E8820C] font-semibold">2–3× more likely</span>{' '}
          to perform at the expected level in reading.
        </motion.p>
      </div>
    </motion.div>
  );
}
