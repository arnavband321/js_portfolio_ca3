import { motion } from 'framer-motion';
import { Users, Calendar, PlusCircle } from 'lucide-react';
import { contributions } from '../data/portfolio';

const typeIcons = {
  'Club / Organization': Users,
  'Workshop': Calendar,
  'Event / Competition': Users,
};

export default function Contributions() {
  return (
    <section id="contributions" className="section bg-section-alt">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Contributions</span>
          <h2 className="section-title">Clubs, Events & Participation</h2>
          <p className="section-subtitle">
            College activities, workshops, technical events, and community involvement.
          </p>
        </motion.div>

        <div className="contributions-list">
          {contributions.map((item, i) => {
            const Icon = typeIcons[item.type] || Users;
            return (
              <motion.div
                key={item.id}
                className={`contribution-card${item.placeholder ? ' placeholder' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: 32, height: 32,
                    background: 'rgba(108,99,255,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    {item.placeholder ? <PlusCircle size={16} /> : <Icon size={16} />}
                  </div>
                  <span className="contribution-type">{item.type}</span>
                </div>
                <h3 className="contribution-title">{item.title}</h3>
                <p className="contribution-description">{item.description}</p>
                <div className="contribution-date">{item.date}</div>
                {item.placeholder && (
                  <p className="placeholder-note">
                    ✎ Edit <code>src/data/portfolio.js</code> to add your participation details
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
