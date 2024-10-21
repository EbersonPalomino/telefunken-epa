import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Historia: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-text p-8">
      <button
        onClick={() => navigate('/')}
        className="btn btn-secondary mb-4 inline-flex items-center"
      >
        <ArrowLeft size={18} className="mr-2" />
        Volver al Menú
      </button>
      <h1 className="text-4xl font-bold mb-6">Historia del Telefunken</h1>
      {/* Contenido de la historia */}
    </div>
  );
};

export default Historia;