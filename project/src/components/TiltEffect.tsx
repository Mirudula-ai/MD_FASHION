import { useEffect } from 'react';

// 3D card motion. Desktop: cards tilt toward the mouse. Phones: cards rotate in 3D as you
// scroll past them and tilt where you touch. Never blocks scrolling (all listeners passive).
export default function TiltEffect() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const cards = () => Array.from(document.querySelectorAll<HTMLElement>('.shadow-card'));
    let touched: HTMLElement | null = null;

    const tilt = (el: HTMLElement, x: number, y: number) => {
      const r = el.getBoundingClientRect();
      const px = (x - r.left) / r.width - 0.5;
      const py = (y - r.top) / r.height - 0.5;
      el.classList.add('tilt-3d');
      el.style.transform = `perspective(900px) rotateX(${(-py * 14).toFixed(1)}deg) rotateY(${(px * 14).toFixed(1)}deg) scale(1.03)`;
    };
    const onPoint = (e: PointerEvent) => {
      if (coarse && e.type === 'pointermove') return;
      const el = (e.target as HTMLElement | null)?.closest?.('.shadow-card') as HTMLElement | null;
      if (touched && touched !== el) touched.style.transform = '';
      touched = el;
      if (el) tilt(el, e.clientX, e.clientY);
    };
    const release = () => {
      if (touched) touched.style.transform = '';
      touched = null;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const h = window.innerHeight;
        cards().forEach((el) => {
          if (el === touched) return;
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > h) return;
          const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - h / 2) / (h / 2)));
          el.classList.add('tilt-3d');
          el.style.transform = `perspective(900px) rotateX(${(c * -9).toFixed(1)}deg) scale(${(1 - Math.abs(c) * 0.04).toFixed(3)})`;
        });
      });
    };

    document.addEventListener('pointerdown', onPoint, { passive: true });
    document.addEventListener('pointermove', onPoint, { passive: true });
    document.addEventListener('pointerup', release, { passive: true });
    document.addEventListener('pointercancel', release, { passive: true });
    if (coarse) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      onScroll();
      setTimeout(onScroll, 800);
    }
    return () => {
      document.removeEventListener('pointerdown', onPoint);
      document.removeEventListener('pointermove', onPoint);
      document.removeEventListener('pointerup', release);
      document.removeEventListener('pointercancel', release);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return null;
}
