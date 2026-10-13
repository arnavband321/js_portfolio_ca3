import { useState, useEffect } from 'react';
import { usePalette } from './context/PaletteContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contributions from './components/Contributions';
import Gallery from './components/Gallery';
import Career from './components/Career';
import Contact from './components/Contact';
import Footer from './components/Footer';

// New Dennis-inspired components
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import StatsTicker from './components/StatsTicker';
import CommandPalette from './components/CommandPalette';
import MatrixRain from './components/MatrixRain';
import ThemeStudio from './components/ThemeStudio';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);
  const { theme, toggleTheme } = usePalette();

  return (
    <>
      {/* Matrix rain easter egg */}
      {matrixActive && <MatrixRain onClose={() => setMatrixActive(false)} />}

      {/* Custom cursor — hidden on touch devices via CSS */}
      <CustomCursor />

      {/* Preloader */}
      {loading && <Preloader onDone={() => setLoading(false)} />}

      {/* Main content — shown after preloader */}
      {!loading && (
        <>
          <ScrollProgress />
          {/* Command palette trigger lives in Navbar area */}
          <CommandPalette theme={theme} toggleTheme={toggleTheme} />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Hero />
            <StatsTicker />
            <About />
            <Education />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Certifications />
            <Contributions />
            <Gallery />
            <Career />
            <Contact />
          </main>
          <Footer />
          {/* Dedicated 60-30-10 Color Lab / Theme Studio */}
          <ThemeStudio />
        </>
      )}
    </>
  );
}
