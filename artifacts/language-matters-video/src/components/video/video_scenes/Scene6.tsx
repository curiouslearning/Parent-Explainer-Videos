import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2000),
      setTimeout(() => setPhase(2), 6000),
      setTimeout(() => setPhase(3), 10000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-primary)] overflow-hidden"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
           <img 
            src={`${import.meta.env.BASE_URL}images/family.jpg`} 
            className="w-full h-full object-cover"
            alt="" 
          />
        </div>
        <div className="absolute inset-0 bg-[var(--color-primary)]/80" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-12 text-center flex flex-col items-center">
        <motion.h2 
          className="text-[4vw] font-bold text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          So what can you do?
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-[1.5vw]">Read with them</span>
          <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-[1.5vw]">Tell stories</span>
          <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-[1.5vw]">Sing songs</span>
          <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-[1.5vw]">Use local apps & books</span>
        </motion.div>

        <motion.div
          className="w-full bg-[var(--color-bg-light)] text-[var(--color-primary)] p-10 rounded-3xl shadow-2xl mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.9 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <p className="text-[2.5vw] font-bold">
            Your language is not a barrier.
          </p>
          <p className="text-[3.5vw] font-black text-[var(--color-accent)] mt-2">
            It is the bridge.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-24 h-24 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-lg border-4 border-white/20 mb-4">
             <span className="text-[2vw] font-black text-[var(--color-primary)]">LM</span>
          </div>
          <p className="text-white/60 text-[1.5vw] uppercase tracking-widest">Learning Matters</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
