import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 7 (23.8s): Close — "Talk with them. Ask questions. Tell stories."
export function Scene7() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 9000),
      setTimeout(() => setPhase(3), 16000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const five = [
    'Talk with them',
    'Ask questions',
    'Tell stories',
    'Let them teach you',
    'Let them get things wrong',
  ];

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 25, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s7_close.png`}
          className="w-full h-full object-cover"
          alt="African family together in warm evening light"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/90 via-[#3D1F0A]/50 to-[#3D1F0A]/15" />
      </motion.div>

      {/* Deep warm glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.22 : 0 }}
        transition={{ duration: 3.5 }}
        style={{ background: 'radial-gradient(ellipse at 50% 80%, #E8820C, transparent 60%)' }}
      />

      {/* Centre content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-16 text-center">
        {/* Five list */}
        <div className="flex flex-col items-center gap-2 mb-7">
          {phase >= 1 && five.map((item, i) => (
            <motion.p
              key={item}
              className="text-[2.4vw] text-[#F5EDD6]/85 font-light"
              style={{ fontFamily: 'var(--font-body)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.22 }}
            >
              {item}.
            </motion.p>
          ))}
        </div>

        <motion.div
          className="w-24 h-[3px] bg-[#E8820C] rounded-full mb-7"
          initial={{ scaleX: 0 }}
          animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.p
          className="text-[2.2vw] text-[#F5EDD6]/85 leading-relaxed max-w-[60%] mb-5"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          Five things. No cost. No materials. No training needed.
          Just you — showing up and paying attention.
        </motion.p>

        <motion.h2
          className="text-[4.5vw] font-black text-[#F5EDD6] leading-tight max-w-[55%]"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, type: 'spring', damping: 20 }}
        >
          That is{' '}
          <span className="text-[#E8820C]">more than enough.</span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
