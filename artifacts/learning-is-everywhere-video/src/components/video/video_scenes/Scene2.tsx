import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 2 (61.6s): Learning is already happening around you
export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 12000),
      setTimeout(() => setPhase(3), 28000),
      setTimeout(() => setPhase(4), 44000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const moments = [
    { label: 'Counting coins at the market', delay: 0 },
    { label: 'Naming plants and birds', delay: 300 },
    { label: 'Sharing stories of the past', delay: 600 },
  ];

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
        transition={{ duration: 62, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s2_learning_around.png`}
          className="w-full h-full object-cover"
          alt="African mother counting coins with child at market"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D1F0A]/75 via-[#3D1F0A]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Ochre glow left side */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 5% 50%, #E8820C, transparent 55%)' }}
      />

      {/* Left panel content */}
      <div className="absolute left-0 top-0 bottom-0 w-[52%] z-10 flex flex-col justify-center px-12">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
          transition={{ duration: 1.0, type: 'spring', damping: 24 }}
        >
          <p
            className="text-[2.2vw] text-[#E8820C] font-semibold tracking-wide uppercase mb-3"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Already happening
          </p>
          <h2
            className="text-[4.2vw] font-black text-[#F5EDD6] leading-tight mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your child is learning{' '}
            <span className="text-[#E8820C]">right now</span>
          </h2>
        </motion.div>

        {/* Moment cards */}
        <div className="flex flex-col gap-3 mt-2">
          {phase >= 2 && moments.map((m, i) => (
            <motion.div
              key={m.label}
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.18 + m.delay / 1000 }}
            >
              <div className="w-2 h-2 rounded-full bg-[#E8820C] shrink-0" />
              <p
                className="text-[2.0vw] text-[#F5EDD6]/85"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Foundation message */}
        <motion.div
          className="mt-8 border-l-4 border-[#E8820C] pl-5"
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1.0 }}
        >
          <p
            className="text-[2.2vw] text-[#F5EDD6]/90 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            This is the foundation that{' '}
            <span className="text-[#E8820C] font-semibold">everything else</span>{' '}
            is built on.
          </p>
        </motion.div>

        {/* Power line */}
        <motion.p
          className="text-[2.0vw] text-[#2E6B3E] font-semibold mt-5"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          One of the most powerful advantages a child can have.
        </motion.p>
      </div>
    </motion.div>
  );
}
