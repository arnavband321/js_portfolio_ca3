import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Code2, GraduationCap, Cpu } from 'lucide-react';
import { usePalette } from '../context/PaletteContext';

const STATS_ITEMS = [
  { icon: <Code2 size={20} />, value: 4, suffix: '+', label: 'Projects Built' },
  { icon: <Briefcase size={20} />, value: 1, suffix: '', label: 'Industry Internship' },
  { icon: <GraduationCap size={20} />, value: 3, suffix: 'rd', label: 'Year · SIT Nagpur' },
  { icon: <Cpu size={20} />, value: 15, suffix: '+', label: 'Technologies' },
];

function CountUp({ target, suffix, duration = 1400 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsTicker() {
  const { currentPalette } = usePalette();
  const colors = currentPalette?.stats || ['#f59e0b', '#fb923c', '#fbbf24', '#fcd34d'];

  return (
    <section className="stats-section" aria-label="Key statistics">
      <div className="container">
        <div className="stats-grid">
          {STATS_ITEMS.map((stat, i) => {
            const color = colors[i % colors.length];
            return (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <div className="stat-icon" style={{ color, background: color + '18' }}>
                  {stat.icon}
                </div>
                <div className="stat-value" style={{ color }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
