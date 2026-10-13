import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import { MapPin, GraduationCap, BookOpen, Cpu } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const interests = [
  'Web Development', 'Cybersecurity', 'Explainable AI', 'Threat Intelligence',
  'Python', 'React', 'Open Source',
];

export default function About() {
  return (
    <section id="about" className="section bg-section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">A little bit about me</h2>
          <p className="section-subtitle">
            Getting to know who I am and what drives me.
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Left: Photo + Quick Facts */}
          <motion.div
            className="about-image-col"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Photo placeholder — replace with actual <img> when photo is available */}
            <div className="about-photo-placeholder" role="img" aria-label="Profile photo placeholder">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span style={{ fontSize: '0.85rem' }}>Add Your Photo</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/public/profile.jpg</span>
            </div>

            {/* Quick Facts */}
            <div className="quick-facts">
              <h4>Quick Facts</h4>
              {personalInfo.quickFacts.map((fact, i) => (
                <div className="quick-fact" key={i}>
                  <span className="quick-fact-label">{fact.label}</span>
                  <span className="quick-fact-value">{fact.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            className="about-content-col"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-bio">
              <p>{personalInfo.bio.split('\n\n')[0]}</p>
              <p>{personalInfo.bio.split('\n\n')[1]}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Areas of Interest
              </h3>
              <div className="about-interests">
                {interests.map(tag => (
                  <span className="interest-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { Icon: GraduationCap, label: 'Degree', value: 'B.Tech – CSE' },
                { Icon: MapPin, label: 'Location', value: 'Nagpur, Maharashtra, India' },
                { Icon: BookOpen, label: 'Year', value: '3rd Year · Semester V' },
                { Icon: Cpu, label: 'Focus', value: 'Web Dev · Security' },
              ].map(({ Icon, label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{
                    width: 36, height: 36,
                    background: 'rgba(108,99,255,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: 'fit-content' }}
            >
              View GitHub Profile →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
