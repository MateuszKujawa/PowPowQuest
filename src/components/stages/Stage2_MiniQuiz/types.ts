export interface MiniQuizProps {
  onComplete: () => void;
}

export interface Question {
  id: number;
  question: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  wrongFeedback: string;
}
