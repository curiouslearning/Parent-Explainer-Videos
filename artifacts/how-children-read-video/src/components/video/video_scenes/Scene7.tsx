import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 7 (10s): Close + End card
export function Scene7() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 7000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s7_close.png`}
          className="w-full h-full object-cover"
          alt="Parent and child reading together"
        />
        <div className="absolute inset-0 bg-[#3D1F0A]/55" />
      </motion.div>

      {/* Closing message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-12">
        <motion.p
          className="text-[3.5vw] font-black text-[#F5EDD6] leading-tight mb-4"
          initial={{ y: 40, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 1.2, type: 'spring', damping: 20 }}
        >
          Every stage starts at home.
          <span className="text-[#E8820C]"> With you.</span>
        </motion.p>

        <motion.p
          className="text-[2.5vw] text-[#F5EDD6]/80 font-medium leading-snug"
          initial={{ y: 30, opacity: 0 }}
          animate={phase >= 2 ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 1, type: 'spring', damping: 20 }}
        >
          You don't need to read the book.
          <br />
          You just need to sit beside the child who is.
        </motion.p>

        {/* End card */}
        <motion.div
          className="mt-8"
          initial={{ y: 30, opacity: 0 }}
          animate={phase >= 3 ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 1, type: 'spring', damping: 20 }}
        >
          <div className="bg-[#E8820C]/90 backdrop-blur-sm rounded-2xl px-10 py-5 text-center">
            <p className="text-[2vw] font-black text-white mb-1">
              Feed the Monster &amp; Curious Reader
            </p>
            <p className="text-[1.6vw] text-white/85">
              Free apps for early readers · Many African languages · No internet needed
            </p>
            <p className="text-[1.6vw] text-white/85 mt-1">
              curiouslearning.org
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
