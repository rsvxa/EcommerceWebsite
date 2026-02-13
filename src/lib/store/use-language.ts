import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  lang: 'kh' | 'en';
  setLang: (lang: 'kh' | 'en') => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      lang: 'kh', 
      setLang: (lang) => set({ lang }),
    }),
    { name: 'language-storage' }
  )
);