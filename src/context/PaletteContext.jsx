import { createContext, useContext, useState, useEffect } from 'react';
import { PALETTES, DEFAULT_PALETTE_ID, getPalette, applyPaletteToDOM } from '../data/palettes';
import { playClickSound, playTabSound } from '../utils/soundFX';

const PaletteContext = createContext(null);

export function PaletteProvider({ children }) {
  const [paletteId, setPaletteId] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_PALETTE_ID;
    return localStorage.getItem('portfolio-palette') || DEFAULT_PALETTE_ID;
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('portfolio-theme');
    if (stored) return stored;
    return 'dark';
  });

  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [studioMode, setStudioMode] = useState('modal'); // 'modal' | 'full'

  const currentPalette = getPalette(paletteId);

  useEffect(() => {
    applyPaletteToDOM(currentPalette, theme);
    localStorage.setItem('portfolio-palette', paletteId);
    localStorage.setItem('portfolio-theme', theme);

    // Notify non-React or canvas listeners (like Three.js or canvas components)
    window.dispatchEvent(
      new CustomEvent('portfolio:palette-change', {
        detail: { palette: currentPalette, theme },
      })
    );
  }, [paletteId, currentPalette, theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      playTabSound();
      return next;
    });
  };

  const setPaletteById = (id) => {
    if (id === paletteId) return;
    setPaletteId(id);
    playTabSound();
  };

  const openStudio = (mode = 'modal') => {
    setStudioMode(mode);
    setIsStudioOpen(true);
    playClickSound();
  };

  const closeStudio = () => {
    setIsStudioOpen(false);
  };

  const toggleStudio = () => {
    setIsStudioOpen(prev => !prev);
    playClickSound();
  };

  return (
    <PaletteContext.Provider
      value={{
        palettes: PALETTES,
        currentPalette,
        paletteId,
        setPaletteById,
        theme,
        setTheme,
        toggleTheme,
        isStudioOpen,
        studioMode,
        setStudioMode,
        openStudio,
        closeStudio,
        toggleStudio,
      }}
    >
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
}
