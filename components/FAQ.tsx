"use client";

import React, { useState } from 'react';
import { useSettings } from '../context/SettingsProvider';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const { t, settings } = useSettings();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const isRtl = settings.language === 'ar';

  const faqs = [
    {
      qAr: 'إزاي أضمن جودة الخدمة؟',
      qEn: 'How do I ensure service quality?',
      aAr: 'كل فنيين HomeServe Pro تم التحقق منهم جنائياً وفنياً، وبنقدم ضمان 30 يوم على كل الإصلاحات عشان نضمن رضاك الكامل.',
      aEn: 'All our techs are background checked and technically certified. We offer a 30-day warranty on all repairs.',
    },
    {
      qAr: 'إيه اللي بيحصل في حالة الطوارئ؟',
      qEn: 'What happens in an emergency?',
      aAr: 'عند اختيار "طوارئ" من تطبيقنا أو الموقع، بنرسل أقرب فني متاح ليك فوراً، وبيوصل في متوسط 30 دقيقة حسب مكانك.',
      aEn: 'When choosing "Emergency", we dispatch the nearest available pro immediately, arriving in 30 mins on average.',
    },
    {
      qAr: 'هل الأسعار ثابتة ومضمونة؟',
      qEn: 'Are prices fixed?',
      aAr: 'نعم، بنستخدم قايمة أسعار موحدة وشفافة لكل الخدمات، الفني بيبلغك بالتكلفة النهائية قبل ما يبدأ شغل عشان ميبقاش فيه أي مفاجآت.',
      aEn: 'Yes, we use a unified price list for all services. The tech informs you of the final cost before starting.',
    },
    {
      qAr: 'إيه طرق الدفع المتاحة عندكم؟',
      qEn: 'What payment methods are available?',
      aAr: 'الدفع يكون نقداً (كاش) للفني مباشرة بعد انتهاء الخدمة والتأكد من جودة التنفيذ، لضمان أعلى مستويات الشفافية والرضا.',
      aEn: 'Payment is cash only to the technician directly after the service is completed and quality is verified, ensuring total transparency and satisfaction.',
    },
    {
      qAr: 'أقدر ألغي أو أعدل الحجز؟',
      qEn: 'Can I cancel my booking?',
      aAr: 'نعم، الإلغاء أو التعديل مجاني تماماً قبل موعد الخدمة بـ ساعتين على الأقل من خلال التطبيق أو التواصل معنا.',
      aEn: 'Yes, cancellation is completely free at least 2 hours before the scheduled service time.',
    }
  ];

  return (
    <section id="faq" className="py-32 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block bg-primary/5 text-primary px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-4">{isRtl ? 'الأسئلة الشائعة' : 'Common Questions'}</div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">{t('navFAQ')}</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">{isRtl ? 'كل اللي محتاج تعرفه عن خدمات HomeServe Pro' : 'Everything you need to know about our services'}</p>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`bg-white dark:bg-slate-900 rounded-[2rem] border transition-all duration-300 ${openIdx === idx ? 'border-primary shadow-2xl ring-4 ring-primary/5' : 'border-slate-100 dark:border-slate-800'} overflow-hidden`}>
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="w-full px-10 py-8 flex items-center justify-between text-start gap-6 group"><span className={`text-xl md:text-2xl font-black transition-colors ${openIdx === idx ? 'text-primary' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>{isRtl ? faq.qAr : faq.qEn}</span><div className={`p-2 rounded-xl transition-all ${openIdx === idx ? 'bg-primary text-white rotate-180' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-primary group-hover:text-white'}`}><ChevronDown size={24} strokeWidth={3} /></div></button>
              {openIdx === idx && <div className="px-10 pb-10 text-xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed animate-in fade-in slide-in-from-top-4 duration-300"><div className={`w-12 h-1.5 bg-primary/20 rounded-full mb-6 ${isRtl ? 'ml-auto' : 'mr-auto'}`}></div>{isRtl ? faq.aAr : faq.aEn}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;