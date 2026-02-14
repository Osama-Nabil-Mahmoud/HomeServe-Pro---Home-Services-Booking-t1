
import React from 'react';
import { useSettings } from '../App';
import { CheckCircle2, Award, Zap, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

const Hero: React.FC = () => {
  const { t, settings } = useSettings();
  const isRtl = settings.language === 'ar';

  const scrollToQuote = () => {
    const element = document.getElementById('quote-form');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative pt-36 pb-32 lg:pt-56 lg:pb-64 overflow-hidden">
      {/* Premium Gradient Backgrounds */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-70"></div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className={`space-y-8 text-center lg:text-start ${isRtl ? 'lg:pr-4' : 'lg:pl-4'}`}>
          <div className={`shimmer-sweep inline-flex items-center gap-2.5 bg-accent/10 text-accent px-5 py-2.5 rounded-full font-black text-sm uppercase tracking-wider shadow-sm border border-accent/20`}>
            <ShieldCheck size={18} className="icon-pop" />
            {t('trustChip4')}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-[900] text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            {t('tagline')}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {t('subTagline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <button 
              onClick={scrollToBooking}
              className="group bg-primary text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-primary/30 transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              {t('ctaBookNow')}
              <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                {isRtl ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
              </span>
            </button>
            <button 
              onClick={scrollToQuote}
              className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all transform hover:-translate-y-1 shadow-xl"
            >
              {t('ctaQuote')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 max-w-md mx-auto lg:mx-0">
            <div className={`flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold bg-white/50 dark:bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 dark:border-slate-800 ${isRtl ? 'flex-row' : ''}`}>
              <CheckCircle2 size={24} className="text-accent shrink-0" />
              <span className="text-lg">{t('trustChip1')}</span>
            </div>
            <div className={`flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold bg-white/50 dark:bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 dark:border-slate-800 ${isRtl ? 'flex-row' : ''}`}>
              <Zap size={24} className="text-secondary shrink-0" />
              <span className="text-lg">{t('trustChip3')}</span>
            </div>
          </div>
          
          <p className="text-base text-slate-400 font-bold opacity-75">{t('microcopy')}</p>
        </div>

        {/* Hero Visual - Updated Container */}
        <div className="relative hidden lg:block perspective-1000">
          <div className={`relative z-10 transition-transform duration-700 ${isRtl ? 'rotate-y-[-12deg]' : 'rotate-y-[12deg]'}`}>
            <div className="relative p-6 bg-white dark:bg-slate-800 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-slate-100 dark:border-slate-700">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200" 
                alt="Home Maintenance Services" 
                className="w-full h-auto rounded-[2.2rem] shadow-inner"
              />
              
              {/* Floating Badge (Warranty) */}
              <div className={`absolute -bottom-8 ${isRtl ? '-right-10' : '-left-10'} bg-secondary p-5 rounded-[2rem] shadow-2xl shadow-secondary/40 flex items-center gap-4`}>
                 <Award size={32} color="white" strokeWidth={2.5} />
                 <span className="text-white font-black text-lg whitespace-nowrap">
                   {isRtl ? 'ضمان معتمد' : 'Certified Warranty'}
                 </span>
              </div>
            </div>

            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-primary/5 rounded-full pointer-events-none -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary/5 rounded-full pointer-events-none -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
