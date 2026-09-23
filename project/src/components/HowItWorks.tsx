import { howItWorks } from '@/data/content';
import { images } from '@/data/images';
import { useLang } from './LanguageContext';
import Reveal from './Reveal';
import ServiceImage from './ServiceImage';

const ta = [
  { title: 'டிசைன் தேர்வு', desc: 'உங்கள் சேலை அல்லது துணி கொடுங்கள்.' },
  { title: 'அளவு', desc: 'எங்கள் புத்தகத்தில் அளவு எடுக்கப்படும்.' },
  { title: 'தையல்', desc: 'அனுபவம் வாய்ந்த தையல்காரர்கள்.' },
  { title: 'ஃபிட்டிங்', desc: 'சரியான அளவிற்கு சரிசெய்தல்.' },
  { title: 'டெலிவரி', desc: 'சரியான நேரத்தில் டெலிவரி.' },
];

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-2">
            {t('How It Works', 'எப்படி செய்கிறோம்')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700">
            {t('From Design to Delivery', 'டிசைனிலிருந்து டெலிவரி வரை')}
          </h2>
        </Reveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {howItWorks.map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="text-center relative">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-card border-2 border-gold-200">
                    <ServiceImage
                      src={images.howItWorks[i]}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      fallbackLabel={step.title}
                    />
                    <div className="absolute top-1 right-1 bg-navy-700 text-gold-400 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-navy-700 text-base mb-1">
                    {t(step.title, ta[i].title)}
                  </h3>
                  <p className="text-navy-500 text-xs leading-relaxed px-2">
                    {t(step.desc, ta[i].desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
