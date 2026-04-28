import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 1 (18s): "YOUR LANGUAGE FIRST"
export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 14000), // Text phrase rises at the end
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 bg-[var(--color-bg-dark)] overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 18, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/mother_reading.png`} 
          className="w-full h-full object-cover opacity-80"
          alt="Mother reading to child" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-[var(--color-bg-dark)]/40 to-transparent opacity-80" />
      </motion.div>

      {/* Abstract African Pattern Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        animate={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/african_pattern.png`} 
          className="w-full h-full object-cover"
          alt="" 
        />
      </motion.div>

      {/* Hero Text Reveal */}
      <div className="relative z-10 w-full h-full flex items-end justify-center pb-24">
        <motion.div className="overflow-hidden">
          <motion.h1 
            className="text-[6vw] md:text-[8vw] font-black text-[var(--color-bg-light)] leading-tight tracking-tight uppercase"
            initial={{ y: "100%", opacity: 0, rotateX: -20 }}
            animate={phase >= 2 ? { y: 0, opacity: 1, rotateX: 0 } : { y: "100%", opacity: 0, rotateX: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 80 }}
            style={{ transformOrigin: "bottom center" }}
          >
            YOUR LANGUAGE <span className="text-[var(--color-secondary)]">FIRST</span>
          </motion.h1>
        </motion.div>
      </div>
    </motion.div>
  );
}