import { useRef } from 'react';

/**
 * MagneticButton — wraps any child element with a magnetic hover effect.
 * The element smoothly drifts toward the cursor when nearby.
 *
 * Props:
 *   children — the button/link content
 *   strength — how far the element moves (default 0.4)
 *   className — extra classes for the wrapper
 *   style — extra styles for the wrapper
 */
export default function MagneticButton({ children, strength = 0.38, className = '', style = {} }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = 'transform 0.1s ease';
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  };

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      style={{ display: 'inline-block', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
