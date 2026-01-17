export interface FirstMemoryProps {
  onComplete: () => void;
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}
