export const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export interface GameData {
  host: string;
  players: any[];
  currentPlayer: number;
  started: boolean;
  message: string;
}

export const saveGame = async (roomCode: string, gameData: GameData): Promise<void> => {
  // Utiliser localStorage comme fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(`room:${roomCode}`, JSON.stringify(gameData));
  }
  
  // Essayer l'API window.storage si disponible
  if (window.storage) {
    await window.storage.set(`room:${roomCode}`, JSON.stringify(gameData), true);
  }
};

export const loadGame = async (roomCode: string): Promise<GameData | null> => {
  try {
    // Essayer d'abord localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`room:${roomCode}`);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    
    // Essayer l'API window.storage si disponible
    if (window.storage) {
      const result = await window.storage.get(`room:${roomCode}`, true);
      if (result) {
        return JSON.parse(result.value);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error loading game:', error);
    return null;
  }
};

