import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 5 (56.7s): Active vs passive — what to watch for
export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 20000),
      setTimeout(() => setPhase(3), 40000),
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
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.07 }}
        transition={{ duration: 57, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s5_active.png`}
          className="w-full h-full object-cover"
          alt="Active vs passive screen use"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/80 via-[#3D1F0A]/25 to-transparent" />
      </motion.div>

      {/* Dual accent glows */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.15 : 0 }}
        transition={{ duration: 2 }}
        style={{ background: 'linear-gradient(90deg, rgba(46,107,62,0.3) 0%, transparent 50%, rgba(232,130,12,0.2) 100%)' }}
      />

      {/* Title row */}
      <motion.div
        className="absolute top-10 left-12 right-12 z-10 flex justify-between items-start"
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="bg-[#2E6B3E]/80 backdrop-blur-sm rounded-2xl px-7 py-4"
          initial={{ x: -30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', damping: 20 }}
        >
          <p className="text-[2.2vw] text-[#F5EDD6] font-bold"
            style={{ fontFamily: 'var(--font-display)' }}>
            Active Learning ✓
          </p>
        </motion.div>

        <motion.div
          className="bg-[#3D1F0A]/70 backdrop-blur-sm border border-[#E8820C]/30 rounded-2xl px-7 py-4"
          initial={{ x: 30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', damping: 20 }}
        >
          <p className="text-[2.2vw] text-[#F5EDD6]/70 font-bold"
            style={{ fontFamily: 'var(--font-display)' }}>
            Passive Watching ×
          </p>
        </motion.div>
      </motion.div>

      {/* Active learning descriptors */}
      <motion.div
        className="absolute bottom-24 left-12 z-10 max-w-[42%]"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col gap-2">
          {['Puzzles & letter building', 'Words spoken aloud', 'Reading simple sentences'].map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: i * 0.25, duration: 0.7 }}
            >
              <div className="w-2 h-2 rounded-full bg-[#2E6B3E] shrink-0" />
              <p className="text-[1.9vw] text-[#F5EDD6]/90"
                style={{ fontFamily: 'var(--font-body)' }}>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA — late */}
      <motion.div
        className="absolute bottom-8 right-12 z-10 text-right"
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-[2vw] text-[#F5EDD6]/80 italic"
          style={{ fontFamily: 'var(--font-body)' }}>
          Sit with them. Ask what they've learned.
        </p>
      </motion.div>
    </motion.div>
  );
}
