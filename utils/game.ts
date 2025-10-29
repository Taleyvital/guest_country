import { PAYS } from '../constants';
import { Player } from '../types';

export const getRandomCountry = () => {
  return PAYS[Math.floor(Math.random() * PAYS.length)];
};

export const countLetterOccurrences = (text: string, letter: string): number => {
  return (text.match(new RegExp(letter, 'g')) || []).length;
};

export const findNextPlayer = (currentPlayer: number, players: Player[]): number => {
  let next = (currentPlayer + 1) % players.length;
  
  while (players[next] && players[next].eliminated) {
    next = (next + 1) % players.length;
  }
  
  return next;
};

export const checkGameEnd = (players: Player[]): { ended: boolean; winner?: Player } => {
  const activePlayers = players.filter(p => !p.eliminated);
  
  if (activePlayers.length === 1) {
    return { ended: true, winner: activePlayers[0] };
  }
  
  return { ended: false };
};

export const getWinnerByPoints = (players: Player[]): Player => {
  return players.reduce((a, b) => (a.points > b.points ? a : b));
};

