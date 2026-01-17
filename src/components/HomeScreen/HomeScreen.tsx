import { motion } from "framer-motion";
import type { HomeScreenProps } from "./types";

const HomeScreen = ({ onStart }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "20%", left: "-5%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "10%", right: "-10%" }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-rose-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "60%", left: "20%" }}
        />
      </div>

      {/* Pulsing heart background */}
      <motion.div
        className="absolute text-[200px] opacity-5 select-none pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        💗
      </motion.div>

      {/* Small floating hearts */}
      {["💕", "💗", "💖"].map((heart, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-20 pointer-events-none"
          animate={{
            y: [0, -15, 0],
            x: [0, index % 2 === 0 ? 5 : -5, 0],
            rotate: [0, index % 2 === 0 ? 10 : -10, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
          style={{
            top: `${25 + index * 20}%`,
            left: `${15 + index * 30}%`,
          }}
        >
          {heart}
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="z-10 flex flex-col items-center max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Top decorative element */}
        <motion.div
          className="text-5xl mb-6"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
        >
          💗
        </motion.div>

        {/* Glass card */}
        <motion.div
          className="backdrop-blur-2xl bg-white/8 border border-white/15 rounded-3xl p-8 mb-8 shadow-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.p
            className="text-pink-400/80 text-sm font-medium tracking-widest uppercase text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Specjalnie dla Ciebie
          </motion.p>

          <h1 className="text-3xl md:text-4xl text-white text-center font-semibold leading-relaxed mb-2">
            Hej Aktimelek
          </h1>

          <p className="text-white/60 text-lg text-center">
            Gotowa na małą gierkę?
          </p>

          {/* Decorative line */}
          <motion.div
            className="w-16 h-0.5 bg-linear-to-r from-pink-500/50 to-purple-500/50 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
        </motion.div>

        {/* Button */}
        <motion.button
          onClick={onStart}
          className="group relative w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          <div className="relative bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl px-10 py-5 shadow-2xl overflow-hidden">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
            <span className="relative text-white text-lg font-semibold tracking-wide">
              Zaczynam ✨
            </span>
          </div>
        </motion.button>

        {/* Bottom hint */}
        <motion.p
          className="text-white/30 text-xs mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          6 poziomów czeka na Ciebie
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HomeScreen;
