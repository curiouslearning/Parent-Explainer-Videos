import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2000),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 6000),
      setTimeout(() => setPhase(4), 11000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-secondary)] overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_60%)] opacity-20 mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-12 text-center">
        <motion.p
          className="text-[2.5vw] text-[var(--color-bg-light)]/80 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          When a child sees their language written down... it sends a powerful message.
        </motion.p>

        <div className="flex flex-col gap-6 items-center mb-16">
          <motion.div
            className="bg-white text-[var(--color-primary)] px-10 py-4 rounded-full text-[3.5vw] font-black shadow-xl"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.8, y: phase >= 1 ? 0 : 20 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            Your language matters.
          </motion.div>

          <motion.div
            className="bg-[var(--color-bg-light)] text-[var(--color-primary)] px-10 py-4 rounded-full text-[3.5vw] font-black shadow-xl"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.8, y: phase >= 2 ? 0 : 20 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            Your family matters.
          </motion.div>

          <motion.div
            className="bg-[var(--color-accent)] text-white px-12 py-5 rounded-full text-[4.5vw] font-black shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.8, y: phase >= 3 ? 0 : 20 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            You matter.
          </motion.div>
        </div>

        <motion.p
          className="text-[2vw] text-white font-medium max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          Children who feel that sense of pride are more engaged, more confident, and more willing to take risks with their learning.
        </motion.p>
      </div>
    </motion.div>
  );
}
