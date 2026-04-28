import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 3 (20s): "Better results. Longer in school."
export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 12000), // Reveal text
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background Image: School Children */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1, x: "-5%" }}
        animate={{ scale: 1, x: "0%" }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/school_children.png`} 
          className="w-full h-full object-cover opacity-70"
          alt="African school children studying" 
        />
        <div className="absolute inset-0 bg-[var(--color-bg-dark)] mix-blend-multiply opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-bg-dark)] via-[var(--color-bg-dark)]/40 to-transparent opacity-80" />
      </motion.div>

      {/* Abstract Texture Overlay */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay opacity-20"
        animate={{ rotate: -5, scale: 1.2 }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/african_pattern.png`} 
          className="w-full h-full object-cover"
          alt="" 
        />
      </motion.div>

      {/* Text Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-12 pb-24">
        <motion.div 
          className="text-center mt-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className="text-[6vw] font-black text-[var(--color-secondary)] leading-tight tracking-wide">
            Better results.
          </h2>
          <motion.h2 
            className="text-[6vw] font-black text-[var(--color-bg-light)] leading-tight tracking-wide mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Longer in school.
          </motion.h2>
        </motion.div>
      </div>
    </motion.div>
  );
}