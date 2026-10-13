import { useState, useEffect } from 'react';
import { navLinks, personalInfo } from '../data/portfolio';
import { Sun, Moon, Volume2, VolumeX, Palette } from 'lucide-react';
import { setSoundEnabled, playClickSound } from '../utils/soundFX';
import { usePalette } from '../context/PaletteContext';

export default function Navbar({ theme, toggleTheme }) {
  const { openStudio } = usePalette();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setSoundEnabled(!next);
    if (!next) {
      setTimeout(() => playClickSound(), 20);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section tracking
      const sections = navLinks.map(l => l.href.replace('#', ''));
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <a href="#hero" className="navbar-logo" onClick={() => handleNavClick('#hero')}>
            Arnav<span>.</span>
          </a>

          <ul className="navbar-links" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <button
              className="theme-btn palette-btn"
              onClick={() => openStudio()}
              aria-label="Open 60-30-10 Color Studio"
              title="Open Color Studio (Press 'C')"
            >
              <Palette size={16} style={{ color: 'var(--accent)' }} />
            </button>
            <button
              className="theme-btn sound-btn"
              onClick={toggleSound}
              aria-label={muted ? 'Enable sound FX' : 'Mute sound FX'}
              title={muted ? 'Enable sound FX' : 'Mute sound FX'}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} style={{ color: 'var(--accent)' }} />}
            </button>
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href={personalInfo.resumeFile}
              download
              className="btn btn-primary"
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              aria-label="Download Resume"
            >
              Resume
            </a>
            <button
              className={`hamburger${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav${mobileOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href.replace('#', '') ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={personalInfo.resumeFile}
          download
          className="btn btn-primary"
          style={{ marginTop: '8px', justifyContent: 'center' }}
        >
          Download Resume
        </a>
      </nav>
    </>
  );
}
