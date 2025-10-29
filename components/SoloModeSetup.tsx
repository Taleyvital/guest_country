import React from 'react';
import { Bot } from 'lucide-react';
import { AiDifficulty } from '../types';

interface SoloModeSetupProps {
  aiDifficulty: AiDifficulty;
  setAiDifficulty: (difficulty: AiDifficulty) => void;
  playerCountry: string;
  setPlayerCountry: (country: string) => void;
  onStart: () => void;
  onBack: () => void;
}

export const SoloModeSetup: React.FC<SoloModeSetupProps> = ({
  aiDifficulty,
  setAiDifficulty,
  playerCountry,
  setPlayerCountry,
  onStart,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-emerald-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Bot className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Contre l'IA
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Affrontez l'intelligence artificielle
        </p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Choisissez votre pays à faire deviner
          </label>
          <input
            type="text"
            value={playerCountry}
            onChange={(e) => setPlayerCountry(e.target.value.toUpperCase())}
            placeholder="Ex: FRANCE, ALLEMAGNE, ESPAGNE..."
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none uppercase"
            maxLength={20}
          />
          <p className="text-xs text-gray-500 mt-1">
            Sélectionnez un pays de la liste
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Difficulté de l'IA
          </label>
          <select 
            value={aiDifficulty}
            onChange={(e) => setAiDifficulty(e.target.value as AiDifficulty)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
          >
            <option value="easy">Facile (aléatoire)</option>
            <option value="medium">Moyen (stratégique)</option>
            <option value="hard">Difficile (expert)</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400"
          >
            Retour
          </button>
          <button
            onClick={onStart}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
          >
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
};

