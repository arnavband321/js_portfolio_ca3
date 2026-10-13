import { motion } from 'framer-motion';
import { Code2, Globe, Shield, Wrench } from 'lucide-react';
import { skills } from '../data/portfolio';
import TiltCard from './TiltCard';

const iconMap = { Code2, Globe, Shield, Wrench };

const levelClass = {
  'Familiar': 'level-familiar',
  'Intermediate': 'level-intermediate',
  'Working Knowledge': 'level-working',
};

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Technical Skills</span>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-subtitle">
            Technologies, tools, and concepts I've learned and applied in real projects.
          </p>
        </motion.div>

        {/* Skill level legend */}
        <div style={{
          display: 'flex', gap: '12px', flexWrap: 'wrap',
          justifyContent: 'center', marginBottom: '40px',
        }}>
          {[
            { label: 'Working Knowledge', cls: 'level-working' },
            { label: 'Intermediate', cls: 'level-intermediate' },
            { label: 'Familiar', cls: 'level-familiar' },
          ].map(({ label, cls }) => (
            <span key={label} className={`skill-level ${cls}`}>{label}</span>
          ))}
        </div>

        <div className="skills-grid">
          {skills.map((category, i) => {
            const Icon = iconMap[category.icon] || Code2;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{ height: '100%' }}
              >
                <TiltCard maxTilt={6} className="skill-tilt-wrap" style={{ height: '100%', borderRadius: 'var(--radius-md)' }}>
                  <div className="skill-category-card" style={{ height: '100%' }}>
                    <div className="skill-cat-header">
                      <div className="skill-cat-icon" aria-hidden="true">
                        <Icon size={20} />
                      </div>
                      <h3 className="skill-cat-title">{category.category}</h3>
                    </div>
                    <div className="skill-items">
                      {category.items.map(item => (
                        <div className="skill-item" key={item.name}>
                          <span className="skill-name">{item.name}</span>
                          <span className={`skill-level ${levelClass[item.level] || 'level-familiar'}`}>
                            {item.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
