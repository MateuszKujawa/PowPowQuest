export interface EmojiProps {
  onComplete: () => void;
}

export interface EmojiItem {
  id: number;
  emoji: string;
  isTrap: boolean;
  x: number;
  y: number;
}
