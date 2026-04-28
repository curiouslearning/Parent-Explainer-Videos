import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 6 (19.8s): Call to action — "Your language is not a barrier. It is the bridge."
export function Scene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 8000),
      setTimeout(() => setPhase(3), 14000),
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
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 22, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s6_cta.png`}
          className="w-full h-full object-cover"
          alt="Parent and child reading under tree"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/90 via-[#3D1F0A]/50 to-[#3D1F0A]/15" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.22 : 0 }}
        transition={{ duration: 3.5 }}
        style={{ background: 'radial-gradient(ellipse at 50% 80%, #E8820C, transparent 60%)' }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-16 text-center">
        <motion.div
          className="flex flex-col gap-2 mb-7"
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0 }}
        >
          <p className="text-[2.2vw] text-[#F5EDD6]/80" style={{ fontFamily: 'var(--font-body)' }}>
            Read in your language. Tell stories. Sing songs.
          </p>
          <p className="text-[2.2vw] text-[#F5EDD6]/80" style={{ fontFamily: 'var(--font-body)' }}>
            Let them see that their words have value.
          </p>
        </motion.div>

        <motion.div
          className="w-24 h-[3px] bg-[#E8820C] rounded-full mb-7"
          initial={{ scaleX: 0 }}
          animate={phase >= 1 ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="text-[2.1vw] text-[#F5EDD6]/80 leading-relaxed max-w-[58%] mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
        >
          At Curious Learning we've designed apps and stories to teach your child
          to read in the language they know best.
          Enjoy the stories together — and have fun playing{' '}
          <span className="text-[#E8820C] font-semibold">Feed the Monster</span>{' '}
          right alongside them.
        </motion.p>

        <motion.h2
          className="text-[4.8vw] font-black text-[#F5EDD6] leading-tight max-w-[55%]"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, type: 'spring', damping: 20 }}
        >
          Your language is not a barrier.
          It is{' '}
          <span className="text-[#E8820C]">the bridge</span>.
        </motion.h2>
      </div>
    </motion.div>
  );
}
