import React, { useState } from 'react';
import { Globe, Users, Trophy, HelpCircle, Wifi, Bot } from 'lucide-react';
import { GameMode } from '../types';

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Globe className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Devinez le Pays !
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choisissez votre mode de jeu
        </p>

        <div className="space-y-4">
          <button
            onClick={() => onSelectMode('solo')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <Bot className="w-6 h-6 mr-2" />
            Jouer contre l'IA
          </button>

          <button
            onClick={() => onSelectMode('local')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <Users className="w-6 h-6 mr-2" />
            Multijoueur Local
          </button>

          <button
            onClick={() => onSelectMode('online')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <Wifi className="w-6 h-6 mr-2" />
            Multijoueur en ligne
          </button>
        </div>

        <button
          onClick={() => setShowRules(!showRules)}
          className="w-full mt-6 flex items-center justify-center text-gray-600 hover:text-gray-800"
        >
          <HelpCircle className="w-5 h-5 mr-2" />
          {showRules ? 'Masquer les règles' : 'Voir les règles'}
        </button>

        {showRules && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
            <h3 className="font-bold mb-2">🎯 Règles du jeu</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Chaque joueur a un pays secret</li>
              <li>À votre tour, vous avez 1 seule action</li>
              <li>Action 1 : Demander UNE lettre à un adversaire</li>
              <li>Action 2 : Tenter de deviner le pays d'un adversaire</li>
              <li>Après votre action, le tour passe au joueur suivant</li>
              <li>Deviner correct = +1 point et élimination de l'adversaire</li>
              <li>Deviner faux = vous passez votre prochain tour (pénalité)</li>
              <li>Le dernier en jeu ou celui avec le plus de points gagne !</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

