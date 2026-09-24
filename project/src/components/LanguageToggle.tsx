import { useLang } from './LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-gold-300 text-sm font-semibold text-navy-700 hover:border-gold-500 hover:bg-gold-50 transition-colors"
      aria-label="Toggle language"
    >
      <span className={lang === 'en' ? 'text-gold-500' : 'text-navy-300'}>EN</span>
      <span className="text-navy-200">/</span>
      <span className={`font-tamil ${lang === 'ta' ? 'text-gold-500' : 'text-navy-300'}`}>தமிழ்</span>
    </button>
  );
}
