import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { images } from '@/data/images';
import { useLang } from './LanguageContext';
import ServiceImage from './ServiceImage';
import Reveal from './Reveal';

export default function ServiceCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const count = services.length;

  const next = useCallback(() => setActive((p) => (p + 1) % count), [count]);
  const prev = useCallback(() => setActive((p) => (p - 1 + count) % count), [count]);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const getSlideStyle = (index: number): React.CSSProperties => {
    const offset = index - active;
    const absOffset = Math.abs(offset);

    // Only render nearby slides
    if (absOffset > 3) return { display: 'none' };

    const isCenter = offset === 0;
    const rotateY = offset * -35;
    const translateZ = -Math.abs(offset) * 180;
    const translateX = offset * 260;
    const scale = isCenter ? 1 : Math.max(0.6, 1 - absOffset * 0.2);
    const opacity = absOffset > 2 ? 0.3 : 1;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - absOffset,
      transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
    };
  };

  // Drag/swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX);
    setPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStart === null) return;
    const diff = e.touches[0].clientX - dragStart;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
      setDragStart(null);
    }
  };
  const onMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setPaused(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    const diff = e.clientX - dragStart;
    if (Math.abs(diff) > 60) {
      if (diff > 0) prev();
      else next();
      setDragStart(null);
    }
  };

  return (
    <section id="services" className="relative py-20 px-4 overflow-hidden">
      <Reveal className="text-center mb-12">
        <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-2">
          {t('Our Services', 'எங்கள் சேவைகள்')}
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700">
          {t('What We Stitch', 'நாங்கள் தைப்பது')}
        </h2>
        <p className="text-navy-500 mt-3 max-w-2xl mx-auto">
          {t('Tap a service to see details, gallery, and booking.', 'விவரங்கள், படங்கள் மற்றும் பதிவுக்கு ஒரு சேவையைத் தட்டவும்.')}
        </p>
      </Reveal>

      {/* Carousel */}
      <div
        className="relative h-[420px] sm:h-[480px] flex items-center justify-center"
        style={{ perspective: '1200px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setDragStart(null); }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={() => setDragStart(null)}
        ref={containerRef}
      >
        {services.map((service, i) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="absolute"
            style={getSlideStyle(i)}
            onClick={(e) => {
              if (i !== active) {
                e.preventDefault();
                setActive(i);
              }
            }}
          >
            <div
              className={`relative w-[280px] sm:w-[340px] h-[380px] sm:h-[420px] rounded-3xl overflow-hidden bg-white shadow-card border-2 ${
                i === active ? 'border-gold-500' : 'border-gold-200'
              }`}
            >
              <ServiceImage
                src={images.services[service.slug as keyof typeof images.services].hero}
                alt={service.name}
                eager={Math.abs(i - active) <= 1}
                className="w-full h-full object-cover"
                fallbackLabel={service.name}
              />
              {/* White label at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-4 py-4 border-t border-gold-200">
                <h3 className="font-heading font-bold text-navy-700 text-base sm:text-lg leading-tight mb-1">
                  {service.name}
                </h3>
                <span className="text-gold-500 text-sm font-medium flex items-center gap-1">
                  {t('View details', 'விவரங்கள்')} <ArrowRight size={14} />
                </span>
              </div>
              {/* Slide number badge */}
              <div className="absolute top-3 left-3 bg-navy-700/90 text-gold-400 text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                {i + 1}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gold-300 text-navy-700 hover:bg-gold-50 hover:border-gold-500 transition-colors shadow-soft"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === active ? 'w-8 bg-gold-500' : 'w-2.5 bg-gold-200 hover:bg-gold-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gold-300 text-navy-700 hover:bg-gold-50 hover:border-gold-500 transition-colors shadow-soft"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
