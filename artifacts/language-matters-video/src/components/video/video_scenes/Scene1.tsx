import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 6000),
      setTimeout(() => setPhase(3), 10000),
      setTimeout(() => setPhase(4), 16000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-light)] origin-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <img 
          src={`${import.meta.env.BASE_URL}images/family.jpg`} 
          className="w-full h-full object-cover"
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-light)] via-[var(--color-bg-light)] to-transparent opacity-90" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-12 flex flex-col justify-center h-full">
        <div className="overflow-hidden mb-6">
          <motion.h1 
            className="text-[6vw] font-black text-[var(--color-primary)] leading-tight"
            initial={{ y: "100%", rotateX: -20, opacity: 0 }}
            animate={{ y: 0, rotateX: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.5 }}
            style={{ transformOrigin: "bottom center" }}
          >
            You want the best <br/> for your child.
          </motion.h1>
        </div>

        <motion.div 
          className="h-[4px] bg-[var(--color-accent)] w-0 mb-8"
          animate={{ width: phase >= 1 ? "20%" : "0%" }}
          transition={{ duration: 1, ease: "circOut" }}
        />

        <motion.p
          className="text-[2.5vw] text-[var(--color-text-secondary)] font-medium max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          You might think the fastest way is to start them on English—or the language of school—as early as possible.
        </motion.p>

        <motion.div
          className="mt-12 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[var(--color-accent)]/20 max-w-4xl"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.9, y: phase >= 3 ? 0 : 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
        >
          <h2 className="text-[3vw] font-bold text-[var(--color-secondary)] mb-4">
            But research tells us something surprising.
          </h2>
          <p className="text-[2vw] text-[var(--color-text-primary)]">
            The single most powerful thing you can do for your child's education is to make sure they learn to read in <span className="text-[var(--color-accent)] font-bold">your language first.</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
