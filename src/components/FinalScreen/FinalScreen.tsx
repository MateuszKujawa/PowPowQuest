import { motion } from "framer-motion";
import type { FinalScreenProps } from "./types";

const FinalScreen = ({ onRestart }: FinalScreenProps) => {
  const hearts = ["💗", "💕", "💖", "💝", "❤️", "💗", "💕", "💖"];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center px-5 py-8 overflow-hidden relative">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/25 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "5%", right: "-15%" }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Floating hearts */}
      {hearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute text-3xl pointer-events-none"
          initial={{
            x: `${10 + index * 12}%`,
            y: "110%",
            opacity: 0,
          }}
          animate={{
            y: "-10%",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "easeOut",
          }}
          style={{ left: `${5 + index * 12}%` }}
        >
          {heart}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated title */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-pink-400 mb-4">
            🎉
          </h1>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {"Brawo!".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-white/70 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Przeszłaś wszystkie poziomy!
        </motion.p>

        <motion.div
          className="text-5xl md:text-7xl mb-8"
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          💗
        </motion.div>

        <motion.p
          className="text-lg text-white/60 mb-10 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          Kocham Cię Aktimelek! 🥰❤️
        </motion.p>

        {/* Restart button */}
        <motion.button
          onClick={onRestart}
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
          <div className="relative backdrop-blur-xl bg-linear-to-r from-pink-500/80 to-purple-600/80 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl">
            <span className="text-white text-lg font-semibold">
              Wróć na początek
            </span>
          </div>
        </motion.button>
      </motion.div>

      {/* Sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          style={{
            top: `${15 + ((i * 7) % 70)}%`,
            left: `${10 + ((i * 11) % 80)}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FinalScreen;
