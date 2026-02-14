
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { Settings, Language, Theme } from '../types';
import { getTranslation } from '../lib/i18n';

export interface EmailCopyData {
  to: string;
  subject: string;
  body: string;
  url: string;
}

export interface SettingsContextType {
  settings: Settings;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: any) => string;
  copyModalData: EmailCopyData | null;
  showCopyModal: (data: EmailCopyData) => void;
  hideCopyModal: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    language: 'ar',
    theme: 'light',
  });
  
  const [copyModalData, setCopyModalData] = useState<EmailCopyData | null>(null);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('lang') as Language;
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedLang) setSettings(prev => ({ ...prev, language: savedLang }));
      if (savedTheme) setSettings(prev => ({ ...prev, theme: savedTheme }));
    } catch (e) {}
  }, []);

  useEffect(() => {
    const doc = document.documentElement;
    doc.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
    doc.lang = settings.language;
    if (settings.theme === 'dark') {
      doc.classList.add('dark');
      document.body.classList.add('bg-slate-950', 'text-slate-50');
      document.body.classList.remove('bg-white', 'text-slate-900');
    } else {
      doc.classList.remove('dark');
      document.body.classList.add('bg-white', 'text-slate-900');
      document.body.classList.remove('bg-slate-950', 'text-slate-50');
    }
    localStorage.setItem('lang', settings.language);
    localStorage.setItem('theme', settings.theme);
  }, [settings]);

  const t = (key: any) => getTranslation(settings.language, key);

  const contextValue = useMemo(() => ({
    settings,
    setLanguage: (lang: Language) => setSettings(p => ({ ...p, language: lang })),
    setTheme: (theme: Theme) => setSettings(p => ({ ...p, theme })),
    t,
    copyModalData,
    showCopyModal: (data: EmailCopyData) => setCopyModalData(data),
    hideCopyModal: () => setCopyModalData(null),
  }), [settings, copyModalData]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
