import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Answer, FirstMemoryProps } from "./types";
import {
  ANSWERS,
  TIME_LIMIT,
  FEEDBACK_DURATION,
  SUCCESS_DURATION,
  FEEDBACK_MESSAGES,
} from "./utils";

const Stage1_FirstMemory = ({ onComplete }: FirstMemoryProps) => {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<number | null>(null);

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
              setTimeLeft(TIME_LIMIT);
              setIsRunning(true);
            });
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

  const handleAnswer = (answer: Answer) => {
    if (answer.isCorrect) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsSuccess(true);
      setFeedback(FEEDBACK_MESSAGES.success);
      setTimeout(() => {
        onComplete();
      }, SUCCESS_DURATION);
    } else {
      setFeedback(FEEDBACK_MESSAGES.wrong);
      setTimeout(() => setFeedback(null), FEEDBACK_DURATION);
    }
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

      {/* Question card */}
      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glass card for question */}
        <div className="backdrop-blur-2xl bg-white/8 border border-white/15 rounded-3xl p-6 mb-6 shadow-2xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-pink-400/80 text-sm font-medium tracking-wider uppercase mb-3 block">
              Pierwsze wspomnienie
            </span>
            <h1 className="text-2xl text-white font-semibold leading-relaxed">
              Gdzie byliśmy na naszej pierwszej randce?
            </h1>
          </motion.div>
        </div>

        {/* Answers */}
        <div className="flex flex-col gap-3">
          {ANSWERS.map((answer, index) => (
            <motion.button
              key={answer.id}
              onClick={() => handleAnswer(answer)}
              disabled={isSuccess}
              className="group relative w-full text-left disabled:pointer-events-none"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`backdrop-blur-xl bg-white/6 border rounded-2xl p-4 transition-all duration-300 group-active:bg-white/12 group-active:shadow-lg ${
                  isSuccess && answer.isCorrect
                    ? "border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/20"
                    : "border-white/12 group-active:border-pink-500/30 group-active:shadow-pink-500/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      isSuccess && answer.isCorrect
                        ? "bg-green-500/30 border-green-500/50"
                        : "bg-linear-to-br from-pink-500/20 to-purple-500/20 border-white/10"
                    }`}
                  >
                    <span className="text-white/90 font-semibold text-sm uppercase">
                      {isSuccess && answer.isCorrect ? "✓" : answer.id}
                    </span>
                  </div>
                  <span className="text-white/90 text-base leading-snug">
                    {answer.text}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
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

export default Stage1_FirstMemory;
