import { useState, useEffect } from 'react';
import { Player } from '../types';
import { generateRoomCode, saveGame, loadGame } from '../utils/storage';
import { PAYS } from '../constants';

export const useOnlineGame = (
  gameStarted: boolean,
  players: Player[],
  setPlayers: (players: Player[]) => void,
  currentPlayer: number,
  setCurrentPlayer: (player: number) => void,
  setMessage: (msg: string) => void,
  setGameStarted: (started: boolean) => void
) => {
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [onlinePlayers, setOnlinePlayers] = useState<any[]>([]);
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);

  const loadOnlineGame = async () => {
    if (!roomCode) return;

    try {
      const gameData = await loadGame(roomCode);
      if (!gameData) return;

      setOnlinePlayers(gameData.players);
      setPlayers(gameData.players.map((p: any) => ({
        ...p,
        discoveredLetters: new Set(p.discoveredLetters || [])
      })));
      setCurrentPlayer(gameData.currentPlayer);
      setMessage(gameData.message);
      setGameStarted(gameData.started);
    } catch (error) {
      console.error('Erreur de chargement:', error);
    }
  };

  useEffect(() => {
    if (roomCode) {
      loadOnlineGame();
    }
  }, [roomCode]);

  useEffect(() => {
    if (gameStarted && roomCode) {
      const interval = setInterval(loadOnlineGame, 2000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, roomCode]);

  const createRoom = async () => {
    if (!playerName.trim()) {
      setMessage('Entrez votre nom !');
      return;
    }

    const code = generateRoomCode();
    const country = PAYS[Math.floor(Math.random() * PAYS.length)];
    const playerId = Date.now().toString();
    
    const gameData = {
      host: playerId,
      players: [{
        id: playerId,
        name: playerName,
        country: country,
        letterCount: country.length,
        discoveredLetters: [],
        eliminated: false,
        points: 0,
        skipNextTurn: false
      }],
      currentPlayer: 0,
      started: false,
      message: `En attente de joueurs... Code: ${code}`
    };

    try {
      await saveGame(code, gameData);
      setRoomCode(code);
      setIsHost(true);
      setMyPlayerId(playerId);
      setMessage(`Salle créée ! Partagez le code: ${code}`);
    } catch (error) {
      console.error('Erreur lors de la création de la salle:', error);
      setMessage(`Erreur lors de la création de la salle: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  };

  const joinRoom = async () => {
    if (!playerName.trim() || !joinCode.trim()) {
      setMessage('Entrez votre nom et le code de la salle !');
      return;
    }

    try {
      const gameData = await loadGame(joinCode.toUpperCase());
      if (!gameData) {
        setMessage('Salle introuvable !');
        return;
      }

      if (gameData.started) {
        setMessage('La partie a déjà commencé !');
        return;
      }

      const country = PAYS[Math.floor(Math.random() * PAYS.length)];
      const playerId = Date.now().toString();
      
      gameData.players.push({
        id: playerId,
        name: playerName,
        country: country,
        letterCount: country.length,
        discoveredLetters: [],
        eliminated: false,
        points: 0,
        skipNextTurn: false
      });

      gameData.message = `${playerName} a rejoint la partie !`;

      await saveGame(joinCode.toUpperCase(), gameData);
      setRoomCode(joinCode.toUpperCase());
      setIsHost(false);
      setMyPlayerId(playerId);
      setMessage('Vous avez rejoint la salle !');
    } catch (error) {
      setMessage('Erreur lors de la connexion');
    }
  };

  const startOnlineGame = async () => {
    if (!isHost) return;
    if (onlinePlayers.length < 2) {
      setMessage('Attendez au moins 2 joueurs !');
      return;
    }

    try {
      const gameData = await loadGame(roomCode);
      if (!gameData) return;
      
      gameData.started = true;
      gameData.message = `${gameData.players[0].name}, c'est à vous !`;
      
      await saveGame(roomCode, gameData);
      setGameStarted(true);
    } catch (error) {
      setMessage('Erreur lors du démarrage');
    }
  };

  const updateOnlineGame = async (updates: any) => {
    try {
      const gameData = await loadGame(roomCode);
      if (!gameData) return;
      
      Object.assign(gameData, updates);
      gameData.players = gameData.players.map(p => ({
        ...p,
        discoveredLetters: Array.from(p.discoveredLetters || [])
      }));

      await saveGame(roomCode, gameData);
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
    }
  };

  return {
    roomCode,
    setRoomCode,
    joinCode,
    setJoinCode,
    isHost,
    playerName,
    setPlayerName,
    onlinePlayers,
    myPlayerId,
    createRoom,
    joinRoom,
    startOnlineGame,
    updateOnlineGame
  };
};

