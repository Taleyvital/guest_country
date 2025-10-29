import React from 'react';
import { Globe, Bot, Wifi } from 'lucide-react';
import { GameMode } from '../types';

interface GameHeaderProps {
  gameMode: GameMode;
  roomCode?: string;
  onQuit: () => void;
  message: string;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  gameMode,
  roomCode,
  onQuit,
  message
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Globe className="w-8 h-8 mr-2 text-blue-500" />
          Devinez le Pays !
          {gameMode === 'online' && (
            <span className="ml-3 text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              Salle: {roomCode}
            </span>
          )}
          {gameMode === 'solo' && (
            <span className="ml-3 text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full flex items-center">
              <Bot className="w-4 h-4 mr-1" />
              vs IA
            </span>
          )}
        </h1>
        <button
          onClick={onQuit}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Quitter
        </button>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
      </div>
    </div>
  );
};

