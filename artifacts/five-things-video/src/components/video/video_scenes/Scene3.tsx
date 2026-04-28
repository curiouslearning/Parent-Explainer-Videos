import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 3 (47.3s): Two — Ask questions, not just give answers
export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 14000),
      setTimeout(() => setPhase(3), 30000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const questions = [
    'What do you think it is?',
    'What does it look like to you?',
    'Why do you think it moves that way?',
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
        transition={{ duration: 48, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s3_questions.png`}
          className="w-full h-full object-cover"
          alt="Grandmother telling story to grandchild"
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
            <span className="text-[2.5vw] font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>2</span>
          </div>
          <p className="text-[2.2vw] text-[#E8820C] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
            Ask questions
          </p>
        </motion.div>

        <motion.h2
          className="text-[4vw] font-black text-[#F5EDD6] leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ x: 20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          Don't just answer —{' '}
          <span className="text-[#E8820C]">ask back</span>
        </motion.h2>

        {/* Example questions */}
        <div className="flex flex-col gap-3 mb-6">
          {phase >= 2 && questions.map((q, i) => (
            <motion.div
              key={q}
              className="flex items-center gap-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-[#E8820C] shrink-0" />
              <p className="text-[1.9vw] text-[#F5EDD6]/85 italic" style={{ fontFamily: 'var(--font-body)' }}>
                "{q}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-[#2E6B3E]/20 border border-[#2E6B3E]/40 rounded-xl px-6 py-4"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.0vw] text-[#F5EDD6]/90 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            You are not withholding knowledge.
            You are building{' '}
            <span className="text-[#E8820C] font-semibold">a thinker</span>.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
