import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 5 (22s): "BUILD THE FOUNDATION FIRST"
export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Foundation visual builds
      setTimeout(() => setPhase(2), 12000), // Text reveal
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-light)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <motion.img 
          src={`${import.meta.env.BASE_URL}images/african_pattern.png`} 
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.05], rotate: [0, 2] }}
          transition={{ duration: 22, ease: "easeOut" }}
          alt="" 
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-12 pb-24">
        <motion.div
          className="w-[50vw] h-[40vw] max-w-3xl max-h-2xl mb-8 relative"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/house_foundation.png`} 
            className="w-full h-full object-contain drop-shadow-2xl"
            alt="House foundation" 
          />
          
          {/* Animated drawing effect over the foundation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
             <motion.rect
                x="20" y="70" width="60" height="20"
                fill="transparent"
                stroke="var(--color-secondary)"
                strokeWidth="2"
                strokeDasharray="100 100"
                initial={{ strokeDashoffset: 100, opacity: 0 }}
                animate={phase >= 1 ? { strokeDashoffset: 0, opacity: 0.8 } : { strokeDashoffset: 100, opacity: 0 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
             />
             <motion.rect
                x="30" y="40" width="40" height="30"
                fill="transparent"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeDasharray="100 100"
                initial={{ strokeDashoffset: 100, opacity: 0 }}
                animate={phase >= 1 ? { strokeDashoffset: 0, opacity: 0.8 } : { strokeDashoffset: 100, opacity: 0 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 3 }}
             />
             <motion.polygon
                points="10,40 50,10 90,40"
                fill="transparent"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeDasharray="150 150"
                initial={{ strokeDashoffset: 150, opacity: 0 }}
                animate={phase >= 1 ? { strokeDashoffset: 0, opacity: 0.8 } : { strokeDashoffset: 150, opacity: 0 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 5 }}
             />
          </svg>
        </motion.div>

        <motion.div
          className="text-center overflow-hidden"
        >
          <motion.h2
            className="text-[6vw] font-black text-[var(--color-primary)] uppercase tracking-tight leading-none"
            initial={{ opacity: 0, y: "100%", rotateX: -20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: "100%", rotateX: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 80 }}
            style={{ transformOrigin: "bottom center" }}
          >
            BUILD THE <span className="text-[var(--color-secondary)]">FOUNDATION</span> FIRST
          </motion.h2>
        </motion.div>
      </div>
    </motion.div>
  );
}