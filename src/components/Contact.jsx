import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, GitBranch, Link2, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // Mailto fallback — replace with real backend/email service when available
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Whether it's a project, internship opportunity, or just to say hi — I'm happy to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's Connect</h3>
            <p>
              I'm currently open to internship opportunities and collaborations. Feel free to reach out
              through the form or directly via email or LinkedIn.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon" aria-hidden="true"><Mail size={16} /></div>
                <a href={`mailto:${personalInfo.email}`} style={{ color: 'var(--text-secondary)' }}>
                  {personalInfo.email}
                </a>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon" aria-hidden="true"><MapPin size={16} /></div>
                <span>{personalInfo.location}</span>
              </div>
            </div>

            <div className="contact-socials">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                aria-label="GitHub Profile"
              >
                <GitBranch size={16} />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                aria-label="LinkedIn Profile"
              >
                <Link2 size={16} />
                LinkedIn
              </a>
            </div>

            {/* Response time note */}
            <div style={{
              padding: '16px',
              background: 'rgba(108,99,255,0.06)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-md)',
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                💬 I typically respond within <strong>1–2 business days</strong>.
                Best reached via email or LinkedIn.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            aria-label="Contact form"
          >
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Your Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <p className="form-disclaimer">
              ℹ️ Clicking "Send Message" will open your email client with the message pre-filled.
            </p>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ justifyContent: 'center' }}
              aria-label="Send message"
            >
              <Send size={16} />
              {submitted ? 'Opening Email Client...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
