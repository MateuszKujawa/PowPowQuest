export const VALID_ANSWERS = [
  "https://youtu.be/_fjQ-aTaOgg?si=nCbafMDGQWO01d58",
  "https://youtu.be/_fjq-ataog",
  "fagata x dajczman - pow pow",
  "fagata - dajczman - pow pow",
  "fagata dajczman - pow pow",
  "fagata, dajczman - pow pow",
  "dajczman - fagata - pow pow",
  "dajczman x fagata - pow pow",
  "dajczman fagata - pow pow",
  "fagata x dajczman pow pow",
  "fagata pow pow",
  "dajczman pow pow",
  "pow pow",
  "powpow",
] as const;

export const SONG_PATH = "/powpow.mp3";
export const SUCCESS_DURATION = 10500;
export const FEEDBACK_DURATION = 10500;

export const FEEDBACK_MESSAGES = {
  success: "No wiadomo że pow pow 😉",
  wrong: "Hmm… to nie to, spróbuj jeszcze raz 🎵",
} as const;

export const normalizeInput = (input: string): string => {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
};

export const validateAnswer = (input: string): boolean => {
  const normalized = normalizeInput(input);

  return VALID_ANSWERS.some((answer) => {
    const normalizedAnswer = normalizeInput(answer);
    return (
      normalized.includes(normalizedAnswer) ||
      normalizedAnswer.includes(normalized)
    );
  });
};

// Pre-generated random values for equalizer bars
export const EQUALIZER_BARS = [
  { height: 45, duration: 0.52, delay: 0 },
  { height: 38, duration: 0.61, delay: 0.05 },
  { height: 55, duration: 0.45, delay: 0.1 },
  { height: 32, duration: 0.58, delay: 0.15 },
  { height: 48, duration: 0.49, delay: 0.2 },
  { height: 41, duration: 0.55, delay: 0.25 },
  { height: 60, duration: 0.42, delay: 0.3 },
  { height: 35, duration: 0.63, delay: 0.35 },
  { height: 52, duration: 0.47, delay: 0.4 },
  { height: 29, duration: 0.59, delay: 0.45 },
  { height: 44, duration: 0.51, delay: 0.5 },
  { height: 57, duration: 0.44, delay: 0.55 },
  { height: 33, duration: 0.62, delay: 0.6 },
  { height: 49, duration: 0.48, delay: 0.65 },
  { height: 40, duration: 0.56, delay: 0.7 },
  { height: 54, duration: 0.46, delay: 0.75 },
  { height: 36, duration: 0.6, delay: 0.8 },
  { height: 47, duration: 0.5, delay: 0.85 },
  { height: 58, duration: 0.43, delay: 0.9 },
  { height: 31, duration: 0.57, delay: 0.95 },
];
