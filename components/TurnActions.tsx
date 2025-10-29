import React from 'react';
import { Player } from '../types';

interface TurnActionsProps {
  players: Player[];
  currentPlayerId: string | number;
  selectedTarget: number | null;
  setSelectedTarget: (target: number) => void;
  guessLetter: string;
  setGuessLetter: (letter: string) => void;
  onAskLetter: () => void;
  onGuessCountry: () => void;
  currentPlayerName: string;
}

export const TurnActions: React.FC<TurnActionsProps> = ({
  players,
  currentPlayerId,
  selectedTarget,
  setSelectedTarget,
  guessLetter,
  setGuessLetter,
  onAskLetter,
  onGuessCountry,
  currentPlayerName
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Tour de {currentPlayerName}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Sélectionnez un adversaire
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {players.map((player) => {
            if (player.id === currentPlayerId || player.eliminated) return null;
            return (
              <button
                key={player.id}
                onClick={() => setSelectedTarget(player.id as number)}
                className={`p-3 rounded-lg font-semibold transition-all ${
                  selectedTarget === player.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {player.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Votre action (1 seule par tour)
        </label>
        <input
          type="text"
          value={guessLetter}
          onChange={(e) => setGuessLetter(e.target.value)}
          placeholder="Entrez UNE lettre OU un pays complet..."
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none uppercase"
          maxLength={20}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onAskLetter}
          disabled={!selectedTarget || !guessLetter || guessLetter.length !== 1}
          className="bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Demander cette lettre
        </button>
        <button
          onClick={onGuessCountry}
          disabled={!selectedTarget || !guessLetter || guessLetter.length < 3}
          className="bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Deviner le pays
        </button>
      </div>
      
      <div className="mt-3 text-sm text-gray-600 text-center">
        💡 Vous avez 1 action par tour : demander UNE lettre OU deviner le pays
      </div>
    </div>
  );
};

