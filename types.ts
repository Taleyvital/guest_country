export interface Player {
  id: string | number;
  name: string;
  country: string;
  letterCount: number;
  discoveredLetters: Set<string>;
  eliminated: boolean;
  points: number;
  skipNextTurn: boolean;
  isAI?: boolean;
  knownLetters?: Set<string>;
  triedLetters?: Set<string>;
}

export type GameMode = 'solo' | 'local' | 'online' | null;
export type AiDifficulty = 'easy' | 'medium' | 'hard';

