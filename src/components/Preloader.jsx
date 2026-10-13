import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GREETINGS = [
  { text: 'Hello', lang: 'English' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Guten Tag', lang: 'German' },
  { text: 'Hallå', lang: 'Swedish' },
];

export default function Preloader({ onDone }) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < GREETINGS.length) {
        setIndex(i);
      } else {
        clearInterval(interval);
        // Slight pause on last greeting then exit
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 750);
        }, 400);
      }
    }, 260);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Curtain panels */}
          <motion.div
            className="preloader-panel preloader-panel-top"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />
          <motion.div
            className="preloader-panel preloader-panel-bottom"
            exit={{ y: '100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Greeting text */}
          <div className="preloader-content" aria-live="polite">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={index}
                className="preloader-greeting"
                initial={{ y: 60, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -60, opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              >
                {GREETINGS[index].text}
                <span className="preloader-dot" />
              </motion.div>
            </AnimatePresence>
            <p className="preloader-lang">{GREETINGS[index].lang}</p>
          </div>

          {/* Loading bar */}
          <div className="preloader-bar-wrap">
            <motion.div
              className="preloader-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (index + 1) / GREETINGS.length }}
              transition={{ duration: 0.25, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
