/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        text: 'var(--text)',
        card: 'var(--card)',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(primary|secondary|accent)/,
      variants: ['hover'],
    },
    {
      pattern: /text-(primary|secondary|accent|text)/,
      variants: ['hover'],
    },
    {
      pattern: /ring-(primary|secondary|accent)/,
      variants: ['focus'],
    },
  ],
};