import { motion } from 'motion/react';

export function TypingIndicator() {
  return (
    <div className="rounded-3xl rounded-tl-md bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-4 shadow-lg inline-flex items-center gap-1.5">
      <span className="text-sm text-[#BFBFC9] mr-2">Thinking</span>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[#9E27FF]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
