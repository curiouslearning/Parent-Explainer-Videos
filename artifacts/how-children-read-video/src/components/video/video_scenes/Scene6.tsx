import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 6 (46s): Emerging Reader — reading takes off, opens a door
export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 16000),
      setTimeout(() => setPhase(3), 30000),
      setTimeout(() => setPhase(4), 40000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.12, y: '-3%' }}
        transition={{ duration: 46, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s6_emerging_reader.png`}
          className="w-full h-full object-cover"
          alt="Child reading under tree"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3D1F0A]/20 to-[#3D1F0A]/70" />
      </motion.div>

      {/* Stage badge */}
      <motion.div
        className="absolute top-10 left-10 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        transition={{ duration: 0.9, type: 'spring', damping: 18 }}
      >
        <div className="bg-[#E8820C] text-white px-5 py-2 rounded-full text-[2vw] font-bold uppercase tracking-widest">
          Stage Three
        </div>
        <h2 className="text-[3.5vw] font-black text-[#F5EDD6] mt-3 leading-tight">
          Reading Takes Off
        </h2>
      </motion.div>

      {/* "A door" revelation */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ top: '38%' }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 1.5, type: 'spring', damping: 16 }}
      >
        <div className="text-center">
          <motion.div
            className="text-[8vw] font-black text-[#E8820C]"
            animate={phase >= 2 ? { textShadow: '0 0 40px rgba(232,130,12,0.6)' } : {}}
          >
            A Door.
          </motion.div>
        </div>
      </motion.div>

      {/* Possibilities cascading text */}
      <motion.div
        className="absolute right-10 top-1/3 z-10"
        initial={{ x: 60, opacity: 0 }}
        animate={phase >= 3 ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
        transition={{ duration: 1, type: 'spring', damping: 20 }}
      >
        <div className="flex flex-col gap-2 text-right">
          {['To stories.', 'To knowledge.', 'To worlds unseen.', 'To possibilities.'].map((text, i) => (
            <motion.p
              key={text}
              className="text-[2.2vw] font-semibold text-[#F5EDD6]"
              initial={{ opacity: 0, x: 30 }}
              animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Final bottom message */}
      <motion.div
        className="absolute bottom-12 left-10 right-10 z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={phase >= 4 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 1.2, type: 'spring', damping: 22 }}
      >
        <div className="bg-[#3D1F0A]/80 backdrop-blur-sm rounded-2xl px-8 py-5 text-center">
          <p className="text-[2.8vw] font-black text-[#F5EDD6] leading-tight">
            A child who reads because{' '}
            <span className="text-[#E8820C]">they want to.</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
