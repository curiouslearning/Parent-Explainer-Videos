import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scene 3 (68.3s): What research shows — personalised learning, feedback loop
export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 20000),
      setTimeout(() => setPhase(3), 42000),
      setTimeout(() => setPhase(4), 58000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.07 }}
        transition={{ duration: 69, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/s3_research.png`}
          className="w-full h-full object-cover"
          alt="Child using educational app"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D1F0A]/80 via-[#3D1F0A]/15 to-transparent" />
      </motion.div>

      {/* Amber device glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.25 : 0 }}
        transition={{ duration: 2.5 }}
        style={{ background: 'radial-gradient(ellipse at 55% 45%, #E8820C, transparent 55%)' }}
      />

      {/* Feedback loop ring pulse */}
      <motion.div
        className="absolute"
        style={{ top: '28%', left: '40%', transform: 'translate(-50%, -50%)' }}
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-[#E8820C]/40"
            style={{
              width: `${8 + i * 5}vw`,
              height: `${8 + i * 5}vw`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* "Personalised Learning" badge */}
      <motion.div
        className="absolute top-10 left-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1.2, type: 'spring', damping: 20 }}
      >
        <div className="bg-[#2E6B3E]/80 backdrop-blur-sm rounded-2xl px-7 py-4">
          <p className="text-[2.2vw] text-[#F5EDD6] font-bold tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}>
            Personalised Learning
          </p>
        </div>
      </motion.div>

      {/* "Try — Learn — Try Again" cycle */}
      <motion.div
        className="absolute bottom-20 left-12 right-12 z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-6">
          {['Try', 'Learn', 'Try Again'].map((label, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -10 }}
              animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
            >
              <div className="bg-[#E8820C] rounded-xl px-5 py-2">
                <span className="text-[2vw] font-black text-[#3D1F0A]"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <span className="text-[2.5vw] text-[#E8820C]/70 font-bold">→</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom stat — late scene */}
      <motion.div
        className="absolute bottom-6 left-12 z-10"
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-[1.8vw] text-[#F5EDD6]/70 italic"
          style={{ fontFamily: 'var(--font-body)' }}>
          "Every tap. Every answer. Every try."
        </p>
      </motion.div>

      {/* Accent line */}
      <motion.div
        className="absolute top-1/2 right-0 h-[2px] bg-[#E8820C]/50 rounded-full"
        initial={{ width: 0, originX: 1 }}
        animate={phase >= 4 ? { width: '15%' } : { width: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transform: 'translateY(-50%)' }}
      />
    </motion.div>
  );
}
