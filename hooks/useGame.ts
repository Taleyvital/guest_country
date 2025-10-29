import { useState } from 'react';
import { Player, GameMode, AiDifficulty } from '../types';
import { PAYS } from '../constants';
import { getRandomCountry } from '../utils/game';

export const useGame = () => {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [aiDifficulty, setAiDifficulty] = useState<AiDifficulty>('medium');
  const [playerCountry, setPlayerCountry] = useState('');

  const initLocalGame = () => {
    const newPlayers: Player[] = [];
    for (let i = 0; i < numPlayers; i++) {
      const country = getRandomCountry();
      newPlayers.push({
        id: i,
        name: `Joueur ${i + 1}`,
        country: country,
        letterCount: country.length,
        discoveredLetters: new Set(),
        eliminated: false,
        points: 0,
        skipNextTurn: false
      });
    }
    setPlayers(newPlayers);
    setGameStarted(true);
    setCurrentPlayer(0);
  };

  const initSoloGame = () => {
    // Utiliser le pays choisi par le joueur ou un pays aléatoire
    const selectedCountry = playerCountry.trim() || getRandomCountry();
    const aiCountry = getRandomCountry();
    
    const newPlayers: Player[] = [
      {
        id: 0,
        name: 'Vous',
        country: selectedCountry,
        letterCount: selectedCountry.length,
        discoveredLetters: new Set(),
        eliminated: false,
        points: 0,
        skipNextTurn: false,
        isAI: false
      },
      {
        id: 1,
        name: '🤖 IA',
        country: aiCountry,
        letterCount: aiCountry.length,
        discoveredLetters: new Set(),
        eliminated: false,
        points: 0,
        skipNextTurn: false,
        isAI: true,
        knownLetters: new Set(),
        triedLetters: new Set()
      }
    ];
    
    setPlayers(newPlayers);
    setGameStarted(true);
    setCurrentPlayer(0);
    // Retourne un message initial
    return 'C\'est à vous de jouer !';
  };

  return {
    gameMode,
    setGameMode,
    gameStarted,
    setGameStarted,
    numPlayers,
    setNumPlayers,
    players,
    setPlayers,
    currentPlayer,
    setCurrentPlayer,
    aiDifficulty,
    setAiDifficulty,
    playerCountry,
    setPlayerCountry,
    initLocalGame,
    initSoloGame
  };
};

