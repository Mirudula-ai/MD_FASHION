import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/content';
import { useLang } from './LanguageContext';
import Reveal from './Reveal';

const taFaqs = [
  { q: 'எனக்கு என் சொந்த துணி கொண்டு வர வேண்டுமா?', a: 'பிளவுஸ், லெஹங்கா, ஆரி வேலைக்கு ஆம். சுடிதர், ஃப்ராக், யூனிஃபார்ம் துணி கொண்டு வரலாம் அல்லது எங்களிடம் தேர்வு செய்யலாம்.' },
  { q: 'பிரடால் பிளவுஸ் எவ்வளவு நாள்?', a: 'சாதாரண பிளவுஸ் 5-7 நாள். ஆரி/சர்தோசி வேலை 7-15 நாள் கூடுதல்.' },
  { q: 'ஃபிட்டிங் உண்டா?', a: 'ஆம், ஒவ்வொரு தனிப்பயன் ஆடைக்கும் குறைந்தது ஒரு ஃபிட்டிங்.' },
  { q: 'பழைய ஆடை சரிசெய்ய முடியுமா?', a: 'ஆம், பிளவுஸ், டிரஸ், லெஹங்கா மாற்றியமைக்க முடியும்.' },
  { q: 'மொத்த ஸ்கூல் யூனிஃபார்ம் ஆர்டர்?', a: 'ஆம், மொத்தத்தில் யூனிஃபார்ம் தைக்கிறோம். WhatsApp-ல் தொடர்பு கொள்ளவும்.' },
  { q: 'எந்த பகுதிகளுக்கு சேவை?', a: 'வ்யாசர்பாடி மற்றும் பெரம்பூர், சென்னை.' },
];

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-gold-500 font-semibold text-sm tracking-widest uppercase mb-2">
            {t('FAQ', 'கேள்விகள்')}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700">
            {t('Frequently Asked', 'அடிக்கடி கேட்கப்படும்')}
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="bg-white rounded-2xl border border-gold-100 shadow-soft overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-heading font-semibold text-navy-700 text-base sm:text-lg">
                    {t(faq.q, taFaqs[i].q)}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gold-500 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-4 text-navy-500 text-sm leading-relaxed">
                    {t(faq.a, taFaqs[i].a)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
