import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Settings } from 'lucide-react';
import JokerSVG from './JokerSVG';

interface LoginProps {
  setUser: (user: string) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setUser(username);
      navigate('/create-game');
    } else {
      setError('Por favor, ingrese un nombre de usuario y contraseña.');
    }
  };

  const handleRegister = () => {
    if (username.trim() && password.trim()) {
      setUser(username);
      navigate('/create-game');
    } else {
      setError('Por favor, ingrese un nombre de usuario y contraseña para registrarse.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-4xl sm:text-6xl font-bold text-text mb-8 shadow-text">TELEFUNKEN</h1>
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8">
          <div className="w-16 h-24 sm:w-24 sm:h-36 bg-white rounded-lg shadow-2xl transform hover:scale-110 transition-transform duration-300 flex items-center justify-center text-2xl sm:text-4xl font-bold text-red-600">♠</div>
          <div className="w-16 h-24 sm:w-24 sm:h-36 bg-white rounded-lg shadow-2xl transform hover:scale-110 transition-transform duration-300 flex items-center justify-center text-2xl sm:text-4xl font-bold text-black">♣</div>
          <div className="w-16 h-24 sm:w-24 sm:h-36 bg-white rounded-lg shadow-2xl transform hover:scale-110 transition-transform duration-300 flex items-center justify-center text-2xl sm:text-4xl font-bold text-red-600">♥</div>
          <div className="w-16 h-24 sm:w-24 sm:h-36 bg-white rounded-lg shadow-2xl transform hover:scale-110 transition-transform duration-300 flex items-center justify-center">
            <JokerSVG />
          </div>
        </div>
      </div>
      <div className="card w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl mb-6 text-center font-bold text-text">
          {isRegistering ? 'Registrar Usuario' : 'Iniciar Sesión'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text text-sm font-bold mb-2" htmlFor="username">
              Nombre de Usuario
            </label>
            <input
              className="input"
              id="username"
              type="text"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-text text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="input"
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex-col-mobile items-center justify-between">
            {isRegistering ? (
              <button
                type="button"
                onClick={handleRegister}
                className="btn btn-secondary w-full sm:w-auto mb-2 sm:mb-0"
              >
                Registrar
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto mb-2 sm:mb-0"
              >
                Entrar
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setPassword('');
              }}
              className="btn btn-accent inline-flex items-center w-full sm:w-auto"
            >
              <UserPlus size={18} className="mr-2" />
              {isRegistering ? 'Volver al Login' : 'Registrar Usuario'}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button onClick={() => navigate('/tutorial')} className="btn btn-secondary">Tutorial</button>
        <button onClick={() => navigate('/historia')} className="btn btn-secondary">Historia</button>
        <button onClick={() => navigate('/configuration')} className="btn btn-secondary">Configuración</button>
      </div>
    </div>
  );
};

export default Login;