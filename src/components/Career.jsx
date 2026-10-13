import { motion } from 'framer-motion';
import { Globe, Shield, Brain, Cloud } from 'lucide-react';
import { careerInterests } from '../data/portfolio';

const iconMap = { Globe, Shield, Brain, Cloud };

export default function Career() {
  return (
    <section id="career" className="section bg-section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Career Interests</span>
          <h2 className="section-title">Where I Want to Grow</h2>
          <p className="section-subtitle">
            The domains and fields I'm actively learning and aiming to work in.
          </p>
        </motion.div>

        <div className="career-grid">
          {careerInterests.map((item, i) => {
            const Icon = iconMap[item.icon] || Globe;
            return (
              <motion.div
                key={item.title}
                className="career-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <div className="career-icon" aria-hidden="true">
                  <Icon size={24} />
                </div>
                <h3 className="career-title">{item.title}</h3>
                <p className="career-description">{item.description}</p>
                <div className="career-tags">
                  {item.tags.map(tag => (
                    <span className="career-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
