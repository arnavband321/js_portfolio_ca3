import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { education } from '../data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="section-tag">Education</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">My educational journey and academic foundations.</p>
        </motion.div>

        <div className="education-timeline">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="edu-item"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className="edu-dot" aria-hidden="true">
                <GraduationCap size={18} />
              </div>
              <div className="edu-content">
                <div className="edu-meta">
                  <span className="edu-duration">{edu.duration}</span>
                  <span className="edu-status">{edu.status}</span>
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <div className="edu-institution">{edu.institution}</div>
                <div className="edu-location">
                  <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {edu.location}
                </div>
                <p className="edu-description">{edu.description}</p>
                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="edu-highlights">
                    {edu.highlights.map((h, j) => (
                      <div className="edu-highlight" key={j}>{h}</div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
