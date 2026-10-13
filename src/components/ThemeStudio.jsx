import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  X, 
  Check, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Layers, 
  Eye, 
  Zap,
  Sun,
  Moon
} from 'lucide-react';
import { usePalette } from '../context/PaletteContext';
import { playClickSound, playHoverSound } from '../utils/soundFX';

export default function ThemeStudio() {
  const { 
    palettes, 
    currentPalette, 
    paletteId, 
    setPaletteById, 
    theme,
    toggleTheme,
    isStudioOpen, 
    studioMode, 
    setStudioMode, 
    closeStudio, 
    toggleStudio 
  } = usePalette();

  const [hoveredPalette, setHoveredPalette] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Keyboard shortcut: Press 'C' or 'c' to toggle Color Studio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      if (e.key === 'c' || e.key === 'C') {
        toggleStudio();
      } else if (e.key === 'Escape' && isStudioOpen) {
        closeStudio();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStudioOpen, toggleStudio, closeStudio]);

  const handleSelectPalette = (id, name) => {
    setPaletteById(id);
    setToastMessage(`Switched to ${name}!`);
    setTimeout(() => setToastMessage(''), 2400);
  };

  const previewTarget = hoveredPalette || currentPalette;

  return (
    <>
      {/* ─── Floating Trigger Button (Bottom Right) ─── */}
      <div className="theme-studio-trigger-wrap" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 90 }}>
        <motion.button
          onClick={() => toggleStudio()}
          onMouseEnter={playHoverSound}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="theme-studio-trigger-btn"
          aria-label="Open Color Palette Studio"
          title="Open Color Studio (Press 'C')"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '11px 18px',
            borderRadius: '9999px',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-accent)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), var(--shadow-accent)',
            backdropFilter: 'blur(16px)',
            cursor: 'pointer',
            fontSize: '0.86rem',
            fontWeight: 600,
            transition: 'all 0.25s ease',
          }}
        >
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${currentPalette.accent}, ${currentPalette.accentLight})`,
              boxShadow: `0 0 10px ${currentPalette.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Palette size={11} color={currentPalette.accentContrast} />
          </div>
          <span>Color Studio</span>
          <span
            style={{
              fontSize: '0.72rem',
              padding: '2px 7px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            [C]
          </span>
        </motion.button>
      </div>

      {/* ─── Toast Feedback ─── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '24px',
              zIndex: 100,
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-accent)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              color: 'var(--accent)',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Sparkles size={16} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Theme Studio Modal / Fullscreen Page ─── */}
      <AnimatePresence>
        {isStudioOpen && (
          <motion.div
            className="theme-studio-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStudio}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.78)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: studioMode === 'full' ? '0' : '20px',
              overflowY: 'auto',
            }}
          >
            <motion.div
              className={`theme-studio-container ${studioMode === 'full' ? 'full-page' : 'modal-dialog'}`}
              initial={studioMode === 'full' ? { opacity: 0, scale: 0.98 } : { opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: studioMode === 'full' ? '100vw' : 'min(1100px, 95vw)',
                height: studioMode === 'full' ? '100vh' : 'min(860px, 92vh)',
                borderRadius: studioMode === 'full' ? '0' : '24px',
                backgroundColor: 'var(--bg-primary)',
                border: studioMode === 'full' ? 'none' : '1px solid var(--border-accent)',
                boxShadow: '0 24px 80px rgba(0, 0, 0, 0.8), var(--shadow-accent)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Studio Header */}
              <div
                style={{
                  padding: '20px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-secondary)',
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: `linear-gradient(135deg, ${currentPalette.accent}, ${currentPalette.accentLight})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 16px ${currentPalette.accentGlow}`,
                    }}
                  >
                    <Palette size={20} color={currentPalette.accentContrast} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      Palette Studio & Color Lab
                      <span
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '999px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: 'var(--accent)',
                          fontWeight: 600,
                          border: '1px solid var(--border-accent)',
                        }}
                      >
                        60-30-10 Rule
                      </span>
                    </h2>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                      Switch between curated themes in real time with live 3D & canvas reactive rendering.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Theme Mode Toggle (Dark vs Light) */}
                  <button
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {theme === 'dark' ? <Sun size={15} style={{ color: 'var(--accent)' }} /> : <Moon size={15} style={{ color: 'var(--accent)' }} />}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>

                  {/* Mode Toggle (Full Page vs Modal) */}
                  <button
                    onClick={() => {
                      setStudioMode(studioMode === 'full' ? 'modal' : 'full');
                      playClickSound();
                    }}
                    title={studioMode === 'full' ? 'Restore window size' : 'Expand to dedicated full page'}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      borderRadius: '10px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {studioMode === 'full' ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                    <span>{studioMode === 'full' ? 'Window Mode' : 'Dedicated Page'}</span>
                  </button>

                  {/* Close button */}
                  <button
                    onClick={closeStudio}
                    aria-label="Close Color Studio"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      borderRadius: '10px',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* 60-30-10 Rule Explainer Bar */}
              <div
                style={{
                  padding: '12px 28px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  flexWrap: 'wrap',
                  fontSize: '0.82rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={15} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Golden Rule of Balance:</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: currentPalette.dominant, border: '1px solid #444', display: 'inline-block' }} />
                  <strong style={{ color: 'var(--text-primary)' }}>60% Canvas:</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Background & ambient atmosphere</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: currentPalette.secondary, border: '1px solid #444', display: 'inline-block' }} />
                  <strong style={{ color: 'var(--text-primary)' }}>30% Secondary:</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Cards & structural typography</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: currentPalette.accent, display: 'inline-block', boxShadow: `0 0 6px ${currentPalette.accent}` }} />
                  <strong style={{ color: 'var(--accent)' }}>10% Accent:</strong>
                  <span style={{ color: 'var(--text-muted)' }}>Buttons, 3D wireframes, badges & CTAs</span>
                </div>
              </div>

              {/* Studio Body: Split View (Presets List + Live Showcase Canvas) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: studioMode === 'full' ? '1.2fr 1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '24px',
                  padding: '28px',
                  overflowY: 'auto',
                  flex: 1,
                }}
              >
                {/* Left Column: Preset Palettes Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      Curated Palettes ({palettes.length})
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Click any card to apply live
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                      gap: '14px',
                    }}
                  >
                    {palettes.map((p) => {
                      const isActive = p.id === paletteId;
                      return (
                        <motion.div
                          key={p.id}
                          whileHover={{ y: -3, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectPalette(p.id, p.name)}
                          onMouseEnter={() => {
                            setHoveredPalette(p);
                            playHoverSound();
                          }}
                          onMouseLeave={() => setHoveredPalette(null)}
                          style={{
                            padding: '16px',
                            borderRadius: '16px',
                            backgroundColor: isActive ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                            border: isActive ? `2px solid ${p.accent}` : '1px solid var(--border)',
                            boxShadow: isActive ? `0 8px 24px ${p.accentGlow}` : 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            position: 'relative',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {/* Active Badge */}
                          {isActive && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: p.accent,
                                color: p.accentContrast,
                                padding: '2px 8px',
                                borderRadius: '999px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                              }}
                            >
                              <Check size={11} /> ACTIVE
                            </div>
                          )}

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                {p.name}
                              </h4>
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  padding: '1px 6px',
                                  borderRadius: '6px',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  color: 'var(--text-muted)',
                                }}
                              >
                                {p.badge}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                              {p.tagline}
                            </p>
                          </div>

                          {/* 60-30-10 Proportion Strip */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div
                              style={{
                                height: '14px',
                                borderRadius: '6px',
                                overflow: 'hidden',
                                display: 'flex',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                              }}
                            >
                              {/* 60% Dominant */}
                              <div
                                style={{
                                  width: '60%',
                                  backgroundColor: p.dominant,
                                  title: '60% Dominant (Canvas)',
                                }}
                              />
                              {/* 30% Secondary */}
                              <div
                                style={{
                                  width: '30%',
                                  backgroundColor: p.secondary,
                                  title: '30% Secondary (Cards)',
                                }}
                              />
                              {/* 10% Accent */}
                              <div
                                style={{
                                  width: '10%',
                                  backgroundColor: p.accent,
                                  boxShadow: `0 0 8px ${p.accent}`,
                                  title: '10% Accent (CTAs)',
                                }}
                              />
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.68rem',
                                color: 'var(--text-muted)',
                                fontFamily: 'var(--font-mono)',
                              }}
                            >
                              <span>60%</span>
                              <span>30%</span>
                              <span style={{ color: p.accent, fontWeight: 700 }}>10%</span>
                            </div>
                          </div>

                          {/* Color Swatch Dots */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '6px',
                                backgroundColor: p.dominant,
                                border: '1px solid rgba(255,255,255,0.2)',
                              }}
                              title={`Canvas: ${p.dominant}`}
                            />
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '6px',
                                backgroundColor: p.secondary,
                                border: '1px solid rgba(255,255,255,0.2)',
                              }}
                              title={`Cards: ${p.secondary}`}
                            />
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '6px',
                                backgroundColor: p.accent,
                                boxShadow: `0 0 8px ${p.accent}`,
                              }}
                              title={`Accent: ${p.accent}`}
                            />
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '6px',
                                backgroundColor: p.accentLight,
                              }}
                              title={`Accent Light: ${p.accentLight}`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Live Interactive Sandbox & Component Inspection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Eye size={16} style={{ color: 'var(--accent)' }} />
                      Interactive Component Sandbox
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: previewTarget.accent, fontWeight: 600 }}>
                      Previewing: {previewTarget.name}
                    </span>
                  </div>

                  {/* Sandbox Simulated Viewport */}
                  <div
                    style={{
                      borderRadius: '20px',
                      padding: '24px',
                      backgroundColor: previewTarget.dominant,
                      border: `1px solid ${previewTarget.borderAccent}`,
                      boxShadow: `0 16px 40px rgba(0,0,0,0.6), 0 0 30px ${previewTarget.ambientGlow1}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Simulated Ambient Glow */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-40px',
                        right: '-40px',
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: previewTarget.accentGlow,
                        filter: 'blur(50px)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Simulated Nav Bar */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        backgroundColor: previewTarget.secondary,
                        border: `1px solid ${previewTarget.border}`,
                      }}
                    >
                      <div style={{ fontWeight: 800, color: previewTarget.primaryText, fontSize: '0.9rem' }}>
                        Arnav<span style={{ color: previewTarget.accent }}>.</span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '0.76rem', color: previewTarget.secondaryText }}>
                        <span>Projects</span>
                        <span>Skills</span>
                        <span style={{ color: previewTarget.accent, fontWeight: 700 }}>Contact</span>
                      </div>
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: previewTarget.accent,
                          boxShadow: `0 0 8px ${previewTarget.accent}`,
                        }}
                      />
                    </div>

                    {/* Simulated Hero Card */}
                    <div
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        backgroundColor: previewTarget.secondary,
                        border: `1px solid ${previewTarget.border}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            backgroundColor: `${previewTarget.accent}20`,
                            color: previewTarget.accent,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            border: `1px solid ${previewTarget.accent}40`,
                          }}
                        >
                          AVAILABLE FOR ROLES
                        </span>
                        <span style={{ fontSize: '0.75rem', color: previewTarget.mutedText }}>SIT Nagpur · 3rd Year</span>
                      </div>

                      <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: previewTarget.primaryText }}>
                        Crafting Robust Security & Intelligent Web Apps
                      </h4>

                      <p style={{ margin: 0, fontSize: '0.82rem', color: previewTarget.secondaryText, lineHeight: 1.5 }}>
                        This demonstrates how headers, body text, and interactive buttons balance together in harmony following the 60-30-10 distribution.
                      </p>

                      {/* Interactive Buttons Showcase */}
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
                        <button
                          onClick={() => handleSelectPalette(previewTarget.id, previewTarget.name)}
                          style={{
                            background: `linear-gradient(135deg, ${previewTarget.accent} 0%, ${previewTarget.accentLight} 100%)`,
                            color: previewTarget.accentContrast,
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 18px',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            boxShadow: `0 4px 16px ${previewTarget.accentGlow}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <Zap size={14} />
                          Apply This Theme Now
                        </button>

                        <button
                          style={{
                            background: `${previewTarget.secondary}80`,
                            color: previewTarget.primaryText,
                            border: `1px solid ${previewTarget.border}`,
                            borderRadius: '10px',
                            padding: '10px 16px',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                          }}
                        >
                          Secondary Action
                        </button>
                      </div>
                    </div>

                    {/* Stats Metric Preview */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {[
                        { label: 'Projects', val: '4+', col: previewTarget.stats[0] },
                        { label: 'Internship', val: '1', col: previewTarget.stats[1] },
                        { label: 'Tech Stack', val: '15+', col: previewTarget.stats[2] },
                      ].map((s, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '12px',
                            borderRadius: '12px',
                            backgroundColor: previewTarget.secondary,
                            border: `1px solid ${previewTarget.border}`,
                            textAlign: 'center',
                          }}
                        >
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: s.col }}>{s.val}</div>
                          <div style={{ fontSize: '0.7rem', color: previewTarget.mutedText }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Tip Box */}
                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    💡 <strong>Pro Tip:</strong> Your selected palette is automatically saved in your browser's <code style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.06)', padding: '2px 5px', borderRadius: '4px' }}>localStorage</code> and applies instantly to the 3D Cyber Core, interactive tilt cards, and particle canvas.
                  </div>
                </div>
              </div>

              {/* Studio Footer */}
              <div
                style={{
                  padding: '16px 28px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Active: <strong style={{ color: 'var(--accent)' }}>{currentPalette.name}</strong> ({currentPalette.badge})
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={closeStudio}
                    className="btn btn-primary"
                    style={{ fontSize: '0.84rem', padding: '8px 20px' }}
                  >
                    Done & Return to Portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
