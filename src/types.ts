export interface Player {
  id: string;
  name: string;
}

export interface Contract {
  name: string;
  score: number;
  purchase: boolean;
}

export interface GameSession {
  id: string;
  date: string;
  multiplier: number;
  players: Player[];
  contracts: Contract[][];
}

export interface PlayerStatus {
  total: number;
  status: 'GANADOR' | 'PERDEDOR';
  parcialVidas: number;
  parcialGanador: number;
  premio: number;
}

export interface GameState {
  sessions: GameSession[];
  currentSession: GameSession | null;
}