import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { experience } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="section bg-section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Experience</span>
          <h2 className="section-title">Internship & Experience</h2>
          <p className="section-subtitle">Real-world experience that shaped my practical skills.</p>
        </motion.div>

        <div className="experience-list">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="exp-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="exp-header">
                <div className="exp-title-group">
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company">@ {exp.company}</div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    marginTop: '4px', flexWrap: 'wrap',
                  }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '0.82rem', color: 'var(--text-muted)',
                    }}>
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="exp-meta">
                  <span className="exp-duration">
                    <Calendar size={11} style={{ display: 'inline', marginRight: '4px' }} />
                    {exp.duration}
                  </span>
                  <span className="exp-type-badge">{exp.type}</span>
                </div>
              </div>

              <p className="exp-description">{exp.description}</p>

              <div className="exp-responsibilities">
                <h4>Key Responsibilities</h4>
                <ul className="exp-resp-list">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{
                  fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px',
                }}>
                  Technologies Used
                </h4>
                <div className="exp-tech-tags">
                  {exp.technologies.map(tech => (
                    <span className="tech-tag" key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
