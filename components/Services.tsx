
"use client";

import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { 
  Droplets, Zap, Wind, Trash2, Hammer, Paintbrush, Tv, Bug, X, Calendar, MapPin, Info, AlertCircle, ArrowRight, MessageSquare, Mail, CheckCircle
} from 'lucide-react';
import { sendContact } from '../lib/contact';
import { trackEvent, EVENTS } from '../lib/analytics';

const Services: React.FC = () => {
  const { t, settings, showCopyModal } = useSettings();
  const isRtl = settings.language === 'ar';

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'gmail'>('whatsapp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal Form State
  const [formData, setFormData] = useState({
    date: '',
    city: '',
    time: 'دلوقتي',
    emergency: false,
    notes: ''
  });

  const cities = ["القاهرة", "الجيزة", "الإسكندرية", "المنصورة", "طنطا", "الزقازيق", "الإسماعيلية", "بورسعيد", "السويس", "أخرى"];
  const times = isRtl ? ["دلوقتي", "خلال ساعتين", "تحديد معاد"] : ["Now", "In 2 hours", "Schedule time"];

  const services = [
    { id: 'plumbing', icon: <Droplets />, title: t('selectService'), color: 'bg-blue-600', shadow: 'shadow-blue-500/20' },
    { id: 'electrical', icon: <Zap />, title: t('selectElectricity'), color: 'bg-yellow-500', shadow: 'shadow-yellow-500/20' },
    { id: 'ac', icon: <Wind />, title: t('selectAC'), color: 'bg-cyan-500', shadow: 'shadow-cyan-500/20' },
    { id: 'cleaning', icon: <Trash2 />, title: t('selectCleaning'), color: 'bg-green-600', shadow: 'shadow-green-500/20' },
    { id: 'carpentry', icon: <Hammer />, title: t('selectCarpentry'), color: 'bg-amber-700', shadow: 'shadow-amber-500/20' },
    { id: 'painting', icon: <Paintbrush />, title: t('selectPainting'), color: 'bg-purple-600', shadow: 'shadow-purple-500/20' },
    { id: 'appliances', icon: <Tv />, title: t('selectHomeApp'), color: 'bg-red-600', shadow: 'shadow-red-500/20' },
    { id: 'pest', icon: <Bug />, title: t('selectPest'), color: 'bg-emerald-600', shadow: 'shadow-emerald-500/20' },
  ];

  useEffect(() => {
    try {
      const savedMethod = localStorage.getItem('contactMethod');
      if (savedMethod === 'whatsapp' || savedMethod === 'gmail') {
        setContactMethod(savedMethod);
      }
    } catch (e) {}
  }, []);

  const handleOpenModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setIsSubmitting(false);
  };

  const handleMethodChange = (method: 'whatsapp' | 'gmail') => {
    setContactMethod(method);
    try {
      localStorage.setItem('contactMethod', method);
    } catch (e) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    trackEvent(EVENTS.CTA_BOOK_NOW, { service: selectedService, ...formData, method: contactMethod });

    const isAr = settings.language === 'ar';
    const emergencyLabel = formData.emergency ? (isAr ? 'نعم' : 'Yes') : (isAr ? 'لا' : 'No');
    
    const messageContent = isAr ? 
`مرحبًا HomeServe Pro 👋
أريد حجز خدمة صيانة منزلية بالبيانات التالية:
• الخدمة المطلوبة: ${selectedService}
• التاريخ المفضل: ${formData.date || 'غير محدد'}
• المدينة: ${formData.city || 'غير محدد'}
• الوقت: ${formData.time || 'غير محدد'}
• حالة طوارئ: ${emergencyLabel}
• ملاحظات إضافية: ${formData.notes || 'لا يوجد'}

يرجى تأكيد الحجز وتحديد موعد الوصول. شكراً` :
`Hello HomeServe Pro 👋
I would like to book a home service with the following details:
• Service: ${selectedService}
• Date: ${formData.date || 'Not specified'}
• City: ${formData.city || 'Not specified'}
• Time: ${formData.time || 'Not specified'}
• Emergency: ${emergencyLabel}
• Notes: ${formData.notes || 'None'}

Please confirm the booking and provide the ETA. Thanks`;

    const emailSubject = isAr ? `طلب حجز خدمة: ${selectedService}` : `Booking Request: ${selectedService}`;

    // Close booking modal first to avoid stacking issues as requested
    handleCloseModal();

    sendContact({
      method: contactMethod,
      whatsappMessage: messageContent,
      subject: emailSubject,
      body: messageContent,
      onShowCopyModal: (data) => showCopyModal(data)
    });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section id="services" className="py-32 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block bg-primary/5 text-primary px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-4">
            {isRtl ? 'خدماتنا' : 'Our Services'}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            {isRtl 
              ? 'كل اللي بيتك محتاجه هتلاقيه عندنا بضغطة واحدة، فنيين متخصصين لكل المجالات مع ضمان الجودة.' 
              : 'Everything your home needs is here. Specialized technicians for all fields with quality assurance.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[3rem] transition-all duration-500 border-2 border-transparent hover:border-primary/20 flex flex-col items-center lg:items-start text-center lg:text-start select-none shadow-sm hover:shadow-xl"
            >
              <div className={`${service.color} ${service.shadow} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white mb-6 transition-all duration-500 shadow-lg group-hover:scale-110`}>
                {React.cloneElement(service.icon as React.ReactElement<any>, { size: 32, strokeWidth: 2.5 })}
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed mb-6">
                {isRtl ? 'صيانة احترافية بضمان حقيقي' : 'Professional maintenance with warranty'}
              </p>
              
              <button 
                onClick={() => handleOpenModal(service.title)}
                className="w-full py-3.5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                {isRtl ? 'احجز' : 'Book'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 flex flex-col max-h-[95vh] relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <h3 id="modal-title" className="text-2xl font-black text-slate-900 dark:text-white">
                {isRtl ? 'حجز خدمة' : 'Book Service'}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-400 hover:text-primary transition-all shadow-sm border border-slate-100 dark:border-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">
                  {isRtl ? 'الخدمة المختارة' : 'Selected Service'}
                </label>
                <div className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-transparent rounded-[1.5rem] p-5 font-black text-lg text-slate-900 dark:text-white flex items-center gap-3">
                  <Info className="text-primary" size={20} />
                  {selectedService}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">
                    {isRtl ? 'التاريخ' : 'Date'}
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute ${isRtl ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-primary`} size={20} />
                    <input 
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className={`w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-primary rounded-[1.5rem] ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 outline-none font-bold text-slate-900 dark:text-white`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">
                    {isRtl ? 'المدينة' : 'City'}
                  </label>
                  <div className="relative">
                    <MapPin className={`absolute ${isRtl ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-primary`} size={20} />
                    <select 
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className={`w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-primary rounded-[1.5rem] ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 outline-none font-bold text-slate-900 dark:text-white appearance-none cursor-pointer`}
                    >
                      <option value="">{isRtl ? 'اختر المدينة' : 'Select City'}</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">
                  {isRtl ? 'الوقت المفضل' : 'Preferred Time'}
                </label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-[1.5rem] border border-slate-200 dark:border-slate-700">
                  {times.map(tOption => (
                    <button 
                      key={tOption}
                      type="button"
                      onClick={() => setFormData({...formData, time: tOption})}
                      className={`flex-1 py-3 px-2 rounded-xl font-black text-[15px] transition-all ${formData.time === tOption ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
                    >
                      {tOption}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                      <AlertCircle size={20} />
                    </div>
                    <span className="font-black text-lg text-slate-900 dark:text-white">{isRtl ? 'طوارئ' : 'Emergency'}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.emergency}
                      onChange={(e) => setFormData({...formData, emergency: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
                  </label>
                </div>
                <p className="text-xs font-bold text-slate-500">
                  {isRtl ? 'الطوارئ: وصول خلال 30 دقيقة حسب التوفر.' : 'Emergency: 30-min arrival based on availability.'}
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">
                  {isRtl ? 'طريقة التواصل' : 'Contact Method'}
                </label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-[1.5rem] border border-slate-200 dark:border-slate-700">
                  <button 
                    type="button"
                    onClick={() => handleMethodChange('whatsapp')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm transition-all ${contactMethod === 'whatsapp' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'}`}
                  >
                    <MessageSquare size={16} />
                    {isRtl ? 'واتساب' : 'WhatsApp'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleMethodChange('gmail')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm transition-all ${contactMethod === 'gmail' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'}`}
                  >
                    <Mail size={16} />
                    Gmail
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">
                  {isRtl ? 'ملاحظات (اختياري)' : 'Notes (Optional)'}
                </label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder={isRtl ? 'اكتب تفاصيل سريعة عن المشكلة أو العنوان…' : 'Write brief details about the issue or address...'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-primary rounded-[1.5rem] p-5 outline-none font-bold text-slate-900 dark:text-white min-h-[100px] resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700 shadow-xl shadow-primary/20'} text-white py-5 rounded-[1.8rem] font-black text-xl transition-all flex items-center justify-center gap-3 group`}
                >
                  {isSubmitting ? (
                    <CheckCircle className="animate-pulse" />
                  ) : (
                    <>
                      {contactMethod === 'whatsapp' ? (isRtl ? 'إرسال على واتساب' : 'Send to WhatsApp') : (isRtl ? 'إرسال على الإيميل' : 'Send to Email')}
                      <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                    </>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  className="sm:w-1/3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-5 rounded-[1.8rem] font-black text-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
