import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 2 (25s): "ONE PUZZLE AT A TIME"
export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Brain appears
      setTimeout(() => setPhase(2), 3000),  // Sounds to symbols connection starts
      setTimeout(() => setPhase(3), 12000), // Transition to puzzle metaphor
      setTimeout(() => setPhase(4), 14000), // Puzzle pieces appear
      setTimeout(() => setPhase(5), 18000), // Puzzle pieces appear
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-light)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 0] }}
        transition={{ duration: 25, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/african_pattern.png`} 
          className="w-full h-full object-cover"
          alt="" 
        />
      </motion.div>

      {/* Part 1: Brain & Connections (0-12s) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase >= 3 ? 0 : 1, scale: phase >= 3 ? 1.2 : 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div 
          className="relative w-[40vw] h-[40vw] max-w-2xl max-h-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.8 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/brain_metaphor.png`} 
            className="w-full h-full object-contain"
            alt="Brain metaphor" 
          />
          
          {/* Animated connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <motion.path 
              d="M 20 50 Q 50 20 80 50" 
              fill="transparent" 
              stroke="var(--color-secondary)" 
              strokeWidth="1.5"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={phase >= 2 ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.path 
              d="M 20 60 Q 50 80 80 60" 
              fill="transparent" 
              stroke="var(--color-accent)" 
              strokeWidth="1.5"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={phase >= 2 ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Part 2: Puzzle Metaphor (12s-25s) */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.8 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.div 
          className="w-[40vw] h-[30vw] max-w-xl max-h-lg relative mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/puzzle_pieces.png`} 
            className="w-full h-full object-contain drop-shadow-2xl"
            alt="Two puzzle pieces" 
          />
        </motion.div>
        
        <motion.h2 
          className="text-[4vw] font-black text-[var(--color-primary)] uppercase tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <span className="text-[var(--color-secondary)]">ONE PUZZLE</span> AT A TIME
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}