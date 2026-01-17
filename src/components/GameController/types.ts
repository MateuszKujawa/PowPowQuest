export const Stage = {
  HOME: 0,
  FIRST_MEMORY: 1,
  MINI_QUIZ: 2,
  SONG: 3,
  EMOJI_GAME: 4,
  OUR_CODE: 5,
  CIPHER: 6,
  FINAL: 7,
} as const;

export type Stage = (typeof Stage)[keyof typeof Stage];
