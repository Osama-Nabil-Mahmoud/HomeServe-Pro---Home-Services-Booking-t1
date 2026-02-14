
import React, { useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Check, Info, FileText, ArrowRight, ArrowLeft, X, CheckCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';
import { trackEvent, EVENTS } from '../lib/analytics';

const Pricing: React.FC = () => {
  const { t, settings } = useSettings();
  const isRtl = settings.language === 'ar';
  
  // State for form data
  const [quoteMessage, setQuoteMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const clearFiles = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFiles(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleQuoteSubmit = async () => {
    if (!quoteMessage.trim()) {
      alert(isRtl ? 'يرجى كتابة تفاصيل طلبك أولاً' : 'Please enter your request details first');
      return;
    }

    const fileCount = selectedFiles?.length || 0;
    
    // Construct text message
    let fullMessage = isRtl 
      ? `طلب عرض سعر جديد من HomeServe Pro 👋\n------------------\nالتفاصيل: ${quoteMessage}\n`
      : `New Quote Request from HomeServe Pro 👋\n------------------\nDetails: ${quoteMessage}\n`;
    
    if (fileCount > 0) {
      fullMessage += isRtl ? `\n(مرفق صور المعاينة من العميل)` : `\n(Client attached inspection photos)`;
    }

    trackEvent(EVENTS.CTA_QUOTE, { messageLength: quoteMessage.length, fileCount });

    // Try Web Share API (Best for Mobile: sends actual files)
    if (navigator.share && fileCount > 0) {
      try {
        // Explicitly cast to File[] to avoid unknown[] error during Array.from conversion in some environments
        const filesArray = Array.from(selectedFiles!) as File[];
        const shareData: ShareData = {
          title: 'HomeServe Pro Quote',
          text: fullMessage,
          files: filesArray,
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return; 
        }
      } catch (err) {
        console.log('Sharing failed', err);
      }
    }

    if (fileCount > 0) {
      try {
        await navigator.clipboard.writeText(fullMessage);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
        alert(isRtl 
          ? 'تقنياً، يجب إرفاق الصور يدوياً من داخل واتساب. قمنا بنسخ تفاصيل الطلب لك لتسهيل الأمر.' 
          : 'Technically, photos must be attached manually inside WhatsApp. We copied the details for you.');
      } catch (e) {}
    }

    openWhatsApp(fullMessage);
  };

  const plans = [
    {
      name: isRtl ? 'معاينة فنية' : 'Technical Inspection',
      price: '150',
      desc: isRtl ? 'كشف دقيق وتحديد للمشكلة' : 'Accurate diagnosis & issue detection',
      features: ['خصم المعاينة من سعر الخدمة', 'تقرير فني كامل', 'فحص شامل للسباكة والكهرباء'],
      featuresEn: ['Deduct inspection from service fee', 'Full technical report', 'Plumbing & Electrical check'],
    },
    {
      name: isRtl ? 'خدمة سريعة' : 'Quick Service',
      price: '299',
      isPopular: true,
      desc: isRtl ? 'مثالية للإصلاحات البسيطة' : 'Perfect for simple repairs',
      features: ['شامل قطع الغيار البسيطة', 'ضمان 30 يوم', 'وصول خلال ساعة'],
      featuresEn: ['Includes basic spare parts', '30-day warranty', 'Arrival within 1 hour'],
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-block bg-secondary/10 text-secondary px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest">
            {isRtl ? 'باقاتنا' : 'Our Plans'}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('pricingTitle')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            {t('pricingSubtitle')}
          </p>
        </div>

        {/* Updated Grid for 2 Cards centered */}
        <div className="grid md:grid-cols-2 gap-10 mb-24 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[3rem] border-2 transition-all duration-500 ${
                plan.isPopular ? 'border-primary shadow-[0_40px_80px_-20px_rgba(30,64,175,0.2)] scale-105 z-10' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-black tracking-widest uppercase shadow-xl">
                  {isRtl ? 'الأكثر طلباً' : 'Best Value'}
                </div>
              )}
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{plan.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-[15px] font-bold mb-10">{plan.desc}</p>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-6xl font-black text-primary tracking-tighter">{plan.price}</span>
                <span className="text-slate-500 font-black text-xl">{t('currency')}</span>
              </div>
              <ul className="space-y-6 mb-12">
                {(isRtl ? plan.features : plan.featuresEn).map((f, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-300 font-black text-[17px] leading-snug">
                    <Check className="text-accent shrink-0 mt-1" size={22} strokeWidth={3} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => {
                   const bookingEl = document.getElementById('booking');
                   bookingEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-5 rounded-[1.8rem] font-black text-xl transition-all flex items-center justify-center gap-3 ${
                plan.isPopular ? 'bg-primary text-white hover:bg-blue-700 shadow-2xl shadow-primary/30' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-700'
              }`}>
                {t('ctaBookNow')}
                {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </button>
            </div>
          ))}
        </div>

        {/* Quote Form - Premium Glass Style */}
        <div id="quote-form" className="bg-gradient-to-br from-slate-900 to-primary rounded-[3.5rem] p-10 md:p-20 overflow-hidden relative shadow-3xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">{t('ctaQuote')}</h3>
              <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-lg">
                {isRtl 
                  ? 'عندك مشروع كبير أو تشطيبات؟ ابعت لنا التفاصيل وهنرد عليك بعرض سعر مفصل ومنافس خلال 24 ساعة.' 
                  : 'Have a big project? Send us the details and we will reply with a competitive quote within 24 hours.'}
              </p>
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-[2rem] text-white border border-white/10">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <Info size={28} className="text-white" />
                </div>
                <span className="text-lg font-black">{isRtl ? 'شفافية كاملة في الأسعار من أول لحظة' : 'Full price transparency from day one'}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 space-y-6 shadow-2xl">
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">{isRtl ? 'تفاصيل الطلب' : 'Request Details'}</label>
                <textarea 
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  placeholder={isRtl ? 'اوصف لنا طلبك هنا...' : 'Describe your request here...'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary rounded-[2rem] p-6 outline-none min-h-[180px] text-slate-900 dark:text-white font-bold text-lg transition-all"
                ></textarea>
              </div>
              
              <div className="relative group">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                  accept="image/*"
                />
                <div 
                  onClick={handleFileClick}
                  className={`flex items-center justify-between gap-4 p-5 rounded-[1.5rem] border-2 border-dashed transition-all cursor-pointer ${
                    selectedFiles && selectedFiles.length > 0 
                    ? 'bg-primary/5 border-primary text-primary' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <FileText className={`${selectedFiles && selectedFiles.length > 0 ? 'text-primary' : 'group-hover:text-primary'} transition-colors`} />
                    <span className={`text-base font-black ${selectedFiles && selectedFiles.length > 0 ? 'text-primary' : 'group-hover:text-slate-600 dark:group-hover:text-slate-300'} transition-colors`}>
                      {selectedFiles && selectedFiles.length > 0 
                        ? (isRtl ? `${selectedFiles.length} صور تم اختيارها` : `${selectedFiles.length} images selected`)
                        : (isRtl ? 'إرفاق صور المعاينة (اختياري)' : 'Attach photos (optional)')}
                    </span>
                  </div>
                  {selectedFiles && selectedFiles.length > 0 && (
                    <button 
                      onClick={clearFiles}
                      className="p-1 hover:bg-primary/10 rounded-full transition-colors"
                      title={isRtl ? 'مسح الصور' : 'Clear photos'}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              <button 
                onClick={handleQuoteSubmit}
                className="w-full bg-secondary text-white py-6 rounded-[2rem] font-black text-xl hover:bg-orange-600 transition-all shadow-2xl shadow-secondary/30 active:scale-95 flex items-center justify-center gap-3 group"
              >
                {isRtl ? 'ابعت واطلب عرض سعر' : 'Send & Request Quote'}
                {isCopied ? <CheckCircle className="animate-bounce" /> : <ArrowRight className="group-hover:translate-x-1 transition-transform" />}
              </button>
              
              {isCopied && (
                <p className="text-center text-accent text-sm font-bold animate-pulse">
                  {isRtl ? 'تم نسخ تفاصيل الطلب بنجاح!' : 'Order details copied successfully!'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
