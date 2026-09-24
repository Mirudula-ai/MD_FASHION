import { useEffect } from 'react';

// 3D tilt on every card (.shadow-card) for mouse and touch. No markup changes needed.
export default function TiltEffect() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cur: HTMLElement | null = null;
    const reset = () => {
      if (cur) cur.style.transform = '';
      cur = null;
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('.shadow-card') as HTMLElement | null;
      if (cur && cur !== el) reset();
      if (!el) return;
      cur = el;
      el.classList.add('tilt-3d');
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * 12).toFixed(1)}deg) rotateY(${(px * 12).toFixed(1)}deg) scale(1.02)`;
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerup', reset);
    document.addEventListener('pointercancel', reset);
    document.addEventListener('pointerleave', reset);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', reset);
      document.removeEventListener('pointercancel', reset);
      document.removeEventListener('pointerleave', reset);
    };
  }, []);
  return null;
}
