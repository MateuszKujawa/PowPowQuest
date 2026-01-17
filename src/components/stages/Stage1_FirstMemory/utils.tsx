export const ANSWERS = [
  { id: "a", text: "Starbucks + Drwal w McDonald's + auto", isCorrect: true },
  { id: "b", text: "Kino i drwal", isCorrect: false },
  { id: "c", text: "Starbucks i kino", isCorrect: false },
  { id: "d", text: "W piździe xD", isCorrect: false },
] as const;

export const TIME_LIMIT = 20;
export const FEEDBACK_DURATION = 2000;
export const SUCCESS_DURATION = 2500;

export const FEEDBACK_MESSAGES = {
  wrong: "Prawie… spróbuj jeszcze raz 😌",
  timeout: "Za wolno… skup się 😏",
  success: "Brawo! Pamiętasz 👌",
} as const;
