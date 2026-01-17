import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Kogo hejtowaliśmy na Messengerze jak się poznawaliśmy?",
    answers: [
      { id: "a", text: "Grubasów", isCorrect: false },
      { id: "b", text: "Chudzielców", isCorrect: false },
      { id: "c", text: "Ukrainców", isCorrect: true },
      { id: "d", text: "Policjantów", isCorrect: false },
    ],
    wrongFeedback: "Nie no… przecież wiesz 😏",
  },
  {
    id: 2,
    question:
      "Jak powiedziałem ci że jestem programistą to co chciałaś żebym dla ciebie zrobił?",
    answers: [
      { id: "a", text: "Bloga o spawaniu", isCorrect: true },
      { id: "b", text: "Portfolio", isCorrect: false },
      {
        id: "c",
        text: "Stronę dla firmy w której pracujesz",
        isCorrect: false,
      },
      { id: "d", text: "Kopie pornhuba", isCorrect: false },
    ],
    wrongFeedback: "Serio? aż tak mnie nie znasz? 😌",
  },
  {
    id: 3,
    question:
      "Ile chciałaś zapłacić za stronę o której mowa w poprzednim pytaniu?",
    answers: [
      { id: "a", text: "100zł", isCorrect: false },
      { id: "b", text: "Nic, za darmo miałem to zrobić", isCorrect: false },
      { id: "c", text: "1 zł", isCorrect: false },
      { id: "d", text: "5 zł", isCorrect: true },
    ],
    wrongFeedback: "Taniej się już nie dało 😂",
  },
];

export const TIME_LIMIT = 15;
export const FEEDBACK_DURATION = 2000;
export const SUCCESS_DURATION = 1500;

export const FEEDBACK_MESSAGES = {
  timeout: "Za wolno… skup się 😏",
  success: "Dobrze! 💗",
  quizComplete: "Super! Lecisz dalej 🔥",
} as const;
