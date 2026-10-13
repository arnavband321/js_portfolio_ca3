import { motion } from 'framer-motion';
import { Download, ChevronDown, GitBranch, Link2 } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import HeroVisual from './HeroVisual';
import MagneticButton from './MagneticButton';
import CyberTypewriter from './CyberTypewriter';
import { playClickSound } from '../utils/soundFX';

// Staggered word-by-word reveal for the big name
function SplitText({ text, className }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Hero() {

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" aria-label="Introduction">
      {/* Background orbs */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="container">
        <div className="hero-grid">
          {/* Content */}
          <div className="hero-content">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <span className="hero-badge">Available for Internships 2025–26</span>
            </motion.div>

            {/* Big split-text name reveal — Dennis-style */}
            <h1 className="hero-name" aria-label={personalInfo.name}>
              <SplitText text={personalInfo.name} className="hero-name" />
            </h1>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <CyberTypewriter />
            </motion.div>

            <motion.p className="hero-description" custom={3} variants={fadeUp} initial="hidden" animate="visible">
              {personalInfo.shortBio}{' '}
              Passionate about building things for the web and continuously expanding my technical skill set.
            </motion.p>

            <motion.div className="hero-actions" custom={4} variants={fadeUp} initial="hidden" animate="visible">
              <MagneticButton>
                <a
                  href="#projects"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    playClickSound();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-cursor-label="Explore"
                >
                  View My Work
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={personalInfo.resumeFile}
                  download
                  className="btn btn-secondary"
                  onClick={playClickSound}
                  data-cursor-label="Download"
                >
                  <Download size={16} />
                  Resume
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div className="hero-socials" custom={5} variants={fadeUp} initial="hidden" animate="visible">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" data-cursor-label="GitHub">
                <GitBranch size={15} />
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" data-cursor-label="LinkedIn">
                <Link2 size={15} />
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Interactive Hero Visual (3D tilt + node canvas + terminal) */}
          <HeroVisual />
        </div>

        {/* Scroll down cue */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '48px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <button
            onClick={scrollToAbout}
            className="scroll-cue"
            aria-label="Scroll down to About section"
          >
            <ChevronDown size={20} />
            <span>Scroll</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
