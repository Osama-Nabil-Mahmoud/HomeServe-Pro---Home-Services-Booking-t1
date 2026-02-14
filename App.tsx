
import React from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import CopyEmailModal from './components/CopyEmailModal';
import { 
  MessageCircle, 
  Star
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { settings, t } = useSettings();

  const scrollToServices = () => {
    const el = document.getElementById('services');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        <div className="noise fixed inset-0 z-0"></div>
        <div className="relative z-10">
          <Header />
          <main className="pb-24 lg:pb-0">
            <Hero />
            
            {/* Social Proof Counters */}
            <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="space-y-2">
                    <p className="text-3xl md:text-5xl font-black text-primary">+15,000</p>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">{t('statsCompleted')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-5xl font-black text-primary">4.8/5</p>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">{t('statsRating')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-5xl font-black text-primary">+2,500</p>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">{t('statsTechs')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-5xl font-black text-primary">24/7</p>
                    <p className="text-slate-500 dark:text-slate-400 font-bold">{t('statsSupport')}</p>
                  </div>
                </div>
              </div>
            </section>

            <Services />
            <Pricing />

            {/* Testimonials Section */}
            <section id="reviews" className="py-24 bg-slate-50 dark:bg-slate-900/50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">{t('navReviews')}</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-400 font-bold">
                    {settings.language === 'ar' ? 'آلاف العملاء يثقون بنا يومياً' : 'Thousands of customers trust us daily'}
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="#f97316" className="text-secondary" />)}
                      </div>
                      <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 italic font-bold">
                        {settings.language === 'ar' 
                          ? '"خدمة ممتازة وسريعة جداً، الفني وصل في الميعاد بالظبط وصلح المشكلة باحترافية عالية. شكراً جزيلاً!"' 
                          : '"Excellent and very fast service. The technician arrived exactly on time and fixed the issue with high professionalism. Thank you very much!"'}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black">
                          {i === 1 ? 'أ' : i === 2 ? 'م' : 'س'}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white">
                            {settings.language === 'ar' 
                              ? (i === 1 ? 'أحمد محمد' : i === 2 ? 'محمود علي' : 'سارة حسن') 
                              : (i === 1 ? 'Ahmed Mohamed' : i === 2 ? 'Mahmoud Ali' : 'Sara Hassan')}
                          </p>
                          <p className="text-sm text-slate-500 font-bold">{settings.language === 'ar' ? 'عميل موثق' : 'Verified Customer'}</p>
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

          {/* Global Modal Layer */}
          <CopyEmailModal />

          {/* Mobile Sticky Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 px-6 flex items-center justify-between gap-4">
            <button 
              onClick={scrollToServices} 
              className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-center shadow-xl shadow-primary/20 active:scale-95 transition-all"
            >
              {t('ctaBookNow')}
            </button>
            <button 
              onClick={() => window.open('https://wa.me/201210285859', '_blank')} 
              className="p-4 bg-accent text-white rounded-2xl shadow-xl shadow-accent/20 active:scale-95 transition-all"
            >
              <MessageCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;
