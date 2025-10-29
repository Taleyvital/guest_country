import React, { useState } from 'react';
import { GameModeSelector } from './components/GameModeSelector';
import { SoloModeSetup } from './components/SoloModeSetup';
import { LocalModeSetup } from './components/LocalModeSetup';
import { OnlineModeSetup } from './components/OnlineModeSetup';
import { GameHeader } from './components/GameHeader';
import { PlayerCard } from './components/PlayerCard';
import { TurnActions } from './components/TurnActions';
import { useGame } from './hooks/useGame';
import { useOnlineGame } from './hooks/useOnlineGame';
import { useAiLogic } from './hooks/useAiLogic';
import { countLetterOccurrences, findNextPlayer, checkGameEnd, getWinnerByPoints } from './utils/game';
import { Player, GameMode } from './types';

export default function CountryGuessGame() {
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [guessLetter, setGuessLetter] = useState('');
  const [message, setMessage] = useState('');

  const {
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
  } = useGame();

  const {
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
  } = useOnlineGame(gameStarted, players, setPlayers, currentPlayer, setCurrentPlayer, setMessage, setGameStarted);

  const nextTurn = async () => {
    let next = findNextPlayer(currentPlayer, players);
    
    if (players[next] && players[next].skipNextTurn) {
      const updatedPlayers = [...players];
      updatedPlayers[next].skipNextTurn = false;
      setPlayers(updatedPlayers);
      const msg = `${players[next].name} passe son tour (pénalité)`;
      setMessage(msg);
      
      if (gameMode === 'online') {
        await updateOnlineGame({
          players: updatedPlayers,
          currentPlayer: next,
          message: msg
        });
      }
      
      setTimeout(() => nextTurn(), 1500);
      return;
    }

    setCurrentPlayer(next);
    setSelectedTarget(null);
    const msg = `${players[next].name}, c'est à vous !`;
    setMessage(msg);

    if (gameMode === 'online') {
      await updateOnlineGame({
        currentPlayer: next,
        message: msg
      });
    }

    if (gameMode === 'solo' && next === 1 && !players[next].eliminated) {
      aiTurn();
    }
  };

  const { aiTurn } = useAiLogic(
    players,
    setPlayers,
    currentPlayer,
    setCurrentPlayer,
    setMessage,
    aiDifficulty,
    nextTurn
  );

  const askLetter = async () => {
    if (!guessLetter || selectedTarget === null) {
      setMessage('Sélectionnez un joueur et entrez une lettre !');
      return;
    }

    const letter = guessLetter.toUpperCase();
    const target = players[selectedTarget];

    const updatedPlayers = [...players];

    if (target.country.includes(letter)) {
      const count = countLetterOccurrences(target.country, letter);
      updatedPlayers[selectedTarget].discoveredLetters.add(letter);
      setPlayers(updatedPlayers);
      const msg = `✓ OUI ! Il y a ${count} lettre(s) "${letter}" dans le pays de ${target.name}`;
      setMessage(msg);
      
      if (gameMode === 'online') {
        await updateOnlineGame({
          players: updatedPlayers,
          message: msg
        });
      }
    } else {
      setPlayers(updatedPlayers);
      const msg = `✗ NON ! Il n'y a pas de "${letter}" dans le pays de ${target.name}`;
      setMessage(msg);
      
      if (gameMode === 'online') {
        await updateOnlineGame({
          players: updatedPlayers,
          message: msg
        });
      }
    }

    setGuessLetter('');
    setSelectedTarget(null);
    setTimeout(() => nextTurn(), 2000);
  };

  const guessCountry = async () => {
    if (!guessLetter || selectedTarget === null) {
      setMessage('Sélectionnez un joueur et entrez le nom du pays !');
      return;
    }

    const guess = guessLetter.toUpperCase().trim();
    const target = players[selectedTarget];
    const updatedPlayers = [...players];

    if (guess === target.country) {
      updatedPlayers[selectedTarget].eliminated = true;
      updatedPlayers[currentPlayer].points += 1;
      setPlayers(updatedPlayers);
      const msg = `🎉 BRAVO ! ${players[currentPlayer].name} a deviné : ${target.country} !`;
      setMessage(msg);
      
      const { ended, winner } = checkGameEnd(updatedPlayers);
      if (ended && winner) {
        const winMsg = `🏆 ${winner.name} remporte la partie avec ${winner.points} point(s) !`;
        setMessage(winMsg);
        
        if (gameMode === 'online') {
          await updateOnlineGame({
            players: updatedPlayers,
            message: winMsg
          });
        }
        return;
      }
      
      if (gameMode === 'online') {
        await updateOnlineGame({
          players: updatedPlayers,
          message: msg
        });
      }

      setGuessLetter('');
      setSelectedTarget(null);
      setTimeout(() => nextTurn(), 2500);
    } else {
      updatedPlayers[currentPlayer].skipNextTurn = true;
      setPlayers(updatedPlayers);
      const msg = `❌ FAUX ! Ce n'est pas ${guess}. Vous passez votre prochain tour.`;
      setMessage(msg);
      
      if (gameMode === 'online') {
        await updateOnlineGame({
          players: updatedPlayers,
          message: msg
        });
      }

      setGuessLetter('');
      setSelectedTarget(null);
      setTimeout(() => nextTurn(), 2500);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameMode(null);
    setPlayers([]);
    setRoomCode('');
    setSelectedTarget(null);
    setGuessLetter('');
    setMessage('');
  };

  // Game mode selector
  if (!gameMode) {
    return <GameModeSelector onSelectMode={setGameMode} />;
  }

  // Solo mode setup
  if (gameMode === 'solo' && !gameStarted) {
    return (
      <SoloModeSetup
        aiDifficulty={aiDifficulty}
        setAiDifficulty={setAiDifficulty}
        playerCountry={playerCountry}
        setPlayerCountry={setPlayerCountry}
        onStart={() => {
          const msg = initSoloGame();
          setMessage(msg);
        }}
        onBack={() => setGameMode(null)}
      />
    );
  }

  // Local mode setup
  if (gameMode === 'local' && !gameStarted) {
    return (
      <LocalModeSetup
        numPlayers={numPlayers}
        setNumPlayers={setNumPlayers}
        onStart={initLocalGame}
        onBack={() => setGameMode(null)}
      />
    );
  }

  // Online mode setup
  if (gameMode === 'online' && !gameStarted) {
    return (
      <OnlineModeSetup
        playerName={playerName}
        setPlayerName={setPlayerName}
        joinCode={joinCode}
        setJoinCode={setJoinCode}
        onCreateRoom={createRoom}
        onJoinRoom={joinRoom}
        onBack={() => setGameMode(null)}
        roomCode={roomCode}
        isHost={isHost}
        onlinePlayers={onlinePlayers}
        message={message}
        onStartGame={startOnlineGame}
      />
    );
  }

  // Main game
  const activePlayers = players.filter(p => !p.eliminated);
  const currentPlayerData = players[currentPlayer];
  const isMyTurn = gameMode === 'online' 
    ? currentPlayerData?.id === myPlayerId 
    : gameMode === 'solo' 
    ? currentPlayer === 0 
    : true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto">
        <GameHeader
          gameMode={gameMode}
          roomCode={roomCode}
          onQuit={resetGame}
          message={message}
        />

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {players.map((player) => {
            const isMe = gameMode === 'online' 
              ? player.id === myPlayerId 
              : gameMode === 'solo' 
              ? player.id === 0 
              : true;
            
            return (
              <PlayerCard
                key={player.id}
                player={player}
                isMe={isMe}
                isCurrentPlayer={player.id === currentPlayer}
                isAI={player.isAI || false}
              />
            );
          })}
        </div>

        {activePlayers.length > 1 && isMyTurn && (
          <TurnActions
            players={players}
            currentPlayerId={currentPlayerData.id}
            selectedTarget={selectedTarget}
            setSelectedTarget={setSelectedTarget}
            guessLetter={guessLetter}
            setGuessLetter={setGuessLetter}
            onAskLetter={askLetter}
            onGuessCountry={guessCountry}
            currentPlayerName={currentPlayerData.name}
          />
        )}

        {gameMode === 'online' && !isMyTurn && activePlayers.length > 1 && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
            <p className="text-lg text-gray-600">
              En attente du tour de {currentPlayerData?.name}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
