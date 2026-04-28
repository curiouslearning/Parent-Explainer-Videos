import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 4 (61.7s): You don't need to have all the answers
export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 15000),
      setTimeout(() => setPhase(3), 32000),
      setTimeout(() => setPhase(4), 48000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const tips = [
    'Ask what they learned — and really listen',
    'Let them teach YOU something',
    'Read together, even slowly',
    'Say: "I don\'t know — let\'s find out"',
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
        initial={{ scale: 1.02 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 62, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s4_answers.png`}
          className="w-full h-full object-cover"
          alt="Parent and child discovering something on a path together"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#3D1F0A]/80 via-[#3D1F0A]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/50 via-transparent to-transparent" />
      </motion.div>

      {/* Accent glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.14 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 95% 55%, #E8820C, transparent 55%)' }}
      />

      {/* Right panel */}
      <div className="absolute right-0 top-0 bottom-0 w-[50%] z-10 flex flex-col justify-center px-12">
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
          transition={{ duration: 1.0, type: 'spring', damping: 24 }}
        >
          <p
            className="text-[2.2vw] text-[#E8820C] font-semibold tracking-wide uppercase mb-3"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            You don't need all the answers
          </p>
          <h2
            className="text-[4vw] font-black text-[#F5EDD6] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Be{' '}
            <span className="text-[#E8820C]">curious</span>{' '}
            alongside them
          </h2>
        </motion.div>

        {/* Tips list */}
        <div className="flex flex-col gap-3 mt-7">
          {phase >= 2 && tips.map((tip, i) => (
            <motion.div
              key={tip}
              className="flex items-start gap-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <div className="w-6 h-6 rounded-full bg-[#E8820C]/25 border border-[#E8820C]/50 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#E8820C]" />
              </div>
              <p
                className="text-[1.9vw] text-[#F5EDD6]/85 leading-snug"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {tip}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 bg-[#2E6B3E]/20 border border-[#2E6B3E]/40 rounded-xl px-6 py-5"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 1.0 }}
        >
          <p
            className="text-[2.0vw] text-[#F5EDD6]/90 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            "Not knowing is the{' '}
            <span className="text-[#E8820C] font-semibold">beginning of finding out</span>,
            not a reason to stop."
          </p>
        </motion.div>

        <motion.p
          className="text-[1.9vw] text-[#F5EDD6]/70 mt-5 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          A child who grows up where questions are welcomed
          will carry that long after they leave school.
        </motion.p>
      </div>
    </motion.div>
  );
}
