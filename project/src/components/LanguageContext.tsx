import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Lang = 'en' | 'ta';
interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, ta: string) => string;
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: (en) => en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (en: string, ta: string) => (lang === 'ta' ? ta : en);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
