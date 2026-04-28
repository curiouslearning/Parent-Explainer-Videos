import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 5 (24.7s): Reassurance — "Won't this slow down their English?"
export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 10000),
      setTimeout(() => setPhase(3), 17000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 25, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s5_reassurance.png`}
          className="w-full h-full object-cover"
          alt="Child confidently reading with parent"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#3D1F0A]/82 via-[#3D1F0A]/28 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/50 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.14 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 95% 50%, #E8820C, transparent 55%)' }}
      />

      <div className="absolute right-0 top-0 bottom-0 w-[50%] z-10 flex flex-col justify-center px-12">
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ x: 30, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.0, type: 'spring', damping: 24 }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#E8820C]" />
          <p className="text-[2.2vw] text-[#E8820C] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
            A common concern
          </p>
        </motion.div>

        <motion.p
          className="text-[2.3vw] text-[#F5EDD6]/70 italic mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ x: 20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.1 }}
        >
          "Won't this slow down their English?"
        </motion.p>

        <motion.h2
          className="text-[4.2vw] font-black text-[#F5EDD6] leading-tight mb-5"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ x: 20, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          The evidence says{' '}
          <span className="text-[#E8820C]">no</span>
        </motion.h2>

        <motion.div
          className="border-l-4 border-[#E8820C] pl-5 mb-5"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.0vw] text-[#F5EDD6]/90 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Strong mother tongue literacy makes picking up a second language{' '}
            <span className="text-[#E8820C] font-semibold">easier</span> —
            because they already understand how reading works.
          </p>
        </motion.div>

        <motion.div
          className="bg-[#F5EDD6]/8 border border-[#E8820C]/30 rounded-xl px-6 py-4"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.0vw] text-[#F5EDD6]/85 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Building a house: you wouldn't skip the foundations to put the roof on faster.{' '}
            <span className="text-[#E8820C] font-semibold">Strong foundations make everything above more stable.</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
