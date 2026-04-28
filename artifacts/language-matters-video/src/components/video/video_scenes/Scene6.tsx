import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 6 (15s): "YOUR LANGUAGE IS THE BRIDGE"
export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Bridge image steady
      setTimeout(() => setPhase(2), 5000), // Final tagline reveal
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1, rotate: 1 }}
          animate={{ scale: 1.0, rotate: 0 }}
          transition={{ duration: 15, ease: "linear" }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/bridge.png`} 
            className="w-full h-full object-cover opacity-70"
            alt="Bridge" 
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-[var(--color-bg-dark)]/60 to-transparent" />
        
        {/* Animated accent elements */}
        <motion.div 
          className="absolute inset-0 mix-blend-overlay opacity-10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, -2, 0] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/african_pattern.png`} 
            className="w-full h-full object-cover"
            alt="" 
          />
        </motion.div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-32">
        <motion.div
          className="overflow-hidden px-12 text-center"
        >
          <motion.h2 
            className="text-[6vw] font-black text-[var(--color-bg-light)] tracking-tight uppercase leading-tight"
            initial={{ opacity: 0, y: "100%", rotateX: -20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: "100%", rotateX: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            style={{ transformOrigin: "bottom center" }}
          >
            YOUR LANGUAGE IS THE <span className="text-[var(--color-secondary)]">BRIDGE</span>
          </motion.h2>
        </motion.div>
      </div>
    </motion.div>
  );
}