export const TOTAL_GOOD_EMOJIS = 20;
export const MAX_ON_SCREEN = 4;
export const EMOJI_LIFETIME = 2500;
export const SPAWN_INTERVAL = 800;

export const SUCCESS_DURATION = 1500;

export const FEEDBACK_MESSAGES = {
  trap: "Co ty Ukrainę klikasz… Jeszcze raz, ogarnij się 😤",
  missed: "Uciekła ci emotka! Jeszcze raz 😏",
  success: "Super refleks! 🔥",
} as const;

export const POSITIONS = [
  { x: 20, y: 20 },
  { x: 70, y: 15 },
  { x: 45, y: 40 },
  { x: 25, y: 60 },
  { x: 75, y: 55 },
  { x: 50, y: 75 },
  { x: 35, y: 30 },
  { x: 65, y: 35 },
  { x: 30, y: 50 },
  { x: 60, y: 65 },
  { x: 40, y: 25 },
  { x: 80, y: 45 },
  { x: 15, y: 70 },
  { x: 55, y: 50 },
  { x: 38, y: 60 },
  { x: 72, y: 25 },
  { x: 22, y: 35 },
  { x: 62, y: 70 },
  { x: 48, y: 45 },
  { x: 78, y: 60 },
  { x: 18, y: 55 },
  { x: 52, y: 30 },
  { x: 32, y: 75 },
  { x: 68, y: 40 },
  { x: 42, y: 55 },
  { x: 82, y: 35 },
  { x: 28, y: 45 },
  { x: 58, y: 20 },
  { x: 36, y: 65 },
  { x: 74, y: 70 },
];

export const EMOJI_SEQUENCE = [
  { emoji: "💗", isTrap: false },
  { emoji: "🍆", isTrap: false },
  { emoji: "🍑", isTrap: false },
  { emoji: "💗", isTrap: false },
  { emoji: "", isTrap: true }, // trap 1
  { emoji: "🍆", isTrap: false },
  { emoji: "🍑", isTrap: false },
  { emoji: "💗", isTrap: false },
  { emoji: "🍆", isTrap: false },
  { emoji: "🍑", isTrap: false },
  { emoji: "", isTrap: true }, // trap 2
  { emoji: "💗", isTrap: false },
  { emoji: "🍆", isTrap: false },
  { emoji: "🍑", isTrap: false },
  { emoji: "💗", isTrap: false },
  { emoji: "🍆", isTrap: false },
  { emoji: "", isTrap: true }, // trap 3
  { emoji: "🍑", isTrap: false },
  { emoji: "💗", isTrap: false },
  { emoji: "🍆", isTrap: false },
  { emoji: "🍑", isTrap: false },
  { emoji: "💗", isTrap: false },
  { emoji: "", isTrap: true }, // trap 4
  { emoji: "🍆", isTrap: false },
];
