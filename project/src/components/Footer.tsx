import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { business } from '@/data/content';
import { services } from '@/data/services';
import { whatsappLink, telLink } from '@/utils/links';
import { useLang } from './LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white/70 backdrop-blur-md text-navy-700 border-t border-purple-200 pt-16 pb-8 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo size={44} />
            </div>
            <p className="font-tamil text-gold-700 text-sm mb-2">{business.tamilTopLine}</p>
            <p className="text-navy-600 text-sm leading-relaxed">
              {t(business.tagline, 'தனிப்பயன் தையல் · சரியான அளவு · சரியான நேரத்தில் டெலிவரி')}
            </p>
            <p className="text-navy-500 text-xs mt-3">
              {business.owner} · {business.role}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-gold-700 text-lg mb-4">
              {t('Services', 'சேவைகள்')}
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-navy-600 text-sm hover:text-gold-600 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-heading font-bold text-gold-700 text-lg mb-4">
              {t('Locations', 'இடங்கள்')}
            </h3>
            {business.locations.map((loc) => (
              <div key={loc.label} className="mb-4">
                <p className="text-gold-700 text-xs font-semibold uppercase mb-1">{loc.label}</p>
                <p className="text-navy-600 text-sm flex items-start gap-1.5">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  {loc.address}
                </p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-gold-700 text-lg mb-4">
              {t('Contact', 'தொடர்பு')}
            </h3>
            <div className="space-y-3">
              <a
                href={whatsappLink(`Hello ${business.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-navy-600 text-sm hover:text-gold-600 transition-colors"
              >
                <MessageCircle size={16} className="text-[#25D366]" /> {business.whatsapp}
              </a>
              <a
                href={telLink()}
                className="flex items-center gap-2 text-navy-600 text-sm hover:text-gold-600 transition-colors"
              >
                <Phone size={16} className="text-gold-700" /> {business.whatsapp}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-700/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-navy-400 text-xs">
            © {year} {business.name}. {t('All rights reserved.', 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.')}
          </p>
          <p className="text-navy-400 text-xs">
            {t('Vyasarpadi & Perambur, Chennai', 'வ்யாசர்பாடி & பெரம்பூர், சென்னை')}
          </p>
        </div>
      </div>
    </footer>
  );
}
