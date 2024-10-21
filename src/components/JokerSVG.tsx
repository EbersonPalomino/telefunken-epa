import React from 'react';

const JokerSVG: React.FC = () => (
  <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#goldGradient)" />
    <text x="10" y="40" fontFamily="Arial" fontSize="36" fill="#8B0000" fontWeight="bold">JOKER</text>
    <g transform="translate(30, 60) scale(0.8)">
      <path d="M120,40 Q140,0 160,40 Q180,0 200,40 Q220,80 200,120 Q180,160 160,120 Q140,160 120,120 Q100,80 120,40 Z" fill="#8B0000" />
      <circle cx="140" cy="70" r="10" fill="white" />
      <circle cx="180" cy="70" r="10" fill="white" />
      <path d="M140,100 Q160,120 180,100" fill="none" stroke="white" strokeWidth="5" />
    </g>
    <g transform="translate(30, 220) scale(0.6)">
      <path d="M100,0 L200,0 L250,100 L200,200 L100,200 L50,100 Z" fill="#006400" />
      <circle cx="150" cy="70" r="20" fill="#FFD700" />
      <rect x="140" y="90" width="20" height="60" fill="#FFD700" />
    </g>
    <text x="290" y="410" fontFamily="Arial" fontSize="36" fill="#8B0000" fontWeight="bold" transform="rotate(180 290,410)">JOKER</text>
  </svg>
);

export default JokerSVG;