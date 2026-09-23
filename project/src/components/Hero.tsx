import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Typewriter from './Typewriter';
import { useLang } from './LanguageContext';
import { business } from '@/data/content';
import { whatsappLink } from '@/utils/links';
import { images } from '@/data/images';
import ServiceImage from './ServiceImage';

export default function Hero() {
  const { t } = useLang();

  const headlineWords = t('Custom Stitching · Perfect Fit', 'தனிப்பயன் தையல் · சரியான அளவு').split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Tamil top line */}
        <p className="font-tamil text-gold-500 text-lg sm:text-xl font-semibold mb-3 animate-fade-in">
          {business.tamilTopLine}
        </p>

        {/* Owner line */}
        <p className="text-navy-500 text-sm sm:text-base font-medium mb-6 animate-fade-in">
          {t('by', 'மூலம்')} <span className="font-semibold text-navy-700">{business.owner}</span> · {business.role}
        </p>

        {/* Headline with word-by-word animation */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy-700 leading-tight mb-4">
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="word-anim inline-block mr-2"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {word === 'Perfect' || word === 'சரியான' ? (
                <span className="shimmer-text">{word}</span>
              ) : word === 'Fit' || word === 'அளவு' ? (
                <span className="shimmer-text">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className="text-navy-500 text-base sm:text-lg mb-4 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          {t('On-Time Delivery · Two Boutiques in Chennai', 'சரியான நேரத்தில் டெலிவரி · சென்னையில் இரண்டு புத்தகங்கள்')}
        </p>

        {/* Typewriter */}
        <div className="text-xl sm:text-2xl mb-8 animate-fade-up" style={{ animationDelay: '1s' }}>
          <span className="text-navy-400">{t('We stitch', 'நாங்கள் தைக்கிறோம்')} </span>
          <Typewriter />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-up" style={{ animationDelay: '1.2s' }}>
          <MagneticButton
            as="a"
            href={whatsappLink(`Hello ${business.name}, I'd like to book a service.`)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
          >
            {t('Book on WhatsApp', 'WhatsApp-ல் பதிவு செய்யவும்')} <ArrowRight size={20} />
          </MagneticButton>
          <Link to="/services/bridal-blouse">
            <MagneticButton variant="outline" size="lg">
              {t('Explore Services', 'சேவைகளைப் பார்க்க')} <ArrowRight size={20} />
            </MagneticButton>
          </Link>
        </div>

        {/* Location badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-navy-500 animate-fade-up" style={{ animationDelay: '1.4s' }}>
          <span className="flex items-center gap-1.5">
            <MapPin size={16} className="text-gold-500" /> Vyasarpadi, Chennai
          </span>
          <span className="hidden sm:inline text-gold-300">·</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={16} className="text-gold-500" /> Perambur, Chennai
          </span>
        </div>
      </div>

      {/* Decorative floating image */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-72 h-96 rounded-4xl overflow-hidden shadow-card animate-float" style={{ zIndex: 5 }}>
        <ServiceImage
          src={images.hero}
          alt="Designer bridal blouse embroidery"
          eager
          className="w-full h-full object-cover"
          fallbackLabel="MD Fashion Boutique"
        />
      </div>
    </section>
  );
}
