import React, { useState } from 'react';
import { Wifi, Copy, Check } from 'lucide-react';

interface OnlineModeSetupProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  joinCode: string;
  setJoinCode: (code: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
  onBack: () => void;
  roomCode: string;
  isHost: boolean;
  onlinePlayers: any[];
  message: string;
  onStartGame: () => void;
}

export const OnlineModeSetup: React.FC<OnlineModeSetupProps> = ({
  playerName,
  setPlayerName,
  joinCode,
  setJoinCode,
  onCreateRoom,
  onJoinRoom,
  onBack,
  roomCode,
  isHost,
  onlinePlayers,
  message,
  onStartGame
}) => {
  const [copied, setCopied] = useState(false);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Wifi className="w-16 h-16 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Multijoueur en ligne
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Jouez avec vos amis à distance
        </p>

        {!roomCode ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Votre nom
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Entrez votre nom"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                maxLength={20}
              />
            </div>

            <button
              onClick={onCreateRoom}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-red-600"
            >
              Créer une salle
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OU</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Code de la salle
              </label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Entrez le code"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none uppercase"
                maxLength={6}
              />
            </div>

            <button
              onClick={onJoinRoom}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 rounded-lg hover:from-blue-600 hover:to-purple-600"
            >
              Rejoindre une salle
            </button>

            <button
              onClick={onBack}
              className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400"
            >
              Retour
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Code de la salle :</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-orange-600">{roomCode}</p>
                <button
                  onClick={copyRoomCode}
                  className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Joueurs dans la salle ({onlinePlayers.length}) :
              </p>
              <div className="space-y-2">
                {onlinePlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <span className="font-medium text-gray-800">{player.name}</span>
                    {player.id === onlinePlayers[0].id && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Hôte</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-gray-700">{message}</p>
            </div>

            {isHost ? (
              <button
                onClick={onStartGame}
                disabled={onlinePlayers.length < 2}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Démarrer la partie
              </button>
            ) : (
              <div className="text-center text-gray-600">
                En attente que l'hôte démarre la partie...
              </div>
            )}
          </div>
        )}

        {message && !roomCode && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

