import { useState, ImgHTMLAttributes } from 'react';

interface ServiceImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
  eager?: boolean;
}

export default function ServiceImage({ src, alt, fallbackLabel = '', className = '', eager = false, ...props }: ServiceImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gold-100 via-blush to-sky ${className}`}
        aria-label={alt}
      >
        <span className="font-heading text-navy-300 text-lg sm:text-xl font-semibold text-center px-4">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
}
