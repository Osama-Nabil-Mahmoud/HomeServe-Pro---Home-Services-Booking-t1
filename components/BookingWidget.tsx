"use client";

import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsProvider';
import { Calendar, MapPin, Clock, ArrowRight, ArrowLeft, Zap, Info, ChevronDown } from 'lucide-react';
import { sendContact } from '../lib/contact';
import { trackEvent, EVENTS } from '../lib/analytics';

const BookingWidget: React.FC = () => {
  const { settings, t } = useSettings();
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    service: '',
    city: '',
    time: getTodayDate(),
    notes: '',
    isEmergency: false
  });

  const isRtl = settings.language === 'ar';

  const handleBooking = () => {
    if (!formData.service || !formData.city) {
      alert(isRtl ? 'برجاء اختيار الخدمة والمدينة أولاً' : 'Please select service and city first');
      return;
    }

    trackEvent(EVENTS.CTA_BOOK_NOW, { ...formData, source: 'widget' });

    const isAr = settings.language === 'ar';
    const emergencyLabel = formData.isEmergency ? (isAr ? 'نعم - عاجل' : 'Yes - Urgent') : (isAr ? 'لا' : 'No');

    const message = isAr ? 
`مرحبًا HomeServe Pro 👋
عايز أحجز خدمة.
• الخدمة: ${formData.service}
• التاريخ: ${formData.time || 'غير محدد'}
• المدينة: ${formData.city || 'غير محدد'}
• الوقت: دلوقتي
• طوارئ: ${emergencyLabel}
• ملاحظات: ${formData.notes || '-'}
من فضلك أكدوا المتاح وأقرب وقت وصول. شكراً` :
`Hello HomeServe Pro 👋
I'd like to book a service.
• Service: ${formData.service}
• Date: ${formData.time || 'Not specified'}
• City: ${formData.city || 'Not specified'}
• Time: Now
• Emergency: ${emergencyLabel}
• Notes: ${formData.notes || '-'}
Please confirm availability and ETA. Thanks`;

    const subject = isAr ? `طلب حجز سريع: ${formData.service}` : `Quick Booking: ${formData.service}`;

    sendContact({
      method: 'whatsapp',
      whatsappMessage: message,
      subject: subject,
      body: message
    });
  };

  const isAr = settings.language === 'ar';

  const cities = isAr
    ? ['القاهرة', 'الجيزة', 'الإسكندرية', 'الساحل الشمالي', 'السادس من أكتوبر', 'التجمع الخامس'] 
    : ['Cairo', 'Giza', 'Alexandria', 'North Coast', '6th of October', 'New Cairo'];

  const services = [
    t('selectService'),
    t('selectElectricity'),
    t('selectAC'),
    t('selectCleaning'),
    t('selectCarpentry'),
    t('selectPainting'),
    t('selectHomeApp'),
    t('selectPest')
  ];

  const iconClasses = `absolute ${isRtl ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-primary pointer-events-none transition-colors group-focus-within:text-secondary`;
  const inputClasses = `w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-primary dark:focus:border-primary rounded-[1.5rem] ${isRtl ? 'pr-14 pl-5' : 'pl-14 pr-5'} py-4.5 appearance-none outline-none font-bold text-lg transition-all text-slate-900 dark:text-white cursor-pointer`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-800 transform lg:-translate-y-1/2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
        <div className="space-y-4 lg:order-first">
          <button 
            onClick={handleBooking}
            className="w-full bg-secondary text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-orange-600 transition-all shadow-2xl shadow-secondary/30 flex items-center justify-center gap-3 active:scale-95 group overflow-hidden relative"
          >
            <span className="relative z-10 group-hover:scale-105 transition-transform">
              {isRtl ? <ArrowLeft size={24} className="inline mr-2" /> : null}
              {t('bookingConfirm')}
              {!isRtl ? <ArrowRight size={24} className="inline ml-2" /> : null}
            </span>
          </button>
        </div>
        <div className="space-y-4 group">
          <label className="block text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
            {t('timeSelectPlaceholder')}
          </label>
          <div className="relative">
            <Clock className={iconClasses} size={22} />
            <input 
              type="date"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className={inputClasses}
            />
          </div>
        </div>
        <div className="space-y-4 group">
          <label className="block text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
            {isRtl ? 'المدينة' : 'City'}
          </label>
          <div className="relative">
            <MapPin className={iconClasses} size={22} />
            <select 
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className={inputClasses}
            >
              <option value="">{t('citySelectPlaceholder')}</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className={`absolute ${isRtl ? 'left-5' : 'right-5'} top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none`} size={18} />
          </div>
        </div>
        <div className="space-y-4 group">
          <label className="block text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
            {t('navServices')}
          </label>
          <div className="relative">
            <Zap className={iconClasses} size={22} />
            <select 
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              className={inputClasses}
            >
              <option value="">{t('serviceSelectPlaceholder')}</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className={`absolute ${isRtl ? 'left-5' : 'right-5'} top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none`} size={18} />
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-slate-100 dark:border-slate-800">
        <div className="flex-1 max-w-lg w-full order-2 md:order-1">
          <div className="relative">
            <input 
              type="text" 
              placeholder={t('notesPlaceholder')}
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full bg-transparent border-b-2 border-slate-100 dark:border-slate-800 py-3 px-4 outline-none focus:border-primary transition-all text-lg font-bold text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
            />
            <Info className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 text-slate-300`} size={20} />
          </div>
        </div>
        <div className="flex items-center gap-6 order-1 md:order-2">
          <span className="font-black text-lg text-slate-700 dark:text-slate-200 tracking-tight">
            {t('emergencyLabel')}
          </span>
          <label className="flex items-center gap-4 cursor-pointer select-none group">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={formData.isEmergency}
                onChange={(e) => setFormData({...formData, isEmergency: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-secondary transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-6"></div>
            </div>
          </label>
          {formData.isEmergency && (
            <div className="flex items-center gap-2 text-secondary bg-secondary/10 px-6 py-3 rounded-2xl text-[15px] font-black animate-pulse">
              <Zap size={18} fill="currentColor" />
              {t('emergencyNote')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;