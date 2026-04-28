import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 7000),
      setTimeout(() => setPhase(3), 13000),
      setTimeout(() => setPhase(4), 19000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-primary)] overflow-hidden"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/brain.jpg`} 
          className="w-full h-full object-cover mix-blend-overlay opacity-30"
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 25, ease: "linear" }}
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-12 grid grid-cols-2 gap-12 items-center h-full">
        <div>
          <motion.h2 
            className="text-[5vw] font-bold text-[var(--color-bg-light)] leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The Brain Argument
          </motion.h2>
          
          <motion.div
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -50 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <p className="text-[2vw] text-white">
              Connecting familiar sounds to symbols on a page happens quickly and naturally.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, x: phase >= 2 ? 0 : -50 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <p className="text-[2vw] text-white">
              The brain says: "I know that word. Now I just need to learn what it looks like written down."
            </p>
          </motion.div>
        </div>
        
        <div className="flex flex-col gap-8 justify-center h-full pt-20">
          <motion.div
            className="w-full aspect-square relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.8, rotate: phase >= 3 ? 0 : -10 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="absolute inset-0 bg-[var(--color-accent)] rounded-full blur-3xl opacity-30" />
            <div className="relative bg-white p-10 rounded-3xl shadow-2xl h-full flex flex-col justify-center">
              <h3 className="text-[2.5vw] font-bold text-[var(--color-error)] mb-6 text-center">
                Like solving two puzzles at once
              </h3>
              <p className="text-[1.8vw] text-[var(--color-text-secondary)] text-center">
                If a child is learning to read in a language they're still learning to speak... progress is much slower.
              </p>
              <motion.div 
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
                transition={{ duration: 0.6 }}
              >
                <span className="bg-[var(--color-error)]/10 text-[var(--color-error)] px-6 py-3 rounded-full text-[1.5vw] font-bold">
                  Far more children give up.
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
