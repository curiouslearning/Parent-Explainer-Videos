import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 6000),
      setTimeout(() => setPhase(3), 11000),
      setTimeout(() => setPhase(4), 16000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-light)] overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-40 mix-blend-multiply pointer-events-none">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/school.jpg`} 
          className="w-full h-full object-cover"
          animate={{ x: [0, -20] }}
          transition={{ duration: 20, ease: "linear" }}
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-light)] via-[var(--color-bg-light)] to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-12">
        <motion.h2 
          className="text-[4vw] font-bold text-[var(--color-secondary)] mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          What the Research Shows
        </motion.h2>

        <div className="grid grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[var(--color-accent)]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 50 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <h3 className="text-[2vw] font-bold text-[var(--color-primary)] mb-2">Faster</h3>
            <p className="text-[1.5vw] text-[var(--color-text-secondary)]">They read faster.</p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[var(--color-secondary)]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 50 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <h3 className="text-[2vw] font-bold text-[var(--color-primary)] mb-2">Better</h3>
            <p className="text-[1.5vw] text-[var(--color-text-secondary)]">They understand more.</p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[var(--color-primary)]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 50 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <h3 className="text-[2vw] font-bold text-[var(--color-primary)] mb-2">Longer</h3>
            <p className="text-[1.5vw] text-[var(--color-text-secondary)]">They stay in school longer.</p>
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: phase >= 4 ? 1 : 0, filter: phase >= 4 ? "blur(0px)" : "blur(10px)" }}
          transition={{ duration: 1 }}
        >
          <p className="text-[2.5vw] text-[var(--color-text-primary)] font-medium leading-tight">
            Once a child truly knows how to read, they can transfer it to <span className="text-[var(--color-secondary)] font-bold">any language.</span>
            <br/><br/>
            Reading itself doesn't need to be re-learned. Only the new words do.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
