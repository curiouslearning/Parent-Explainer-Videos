import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 2 (67s): Pre-Reader — brain building, phonological awareness
export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 18000),
      setTimeout(() => setPhase(3), 40000),
      setTimeout(() => setPhase(4), 55000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Background image with very slow pan */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0, x: 0 }}
        animate={{ scale: 1.08, x: '-2%' }}
        transition={{ duration: 67, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s2_pre_reader.png`}
          className="w-full h-full object-cover"
          alt="Grandmother talking to baby"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D1F0A]/60 via-transparent to-[#2E6B3E]/30" />
      </motion.div>

      {/* Stage badge */}
      <motion.div
        className="absolute top-10 left-10 z-10"
        initial={{ x: -60, opacity: 0 }}
        animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
        transition={{ duration: 0.9, type: 'spring', damping: 20 }}
      >
        <div className="bg-[#2E6B3E] text-[#F5EDD6] px-5 py-2 rounded-full text-[2vw] font-bold uppercase tracking-widest">
          Stage One
        </div>
        <h2 className="text-[3.5vw] font-black text-[#F5EDD6] mt-3 leading-tight">
          The Pre-Reader
        </h2>
      </motion.div>

      {/* Seeds metaphor — floating dots */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#E8820C]"
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              left: `${15 + i * 10}%`,
              top: `${30 + (i % 4) * 12}%`,
              opacity: 0.6,
            }}
            initial={{ y: 0, opacity: 0, scale: 0 }}
            animate={phase >= 2 ? {
              y: [-10, -40 - i * 8, -80 - i * 12],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0.5],
            } : { opacity: 0, scale: 0 }}
            transition={{
              duration: 6,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Phonological awareness reveal */}
      <motion.div
        className="absolute bottom-10 left-10 right-10 z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 1.2, type: 'spring', damping: 22 }}
      >
        <div className="bg-[#3D1F0A]/75 backdrop-blur-sm rounded-2xl px-8 py-6 border-l-4 border-[#E8820C]">
          <p className="text-[2.5vw] text-[#F5EDD6] font-semibold leading-snug">
            Phonological Awareness
          </p>
          <p className="text-[1.8vw] text-[#F5EDD6]/75 mt-1">
            Your child is hearing the building blocks of language
          </p>
        </div>
      </motion.div>

      {/* Final affirmation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1.5, type: 'spring', damping: 18 }}
      >
        <div className="bg-[#E8820C]/90 rounded-3xl px-14 py-8 text-center">
          <p className="text-[3vw] font-black text-white leading-tight">
            You have been teaching your child to read
          </p>
          <p className="text-[2vw] text-white/80 mt-2">without even knowing it</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
