import { useState, useEffect } from 'react';
import { Player, AiDifficulty } from '../types';
import { shouldAiGuess, getPossibleCountries, getAiLetterChoice, getAvailableLetters } from '../utils/ai';
import { countLetterOccurrences, findNextPlayer } from '../utils/game';
import { PAYS } from '../constants';

export const useAiLogic = (
  players: Player[],
  setPlayers: (players: Player[]) => void,
  currentPlayer: number,
  setCurrentPlayer: (player: number) => void,
  setMessage: (msg: string) => void,
  difficulty: AiDifficulty,
  nextTurn: () => void
) => {
  const aiTurn = () => {
    setTimeout(() => {
      const ai = players[1];
      const target = players[0];
      
      const shouldGuess = shouldAiGuess(ai, target, difficulty);

      if (shouldGuess && ai.discoveredLetters.size > 3) {
        const possibleCountries = getPossibleCountries(target, ai);

        if (possibleCountries.length > 0) {
          const guess = possibleCountries[Math.floor(Math.random() * possibleCountries.length)];
          
          if (guess === target.country) {
            const updatedPlayers = [...players];
            updatedPlayers[0].eliminated = true;
            updatedPlayers[1].points += 1;
            setPlayers(updatedPlayers);
            setMessage(`🤖 L'IA a deviné votre pays : ${target.country} ! L'IA gagne !`);
            return;
          } else {
            const updatedPlayers = [...players];
            updatedPlayers[1].skipNextTurn = true;
            setPlayers(updatedPlayers);
            setMessage(`🤖 L'IA a tenté ${guess} mais c'est faux ! Elle passe son tour.`);
            setTimeout(() => nextTurn(), 2000);
            return;
          }
        }
      }

      const availableLetters = getAvailableLetters(ai);
      if (availableLetters.length === 0) {
        setMessage('L\'IA n\'a plus de lettres à essayer !');
        setTimeout(() => nextTurn(), 1500);
        return;
      }

      const letter = getAiLetterChoice(availableLetters, difficulty);

      const updatedPlayers = [...players];
      updatedPlayers[1].triedLetters = updatedPlayers[1].triedLetters || new Set();
      updatedPlayers[1].triedLetters.add(letter);

      if (target.country.includes(letter)) {
        const count = countLetterOccurrences(target.country, letter);
        updatedPlayers[1].discoveredLetters.add(letter);
        updatedPlayers[0].discoveredLetters.add(letter);
        setPlayers(updatedPlayers);
        setMessage(`🤖 L'IA demande "${letter}" - OUI ! Il y en a ${count}`);
      } else {
        setPlayers(updatedPlayers);
        setMessage(`🤖 L'IA demande "${letter}" - NON !`);
      }

      setTimeout(() => nextTurn(), 2000);
    }, 1500);
  };

  return { aiTurn };
};

