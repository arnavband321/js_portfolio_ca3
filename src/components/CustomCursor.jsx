import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const [label, setLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', move);

    // Track hoverable elements
    const addListeners = () => {
      const links = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      links.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setIsPointer(true);
          const lbl = el.getAttribute('data-cursor-label') || '';
          setLabel(lbl);
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setIsPointer(false);
          setLabel('');
        });
      });
    };

    // Run after DOM is ready
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', move);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isPointer ? 'cursor-dot-hover' : ''}`}
        aria-hidden="true"
      />
      {/* Ring — lags behind with lerp */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'cursor-ring-hover' : ''}`}
        aria-hidden="true"
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
