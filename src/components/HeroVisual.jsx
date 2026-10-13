import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Network, X, ChevronRight, Box } from 'lucide-react';
import CyberCore3D from './CyberCore3D';
import { playTabSound } from '../utils/soundFX';
import { getPalette } from '../data/palettes';

/* ─── Particle Node Canvas ──────────────────────────────────────── */
function NodeCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const savedId = localStorage.getItem('portfolio-palette') || 'amber-gold';
    let currentCanvasColors = getPalette(savedId).canvas;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    // Create nodes
    const count = 28;
    nodesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 3 + 2,
      color: i % 3 === 0 ? currentCanvasColors.node2 : currentCanvasColors.node1,
      label: i % 6 === 0 ? ['AUTH', 'SIEM', 'SOC', 'XAI', 'NET'][Math.floor(i / 6) % 5] : null,
    }));

    const handlePaletteChange = (e) => {
      const p = e.detail;
      if (!p || !p.canvas) return;
      currentCanvasColors = p.canvas;
      if (nodesRef.current) {
        nodesRef.current.forEach((n) => {
          n.color = n.id % 3 === 0 ? p.canvas.node2 : p.canvas.node1;
        });
      }
    };
    window.addEventListener('portfolio:palette-change', handlePaletteChange);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Move nodes
      nodes.forEach(n => {
        // Mouse repel
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          n.x += (dx / dist) * 1.2;
          n.y += (dy / dist) * 1.2;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.45;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = currentCanvasColors.edge.replace('0.45', alpha.toFixed(2));
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const dx = n.x - mx;
        const dy = n.y - my;
        const nearMouse = Math.sqrt(dx * dx + dy * dy) < 100;

        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grd.addColorStop(0, n.color + '66');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, nearMouse ? n.r * 1.8 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Label
        if (n.label && nearMouse) {
          ctx.fillStyle = n.color;
          ctx.font = '500 9px "JetBrains Mono", monospace';
          ctx.fillText(n.label, n.x + n.r + 4, n.y + 3);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('resize', resize);
      window.removeEventListener('portfolio:palette-change', handlePaletteChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  );
}

/* ─── Mini Terminal ─────────────────────────────────────────────── */
const TERM_COMMANDS = {
  help: () => [
    '  Available commands:',
    '  <span class="tc-accent">projects</span>  — list my projects',
    '  <span class="tc-accent">skills</span>    — view my skill set',
    '  <span class="tc-accent">contact</span>   — contact info',
    '  <span class="tc-cyan">sudo hire</span> — 😄 initiate interview',
    '  <span class="tc-muted">clear</span>     — clear terminal',
  ],
  projects: () => [
    '  <span class="tc-accent">[ Projects ]</span>',
    '  1. Threat Correlation Framework  <span class="tc-muted">· Cybersecurity / AI</span>',
    '  2. Maincrafts Portfolio          <span class="tc-muted">· Web Dev · Live ✅</span>',
    '  3. JS Portfolio Website          <span class="tc-muted">· Web Dev · Live ✅</span>',
    '  4. Blog Website                  <span class="tc-muted">· Web Dev · Live ✅</span>',
    '  <span class="tc-muted">→ Scroll to #projects for full details</span>',
  ],
  skills: () => [
    '  <span class="tc-accent">[ Skills ]</span>',
    '  Languages:  Python · JavaScript · C · C++ · Java',
    '  Web:        React · HTML5 · CSS3 · Responsive Design',
    '  Security:   <span class="tc-cyan">SIEM · SOC · Threat Detection · XAI</span>',
    '  Tools:      Git · VS Code · Linux · Streamlit · NetworkX',
  ],
  contact: () => [
    '  <span class="tc-accent">[ Contact ]</span>',
    '  Email:    arnavofficial321@gmail.com',
    '  LinkedIn: linkedin.com/in/arnav-band-599113320',
    '  GitHub:   github.com/arnavband321',
    '  Location: Nagpur, Maharashtra, India',
  ],
  'sudo hire': () => [
    '  <span class="tc-cyan">Checking credentials...</span>',
    '  ▸ Enthusiasm ............. ✅ 100%',
    '  ▸ Problem solving ........ ✅ High',
    '  ▸ Learning velocity ...... ✅ Fast',
    '  ▸ Team player ............ ✅ Yes',
    '  <span class="tc-accent">✓ Access granted! Scrolling to contact...</span>',
  ],
  clear: () => ['__clear__'],
};

function MiniTerminal({ onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', html: 'Welcome to Arnav\'s terminal. Type <span class="tc-accent">help</span> to begin.' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const run = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHist = [...history, { type: 'input', text: `$ ${cmd}` }];

    if (!trimmed) { setHistory(newHist); return; }

    setCmdHistory(p => [cmd, ...p]);
    setHistIdx(-1);

    const handler = TERM_COMMANDS[trimmed];
    if (handler) {
      const lines = handler();
      if (lines[0] === '__clear__') {
        setHistory([{ type: 'system', html: 'Terminal cleared.' }]);
        setInput('');
        return;
      }
      if (trimmed === 'sudo hire') {
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 1800);
      }
      setHistory([...newHist, ...lines.map(l => ({ type: 'output', html: l }))]);
    } else {
      setHistory([...newHist, { type: 'error', html: `  Command not found: <span class="tc-accent">${trimmed}</span>. Try <span class="tc-accent">help</span>.` }]);
    }
    setInput('');
  }, [history]);

  const handleKey = (e) => {
    if (e.key === 'Enter') { run(input); }
    else if (e.key === 'ArrowUp') {
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] || '');
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next]);
      e.preventDefault();
    }
  };

  return (
    <div className="hero-terminal" role="region" aria-label="Interactive terminal">
      {/* Title bar */}
      <div className="term-titlebar">
        <div className="term-dots" aria-hidden="true">
          <span style={{ background: '#ff5f57' }} />
          <span style={{ background: '#febc2e' }} />
          <span style={{ background: '#28c840' }} />
        </div>
        <span className="term-title">arnav@portfolio ~ bash</span>
        <button className="term-close-btn" onClick={onClose} aria-label="Close terminal">
          <X size={12} />
        </button>
      </div>

      {/* Output */}
      <div className="term-output" onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) =>
          line.html ? (
            <div
              key={i}
              className={`term-line ${line.type === 'input' ? 'term-input-line' : line.type === 'error' ? 'term-error-line' : ''}`}
              dangerouslySetInnerHTML={{ __html: line.html }}
            />
          ) : (
            <div
              key={i}
              className={`term-line ${line.type === 'input' ? 'term-input-line' : line.type === 'error' ? 'term-error-line' : ''}`}
            >
              {line.text}
            </div>
          )
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="term-input-row">
        <span className="term-prompt">
          <ChevronRight size={12} style={{ color: 'var(--accent)' }} />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="term-input"
          placeholder="type a command…"
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

/* ─── 3D Tilt Visual Wrapper ────────────────────────────────────── */
export default function HeroVisual() {
  const cardRef = useRef(null);
  const [mode, setMode] = useState('3d'); // '3d' | 'network' | 'terminal'
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const switchMode = (m) => {
    playTabSound();
    setMode(m);
  };

  return (
    <motion.div
      ref={cardRef}
      className="hv-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease' : 'transform 0.05s linear',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Tabs */}
      <div className="hv-tabs">
        <button
          className={`hv-tab ${mode === '3d' ? 'active' : ''}`}
          onClick={() => switchMode('3d')}
        >
          <Box size={13} /> 3D Cyber Core
        </button>
        <button
          className={`hv-tab ${mode === 'network' ? 'active' : ''}`}
          onClick={() => switchMode('network')}
        >
          <Network size={13} /> Network
        </button>
        <button
          className={`hv-tab ${mode === 'terminal' ? 'active' : ''}`}
          onClick={() => switchMode('terminal')}
        >
          <Terminal size={13} /> Terminal
        </button>
      </div>

      {/* Content panel */}
      <div className="hv-panel">
        {mode === '3d' && (
          <>
            <CyberCore3D />
            {/* Floating depth badges (3D translateZ) */}
            <div className="hv-depth-badge hv-db-1" style={{ transform: `translateZ(${30 + tilt.y}px)` }}>
              🛡️ <span>Threat Correlation · XAI</span>
            </div>
            <div className="hv-depth-badge hv-db-2" style={{ transform: `translateZ(${20 - tilt.x}px)` }}>
              ⚡ <span>Three.js + React 19</span>
            </div>
            <div className="hv-depth-badge hv-db-3" style={{ transform: `translateZ(${25 + tilt.x * 0.5}px)` }}>
              🐍 <span>Python · SIEM</span>
            </div>
          </>
        )}

        {mode === 'network' && (
          <>
            <div className="hv-canvas-wrap">
              <NodeCanvas />
            </div>
            <div className="hv-depth-badge hv-db-1" style={{ transform: `translateZ(${30 + tilt.y}px)` }}>
              🛡️ <span>Threat Correlation · XAI</span>
            </div>
            <div className="hv-depth-badge hv-db-2" style={{ transform: `translateZ(${20 - tilt.x}px)` }}>
              ⚡ <span>React 19 + Vite 8</span>
            </div>
            <div className="hv-depth-badge hv-db-3" style={{ transform: `translateZ(${25 + tilt.x * 0.5}px)` }}>
              🐍 <span>Python · SIEM</span>
            </div>
            <div className="hv-statusbar">
              <span className="hv-status-dot" />
              <span>Log correlation active — 28 nodes · 0 threats</span>
            </div>
          </>
        )}

        {mode === 'terminal' && (
          <MiniTerminal onClose={() => switchMode('3d')} />
        )}
      </div>
    </motion.div>
  );
}
