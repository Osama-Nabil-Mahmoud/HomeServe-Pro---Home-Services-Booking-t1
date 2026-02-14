
import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MessageSquare, X } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

const Footer: React.FC = () => {
  const { t, settings } = useSettings();
  const isRtl = settings.language === 'ar';
  const socialUrl = "https://www.linkedin.com/login/ar";

  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleContactWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = isRtl 
      ? `مرحبًا HomeServe Pro 👋\nاستفسار بخصوص خدمة صيانة منزلية.` 
      : `Hello HomeServe Pro 👋\nInquiry about home maintenance service.`;
    openWhatsApp(message);
  };

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
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-950 pt-24 pb-12 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/20 transform rotate-3">H</div>
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                HomeServe <span className="text-secondary">Pro</span>
              </span>
            </div>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
              {isRtl 
                ? 'المنصة الأولى والأكثر أماناً في مصر لحجز خدمات الصيانة المنزلية باحترافية كاملة وبأفضل الأسعار.' 
                : 'The #1 and safest platform in Egypt for professional home maintenance bookings at best rates.'}
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href={socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90"
                >
                  <Icon size={22} strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Services List - Now Static Text with clickable header */}
          <div>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-xl font-black mb-8 text-slate-900 dark:text-white tracking-tight hover:text-primary transition-colors text-start"
            >
              {t('navServices')}
            </button>
            <ul className="space-y-5">
              {[t('selectService'), t('selectElectricity'), t('selectAC'), t('selectCleaning')].map(item => (
                <li key={item} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold cursor-default">
                  <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-black mb-8 text-slate-900 dark:text-white tracking-tight">{isRtl ? 'تواصل معنا' : 'Contact Us'}</h4>
            <div className="space-y-6">
              <button 
                onClick={handleContactWhatsApp}
                className="w-full text-start flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-accent transition-all"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Phone size={22} strokeWidth={3} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'تواصل واتساب' : 'WhatsApp Us'}</span>
                  <span dir="ltr" className="text-lg font-black text-slate-900 dark:text-white">01210285859</span>
                </div>
              </button>
              
              <button 
                onClick={handleContactWhatsApp}
                className="w-full text-start flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-primary transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MessageSquare size={22} strokeWidth={3} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{isRtl ? 'دعم فني مباشر' : 'Live Support'}</span>
                  <span className="text-[15px] font-black text-slate-900 dark:text-white">HomeServe Support</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-base font-black tracking-tight">{t('footerRights')}</p>
          <div className="flex gap-8">
            <button 
              onClick={() => setModalType('privacy')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-black transition-colors underline-offset-4 hover:underline"
            >
              {t('privacyPolicy')}
            </button>
            <button 
              onClick={() => setModalType('terms')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-black transition-colors underline-offset-4 hover:underline"
            >
              {t('termsConditions')}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Legal Documents */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {modalType === 'privacy' ? t('privacyPolicy') : t('termsConditions')}
              </h3>
              <button 
                onClick={() => setModalType(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-10 overflow-y-auto text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              <p className="whitespace-pre-line">
                {modalType === 'privacy' ? t('privacyContent') : t('termsContent')}
              </p>
            </div>
            <div className="p-8 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => setModalType(null)}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-primary/20"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
