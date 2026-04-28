import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 1 (23.5s): Opening — "You want the best for your child."
export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 11000),
      setTimeout(() => setPhase(3), 18000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 25, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s1_opening.png`}
          className="w-full h-full object-cover"
          alt="African mother and child"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/90 via-[#3D1F0A]/35 to-transparent" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.2 : 0 }}
        transition={{ duration: 3 }}
        style={{ background: 'radial-gradient(ellipse at 40% 80%, #E8820C, transparent 55%)' }}
      />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 pb-16">
        <motion.div
          initial={{ y: 36, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.2, type: 'spring', damping: 22 }}
        >
          <p
            className="text-[2.5vw] text-[#F5EDD6]/65 font-light tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            A message for parents
          </p>
          <h1
            className="text-[5.5vw] font-black text-[#F5EDD6] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Why Your{' '}
            <span className="text-[#E8820C]">Language</span>
          </h1>
          <h2
            className="text-[4vw] font-bold text-[#F5EDD6]/80 leading-tight mt-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Matters Most
          </h2>
        </motion.div>

        <motion.div
          className="h-[3px] bg-[#E8820C] rounded-full mt-5"
          initial={{ scaleX: 0, originX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '40%' }}
        />

        <motion.p
          className="text-[2.0vw] text-[#F5EDD6]/80 mt-5 max-w-[52%] leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0 }}
        >
          The single most powerful thing you can do?
          Help your child learn to read in{' '}
          <span className="text-[#E8820C] font-semibold">your language first</span>.
        </motion.p>
      </div>
    </motion.div>
  );
}
