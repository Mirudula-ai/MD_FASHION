import { useRef, ButtonHTMLAttributes, ReactNode } from 'react';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'gold' | 'navy' | 'outline' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
  as = 'button',
  href,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const variants = {
    gold: 'bg-gold-500 text-navy-700 hover:bg-gold-400 shadow-gold',
    navy: 'bg-navy-700 text-ivory hover:bg-navy-600 shadow-soft',
    outline: 'border-2 border-gold-500 text-navy-700 hover:bg-gold-50',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1eb558] shadow-soft',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  const baseClass = `magnetic-btn inline-flex items-center justify-center gap-2 font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`;

  if (as === 'a' && href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={baseClass}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={baseClass}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </button>
  );
}
