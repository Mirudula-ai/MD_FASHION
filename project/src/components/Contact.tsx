import { MapPin, Phone, MessageCircle, Navigation } from 'lucide-react';
import { business } from '@/data/content';
import { whatsappLink, telLink } from '@/utils/links';
import { useLang } from './LanguageContext';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const { t } = useLang();

  const ta = {
    title: 'எங்களைத் தொடர்பு கொள்ள',
    subtitle: 'எங்கள் இரண்டு கடைகளில் ஏதேனும் ஒன்றிற்கு வரவும்.',
    directions: 'வழிகாட்டி',
    call: 'அழை',
    whatsapp: 'WhatsApp',
  };

  return (
    <section id="contact" className="py-20 px-4 bg-sky/40">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-2">
            {t('Contact', 'தொடர்பு')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700">
            {t('Visit Our Boutiques', ta.title)}
          </h2>
          <p className="text-navy-500 mt-3">
            {t('Come to either of our two locations in Chennai.', ta.subtitle)}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {business.locations.map((loc, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white rounded-3xl p-6 shadow-card border border-gold-100 overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-navy-700 text-gold-400 text-xs font-bold px-3 py-1 rounded-full">
                    {loc.label}
                  </span>
                </div>
                <div className="flex items-start gap-2 mb-4">
                  <MapPin size={20} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <p className="text-navy-700 font-medium text-sm sm:text-base">{loc.address}</p>
                </div>

                {/* Embedded map */}
                <div className="relative rounded-2xl overflow-hidden mb-4 border border-gold-100 h-56 bg-gradient-to-br from-purple-100 to-pink-50">
                  <div className="absolute inset-0 flex items-center justify-center text-navy-500 text-sm gap-2"><MapPin size={18} /> {loc.label}</div>
                  <iframe
                    title={`Map of ${loc.label}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    className="relative z-10"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&z=16&hl=en&output=embed`}
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 left-2 z-20 bg-white/95 text-navy-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-soft"
                  >
                    {t('Open in Google Maps', 'Google Maps-ல் திற')}
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-navy-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-600 transition-colors"
                  >
                    <Navigation size={16} /> {t('Directions', ta.directions)}
                  </a>
                  <a
                    href={telLink()}
                    className="flex items-center gap-1.5 bg-gold-500 text-navy-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gold-400 transition-colors"
                  >
                    <Phone size={16} /> {t('Call', ta.call)}
                  </a>
                  <a
                    href={whatsappLink(`Hello ${business.name}, I'd like to visit your ${loc.label}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1eb558] transition-colors"
                  >
                    <MessageCircle size={16} /> {t('WhatsApp', ta.whatsapp)}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quick call bar */}
        <Reveal delay={200}>
          <div className="mt-6 bg-gradient-to-r from-purple-100 via-pink-50 to-amber-50 border border-gold-200 rounded-3xl p-6 text-center">
            <p className="text-gold-700 font-heading text-xl sm:text-2xl font-bold mb-3">
              {t('Call us directly', 'நேரடியாக அழைக்கவும்')}
            </p>
            <a href={telLink()} className="text-navy-700 text-2xl sm:text-3xl font-heading font-bold hover:text-gold-600 transition-colors">
              {business.whatsapp}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
