import React from 'react';
import { Bot, Users, Trophy } from 'lucide-react';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  isMe: boolean;
  isCurrentPlayer: boolean;
  isAI: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isMe,
  isCurrentPlayer,
  isAI
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-5 transition-all ${
        isCurrentPlayer ? 'ring-4 ring-yellow-400' : ''
      } ${player.eliminated ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {isAI ? (
            <Bot className="w-6 h-6 mr-2 text-green-500" />
          ) : (
            <Users className="w-6 h-6 mr-2 text-purple-500" />
          )}
          <h3 className="text-xl font-bold text-gray-800">{player.name}</h3>
          {player.eliminated && (
            <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
              Éliminé
            </span>
          )}
          {isMe && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
              Vous
            </span>
          )}
        </div>
        <div className="flex items-center">
          <Trophy className="w-5 h-5 mr-1 text-yellow-500" />
          <span className="font-bold text-gray-700">{player.points}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Nom du pays :</p>
        <div className="flex gap-1 flex-wrap justify-center">
          {player.country.split('').map((char, i) => {
            const isDiscovered = player.discoveredLetters.has(char);
            return (
              <div 
                key={i} 
                className={`w-8 h-10 rounded flex items-center justify-center font-mono font-bold transition-all ${
                  isDiscovered 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isDiscovered ? char : '?'}
              </div>
            );
          })}
        </div>
      </div>

      {player.discoveredLetters.size > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-1">Lettres découvertes :</p>
          <div className="flex flex-wrap gap-1">
            {Array.from(player.discoveredLetters).map(letter => (
              <span key={letter} className="px-2 py-1 bg-green-100 text-green-700 rounded font-mono text-xs">
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}

      {isMe && !isAI && (
        <div className="mt-3 p-2 bg-yellow-50 rounded text-sm font-semibold text-yellow-700">
          🎮 Votre pays : {player.country}
        </div>
      )}
    </div>
  );
};

