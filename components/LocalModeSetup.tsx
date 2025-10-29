import React from 'react';
import { Users } from 'lucide-react';

interface LocalModeSetupProps {
  numPlayers: number;
  setNumPlayers: (num: number) => void;
  onStart: () => void;
  onBack: () => void;
}

export const LocalModeSetup: React.FC<LocalModeSetupProps> = ({
  numPlayers,
  setNumPlayers,
  onStart,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Users className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Multijoueur Local
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Jouez sur le même appareil
        </p>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre de joueurs
          </label>
          <select 
            value={numPlayers}
            onChange={(e) => setNumPlayers(parseInt(e.target.value))}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            {[2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>{n} joueurs</option>
            ))}
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
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-blue-600 hover:to-purple-600"
          >
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
};

