
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { Language, Theme, Settings } from './types';
import { getTranslation } from './lib/i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingWidget from './components/BookingWidget';
import Services from './components/Services';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  TrendingDown, 
  Award, 
  Headphones,
  Star
} from 'lucide-react';

// Context for settings
interface SettingsContextType {
  settings: Settings;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: any) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    language: 'ar',
    theme: 'light',
  });

  useEffect(() => {
    // Initial Load from LocalStorage
    try {
      const savedLang = localStorage.getItem('lang') as Language;
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedLang) setSettings(prev => ({ ...prev, language: savedLang }));
      if (savedTheme) setSettings(prev => ({ ...prev, theme: savedTheme }));
    } catch (e) {}
  }, []);

  useEffect(() => {
    // Apply changes to DOM
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
    
    // Persist
    localStorage.setItem('lang', settings.language);
    localStorage.setItem('theme', settings.theme);
  }, [settings]);

  const t = (key: any) => getTranslation(settings.language, key);

  const contextValue = useMemo(() => ({
    settings,
    setLanguage: (lang: Language) => setSettings(p => ({ ...p, language: lang })),
    setTheme: (theme: Theme) => setSettings(p => ({ ...p, theme })),
    t,
  }), [settings]);

  return (
    <SettingsContext.Provider value={contextValue}>
      <div className="relative min-h-screen">
        <div className="noise fixed inset-0 z-0"></div>
        <div className="relative z-10">
          <Header />
          <main className="pb-24 lg:pb-0">
            <Hero />
            
            <section id="booking" className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
              <ErrorBoundary>
                <BookingWidget />
              </ErrorBoundary>
            </section>

            {/* Social Proof Counters */}
            <section className="py-16 bg-white dark:bg-slate-900">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-extrabold text-primary">+15,000</p>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{t('statsCompleted')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-extrabold text-primary">4.8/5</p>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{t('statsRating')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-extrabold text-primary">+2,500</p>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{t('statsTechs')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-extrabold text-primary">24/7</p>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{t('statsSupport')}</p>
                  </div>
                </div>
              </div>
            </section>

            <Services />

            <Pricing />

            {/* Testimonials Section */}
            <section id="reviews" className="py-24 bg-slate-50 dark:bg-slate-900">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">{t('navReviews')}</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400">{settings.language === 'ar' ? 'آلاف العملاء يثقون بنا يومياً' : 'Thousands of customers trust us daily'}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700">
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="#f97316" className="text-secondary" />)}
                      </div>
                      <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 italic font-medium">
                        {settings.language === 'ar' 
                          ? '"خدمة ممتازة وسريعة جداً، الفني وصل في الميعاد بالظبط وصلح المشكلة باحترافية عالية. شكراً جزيلاً!"' 
                          : '"Excellent and very fast service. The technician arrived exactly on time and fixed the issue with high professionalism. Thank you very much!"'}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
                        <div>
                          <p className="font-bold dark:text-white">{settings.language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed'}</p>
                          <p className="text-sm text-slate-500">{settings.language === 'ar' ? 'القاهرة' : 'Cairo'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            <FAQ />

          </main>
          <Footer />

          {/* Mobile Sticky Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between gap-4">
            <button 
              onClick={() => {
                const el = document.getElementById('booking');
                el?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-center shadow-lg shadow-primary/20"
            >
              {t('ctaBookNow')}
            </button>
            <button 
              onClick={() => window.open('https://wa.me/201210285859', '_blank')} 
              className="p-3 bg-accent text-white rounded-xl shadow-lg shadow-accent/20"
            >
              <MessageCircle />
            </button>
          </div>
        </div>
      </div>
    </SettingsContext.Provider>
  );
};

export default App;
