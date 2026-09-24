import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import MagneticButton from './MagneticButton';
import { useLang } from './LanguageContext';
import { whatsappLink } from '@/utils/links';
import { business } from '@/data/content';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: t('Home', 'முகப்பு'), path: '/' },
    { label: t('Services', 'சேவைகள்'), path: '/#services' },
    { label: t('How It Works', 'எப்படி'), path: '/#how-it-works' },
    { label: t('Booking', 'பதிவு'), path: '/#booking' },
    { label: t('FAQ', 'கேள்விகள்'), path: '/#faq' },
    { label: t('Contact', 'தொடர்பு'), path: '/#contact' },
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      if (location.pathname !== '/') {
        window.location.href = `/#${id}`;
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo size={40} />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="gold-underline text-navy-700 font-medium text-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <div className="hidden sm:block">
              <MagneticButton
                as="a"
                href={whatsappLink(`Hello ${business.name}, I'd like to book a service.`)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="sm"
              >
                <MessageCircle size={16} /> WhatsApp
              </MagneticButton>
            </div>
            <button
              className="lg:hidden p-2 text-navy-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-ivory border-t border-gold-200 shadow-card animate-fade-in">
          <nav className="flex flex-col px-4 py-4 gap-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="text-left py-2 text-navy-700 font-medium border-b border-gold-100"
              >
                {item.label}
              </button>
            ))}
            <a
              href={whatsappLink(`Hello ${business.name}, I'd like to book a service.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold mt-2"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
