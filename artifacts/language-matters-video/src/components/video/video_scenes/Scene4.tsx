import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 4 (20s): "YOUR LANGUAGE MATTERS"
export function Scene4() {
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
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/child_learning.png`} 
          className="w-full h-full object-cover opacity-80"
          alt="Child learning" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-transparent to-transparent opacity-90" />
      </motion.div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-24">
        <motion.div
          className="text-center overflow-hidden"
        >
          <motion.h1
            className="text-[7vw] font-black text-[var(--color-bg-light)] tracking-tight uppercase"
            initial={{ opacity: 0, y: "100%", rotateX: -20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: "100%", rotateX: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            style={{ transformOrigin: "bottom center" }}
          >
            YOUR LANGUAGE <span className="text-[var(--color-secondary)]">MATTERS</span>
          </motion.h1>
        </motion.div>
      </div>
    </motion.div>
  );
}