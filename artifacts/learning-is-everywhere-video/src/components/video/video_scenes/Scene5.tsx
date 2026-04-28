import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 5 (35.0s): A word about what school is for
export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 13000),
      setTimeout(() => setPhase(3), 24000),
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
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 36, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s5_school.png`}
          className="w-full h-full object-cover"
          alt="African families walking children to school at sunrise"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/80 via-[#3D1F0A]/30 to-[#3D1F0A]/05" />
      </motion.div>

      {/* Sunrise warm glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.2 : 0 }}
        transition={{ duration: 3 }}
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #E8820C, transparent 60%)' }}
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 pb-16">
        <motion.div
          initial={{ y: 35, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 35, opacity: 0 }}
          transition={{ duration: 1.1, type: 'spring', damping: 22 }}
        >
          <p
            className="text-[2.3vw] text-[#E8820C] font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            School works best
          </p>
          <h2
            className="text-[4.8vw] font-black text-[#F5EDD6] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            When home and school{' '}
            <span className="text-[#E8820C]">work together</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-5 mt-7"
          initial={{ opacity: 0, y: 18 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9 }}
        >
          {[
            { icon: '📚', label: 'They attend more' },
            { icon: '💪', label: 'They persist through difficulty' },
            { icon: '✨', label: 'They believe they are capable' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#F5EDD6]/10 backdrop-blur-sm border border-[#E8820C]/25 rounded-xl px-5 py-4 flex flex-col items-center text-center gap-2"
            >
              <span className="text-[2.5vw]">{item.icon}</span>
              <span
                className="text-[1.8vw] text-[#F5EDD6]/85 leading-snug"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-[2.2vw] text-[#F5EDD6]/85 mt-6 leading-relaxed max-w-[65%]"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          Your child{' '}
          <span className="text-[#E8820C] font-semibold">already is</span>{' '}
          a learner. School is where that goes further.
        </motion.p>
      </div>
    </motion.div>
  );
}
