import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { services } from '@/data/services';
import { business } from '@/data/content';
import { whatsappLink } from '@/utils/links';
import { useLang } from './LanguageContext';
import Reveal from './Reveal';
import MagneticButton from './MagneticButton';

export default function BookingForm() {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: '',
    service: services[0].name,
    location: business.locations[0].label,
    date: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello ${business.name},%0A%0AI'd like to book a service.%0A%0AName: ${form.name}%0AService: ${form.service}%0APreferred Boutique: ${form.location}${form.date ? `%0APreferred Date: ${form.date}` : ''}${form.details ? `%0ADetails: ${form.details}` : ''}`;
    window.open(`https://wa.me/${business.whatsappNumber}?text=${msg}`, '_blank');
  };

  const ta = {
    title: 'பதிவு செய்யவும்',
    subtitle: 'கீழே நிரப்புங்கள், WhatsApp-ல் பதிவு செய்யவும்.',
    name: 'பெயர்',
    service: 'சேவை',
    location: 'புத்தகம்',
    date: 'விரும்பிய தேதி',
    details: 'விவரங்கள்',
    submit: 'WhatsApp-ல் அனுப்பு',
    placeholder: 'உங்கள் பெயர்',
    detailsPlaceholder: 'கூடுதல் விவரங்கள்...',
  };

  return (
    <section id="booking" className="py-20 px-4 bg-blush/40">
      <div className="max-w-2xl mx-auto">
        <Reveal className="text-center mb-8">
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-2">
            {t('Booking', 'பதிவு')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700">
            {t('Book Your Service', t('Book Your Service', ta.title))}
          </h2>
          <p className="text-navy-500 mt-3">
            {t('Fill below and send via WhatsApp.', ta.subtitle)}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gold-100 space-y-4">
            <div>
              <label className="block text-navy-700 font-medium text-sm mb-1.5">
                {t('Your Name', ta.name)} <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t('Enter your name', ta.placeholder)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none text-navy-700 bg-ivory/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-navy-700 font-medium text-sm mb-1.5">
                  {t('Service', ta.service)}
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none text-navy-700 bg-ivory/50 transition-colors"
                >
                  {services.map((s) => (
                    <option key={s.slug} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-navy-700 font-medium text-sm mb-1.5">
                  {t('Boutique', ta.location)}
                </label>
                <select
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none text-navy-700 bg-ivory/50 transition-colors"
                >
                  {business.locations.map((loc) => (
                    <option key={loc.label} value={loc.label}>
                      {loc.label} — {loc.shortAddress}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-navy-700 font-medium text-sm mb-1.5">
                {t('Preferred Date', ta.date)}
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none text-navy-700 bg-ivory/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-navy-700 font-medium text-sm mb-1.5">
                {t('Details', ta.details)}
              </label>
              <textarea
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                placeholder={t('Any additional details...', ta.detailsPlaceholder)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gold-200 focus:border-gold-500 focus:outline-none text-navy-700 bg-ivory/50 transition-colors resize-none"
              />
            </div>

            <MagneticButton type="submit" variant="whatsapp" size="lg" className="w-full">
              <Send size={18} /> {t('Send on WhatsApp', ta.submit)}
            </MagneticButton>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
