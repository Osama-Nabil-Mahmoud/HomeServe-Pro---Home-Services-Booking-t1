
import React, { useState, useEffect } from 'react';
import { useSettings } from '../App';
import { Sun, Moon, Languages, Menu, X, Smartphone, ArrowLeft, ArrowRight } from 'lucide-react';

const Header: React.FC = () => {
  const { settings, setLanguage, setTheme, t } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.replaceState(null, '', `#${id}`);
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: t('navServices'), id: 'services' },
    { name: t('navPricing'), id: 'pricing' },
    { name: t('navReviews'), id: 'reviews' },
    { name: t('navFAQ'), id: 'faq' },
  ];

  const isRtl = settings.language === 'ar';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-xl py-3 border-b border-slate-100 dark:border-slate-800' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-start"
        >
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20 transform rotate-3">H</div>
          <span className="text-2xl font-black text-slate-900 dark:text-white hidden sm:block tracking-tight">
            HomeServe <span className="text-secondary">Pro</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="font-bold text-[15px] text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setTheme(settings.theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            onClick={() => setLanguage(settings.language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2.5 p-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-bold text-sm"
          >
            <Languages size={18} className="text-primary" />
            <span className="uppercase tracking-wider">{isRtl ? 'EN' : 'عربي'}</span>
          </button>

          <button 
            onClick={() => scrollToSection('booking')}
            className="hidden sm:flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            {t('ctaBookNow')}
            {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>

          <button 
            className="lg:hidden p-2.5 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 rounded-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full h-screen bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-between text-start"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
                {isRtl ? <ArrowLeft className="text-primary" /> : <ArrowRight className="text-primary" />}
              </button>
            ))}
          </div>
          <div className="mt-auto pb-32 flex flex-col gap-4">
            <button 
              onClick={() => scrollToSection('booking')}
              className="w-full bg-primary text-white py-5 rounded-3xl font-black text-xl shadow-2xl shadow-primary/30"
            >
              {t('ctaBookNow')}
            </button>
            <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3">
              <Smartphone /> {t('ctaDownload')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
