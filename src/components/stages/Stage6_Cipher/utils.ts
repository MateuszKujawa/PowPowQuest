export interface Letter {
  id: string;
  char: string;
}

export const SCRAMBLED_LETTERS: Letter[] = [
  { id: "1", char: "M" },
  { id: "2", char: "O" },
  { id: "3", char: "K" },
  { id: "4", char: "H" },
  { id: "5", char: "A" },
  { id: "6", char: "C" },
  { id: "7", char: "Ę" },
  { id: "8", char: "C" },
  { id: "9", char: "I" },
];

export const CORRECT_ORDER = ["K", "O", "C", "H", "A", "M", "C", "I", "Ę"];

export const FEEDBACK_MESSAGES = {
  wrong: "Jeszcze nie… spróbuj ułożyć inaczej 🔐",
  success: "Tak! 💗",
} as const;

export const HINT = "Przeciągnij litery i ułóż hasło";

export const checkOrder = (letters: Letter[]): boolean => {
  const current = letters.map((l) => l.char);
  return current.join("") === CORRECT_ORDER.join("");
};
