import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, PlusCircle } from 'lucide-react';
import { certifications } from '../data/portfolio';

function CertLightbox({ cert, onClose }) {
  if (!cert) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate: ${cert.title}`}
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="lightbox-close" onClick={onClose} aria-label="Close preview">
            <X size={16} />
          </button>

          {cert.image ? (
            <img src={cert.image} alt={cert.title} className="lightbox-image" />
          ) : (
            <div style={{
              height: '200px',
              background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.1))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', flexDirection: 'column', gap: '12px',
            }}>
              <Award size={48} style={{ opacity: 0.4 }} />
              <span style={{ fontSize: '0.85rem' }}>Certificate image not provided</span>
            </div>
          )}

          <div className="lightbox-body">
            <h3 className="lightbox-title">{cert.title}</h3>
            <p className="lightbox-issuer">{cert.issuer}</p>
            <p className="lightbox-date">{cert.date}</p>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '16px' }}
              >
                <ExternalLink size={14} />
                View Certificate
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Certifications() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certifications" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Certifications</span>
          <h2 className="section-title">Credentials & Certificates</h2>
          <p className="section-subtitle">
            Professional certifications and course completions. Click a card to preview.
          </p>
        </motion.div>

        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className={`cert-card${cert.placeholder ? ' placeholder' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              onClick={() => setSelected(cert)}
              role="button"
              tabIndex={0}
              aria-label={`View certificate: ${cert.title}`}
              onKeyDown={e => e.key === 'Enter' && setSelected(cert)}
            >
              <div className="cert-image-area">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} loading="lazy" />
                ) : (
                  <>
                    {cert.placeholder ? <PlusCircle size={32} style={{ opacity: 0.4 }} /> : <Award size={32} style={{ opacity: 0.4 }} />}
                    <span style={{ fontSize: '0.78rem' }}>
                      {cert.placeholder ? 'Add Certificate Image' : 'Preview Available'}
                    </span>
                  </>
                )}
              </div>
              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">{cert.date}</p>
                {cert.placeholder && (
                  <p className="placeholder-note" style={{ marginTop: '8px' }}>
                    ✎ Edit <code>src/data/portfolio.js</code>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <CertLightbox cert={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
