import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 6 (40.6s + buffer): Close — curiosity is the answer
export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 16000),
      setTimeout(() => setPhase(3), 30000),
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
      {/* Background image with gentle drift */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0, y: 0 }}
        animate={{ scale: 1.08, y: '-2%' }}
        transition={{ duration: 45, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s6_close.png`}
          className="w-full h-full object-cover"
          alt="Parent and child exploring phone together"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/90 via-[#3D1F0A]/35 to-[#3D1F0A]/10" />
      </motion.div>

      {/* Warm golden glow — hope */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.25 : 0 }}
        transition={{ duration: 3 }}
        style={{ background: 'radial-gradient(ellipse at 50% 40%, #F5B942, transparent 55%)' }}
      />

      {/* Main closing message */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 pb-16">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 1.3, type: 'spring', damping: 20 }}
        >
          <div className="w-12 h-[3px] bg-[#E8820C] rounded-full mb-6" />
          <h2 className="text-[4.5vw] font-black text-[#F5EDD6] leading-tight mb-3"
            style={{ fontFamily: 'var(--font-display)' }}>
            Curiosity is{' '}
            <span className="text-[#E8820C]">always the answer.</span>
          </h2>
        </motion.div>

        <motion.p
          className="text-[2.2vw] text-[#F5EDD6]/75 font-light leading-relaxed max-w-[65%] mt-4"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Keep your child curious.
          <br />
          Let the tools that support that curiosity do their work.
        </motion.p>

        {/* Branding line */}
        <motion.div
          className="flex items-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="h-[2px] w-12 bg-[#E8820C]/50 rounded-full" />
          <p className="text-[1.7vw] text-[#F5EDD6]/50 tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)' }}>
            Not All Screens Are Equal
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
