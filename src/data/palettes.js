// Curated 60-30-10 Color Palettes for Portfolio
// 60% Dominant (Canvas/Background) | 30% Secondary (Cards/Typography) | 10% Accent (CTAs/Badges/3D)

export const PALETTES = [
  {
    id: 'original-indigo',
    name: 'Original Cosmic Indigo',
    badge: '1st Original',
    tagline: 'The iconic 1st combination: cosmic dark void with electric indigo & cyber cyan accents',
    dominant: '#0a0a0f',
    secondary: '#16161f',
    accent: '#6c63ff',
    accentLight: '#8b85ff',
    accentDark: '#4a42cc',
    accentContrast: '#ffffff',
    accentGlow: 'rgba(108, 99, 255, 0.32)',
    secondaryText: '#a0a0b8',
    primaryText: '#f0f0f8',
    mutedText: '#606078',
    border: 'rgba(255, 255, 255, 0.08)',
    borderAccent: 'rgba(108, 99, 255, 0.35)',
    bgSecondary: '#111118',
    bgCardHover: '#1c1c28',
    ambientGlow1: 'rgba(108, 99, 255, 0.09)',
    ambientGlow2: 'rgba(0, 212, 255, 0.06)',
    ambientGlow3: 'rgba(139, 133, 255, 0.04)',
    three: {
      mesh: 0x6c63ff,
      core: 0x00d4ff,
      nucleus: 0x8b85ff,
      particle1: 0x6c63ff,
      particle2: 0x00d4ff,
    },
    canvas: {
      node1: '#6c63ff',
      node2: '#00d4ff',
      edge: 'rgba(108, 99, 255, 0.45)',
    },
    stats: ['#6c63ff', '#00d4ff', '#50c878', '#ff6b6b'],
  },
  {
    id: 'amber-gold',
    name: 'Stealth Amber Gold',
    badge: 'Warm Luxury',
    tagline: 'Deep carbon obsidian with radiant warm amber and sunset gold accents',
    dominant: '#070707',
    secondary: '#131315',
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    accentDark: '#d97706',
    accentContrast: '#1c1002',
    accentGlow: 'rgba(245, 158, 11, 0.32)',
    secondaryText: '#a8a29e',
    primaryText: '#fafaf9',
    mutedText: '#78716c',
    border: 'rgba(255, 255, 255, 0.08)',
    borderAccent: 'rgba(245, 158, 11, 0.35)',
    bgSecondary: '#0d0d0e',
    bgCardHover: '#1c1c20',
    ambientGlow1: 'rgba(245, 158, 11, 0.08)',
    ambientGlow2: 'rgba(251, 146, 60, 0.05)',
    ambientGlow3: 'rgba(234, 179, 8, 0.04)',
    three: {
      mesh: 0xf59e0b,
      core: 0xfbbf24,
      nucleus: 0xfb923c,
      particle1: 0xf59e0b,
      particle2: 0xfbbf24,
    },
    canvas: {
      node1: '#f59e0b',
      node2: '#fb923c',
      edge: 'rgba(245, 158, 11, 0.45)',
    },
    stats: ['#f59e0b', '#fb923c', '#fbbf24', '#fcd34d'],
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    badge: 'Cyberpunk',
    tagline: 'Pitch obsidian void with high-frequency neon emerald and radiant mint',
    dominant: '#060908',
    secondary: '#0e1713',
    accent: '#10b981',
    accentLight: '#34d399',
    accentDark: '#059669',
    accentContrast: '#021a12',
    accentGlow: 'rgba(16, 185, 129, 0.32)',
    secondaryText: '#94a3b8',
    primaryText: '#f0fdf4',
    mutedText: '#5e7168',
    border: 'rgba(255, 255, 255, 0.08)',
    borderAccent: 'rgba(16, 185, 129, 0.35)',
    bgSecondary: '#0a0f0d',
    bgCardHover: '#13221b',
    ambientGlow1: 'rgba(16, 185, 129, 0.08)',
    ambientGlow2: 'rgba(6, 182, 212, 0.05)',
    ambientGlow3: 'rgba(52, 211, 153, 0.04)',
    three: {
      mesh: 0x10b981,
      core: 0x34d399,
      nucleus: 0x06b6d4,
      particle1: 0x10b981,
      particle2: 0x34d399,
    },
    canvas: {
      node1: '#10b981',
      node2: '#06b6d4',
      edge: 'rgba(16, 185, 129, 0.45)',
    },
    stats: ['#10b981', '#06b6d4', '#34d399', '#6ee7b7'],
  },
  {
    id: 'midnight-sapphire',
    name: 'Midnight Sapphire',
    badge: 'Deep Tech',
    tagline: 'Abyssal navy black with electric cobalt, ice cyan, and sapphire energy',
    dominant: '#050811',
    secondary: '#0c1322',
    accent: '#38bdf8',
    accentLight: '#60a5fa',
    accentDark: '#0284c7',
    accentContrast: '#031726',
    accentGlow: 'rgba(56, 189, 248, 0.32)',
    secondaryText: '#94a3b8',
    primaryText: '#f0f9ff',
    mutedText: '#64748b',
    border: 'rgba(255, 255, 255, 0.08)',
    borderAccent: 'rgba(56, 189, 248, 0.35)',
    bgSecondary: '#090f1e',
    bgCardHover: '#131e36',
    ambientGlow1: 'rgba(56, 189, 248, 0.08)',
    ambientGlow2: 'rgba(99, 102, 241, 0.06)',
    ambientGlow3: 'rgba(14, 165, 233, 0.04)',
    three: {
      mesh: 0x38bdf8,
      core: 0x60a5fa,
      nucleus: 0x818cf8,
      particle1: 0x38bdf8,
      particle2: 0x60a5fa,
    },
    canvas: {
      node1: '#38bdf8',
      node2: '#818cf8',
      edge: 'rgba(56, 189, 248, 0.45)',
    },
    stats: ['#38bdf8', '#60a5fa', '#818cf8', '#a5b4fc'],
  },
  {
    id: 'cyberpunk-neon',
    name: 'Neo-Tokyo Cyber',
    badge: 'Synthwave',
    tagline: 'Dark void with high-voltage neon rose, ultraviolet, and cyan reflections',
    dominant: '#0a0612',
    secondary: '#150d22',
    accent: '#f43f5e',
    accentLight: '#fb7185',
    accentDark: '#e11d48',
    accentContrast: '#1f040b',
    accentGlow: 'rgba(244, 63, 94, 0.32)',
    secondaryText: '#a1a1aa',
    primaryText: '#fdf2f8',
    mutedText: '#71717a',
    border: 'rgba(255, 255, 255, 0.08)',
    borderAccent: 'rgba(244, 63, 94, 0.35)',
    bgSecondary: '#10091c',
    bgCardHover: '#1e1430',
    ambientGlow1: 'rgba(244, 63, 94, 0.08)',
    ambientGlow2: 'rgba(168, 85, 247, 0.06)',
    ambientGlow3: 'rgba(6, 182, 212, 0.04)',
    three: {
      mesh: 0xf43f5e,
      core: 0x06b6d4,
      nucleus: 0xfb7185,
      particle1: 0xf43f5e,
      particle2: 0x06b6d4,
    },
    canvas: {
      node1: '#f43f5e',
      node2: '#06b6d4',
      edge: 'rgba(244, 63, 94, 0.45)',
    },
    stats: ['#f43f5e', '#06b6d4', '#fb7185', '#c084fc'],
  },
  {
    id: 'amethyst-phantom',
    name: 'Amethyst Phantom',
    badge: 'Mystic Sci-Fi',
    tagline: 'Velvet obsidian shadow with radiant amethyst, violet, and lavender glow',
    dominant: '#090511',
    secondary: '#130c22',
    accent: '#a855f7',
    accentLight: '#c084fc',
    accentDark: '#9333ea',
    accentContrast: '#180424',
    accentGlow: 'rgba(168, 85, 247, 0.32)',
    secondaryText: '#a8a29e',
    primaryText: '#faf5ff',
    mutedText: '#78716c',
    border: 'rgba(255, 255, 255, 0.08)',
    borderAccent: 'rgba(168, 85, 247, 0.35)',
    bgSecondary: '#0e071c',
    bgCardHover: '#1c1230',
    ambientGlow1: 'rgba(168, 85, 247, 0.08)',
    ambientGlow2: 'rgba(236, 72, 153, 0.05)',
    ambientGlow3: 'rgba(192, 132, 252, 0.04)',
    three: {
      mesh: 0xa855f7,
      core: 0xc084fc,
      nucleus: 0xd946ef,
      particle1: 0xa855f7,
      particle2: 0xc084fc,
    },
    canvas: {
      node1: '#a855f7',
      node2: '#c084fc',
      edge: 'rgba(168, 85, 247, 0.45)',
    },
    stats: ['#a855f7', '#c084fc', '#d946ef', '#e879f9'],
  },
  {
    id: 'dennis-mono',
    name: 'Dennis Monochrome',
    badge: 'Architectural Minimal',
    tagline: 'Editorial high-contrast design inspired by Dennis Snellenberg studio aesthetics',
    dominant: '#0c0c0c',
    secondary: '#181818',
    accent: '#ffffff',
    accentLight: '#f1f1f1',
    accentDark: '#d4d4d4',
    accentContrast: '#000000',
    accentGlow: 'rgba(255, 255, 255, 0.22)',
    secondaryText: '#a0a0a0',
    primaryText: '#ffffff',
    mutedText: '#666666',
    border: 'rgba(255, 255, 255, 0.12)',
    borderAccent: 'rgba(255, 255, 255, 0.4)',
    bgSecondary: '#121212',
    bgCardHover: '#222222',
    ambientGlow1: 'rgba(255, 255, 255, 0.04)',
    ambientGlow2: 'rgba(200, 200, 200, 0.03)',
    ambientGlow3: 'rgba(150, 150, 150, 0.02)',
    three: {
      mesh: 0xffffff,
      core: 0xe2e8f0,
      nucleus: 0xa1a1aa,
      particle1: 0xffffff,
      particle2: 0xd4d4d4,
    },
    canvas: {
      node1: '#ffffff',
      node2: '#a1a1aa',
      edge: 'rgba(255, 255, 255, 0.35)',
    },
    stats: ['#ffffff', '#e2e8f0', '#cbd5e1', '#94a3b8'],
  },
];

export const DEFAULT_PALETTE_ID = 'amber-gold';

export function getPalette(id) {
  return PALETTES.find(p => p.id === id) || PALETTES[0];
}

export function applyPaletteToDOM(palette, theme = 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.setAttribute('data-palette', palette.id);
  root.setAttribute('data-theme', theme);

  if (theme === 'light') {
    // ─── Light Mode (Clean, High Contrast, Preserving Palette Accents) ───
    root.style.setProperty('--bg-primary', '#faf9f6');
    root.style.setProperty('--bg-secondary', '#f2ece4');
    root.style.setProperty('--bg-card', '#ffffff');
    root.style.setProperty('--bg-card-hover', '#f8f4ed');
    root.style.setProperty('--bg-glass', 'rgba(255, 255, 255, 0.90)');

    root.style.setProperty('--text-primary', '#1c1917');
    root.style.setProperty('--text-secondary', '#44403c');
    root.style.setProperty('--text-muted', '#78716c');
    root.style.setProperty('--text-accent', palette.accentDark || palette.accent);

    root.style.setProperty('--border', 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--border-accent', `${palette.accent}55`);
    root.style.setProperty('--shadow-card', '0 4px 20px rgba(0, 0, 0, 0.06)');
    root.style.setProperty('--shadow-accent', `0 8px 24px rgba(0, 0, 0, 0.08)`);

    root.style.setProperty('--accent', palette.accentDark || palette.accent);
    root.style.setProperty('--accent-light', palette.accent);
    root.style.setProperty('--accent-dark', palette.accentDark);
    root.style.setProperty('--accent-glow', 'rgba(0, 0, 0, 0.06)');
    root.style.setProperty('--accent-contrast', '#ffffff');

    root.style.setProperty('--accent-purple', palette.accent);
    root.style.setProperty('--cyan', palette.accentLight);
    root.style.setProperty('--cyan-glow', 'rgba(0, 0, 0, 0.05)');

    document.body.style.backgroundColor = '#faf9f6';
    document.body.style.color = '#1c1917';
    document.body.style.backgroundImage = `
      radial-gradient(circle at 50% 0%, ${palette.accent}14 0%, transparent 60%),
      radial-gradient(circle at 85% 35%, ${palette.accentLight}10 0%, transparent 50%),
      radial-gradient(circle at 15% 75%, ${palette.accentDark}08 0%, transparent 55%)
    `;
  } else {
    // ─── Dark Mode (Deep Cyber / Cosmic Aesthetic) ───
    root.style.setProperty('--bg-primary', palette.dominant);
    root.style.setProperty('--bg-secondary', palette.bgSecondary);
    root.style.setProperty('--bg-card', palette.secondary);
    root.style.setProperty('--bg-card-hover', palette.bgCardHover);
    root.style.setProperty('--bg-glass', `${palette.secondary}d2`);

    root.style.setProperty('--text-primary', palette.primaryText);
    root.style.setProperty('--text-secondary', palette.secondaryText);
    root.style.setProperty('--text-muted', palette.mutedText);
    root.style.setProperty('--text-accent', palette.accent);

    root.style.setProperty('--border', palette.border);
    root.style.setProperty('--border-accent', palette.borderAccent);
    root.style.setProperty('--shadow-card', '0 4px 24px rgba(0, 0, 0, 0.4)');
    root.style.setProperty('--shadow-accent', `0 8px 32px ${palette.accentGlow}`);

    root.style.setProperty('--accent', palette.accent);
    root.style.setProperty('--accent-light', palette.accentLight);
    root.style.setProperty('--accent-dark', palette.accentDark);
    root.style.setProperty('--accent-glow', palette.accentGlow);
    root.style.setProperty('--accent-contrast', palette.accentContrast);

    root.style.setProperty('--accent-purple', palette.accent);
    root.style.setProperty('--cyan', palette.accentLight);
    root.style.setProperty('--cyan-glow', palette.accentGlow);

    document.body.style.backgroundColor = palette.dominant;
    document.body.style.color = palette.primaryText;
    document.body.style.backgroundImage = `
      radial-gradient(circle at 50% 0%, ${palette.ambientGlow1} 0%, transparent 60%),
      radial-gradient(circle at 85% 35%, ${palette.ambientGlow2} 0%, transparent 50%),
      radial-gradient(circle at 15% 75%, ${palette.ambientGlow3} 0%, transparent 55%)
    `;
  }
}
