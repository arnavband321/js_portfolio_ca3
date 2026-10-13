import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Download, Mail, Moon, Sun } from 'lucide-react';
import { playClickSound, playTabSound } from '../utils/soundFX';
import { usePalette } from '../context/PaletteContext';

const SECTIONS = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About Me', icon: '👤' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'certifications', label: 'Certifications', icon: '🎖️' },
  { id: 'contributions', label: 'Contributions', icon: '🤝' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'career', label: 'Career Interests', icon: '🎯' },
  { id: 'contact', label: 'Contact', icon: '✉️' },
];

const ACTIONS = [
  { label: 'Download Resume', icon: <Download size={15} />, action: () => { const a = document.createElement('a'); a.href = '/Arnav_Band_Resume.pdf'; a.download = ''; a.click(); }, kbd: '⌘R' },
  { label: 'Copy Email', icon: <Mail size={15} />, action: () => { navigator.clipboard.writeText('arnavofficial321@gmail.com'); }, kbd: '⌘E' },
  { label: 'Open GitHub', icon: '🐙', action: () => window.open('https://github.com/arnavband321?tab=repositories', '_blank'), kbd: null },
  { label: 'Open LinkedIn', icon: '💼', action: () => window.open('https://www.linkedin.com/in/arnav-band-599113320/', '_blank'), kbd: null },
];

export default function CommandPalette({ theme, toggleTheme }) {
  const { openStudio } = usePalette();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Build filtered list
  const sectionItems = SECTIONS
    .filter(s => s.label.toLowerCase().includes(query.toLowerCase()))
    .map(s => ({
      ...s,
      type: 'section',
      action: () => {
        document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      },
    }));

  const paletteStudioItem = {
    label: 'Open Color Studio (60-30-10 Lab)',
    icon: '🎨',
    type: 'action',
    kbd: 'C',
    action: () => {
      openStudio();
      setOpen(false);
    },
  };

  const actionItems = [
    paletteStudioItem,
    ...ACTIONS
      .filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
      .map(a => ({ ...a, type: 'action' })),
  ];

  const themeItem = {
    label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
    icon: theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />,
    type: 'action',
    kbd: '⌘T',
    action: () => { toggleTheme(); setOpen(false); },
  };

  const allItems = query
    ? [...sectionItems, ...actionItems, ...(themeItem.label.toLowerCase().includes(query.toLowerCase()) ? [themeItem] : [])]
    : [...sectionItems, ...actionItems, themeItem];

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        playTabSound();
        setOpen(o => !o);
        setQuery('');
        setActiveIdx(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, allItems.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter') {
      const item = allItems[activeIdx];
      if (item) {
        if (item.label === 'Copy Email') {
          item.action();
          setToast('✓ Email copied!');
          setTimeout(() => setToast(null), 2500);
          setOpen(false);
        } else {
          item.action();
          setOpen(false);
        }
      }
    }
  }, [allItems, activeIdx]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const handleItemClick = (item) => {
    playClickSound();
    if (item.label === 'Copy Email') {
      item.action();
      setToast('✓ Email copied to clipboard!');
      setTimeout(() => setToast(null), 2500);
      setOpen(false);
    } else {
      item.action();
      setOpen(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        className="cp-trigger"
        onClick={() => { setOpen(true); setQuery(''); setActiveIdx(0); }}
        aria-label="Open command palette (Ctrl+K)"
        title="Command Palette (Ctrl+K)"
      >
        <Search size={14} />
        <span>Quick Search</span>
        <kbd>Ctrl K</kbd>
      </button>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="cp-toast"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Palette Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="cp-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="cp-modal"
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              {/* Search input */}
              <div className="cp-search-row">
                <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  type="text"
                  className="cp-search"
                  placeholder="Search sections, actions…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                  aria-label="Command search"
                  autoComplete="off"
                />
                <button className="cp-esc" onClick={() => setOpen(false)}>Esc</button>
              </div>

              {/* Results */}
              <div className="cp-results" ref={listRef}>
                {allItems.length === 0 && (
                  <div className="cp-empty">No results for "{query}"</div>
                )}

                {/* Group: Sections */}
                {sectionItems.filter(i => allItems.includes(i)).length > 0 && (
                  <div className="cp-group-label">Navigate</div>
                )}
                {allItems.map((item, idx) => (
                  <button
                    key={`${item.type}-${item.label}`}
                    className={`cp-item ${idx === activeIdx ? 'active' : ''}`}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setActiveIdx(idx)}
                  >
                    <span className="cp-item-icon">
                      {typeof item.icon === 'string' ? item.icon : item.icon}
                    </span>
                    <span className="cp-item-label">{item.label}</span>
                    {item.kbd && <kbd className="cp-item-kbd">{item.kbd}</kbd>}
                    {item.type === 'section' && (
                      <ArrowRight size={12} style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
                    )}
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="cp-footer">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>Esc close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
