import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';
import { projects, personalInfo } from '../data/portfolio';
import TiltCard from './TiltCard';
import { playClickSound, playTabSound } from '../utils/soundFX';

/* ── Category config ───────────────────────────────────────────── */
const CATEGORIES = [
  { key: 'all', label: 'All', emoji: '✦' },
  { key: 'Cybersecurity / AI', label: 'Cybersecurity & AI', emoji: '🛡️' },
  { key: 'Web Development', label: 'Web Dev', emoji: '💻' },
];

/* ── Browser Window Mockup ─────────────────────────────────────── */
function BrowserMockup({ project }) {
  const isLive = !!project.demo;
  const isPrivate = !project.github && !project.demo;

  // Choose a gradient per category
  const gradients = {
    'Cybersecurity / AI': 'linear-gradient(135deg, rgba(108,99,255,0.18) 0%, rgba(0,212,255,0.12) 100%)',
    'Web Development': 'linear-gradient(135deg, rgba(80,200,120,0.12) 0%, rgba(0,212,255,0.12) 100%)',
  };
  const bg = gradients[project.category] || 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,255,0.08))';

  return (
    <div className="browser-mockup">
      {/* Title bar */}
      <div className="browser-titlebar">
        <div className="browser-dots" aria-hidden="true">
          <span style={{ background: '#ff5f57' }} />
          <span style={{ background: '#febc2e' }} />
          <span style={{ background: '#28c840' }} />
        </div>
        <div className="browser-url">
          {project.demo
            ? project.demo.replace('https://', '')
            : `local/${project.shortTitle.toLowerCase().replace(/\s/g, '-')}`}
        </div>
        {/* Live / Private badge */}
        <div className={`browser-status-badge ${isLive ? 'live' : isPrivate ? 'private' : 'internal'}`}>
          {isLive ? (
            <><span className="live-dot" />&nbsp;Live</>
          ) : isPrivate ? (
            <>🔒 Private</>
          ) : (
            <>🟣 Research</>
          )}
        </div>
      </div>

      {/* Preview area */}
      <div className="browser-preview" style={{ background: bg }}>
        {/* Architecture diagram visualization */}
        <div className="browser-preview-inner">
          {project.features.slice(0, 3).map((f, i) => (
            <div key={i} className="browser-preview-chip" style={{ animationDelay: `${i * 0.15}s` }}>
              <span className="browser-chip-dot" />
              {f}
            </div>
          ))}
        </div>
        <div className="browser-preview-label">{project.shortTitle}</div>
      </div>
    </div>
  );
}

/* ── Project Card ──────────────────────────────────────────────── */
function ProjectCard({ project, i }) {
  return (
    <motion.div
      layout
      key={project.id}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
      style={{ height: '100%' }}
    >
      <TiltCard maxTilt={8} className="project-tilt-wrap" style={{ height: '100%', borderRadius: 'var(--radius-lg)' }}>
        <article
          className="project-card-v2"
          data-cursor-label="View"
          aria-label={`Project: ${project.title}`}
          style={{ height: '100%' }}
        >
          {/* Browser mockup top */}
          <BrowserMockup project={project} />

          {/* Card body */}
          <div className="pv2-body">
            {/* Meta row */}
            <div className="pv2-meta">
              <span className="pv2-category">{project.category}</span>
              <span className="pv2-status">
                {project.demo
                  ? <><span className="pv2-live-dot" /> Live</>
                  : project.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="pv2-title">{project.title}</h3>

            {/* Description */}
            <p className="pv2-description">{project.description}</p>

            {/* Tech stack pills */}
            <div className="pv2-tech">
              {project.technologies.map(tech => (
                <span key={tech} className="pv2-tech-tag">{tech}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="pv2-actions">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                  aria-label={`View ${project.shortTitle} on GitHub`}
                  data-cursor-label="GitHub"
                  onClick={playClickSound}
                >
                  <GitBranch size={14} />
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  aria-label={`View live demo of ${project.shortTitle}`}
                  data-cursor-label="Live Demo"
                  onClick={playClickSound}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              {!project.github && !project.demo && (
                <span className="pv2-private-note">
                  🔒 Academic Project · Private Repository
                </span>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

/* ── Main Projects Section ─────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Projects</span>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-subtitle">
            A selection of projects — academic research, internship deliverables, and personal explorations.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="projects-filter-bar" role="tablist" aria-label="Filter projects by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={activeFilter === cat.key}
              className={`filter-pill ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => { playTabSound(); setActiveFilter(cat.key); }}
            >
              <span>{cat.emoji}</span>
              {cat.label}
              <span className="filter-count">
                {cat.key === 'all' ? projects.length : projects.filter(p => p.category === cat.key).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div className="projects-grid-v2" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* GitHub CTA */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '56px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ color: 'var(--text-muted)', marginBottom: '18px', fontSize: '0.95rem' }}>
            View more projects and code on GitHub
          </p>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            data-cursor-label="GitHub"
          >
            <GitBranch size={16} />
            GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
