import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/soundFX';

const ROLES = [
  'Full-Stack Web Developer',
  'Cybersecurity & Threat Defense',
  'Explainable AI (XAI) Researcher',
  'Computer Science Engineer',
  'Interactive 3D & Creative Web',
];

export default function CyberTypewriter() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const currentFullText = ROLES[textIndex];

  useEffect(() => {
    if (isPaused) return;

    const typeSpeed = isDeleting ? 25 : 50;
    const pauseDelay = 2200;

    if (!isDeleting && displayText === currentFullText) {
      // Finished typing, pause before deleting
      timerRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDelay);
    } else if (isDeleting && displayText === '') {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      // Continue typing or deleting
      timerRef.current = setTimeout(() => {
        const nextText = isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }, typeSpeed);
    }

    return () => clearTimeout(timerRef.current);
  }, [displayText, isDeleting, textIndex, currentFullText, isPaused]);

  // Click to advance to next role immediately
  const handleFastForward = () => {
    playClickSound();
    setIsDeleting(false);
    setDisplayText('');
    setTextIndex((prev) => (prev + 1) % ROLES.length);
  };

  return (
    <div
      className="cyber-typewriter-container"
      style={{
        margin: '12px 0 18px',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <motion.div
        className="cyber-typewriter-bar"
        onClick={handleFastForward}
        onMouseEnter={() => {
          setIsPaused(true);
          playHoverSound();
        }}
        onMouseLeave={() => setIsPaused(false)}
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.985 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFastForward();
          }
        }}
        aria-label={`Current title: ${displayText}. Click to advance.`}
        title="Click to skip to next title"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px 8px 12px',
          borderRadius: '12px',
          backgroundColor: 'var(--bg-glass)',
          border: '1px solid var(--border-accent)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), var(--shadow-accent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          cursor: 'pointer',
          userSelect: 'none',
          minHeight: '44px',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Terminal Prompt Prefix Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--accent)',
            fontSize: '0.85rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            paddingRight: '6px',
            borderRight: '1px solid var(--border)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 8px var(--accent)',
              display: 'inline-block',
            }}
          />
          <span style={{ color: 'var(--text-muted)' }}>role</span>
          <span style={{ color: 'var(--accent)' }}>❯</span>
        </div>

        {/* Live Typewriter Text Display */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.12rem)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            minWidth: '260px',
          }}
        >
          <span>{displayText}</span>

          {/* Glowing Animated Cursor */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              backgroundColor: 'var(--accent)',
              marginLeft: '3px',
              boxShadow: '0 0 8px var(--accent)',
              verticalAlign: 'middle',
            }}
          />
        </div>

        {/* Right Subtle Skip Pill */}
        <div
          style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            padding: '2px 7px',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border)',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Sparkles size={11} style={{ color: 'var(--accent)' }} />
          <span>tap</span>
        </div>
      </motion.div>
    </div>
  );
}
