/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { OurCodeProps } from "./types";
import {
  CORRECT_CODE,
  TIME_LIMIT,
  FEEDBACK_DURATION,
  FEEDBACK_MESSAGES,
} from "./utils";

const Stage5_OurCode = ({ onComplete }: OurCodeProps) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHintPopup, setShowHintPopup] = useState(false);
  const timerRef = useRef<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);

          flushSync(() => {
            setIsRunning(false);
            setFeedback(FEEDBACK_MESSAGES.timeout);
          });

          setTimeout(() => {
            flushSync(() => {
              setFeedback(null);
              setCode(["", "", "", "", "", "", "", ""]);
              setTimeLeft(TIME_LIMIT);
              setIsRunning(true);
            });
            inputRefs.current[0]?.focus();
          }, FEEDBACK_DURATION);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join("");
    if (fullCode.length === 8) {
      if (fullCode === CORRECT_CODE) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsSuccess(true);
        setFeedback(FEEDBACK_MESSAGES.success);
        setTimeout(() => {
          setShowCelebration(true);
        }, 1000);
      } else {
        setFeedback(FEEDBACK_MESSAGES.wrong);
        setTimeout(() => {
          setFeedback(null);
          setCode(["", "", "", "", "", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, FEEDBACK_DURATION);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  const handleHintClick = () => {
    setShowHintPopup(true);
  };

  const timerPercentage = (timeLeft / TIME_LIMIT) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center px-5 py-8 overflow-hidden relative">
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

      {/* Timer ring */}
      <motion.div
        className="absolute top-6 right-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={isSuccess ? "#22c55e" : "url(#timerGradient)"}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={283}
              animate={{
                strokeDashoffset: 283 - (283 * timerPercentage) / 100,
              }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient
                id="timerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg font-medium">{timeLeft}</span>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glass card */}
        <div className="backdrop-blur-2xl bg-white/8 border border-white/15 rounded-3xl p-6 mb-8 shadow-2xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-pink-400/80 text-sm font-medium tracking-wider uppercase mb-3 block">
              Pomyśl i wpisz odpowiednie liczby...
            </span>
            <h1 className="text-2xl text-white font-semibold leading-relaxed">
              Tajny kod
            </h1>
            <p className="text-white/50 text-sm mt-2">Format: DD.MM.RRRR</p>
          </motion.div>
        </div>

        {/* Code input tiles */}
        <motion.div
          className="flex justify-center items-center gap-1.5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {code.map((digit, index) => (
            <div key={index} className="flex items-center">
              <motion.input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isSuccess}
                className={`w-10 h-14 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-all duration-300 bg-white/8 text-white ${
                  isSuccess
                    ? "border-green-500/50 bg-green-500/10"
                    : digit
                      ? "border-pink-500/50 bg-pink-500/10"
                      : "border-white/20"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              />
              {(index === 1 || index === 3) && (
                <span className="text-white/40 text-2xl mx-1">.</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Hint button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={handleHintClick}
            className="flex items-center gap-1 text-white hover:text-white/70 transition-colors px-4 py-2 rounded-full border-3 border-yellow-400 hover:border-white/20 hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSuccess}
          >
            <span className="text-lg">💡</span>
            <span className="text-md font-medium">Podpowiedź</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Hint Popup */}
      <AnimatePresence>
        {showHintPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHintPopup(false)}
            />

            {/* Popup */}
            <motion.div
              className="relative z-10 w-full max-w-sm"
              initial={{ scale: 0.5, opacity: 0, y: 50, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
            >
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
                {/* Emoji */}
                <motion.div
                  className="text-6xl mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  😏
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-xl font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Haha, nie ma tak łatwo!
                </motion.h3>

                {/* Message */}
                <motion.p
                  className="text-white/70 text-base mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Nie ma żadnej podpowiedzi!
                  <br />
                  <span className="text-pink-400 font-medium">
                    Skup się, a dasz radę! 💪
                  </span>
                </motion.p>

                {/* Close button */}
                <motion.button
                  onClick={() => setShowHintPopup(false)}
                  className="w-full py-3 px-6 rounded-2xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Dobra, dobra 🙄
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && !showCelebration && (
          <motion.div
            className="fixed bottom-8 left-1/2 z-40"
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

      {/* Celebration Popup */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Floating hearts/sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{
                    opacity: 0,
                    y: "100vh",
                    x: `${Math.random() * 100}vw`,
                  }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: "-20vh",
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  {["💖", "✨", "💕", "🎉", "💗", "⭐"][i % 6]}
                </motion.div>
              ))}
            </div>

            {/* Popup card */}
            <motion.div
              className="relative z-10 mx-4"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
              <div className="backdrop-blur-2xl bg-linear-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 border border-white/20 rounded-3xl p-12 shadow-2xl w-full text-center">
                {/* Success icon */}
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <motion.svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    />
                  </motion.svg>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-3xl font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Brawo! 🎉
                </motion.h2>

                {/* Message */}
                <motion.p
                  className="text-white/80 text-lg mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Zgadłaś dzień w którym się poznaliśmy!
                </motion.p>

                <motion.p
                  className="text-pink-300 text-xl font-semibold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  16.11.2025 💗
                </motion.p>

                {/* Continue button */}
                <motion.button
                  onClick={handleContinue}
                  className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Kontynuuj ➔
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage5_OurCode;
