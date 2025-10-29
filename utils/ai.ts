import { ALPHABET, COMMON_LETTERS, PAYS } from '../constants';
import { Player, AiDifficulty } from '../types';

export const shouldAiGuess = (
  ai: Player,
  target: Player,
  difficulty: AiDifficulty
): boolean => {
  const discoveredCount = ai.discoveredLetters.size;
  
  switch (difficulty) {
    case 'easy':
      return discoveredCount >= target.letterCount * 0.8;
    case 'medium':
      return discoveredCount >= target.letterCount * 0.6;
    case 'hard':
      return discoveredCount >= target.letterCount * 0.4;
    default:
      return false;
  }
};

export const getPossibleCountries = (target: Player, ai: Player): string[] => {
  return PAYS.filter(country => {
    if (country.length !== target.letterCount) return false;
    return Array.from(ai.discoveredLetters).every(letter => country.includes(letter));
  });
};

export const getAiLetterChoice = (
  availableLetters: string[],
  difficulty: AiDifficulty
): string => {
  if (availableLetters.length === 0) return '';
  
  if (difficulty === 'easy') {
    return availableLetters[Math.floor(Math.random() * availableLetters.length)];
  }
  
  const priorityLetters = COMMON_LETTERS.filter(l => availableLetters.includes(l));
  return priorityLetters.length > 0
    ? priorityLetters[Math.floor(Math.random() * priorityLetters.length)]
    : availableLetters[Math.floor(Math.random() * availableLetters.length)];
};

export const getAvailableLetters = (ai: Player): string[] => {
  return ALPHABET.filter(letter => !ai.triedLetters?.has(letter));
};

