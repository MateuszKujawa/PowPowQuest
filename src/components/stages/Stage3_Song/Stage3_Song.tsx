import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SongProps } from "./types";
import {
  validateAnswer,
  SUCCESS_DURATION,
  FEEDBACK_MESSAGES,
  SONG_PATH,
  EQUALIZER_BARS,
} from "./utils";

const Stage3_Song = ({ onComplete }: SongProps) => {
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    if (validateAnswer(inputValue)) {
      setIsSuccess(true);
      setFeedback(FEEDBACK_MESSAGES.success);

      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        onComplete();
      }, SUCCESS_DURATION);
    } else {
      setFeedback(FEEDBACK_MESSAGES.wrong);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center px-5 py-8 overflow-hidden relative">
      {/* Audio element */}
      <audio ref={audioRef} src={SONG_PATH} preload="auto" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "5%", right: "-15%" }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Music note decoration */}
      <motion.div
        className="absolute top-20 right-10 text-6xl opacity-10 pointer-events-none"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🎵
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-10 text-5xl opacity-10 pointer-events-none"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🎶
      </motion.div>

      {/* Content */}
      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glass card */}
        <div className="backdrop-blur-2xl bg-white/8 border border-white/15 rounded-3xl p-6 mb-6 shadow-2xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-pink-400/80 text-sm font-medium tracking-wider uppercase mb-3 block">
              Wspólna piosenka
            </span>
            <h1 className="text-2xl text-white font-semibold leading-relaxed mb-2">
              Wklej link do naszej wspólnej piosenki albo wpisz jej tytuł
            </h1>
            <p className="text-white/50 text-sm">Bez limitu czasu - chill 🎧</p>
          </motion.div>
        </div>

        {/* Music visualizer */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="backdrop-blur-xl bg-white/8 border border-green-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-center gap-1 h-16">
                  {EQUALIZER_BARS.map((bar, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-linear-to-t from-pink-500 to-purple-500 rounded-full"
                      animate={{
                        height: [8, bar.height, 8],
                      }}
                      transition={{
                        duration: bar.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: bar.delay,
                      }}
                    />
                  ))}
                </div>
                <p className="text-center text-white/60 text-sm mt-4">
                  🎵 Fagata x Dajczman - POW POW 🎵
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input form */}
        {!isSuccess && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="backdrop-blur-xl bg-white/6 border border-white/12 rounded-2xl p-4 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isSuccess}
                placeholder="Link lub tytuł piosenki..."
                className="w-full bg-transparent text-white placeholder-white/40 text-base outline-none"
                autoFocus
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSuccess || !inputValue.trim()}
              className="group relative w-full disabled:opacity-50 disabled:pointer-events-none"
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-active:opacity-70 transition-opacity" />
              <div className="relative backdrop-blur-xl bg-linear-to-r from-pink-500/80 to-purple-600/80 border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
                <span className="text-white text-lg font-semibold tracking-wide">
                  Sprawdź
                </span>
              </div>
            </motion.button>
          </motion.form>
        )}

        {/* Success message */}
        {isSuccess && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/60 text-sm">
              Przechodzisz dalej za chwilę...
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            className="fixed bottom-8 left-1/2 z-50"
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div
              className={`backdrop-blur-2xl border rounded-2xl px-6 py-4 shadow-2xl ${
                isSuccess
                  ? "bg-green-500/20 border-green-500/30"
                  : "bg-white/10 border-white/15"
              }`}
            >
              <p className="text-white text-base font-medium text-center">
                {feedback}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage3_Song;
