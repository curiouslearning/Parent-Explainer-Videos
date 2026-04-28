import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 4 (52s): Early Reader — decoding, cracking the code
export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 12000),
      setTimeout(() => setPhase(3), 28000),
      setTimeout(() => setPhase(4), 42000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 52, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s4_early_reader.png`}
          className="w-full h-full object-cover"
          alt="Child reading with joy"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#3D1F0A]/65 via-transparent to-[#3D1F0A]/20" />
      </motion.div>

      {/* Stage badge */}
      <motion.div
        className="absolute top-10 left-10 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        transition={{ duration: 0.9, type: 'spring', damping: 18 }}
      >
        <div className="bg-[#E8820C] text-white px-5 py-2 rounded-full text-[2vw] font-bold uppercase tracking-widest">
          Stage Two
        </div>
        <h2 className="text-[3.5vw] font-black text-[#F5EDD6] mt-3 leading-tight">
          The Early Reader
        </h2>
      </motion.div>

      {/* Decoding moment — B-A-T */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center gap-4">
          {['B', 'A', 'T'].map((letter, i) => (
            <motion.div
              key={letter}
              className="w-20 h-20 bg-[#F5EDD6] rounded-2xl flex items-center justify-center shadow-2xl"
              initial={{ y: -60, opacity: 0, rotateX: -90 }}
              animate={phase >= 2 ? { y: 0, opacity: 1, rotateX: 0 } : { y: -60, opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.7, delay: i * 0.25, type: 'spring', damping: 14 }}
            >
              <span className="text-[4vw] font-black text-[#E8820C]">{letter}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <span className="text-[5vw] font-black text-[#F5EDD6] ml-2">= Bat</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Superpower moment */}
      <motion.div
        className="absolute bottom-16 left-10 right-10 z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 1.2, type: 'spring', damping: 22 }}
      >
        <div className="bg-[#3D1F0A]/80 backdrop-blur-sm rounded-2xl px-8 py-5 border-l-4 border-[#E8820C]">
          <p className="text-[2.5vw] text-[#F5EDD6] font-semibold leading-snug">
            It feels like a superpower arriving.
          </p>
          <p className="text-[1.9vw] text-[#F5EDD6]/75 mt-1">
            Stories about things they recognise — families that look like theirs.
          </p>
        </div>
      </motion.div>

      {/* Curious Reader cue */}
      <motion.div
        className="absolute top-10 right-10 z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <div className="bg-[#2E6B3E]/85 backdrop-blur-sm rounded-2xl px-6 py-4">
          <p className="text-[2vw] text-[#F5EDD6] font-bold">
            Next: Curious Reader →
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
