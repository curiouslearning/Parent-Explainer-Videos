import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 5 (52s): Curious Reader — interactive books, African languages
export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 18000),
      setTimeout(() => setPhase(3), 35000),
      setTimeout(() => setPhase(4), 45000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(5px)' }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 52, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s5_curious_reader.png`}
          className="w-full h-full object-cover"
          alt="Child reading with Curious Reader"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3D1F0A]/50 via-transparent to-[#3D1F0A]/60" />
      </motion.div>

      {/* App name + description */}
      <motion.div
        className="absolute top-10 left-10 z-10"
        initial={{ x: -60, opacity: 0 }}
        animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
        transition={{ duration: 0.9, type: 'spring', damping: 20 }}
      >
        <div className="bg-[#E8820C] text-white px-6 py-3 rounded-2xl text-[2.5vw] font-black shadow-lg inline-block">
          Curious Reader
        </div>
        <p className="text-[2vw] text-[#F5EDD6]/85 mt-3 max-w-[35vw] font-medium leading-snug">
          A library of interactive books your child can listen to, follow along with, and begin to read
        </p>
      </motion.div>

      {/* Highlighted word animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[50vw]"
        initial={{ opacity: 0, y: 30 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.2, type: 'spring', damping: 20 }}
      >
        <div className="bg-[#3D1F0A]/75 backdrop-blur-sm rounded-2xl px-8 py-5 text-center">
          <div className="flex justify-center gap-2 flex-wrap">
            {['The', 'words', 'are', 'highlighted', 'as', 'they', 'are', 'spoken.'].map((word, i) => (
              <motion.span
                key={i}
                className="text-[2.5vw] font-semibold px-1 rounded"
                style={{ color: '#F5EDD6' }}
                animate={phase >= 2 ? {
                  backgroundColor: i === 3 ? '#E8820C' : 'transparent',
                  color: i === 3 ? '#ffffff' : '#F5EDD6',
                } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* "Just right" books */}
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 z-10"
        initial={{ x: 60, opacity: 0 }}
        animate={phase >= 3 ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
        transition={{ duration: 1, type: 'spring', damping: 20 }}
      >
        <div className="flex flex-col gap-3">
          {['Too hard ✗', 'Just right ✓', 'Too easy ✗'].map((label, i) => (
            <div
              key={label}
              className={`px-5 py-3 rounded-xl text-[1.8vw] font-semibold ${
                i === 1
                  ? 'bg-[#2E6B3E] text-white text-[2.2vw] font-black'
                  : 'bg-[#3D1F0A]/50 text-[#F5EDD6]/60'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* African languages highlight */}
      <motion.div
        className="absolute bottom-12 left-10 right-10 z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={phase >= 4 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 1.2, type: 'spring', damping: 22 }}
      >
        <div className="bg-[#E8820C]/90 backdrop-blur-sm rounded-2xl px-8 py-5 text-center">
          <p className="text-[2.8vw] font-black text-white leading-tight">
            The books are in African languages.
          </p>
          <p className="text-[2vw] text-white/85 mt-1">
            In the words your child already speaks at home.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
