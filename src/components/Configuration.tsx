import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun } from 'lucide-react';

interface ConfigurationProps {
  onLanguageChange: (lang: string) => void;
  onStyleChange: (style: string) => void;
}

const Configuration: React.FC<ConfigurationProps> = ({ onLanguageChange, onStyleChange }) => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('es');
  const [style, setStyle] = useState('dark');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    const savedStyle = localStorage.getItem('style') || 'dark';
    setLanguage(savedLanguage);
    setStyle(savedStyle);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    onLanguageChange(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleStyleChange = () => {
    const newStyle = style === 'dark' ? 'light' : 'dark';
    setStyle(newStyle);
    onStyleChange(newStyle);
    localStorage.setItem('style', newStyle);
  };

  return (
    <div className="min-h-screen bg-background text-text p-8">
      <button
        onClick={() => navigate('/')}
        className="btn btn-secondary mb-4 inline-flex items-center"
      >
        <ArrowLeft size={18} className="mr-2" />
        Volver al Menú
      </button>
      <h1 className="text-4xl font-bold mb-6">Configuración</h1>
      {/* Contenido de la configuración */}
    </div>
  );
};

export default Configuration;