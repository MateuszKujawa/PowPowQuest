import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CipherProps } from "./types";
import {
  SCRAMBLED_LETTERS,
  HINT,
  checkOrder,
  FEEDBACK_MESSAGES,
  type Letter,
} from "./utils";

const Stage6_Cipher = ({ onComplete }: CipherProps) => {
  const [letters, setLetters] = useState<Letter[]>(SCRAMBLED_LETTERS);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }

    const newLetters = [...letters];
    const draggedItemContent = newLetters[dragItem.current];
    newLetters.splice(dragItem.current, 1);
    newLetters.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setLetters(newLetters);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Dla mobile - tap to select, tap again to swap
  const handleTap = (index: number) => {
    if (isSuccess) return;

    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      const newLetters = [...letters];
      [newLetters[selectedIndex], newLetters[index]] = [
        newLetters[index],
        newLetters[selectedIndex],
      ];
      setLetters(newLetters);
      setSelectedIndex(null);
    }
  };

  const handleCheck = () => {
    if (checkOrder(letters)) {
      setIsSuccess(true);
      setFeedback(FEEDBACK_MESSAGES.success);
      setSelectedIndex(null);

      setTimeout(() => {
        setShowFinalMessage(true);
      }, 1000);
    } else {
      setFeedback(FEEDBACK_MESSAGES.wrong);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

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

      {/* Final message overlay */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.3, duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 }}
              >
                KOCHAM CIĘ
              </motion.h1>
              <motion.div
                className="text-6xl md:text-8xl mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                💗
              </motion.div>
              <motion.p
                className="text-white/70 text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Gratulacje, przeszłaś wszystko!
              </motion.p>
              <motion.button
                onClick={onComplete}
                className="group relative"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-active:opacity-70 transition-opacity" />
                <div className="relative backdrop-blur-xl bg-linear-to-r from-pink-500/80 to-purple-600/80 border border-white/20 rounded-2xl px-10 py-4 shadow-2xl">
                  <span className="text-white text-lg font-semibold">💗</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Ostatnie zadanie
            </span>
            <h1 className="text-2xl text-white font-semibold leading-relaxed mb-2">
              Ułóż wiadomość
            </h1>
            <p className="text-white/50 text-sm mb-6">💡 {HINT}</p>

            {/* Draggable letters */}
            <div className="flex flex-wrap justify-center gap-2">
              {letters.map((letter, index) => (
                <motion.div
                  key={letter.id}
                  draggable={!isSuccess}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onClick={() => handleTap(index)}
                  layout
                  layoutId={letter.id}
                  className={`w-10 h-14 flex items-center justify-center text-2xl font-bold rounded-xl border-2 select-none transition-colors duration-200 ${
                    isSuccess
                      ? "bg-green-500/20 border-green-500/50 text-white cursor-default"
                      : selectedIndex === index
                        ? "bg-pink-500/30 border-pink-500 text-white cursor-pointer ring-2 ring-pink-500/50"
                        : "bg-white/10 border-white/20 text-white cursor-grab active:cursor-grabbing hover:border-pink-500/50 hover:bg-pink-500/10"
                  }`}
                  initial={false}
                  animate={{
                    scale: selectedIndex === index ? 1.1 : 1,
                  }}
                  whileHover={
                    !isSuccess && selectedIndex !== index ? { scale: 1.05 } : {}
                  }
                  whileTap={!isSuccess ? { scale: 0.95 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {letter.char}
                </motion.div>
              ))}
            </div>

            {/* Tip for mobile */}
            <p className="text-white/30 text-xs mt-4">
              {selectedIndex !== null
                ? "Teraz dotknij drugą literkę, żeby zamienić"
                : "Dotknij literkę, żeby ją wybrać"}
            </p>

            {/* Current order preview */}
            <div className="mt-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-2xl text-white font-mono tracking-widest">
                {letters.map((l) => l.char).join(" ")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Check button */}
        {!isSuccess && (
          <motion.button
            onClick={handleCheck}
            className="group relative w-full"
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-active:opacity-70 transition-opacity" />
            <div className="relative backdrop-blur-xl bg-linear-to-r from-pink-500/80 to-purple-600/80 border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
              <span className="text-white text-lg font-semibold tracking-wide">
                Sprawdź
              </span>
            </div>
          </motion.button>
        )}
      </motion.div>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback && !showFinalMessage && (
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
    </div>
  );
};

export default Stage6_Cipher;
