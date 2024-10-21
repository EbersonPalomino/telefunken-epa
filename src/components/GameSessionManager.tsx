import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { GameSession, Player, Contract, PlayerStatus } from '../types';
import { ArrowLeft, Save, Plus, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const GameSessionManager: React.FC = () => {
  const location = useLocation();
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const tableRef = useRef<HTMLDivElement>(null);

  const [session, setSession] = useState<GameSession | null>(() => {
    if (location.state) {
      return location.state as GameSession;
    }
    return null;
  });

  const [playerStatus, setPlayerStatus] = useState<PlayerStatus[]>([]);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [additionalPurchases, setAdditionalPurchases] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (session) {
      calculatePlayerStatus();
    }
  }, [session]);

  const calculatePlayerStatus = () => {
    if (!session) return;
    const totals = session.players.map((_, index) => calculateTotal(index));
    const minTotal = Math.min(...totals);
    const newPlayerStatus = session.players.map((_, index) => {
      const total = totals[index];
      const status = total === minTotal ? 'GANADOR' : 'PERDEDOR';
      
      const uncompletedPurchases = session.contracts[index].filter(contract => !contract.purchase).length;
      const additionalPurchase = additionalPurchases[index] ? 0 : 10;
      const parcialVidas = total - (uncompletedPurchases * 10) - additionalPurchase;
      
      const parcialGanador = status === 'GANADOR' ? 0 : total - minTotal;
      const premio = parcialGanador * session.multiplier;
      return { total, status, parcialVidas, parcialGanador, premio };
    });
    setPlayerStatus(newPlayerStatus);
  };

  const calculateTotal = (playerIndex: number) => {
    if (!session) return 0;
    return session.contracts[playerIndex].reduce((total, contract) => total + contract.score, 0);
  };

  const handleSaveGame = () => {
    if (!session) return;
    const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]') as GameSession[];
    const updatedGames = savedGames.filter(game => game.id !== session.id);
    updatedGames.push(session);
    localStorage.setItem('savedGames', JSON.stringify(updatedGames));
    setSaveMessage('Guardando partida...');
    setTimeout(() => {
      setSaveMessage('Partida guardada exitosamente');
      setTimeout(() => setSaveMessage(null), 3000);
    }, 1000);
  };

  const handleShareImage = async () => {
    if (!tableRef.current) return;

    try {
      const options = {
        backgroundColor: getComputedStyle(document.body).backgroundColor,
        scale: 2,
        useCORS: true,
        logging: false,
      };

      const canvas = await html2canvas(tableRef.current, options);
      
      const whiteCanvas = document.createElement('canvas');
      whiteCanvas.width = canvas.width;
      whiteCanvas.height = canvas.height;
      const ctx = whiteCanvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, whiteCanvas.width, whiteCanvas.height);
        ctx.drawImage(canvas, 0, 0);
      }

      const imageData = whiteCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `telefunken_session_${session?.id}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error al generar la imagen. Por favor, intente nuevamente.');
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1>Error</h1>
        <p className="text-text mb-4">No se pudo cargar la información de la partida.</p>
        <button
          onClick={() => navigate('/create-game')}
          className="btn btn-primary"
        >
          Volver a Crear Partida
        </button>
      </div>
    );
  }

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
        <button
          onClick={handleSaveGame}
          className="btn btn-primary inline-flex items-center"
        >
          <Save size={18} className="mr-2" />
          Guardar Partida
        </button>
        <button
          onClick={handleShareImage}
          className="btn btn-accent inline-flex items-center"
        >
          <Share2 size={18} className="mr-2" />
          Compartir Imagen
        </button>
      </div>
      {saveMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {saveMessage}
        </div>
      )}
      <div ref={tableRef} className="bg-background p-4 rounded-lg">
        <h1>CUADRO DE CONTROL PARTIDA "NRO {session.id}"</h1>
        <div className="mb-4">
          <label className="mr-2 text-text">MULTIPLICADOR: {session.multiplier}</label>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>CONTRATOS</th>
                {session.players.map((player, index) => (
                  <React.Fragment key={player.id}>
                    <th>COMPRAS {player.name}</th>
                    <th>PUNTAJE {player.name}</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {session.contracts[0].map((contract, contractIndex) => (
                <tr key={contract.name}>
                  <td className="font-bold">{contract.name}</td>
                  {session.players.map((_, playerIndex) => (
                    <React.Fragment key={`${playerIndex}-${contractIndex}`}>
                      <td>
                        <input
                          type="checkbox"
                          checked={session.contracts[playerIndex][contractIndex].purchase}
                          onChange={(e) => {
                            const newSession = {...session};
                            newSession.contracts[playerIndex][contractIndex].purchase = e.target.checked;
                            setSession(newSession);
                          }}
                          className="mr-2"
                        />
                        <span>Cas</span>
                      </td>
                      <td className={session.contracts[playerIndex][contractIndex].score === 0 ? 'bg-green-500' : ''}>
                        <input
                          type="number"
                          value={session.contracts[playerIndex][contractIndex].score}
                          onChange={(e) => {
                            const newSession = {...session};
                            newSession.contracts[playerIndex][contractIndex].score = parseInt(e.target.value) || 0;
                            setSession(newSession);
                          }}
                        />
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="font-bold">TOTALES</td>
                {playerStatus.map((status, index) => (
                  <td key={`total-${index}`} colSpan={2} className="font-bold text-center">
                    {status.total}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold">ESTATUS</td>
                {playerStatus.map((status, index) => (
                  <td key={`status-${index}`} colSpan={2} className="font-bold text-center">
                    {status.status}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold">PARCIAL+VIDAS</td>
                {playerStatus.map((status, index) => (
                  <td key={`parcial-vidas-${index}`} colSpan={2} className="text-center">
                    {status.parcialVidas}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold">PARCIAL-GANADOR</td>
                {playerStatus.map((status, index) => (
                  <td key={`parcial-ganador-${index}`} colSpan={2} className="text-center">
                    {status.parcialGanador}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="font-bold">PREMIOS</td>
                {playerStatus.map((status, index) => (
                  <td key={`premio-${index}`} colSpan={2} className="text-center">
                    {status.premio.toFixed(2)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GameSessionManager;