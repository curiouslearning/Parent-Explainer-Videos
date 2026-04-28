import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 3 (26.2s): Research — "Better in all subjects. Including English, later on."
export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 12000),
      setTimeout(() => setPhase(3), 20000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const findings = [
    { label: 'Read faster', color: '#E8820C' },
    { label: 'Understand more', color: '#2E6B3E' },
    { label: 'Stay in school longer', color: '#E8820C' },
  ];

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 27, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s3_research.png`}
          className="w-full h-full object-cover"
          alt="Children reading together"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#3D1F0A]/82 via-[#3D1F0A]/28 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/50 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.14 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 95% 50%, #E8820C, transparent 55%)' }}
      />

      <div className="absolute right-0 top-0 bottom-0 w-[50%] z-10 flex flex-col justify-center px-12">
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ x: 30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.0, type: 'spring', damping: 24 }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8820C]" />
          <p className="text-[2.2vw] text-[#E8820C] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
            Africa · Asia · South America
          </p>
        </motion.div>

        <motion.h2
          className="text-[4vw] font-black text-[#F5EDD6] leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ x: 20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.15 }}
        >
          Mother tongue first —
          <span className="text-[#E8820C]"> better in all subjects</span>
        </motion.h2>

        <div className="flex flex-col gap-3 mb-6">
          {phase >= 2 && findings.map((f, i) => (
            <motion.div
              key={f.label}
              className="flex items-center gap-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.18 }}
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
              <p className="text-[2.2vw] font-semibold text-[#F5EDD6]/90" style={{ fontFamily: 'var(--font-body)', color: f.color }}>
                {f.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-[#F5EDD6]/8 border border-[#E8820C]/30 rounded-xl px-6 py-4"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[1.9vw] text-[#F5EDD6]/85 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Once a child truly knows how to read, they can{' '}
            <span className="text-[#E8820C] font-semibold">transfer that skill to any language</span>.
            Reading doesn't need to be re-learned. Only the new words do.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
