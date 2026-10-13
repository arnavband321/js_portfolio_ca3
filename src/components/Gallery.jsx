import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../data/portfolio';

function GalleryLightbox({ images, index, onClose, onPrev, onNext }) {
  if (index === null || !images[index]) return null;
  const img = images[index];
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
        aria-label={img.caption}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          style={{ position: 'relative', maxWidth: '900px', width: '100%' }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="lightbox-close"
            onClick={onClose}
            style={{ top: '12px', right: '12px', position: 'absolute' }}
            aria-label="Close gallery"
          >
            <X size={16} />
          </button>

          <img
            src={img.src}
            alt={img.caption}
            style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px' }}
          />

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 0', color: 'white',
          }}>
            <button
              onClick={onPrev}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', cursor: 'pointer' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>
              {img.caption} · {index + 1} / {images.length}
            </span>
            <button
              onClick={onNext}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', cursor: 'pointer' }}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const images = galleryImages;

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i - 1 + images.length) % images.length);
  const nextImage = () => setLightboxIndex(i => (i + 1) % images.length);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Gallery</span>
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">
            Moments from college, projects, events, and internship.
          </p>
        </motion.div>

        {images.length === 0 ? (
          <motion.div
            className="gallery-empty"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Image size={48} style={{ margin: '0 auto', opacity: 0.4 }} />
            <h3>No Photos Yet</h3>
            <p>
              Add your photos to <code style={{ color: 'var(--accent)' }}>public/gallery/</code> and
              update the <code style={{ color: 'var(--accent)' }}>galleryImages</code> array in{' '}
              <code style={{ color: 'var(--accent)' }}>src/data/portfolio.js</code>.
            </p>
            <p style={{ marginTop: '8px' }}>
              Example entry:{' '}
              <code style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>
                {'{ src: "/gallery/photo1.jpg", caption: "Caption", category: "College" }'}
              </code>
            </p>
          </motion.div>
        ) : (
          <div className="gallery-grid">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                className="gallery-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${img.caption}`}
                onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
              >
                <img src={img.src} alt={img.caption} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-caption">{img.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      </div>
    </section>
  );
}
