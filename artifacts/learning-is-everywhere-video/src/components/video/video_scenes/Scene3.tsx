import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 3 (53.5s): The hours add up
export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 10000),
      setTimeout(() => setPhase(3), 25000),
      setTimeout(() => setPhase(4), 38000),
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
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 54, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s3_hours.png`}
          className="w-full h-full object-cover"
          alt="Parent and child learning together at home"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/85 via-[#3D1F0A]/35 to-[#3D1F0A]/10" />
      </motion.div>

      {/* Green glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.12 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 80% 30%, #2E6B3E, transparent 60%)' }}
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-12 pb-14">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={phase >= 1 ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 1.0, type: 'spring', damping: 24 }}
        >
          <p
            className="text-[2.4vw] text-[#E8820C] font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            The hours add up
          </p>
          <h2
            className="text-[5vw] font-black text-[#F5EDD6] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            15 minutes a day ={' '}
            <span className="text-[#E8820C]">90+ hours</span>{' '}
            a year
          </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-[2px] bg-[#E8820C]/60 rounded-full my-5"
          initial={{ scaleX: 0, originX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '60%' }}
        />

        {/* Stat cards */}
        <motion.div
          className="flex gap-6 mt-2"
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {[
            { num: '90+', label: 'hours per year' },
            { num: '450+', label: 'hours over 5 years' },
          ].map((stat) => (
            <div
              key={stat.num}
              className="bg-[#F5EDD6]/10 backdrop-blur-sm border border-[#E8820C]/30 rounded-xl px-7 py-4 flex flex-col"
            >
              <span
                className="text-[4vw] font-black text-[#E8820C]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stat.num}
              </span>
              <span
                className="text-[1.8vw] text-[#F5EDD6]/70"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-[2.0vw] text-[#F5EDD6]/80 mt-5 max-w-[60%] leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          Quietly, in your own home, at no cost — hours that{' '}
          <span className="text-[#E8820C] font-semibold">compound</span>.
        </motion.p>

        <motion.p
          className="text-[2.0vw] text-[#2E6B3E] font-semibold mt-3"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0 }}
        >
          Apps like Curious Reader make it easy to start.
        </motion.p>
      </div>
    </motion.div>
  );
}
