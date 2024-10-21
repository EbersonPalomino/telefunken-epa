import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, X, FolderOpen } from 'lucide-react';
import { GameSession } from '../types';

interface CreateGameProps {
  user: string;
}

const gameTypes = [
  { id: 'ESTANDAR', name: 'ESTANDAR', contracts: ['1 TRIO', '2 TRIOS', '1 CUARTETO', '2 CUARTETOS', '1 QUINTA', '2 QUINTAS', 'ESCALERA'] },
  { id: 'AVANZADO', name: 'AVANZADO', contracts: ['1 TRIO', '2 TRIOS', '1 CUARTETO', '2 CUARTETOS', '1 QUINTA', '2 QUINTAS', 'ESCALERA', 'FULL COLOR'] },
  { id: 'VELOZ', name: 'VELOZ', contracts: ['2 TRIOS','2 CUARTETOS', '2 QUINTAS', 'ESCALERA',] },
];

const CreateGame: React.FC<CreateGameProps> = ({ user }) => {
  const [gameType, setGameType] = useState(gameTypes[0].id);
  const [multiplier, setMultiplier] = useState(0.04);
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [savedGames, setSavedGames] = useState<GameSession[]>([]);
  const [showSavedGames, setShowSavedGames] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedGames = JSON.parse(localStorage.getItem('savedGames') || '[]') as GameSession[];
    setSavedGames(loadedGames);
  }, [user]);

  const handleAddPlayer = () => {
    if (newPlayer.trim() && !players.includes(newPlayer.trim())) {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const handleRemovePlayer = (player: string) => {
    setPlayers(players.filter(p => p !== player));
  };

  const handleCreateGame = () => {
    if (players.length < 1) {
      setMessage('Se necesitan al menos 2 jugadores para iniciar una partida.');
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    const gameId = Date.now().toString();
    const selectedGameType = gameTypes.find(type => type.id === gameType);
    if (!selectedGameType) {
      setMessage('Tipo de juego no válido');
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    const newGame: GameSession = {
      id: gameId,
      date: new Date().toISOString().split('T')[0],
      multiplier,
      players: [user, ...players].map(name => ({ id: Date.now().toString() + Math.random(), name })),
      contracts: [user, ...players].map(() => 
        selectedGameType.contracts.map(name => ({ name, score: 0, purchase: false }))
      ),
    };
    navigate(`/game/${gameId}`, { state: newGame });
  };

  const handleOpenSavedGame = () => {
    setShowSavedGames(!showSavedGames);
  };

  const handleSelectSavedGame = (game: GameSession) => {
    navigate(`/game/${game.id}`, { state: game });
  };

  return (
    <div className="container">
      <div className="btn-group">
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary inline-flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Volver al Login
        </button>
      </div>
      <h1>Crear Nueva Partida</h1>
      {message && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {message}
        </div>
      )}
      <div className="card max-w-2xl mx-auto">
        <div className="mb-4">
          <button
            onClick={handleOpenSavedGame}
            className="btn btn-accent inline-flex items-center w-full"
          >
            <FolderOpen size={18} className="mr-2" />
            {showSavedGames ? 'Ocultar Partidas Guardadas' : 'Abrir Partida Guardada'}
          </button>
        </div>
        {showSavedGames && (
          <div className="mb-4">
            <h2>Partidas Guardadas</h2>
            {savedGames.length > 0 ? (
              <ul className="space-y-2">
                {savedGames.map((game) => (
                  <li key={game.id} className="bg-card p-2 rounded">
                    <button
                      onClick={() => handleSelectSavedGame(game)}
                      className="w-full text-left"
                    >
                      <p>Fecha: {game.date}</p>
                      <p>Jugadores: {game.players.map(p => p.name).join(', ')}</p>
                      <p>Multiplicador: {game.multiplier}</p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se encontraron partidas guardadas</p>
            )}
          </div>
        )}
        <div className="grid-cols-1-2">
          <div>
            <label className="block text-text text-sm font-bold mb-2">
              Tipo de Juego
            </label>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
              className="input"
            >
              {gameTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-text text-sm font-bold mb-2">
              Multiplicador
            </label>
            <input
              type="number"
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
              step="0.01"
              className="input"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-text text-sm font-bold mb-2">
            Jugadores
          </label>
          <ul className="mb-2 space-y-2">
            <li className="flex justify-between items-center bg-card p-2 rounded">
              <span>{user} (Tú)</span>
            </li>
            {players.map(player => (
              <li key={player} className="flex justify-between items-center bg-card p-2 rounded">
                <span>{player}</span>
                <button
                  onClick={() => handleRemovePlayer(player)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex-col-mobile">
            <input
              type="text"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              placeholder="Nombre del jugador"
              className="input mb-2 sm:mb-0 sm:mr-2"
            />
            <button
              onClick={handleAddPlayer}
              className="btn btn-secondary inline-flex items-center"
            >
              <UserPlus size={18} className="mr-2" />
              Agregar
            </button>
          </div>
        </div>
        <button
          onClick={handleCreateGame}
          className="btn btn-primary w-full"
          disabled={players.length < 1}
        >
          Crear Partida
        </button>
      </div>
    </div>
  );
};

export default CreateGame;