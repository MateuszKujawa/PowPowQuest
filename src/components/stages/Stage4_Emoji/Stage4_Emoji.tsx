/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EmojiProps, EmojiItem } from "./types";
import {
  TOTAL_GOOD_EMOJIS,
  MAX_ON_SCREEN,
  EMOJI_LIFETIME,
  SPAWN_INTERVAL,
  FEEDBACK_MESSAGES,
  POSITIONS,
  EMOJI_SEQUENCE,
} from "./utils";

const Stage4_Emoji = ({ onComplete }: EmojiProps) => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "failed" | "success">(
    "playing",
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  const nextEmojiIndex = useRef(0);
  const emojiIdCounter = useRef(0);
  const spawnIntervalRef = useRef<number | null>(null);
  const lifetimeTimers = useRef<Map<number, number>>(new Map());
  const scoreRef = useRef(0);
  const gameStateRef = useRef<"playing" | "failed" | "success">("playing");
  const emojisRef = useRef<EmojiItem[]>([]);

  useEffect(() => {
    emojisRef.current = emojis;
  }, [emojis]);

  const clearAllTimers = useCallback(() => {
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
    lifetimeTimers.current.forEach((timerId) => clearTimeout(timerId));
    lifetimeTimers.current.clear();
  }, []);

  const spawnEmoji = useCallback(() => {
    if (nextEmojiIndex.current >= EMOJI_SEQUENCE.length) return;
    if (gameStateRef.current !== "playing") return;
    if (emojisRef.current.length >= MAX_ON_SCREEN) return;

    const emojiData = EMOJI_SEQUENCE[nextEmojiIndex.current];
    const position = POSITIONS[nextEmojiIndex.current % POSITIONS.length];
    const id = emojiIdCounter.current++;
    nextEmojiIndex.current++;

    const newEmoji: EmojiItem = {
      id,
      emoji: emojiData.emoji,
      isTrap: emojiData.isTrap,
      x: position.x,
      y: position.y,
    };

    setEmojis((current) => [...current, newEmoji]);

    const timerId = window.setTimeout(() => {
      if (gameStateRef.current !== "playing") return;

      const exists = emojisRef.current.find((e) => e.id === id);

      if (exists) {
        if (!exists.isTrap) {
          gameStateRef.current = "failed";
          clearAllTimers();
          setGameState("failed");
          setFeedback(FEEDBACK_MESSAGES.missed);
          setEmojis([]);
        } else {
          setEmojis((prev) => prev.filter((e) => e.id !== id));
        }
      }

      lifetimeTimers.current.delete(id);
    }, EMOJI_LIFETIME);

    lifetimeTimers.current.set(id, timerId);
  }, [clearAllTimers]);

  const startGame = useCallback(() => {
    clearAllTimers();
    setEmojis([]);
    emojisRef.current = [];
    setScore(0);
    scoreRef.current = 0;
    gameStateRef.current = "playing";
    setGameState("playing");
    setFeedback(null);
    nextEmojiIndex.current = 0;
    emojiIdCounter.current = 0;

    const startTimeout = setTimeout(() => {
      spawnEmoji();
      spawnIntervalRef.current = window.setInterval(() => {
        if (gameStateRef.current === "playing") {
          spawnEmoji();
        }
      }, SPAWN_INTERVAL);
    }, 300);

    return () => {
      clearTimeout(startTimeout);
      clearAllTimers();
    };
  }, [clearAllTimers, spawnEmoji]);

  useEffect(() => {
    if (!showInstructions) {
      return startGame();
    }
  }, [restartKey, showInstructions]);

  const handleEmojiClick = (emoji: EmojiItem) => {
    if (gameStateRef.current !== "playing") return;

    const timerId = lifetimeTimers.current.get(emoji.id);
    if (timerId) {
      clearTimeout(timerId);
      lifetimeTimers.current.delete(emoji.id);
    }

    if (emoji.isTrap) {
      gameStateRef.current = "failed";
      clearAllTimers();
      setGameState("failed");
      setFeedback(FEEDBACK_MESSAGES.trap);
      setEmojis([]);
    } else {
      setEmojis((prev) => prev.filter((e) => e.id !== emoji.id));
      scoreRef.current += 1;
      setScore(scoreRef.current);

      if (scoreRef.current >= TOTAL_GOOD_EMOJIS) {
        gameStateRef.current = "success";
        clearAllTimers();
        setGameState("success");
      }
    }
  };

  const handleRestart = () => {
    setRestartKey((k) => k + 1);
  };

  const handleStartGame = () => {
    setShowInstructions(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center px-5 py-8 overflow-hidden relative">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-72 h-72 bg-pink-500/15 rounded-full blur-2xl"
          style={{ top: "10%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "5%", right: "-15%" }}
        />
      </div>

      {/* Instructions overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="backdrop-blur-2xl bg-white/8 border border-white/15 rounded-3xl p-8 text-center max-w-sm shadow-2xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                🎮
              </motion.div>

              <span className="text-pink-400/80 text-sm font-medium tracking-wider uppercase mb-2 block">
                Instrukcja
              </span>

              <h2 className="text-white text-2xl font-semibold mb-4">
                Gra w emotki
              </h2>

              <div className="text-left space-y-3 mb-6">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-2xl">👆</span>
                  <p className="text-white/70 text-sm">
                    Klikaj emotki <span className="text-2xl">💗🍆🍑</span>,
                    zanim znikną z ekranu.
                  </p>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-2xl">⚠️</span>
                  <p className="text-white/70 text-sm">
                    <span className="text-yellow-400 font-medium">
                      Uważaj na pułapki!
                    </span>{" "}
                    Pod żadnym pozorem nie klikaj zjebów..
                  </p>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-2xl">🎯</span>
                  <p className="text-white/70 text-sm">
                    Musisz zebrać{" "}
                    <span className="text-pink-400 font-medium">
                      {TOTAL_GOOD_EMOJIS} emotek
                    </span>{" "}
                    żeby wygrać
                  </p>
                </motion.div>
              </div>

              <motion.button
                onClick={handleStartGame}
                className="group relative w-full"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-active:opacity-70 transition-opacity" />
                <div className="relative bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl px-8 py-4 shadow-2xl overflow-hidden">
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
                  <span className="relative text-white text-lg font-semibold">
                    Rozumiem, zaczynamy! 🚀
                  </span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score */}
      {!showInstructions && (
        <motion.div
          className="absolute top-6 left-6 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="backdrop-blur-xl bg-white/8 border border-white/15 rounded-full px-4 py-2">
            <span className="text-white/80 text-sm font-medium">
              {score} / {TOTAL_GOOD_EMOJIS}
            </span>
          </div>
        </motion.div>
      )}

      {/* Header */}
      {!showInstructions && (
        <motion.div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="backdrop-blur-xl bg-white/8 border border-white/15 rounded-full px-5 py-2">
            <span className="text-white text-sm font-medium">
              <span className="text-yellow-400 font-medium">JEDZIESZ!</span>{" "}
              Klikaj emotki i uważaj na pułapki!
            </span>
          </div>
        </motion.div>
      )}

      {/* Game area */}
      {!showInstructions && (
        <div className="relative w-full h-[60vh] max-w-md z-10">
          <AnimatePresence>
            {emojis.map((emoji) => (
              <motion.button
                key={emoji.id}
                className="absolute select-none"
                style={{
                  left: `${emoji.x}%`,
                  top: `${emoji.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji.isTrap ? (
                  <img
                    src="/ua.jpg"
                    alt="trap"
                    className="w-12 h-8 object-cover rounded-sm"
                  />
                ) : (
                  <span className="text-5xl">{emoji.emoji}</span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Failed overlay */}
      <AnimatePresence>
        {gameState === "failed" && !showInstructions && (
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="backdrop-blur-2xl bg-white/10 border border-white/15 rounded-3xl p-8 text-center max-w-sm"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <p className="text-white text-xl font-medium mb-6">{feedback}</p>
              <motion.button
                onClick={handleRestart}
                className="group relative"
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-active:opacity-70 transition-opacity" />
                <div className="relative backdrop-blur-xl bg-linear-to-r from-pink-500/80 to-purple-600/80 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl">
                  <span className="text-white text-lg font-semibold">
                    Zacznij jeszcze raz
                  </span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success overlay */}
      <AnimatePresence>
        {gameState === "success" && !showInstructions && (
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="backdrop-blur-2xl bg-white/8 border border-white/15 rounded-3xl p-8 text-center w-full max-w-md shadow-2xl mx-4"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                🎉
              </motion.div>
              <span className="text-pink-400/80 text-sm font-medium tracking-wider uppercase mb-2 block text-center">
                Poziom ukończony
              </span>
              <h2 className="text-white text-2xl font-semibold mb-6 text-center">
                Super refleks! 🔥
              </h2>
              <motion.button
                onClick={onComplete}
                className="group relative w-full"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-active:opacity-70 transition-opacity" />
                <div className="relative backdrop-blur-xl bg-linear-to-r from-pink-500/80 to-purple-600/80 border border-white/20 rounded-2xl px-8 py-4 shadow-2xl">
                  <span className="text-white text-lg font-semibold">
                    Przejdź dalej →
                  </span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage4_Emoji;
