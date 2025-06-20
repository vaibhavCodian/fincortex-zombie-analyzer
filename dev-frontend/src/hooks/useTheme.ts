import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fincortex-theme') as Theme;
      if (stored) return stored;
      // Default to light theme
      return 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Animate theme transition
    root.classList.add('theme-transition');
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    // Add current theme class
    root.classList.add(theme);
    // Store preference
    localStorage.setItem('fincortex-theme', theme);
    // Remove transition class after animation
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 400);
    return () => clearTimeout(timeout);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
}