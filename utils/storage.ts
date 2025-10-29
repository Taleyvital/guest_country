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
  await window.storage.set(`room:${roomCode}`, JSON.stringify(gameData), true);
};

export const loadGame = async (roomCode: string): Promise<GameData | null> => {
  try {
    const result = await window.storage.get(`room:${roomCode}`, true);
    if (!result) return null;
    return JSON.parse(result.value);
  } catch (error) {
    console.error('Error loading game:', error);
    return null;
  }
};

