import { GitBranch, Link2, Mail, Heart } from 'lucide-react';
import { personalInfo, navLinks } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <h3>Arnav<span>.</span></h3>
            <p>
              {personalInfo.tagline}.
              <br />
              B.Tech in Computer Science and Engineering at Symbiosis Institute of Technology (SIT), Nagpur.
            </p>
            <div className="footer-socials">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <GitBranch size={16} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <Link2 size={16} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="footer-social-link"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <div className="footer-links">
              {navLinks.slice(0, 5).map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>More</h4>
            <div className="footer-links">
              {navLinks.slice(5).map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={personalInfo.resumeFile}
                download
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} {personalInfo.name}. All rights reserved.
          </p>
          <p className="footer-made" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built with <Heart size={12} style={{ color: 'var(--accent)' }} aria-hidden="true" /> using React + Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
