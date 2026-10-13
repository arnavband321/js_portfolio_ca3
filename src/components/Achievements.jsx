import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, PlusCircle, Maximize2, X, ExternalLink } from 'lucide-react';
import { achievements } from '../data/portfolio';
import { playClickSound } from '../utils/soundFX';

const catColors = {
  Academic: 'var(--accent)',
  Technical: 'var(--cyan)',
  Project: '#50c878',
  Certification: 'var(--accent)',
};

export default function Achievements() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenLightbox = (item) => {
    playClickSound();
    setSelectedItem(item);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
  };

  return (
    <section id="achievements" className="section bg-section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Achievements</span>
          <h2 className="section-title">Milestones & Highlights</h2>
          <p className="section-subtitle">
            Certifications, awards, and recognitions that mark key technical milestones.
          </p>
        </motion.div>

        <div className="achievements-grid">
          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              className={`achievement-card${item.placeholder ? ' placeholder' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Certificate Image Banner (if provided) */}
              {item.image && (
                <div
                  className="achievement-image-wrap"
                  onClick={() => handleOpenLightbox(item)}
                  title="Click to view full certificate"
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    marginBottom: '14px',
                    cursor: 'zoom-in',
                    border: '1px solid var(--border)',
                    height: '160px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(0, 0, 0, 0.75)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid var(--border)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <Maximize2 size={12} style={{ color: 'var(--accent)' }} />
                    <span>View Certificate</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: 36, height: 36,
                  background: `${catColors[item.category] || 'var(--accent)'}18`,
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: catColors[item.category] || 'var(--accent)',
                }}>
                  {item.placeholder ? <PlusCircle size={18} /> : <Trophy size={18} />}
                </div>
                <span className="achievement-cat" style={{ color: catColors[item.category] || 'var(--accent)', margin: 0 }}>
                  {item.category}
                </span>
              </div>

              <h3 className="achievement-title">{item.title}</h3>
              <p className="achievement-description">{item.description}</p>
              <div className="achievement-date" style={{ marginTop: 'auto', paddingTop: '8px' }}>{item.date}</div>

              {item.placeholder && (
                <p className="placeholder-note">
                  ✎ Edit <code>src/data/portfolio.js</code> to add your certificate & image
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Certificate Fullscreen Lightbox Modal ─── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '850px',
                width: '100%',
                maxHeight: '90vh',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-accent)',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0,0,0,0.8), var(--shadow-accent)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Lightbox Header */}
              <div
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    {selectedItem.title}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent)' }}>
                    {selectedItem.category} · {selectedItem.date}
                  </span>
                </div>
                <button
                  onClick={handleCloseLightbox}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                  aria-label="Close certificate preview"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Lightbox Image Preview */}
              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflowY: 'auto',
                  maxHeight: '65vh',
                }}
              >
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '60vh',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  }}
                />
              </div>

              {/* Lightbox Footer Details */}
              <div
                style={{
                  padding: '16px 20px',
                  borderTop: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {selectedItem.description}
                </p>

                {selectedItem.credentialUrl && (
                  <a
                    href={selectedItem.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: '0.82rem', padding: '8px 16px', flexShrink: 0 }}
                  >
                    <ExternalLink size={14} /> Verify Credential
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
