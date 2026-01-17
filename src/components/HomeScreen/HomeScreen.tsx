import { motion } from "framer-motion";
import type { HomeScreenProps } from "./types";

const HomeScreen = ({ onStart }: HomeScreenProps) => {
  return (
    <div className="min-h-screen min-h-[-webkit-fill-available] bg-linear-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center px-6 overflow-hidden relative safe-area-inset">
      {/* Simple static orbs - no heavy animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-72 h-72 bg-pink-500/15 rounded-full blur-2xl"
          style={{ top: "15%", left: "-10%" }}
        />
        <div
          className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-2xl"
          style={{ bottom: "10%", right: "-15%" }}
        />
      </div>

      {/* Pulsing heart - simple CSS animation */}
      <div
        className="absolute text-[180px] opacity-5 select-none pointer-events-none animate-pulse"
        style={{ animationDuration: "3s" }}
      >
        💗
      </div>

      {/* Content */}
      <motion.div
        className="z-10 flex flex-col items-center max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top heart */}
        <motion.div
          className="text-5xl mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
        >
          💗
        </motion.div>

        {/* Glass card */}
        <div className="backdrop-blur-xl bg-white/8 border border-white/15 rounded-3xl p-8 mb-8 shadow-2xl w-full">
          <p className="text-pink-400/80 text-sm font-medium tracking-widest uppercase text-center mb-4">
            Specjalnie dla Ciebie
          </p>

          <h1 className="text-3xl text-white text-center font-semibold leading-relaxed mb-2">
            Hej Ty
          </h1>

          <p className="text-white/60 text-lg text-center">
            Gotowa na małą zagadkę?
          </p>

          <div className="w-16 h-0.5 bg-linear-to-r from-pink-500/50 to-purple-500/50 mx-auto mt-6 rounded-full" />
        </div>

        {/* Button */}
        <motion.button
          onClick={onStart}
          className="group relative w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-40 transition-opacity duration-300" />
          <div className="relative bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl px-10 py-5 shadow-2xl">
            <span className="text-white text-lg font-semibold tracking-wide">
              Zaczynam ✨
            </span>
          </div>
        </motion.button>

        <p className="text-white/30 text-xs mt-6 text-center">
          6 poziomów czeka na Ciebie
        </p>
      </motion.div>
    </div>
  );
};

export default HomeScreen;
