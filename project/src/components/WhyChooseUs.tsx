import { Scissors, Sparkles, Clock, HeartHandshake } from 'lucide-react';
import { whyChoose } from '@/data/content';
import { useLang } from './LanguageContext';
import Reveal from './Reveal';

const iconMap = { Scissors, Sparkles, Clock, HeartHandshake };

export default function WhyChooseUs() {
  const { t } = useLang();

  const ta = [
    { title: 'தனிப்பயன் தையல்', desc: 'ஒவ்வொரு ஆடையும் உங்கள் அளவிற்கு தைக்கப்படுகிறது.' },
    { title: 'டிசைனர் முடிப்பு', desc: 'சுத்தமான முடிப்பு, டிசைனர் பின் கழுத்துகள்.' },
    { title: 'சரியான நேரத்தில் டெலிவரி', desc: 'உங்கள் தேதிக்கு முன் டெலிவரி.' },
    { title: 'இரண்டு புத்தகங்கள்', desc: 'வ்யாசர்பாடி அல்லது பெரம்பூர்.' },
  ];

  return (
    <section className="py-20 px-4 bg-cream/50">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-2">
            {t('Why Choose Us', 'ஏன் எங்களைத் தேர்வு செய்ய?')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700">
            {t('The MD Difference', 'MD வித்தியாசம்')}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="tilt-card bg-white rounded-2xl p-6 shadow-card border border-gold-100 h-full text-center hover:shadow-gold-lg">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-50 mb-4 mx-auto">
                    <Icon size={28} className="text-gold-500" />
                  </div>
                  <h3 className="font-heading font-bold text-navy-700 text-lg mb-2">
                    {t(item.title, ta[i].title)}
                  </h3>
                  <p className="text-navy-500 text-sm leading-relaxed">
                    {t(item.desc, ta[i].desc)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
