import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateGame from './components/CreateGame';
import GameSessionManager from './components/GameSessionManager';
import Tutorial from './components/Tutorial';
import Historia from './components/Historia';
import Configuration from './components/Configuration';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [language, setLanguage] = useState('es');
  const [style, setStyle] = useState('dark');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    const savedStyle = localStorage.getItem('style') || 'dark';
    setLanguage(savedLanguage);
    setStyle(savedStyle);
    document.documentElement.setAttribute('data-theme', savedStyle);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleStyleChange = (newStyle: string) => {
    setStyle(newStyle);
    document.documentElement.setAttribute('data-theme', newStyle);
    localStorage.setItem('style', newStyle);
  };

  return (
    <Router>
      <div className={`min-h-screen bg-background text-text ${style}`}>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route 
            path="/create-game" 
            element={user ? <CreateGame user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/game/:gameId" 
            element={<GameSessionManager />} 
          />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/configuration" element={<Configuration onLanguageChange={handleLanguageChange} onStyleChange={handleStyleChange} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;