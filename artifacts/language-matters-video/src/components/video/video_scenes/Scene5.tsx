import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2000),
      setTimeout(() => setPhase(2), 7000),
      setTimeout(() => setPhase(3), 14000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-light)] overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/foundation.jpg`} 
          className="w-full h-full object-cover"
          animate={{ scale: [1.1, 1] }}
          transition={{ duration: 22, ease: "easeOut" }}
          alt="" 
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-12 grid grid-cols-2 gap-16 items-center">
        <div>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-[3vw] font-bold text-[var(--color-primary)] leading-tight mb-4">
              "But won't this slow down their English?"
            </h2>
            <div className="h-1 w-24 bg-[var(--color-accent)]" />
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-xl border border-[var(--color-accent)]/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 30 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[4vw] font-black text-[var(--color-success)] mb-4">No.</h3>
            <p className="text-[2vw] text-[var(--color-text-secondary)]">
              The opposite is true. A child with strong mother tongue literacy picks up a second language <span className="font-bold text-[var(--color-primary)]">more easily.</span>
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            className="bg-[var(--color-primary)] p-10 rounded-3xl shadow-2xl text-white relative z-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, x: phase >= 2 ? 0 : 50 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h3 className="text-[2.5vw] font-bold mb-6">Think of it like building a house.</h3>
            <p className="text-[1.8vw] text-white/80">
              You wouldn't skip the foundations to put the roof on faster.
            </p>
            <motion.div
              className="mt-8 bg-white/10 p-6 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[2vw] font-bold text-[var(--color-accent)] text-center">
                Strong foundations make everything above them more stable.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Decorative foundational blocks */}
          <motion.div 
            className="absolute -bottom-8 -left-8 w-full h-full bg-[var(--color-accent)] rounded-3xl z-10 opacity-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: phase >= 2 ? 0.5 : 0, y: phase >= 2 ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
