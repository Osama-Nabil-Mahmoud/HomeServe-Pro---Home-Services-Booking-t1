
import React, { useState, useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';
import { X, Copy, CheckCircle, ExternalLink, Mail } from 'lucide-react';

const CopyEmailModal: React.FC = () => {
  const { copyModalData, hideCopyModal, settings, t } = useSettings();
  const [copiedField, setCopiedField] = useState<'subject' | 'body' | 'all' | null>(null);
  const isRtl = settings.language === 'ar';

  const copyToClipboard = useCallback(async (text: string) => {
    // محاولة استخدام الطريقة الحديثة أولاً
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Navigator clipboard failed, trying fallback', err);
      }
    }
    
    // الطريقة البديلة للمتصفحات القديمة أو البيئات غير الآمنة (مثل AI Studio iframe)
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // التأكد من أن العنصر غير مرئي ولا يؤثر على التنسيق
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback copy failed', err);
      return false;
    }
  }, []);

  const handleCopy = async (text: string, field: 'subject' | 'body' | 'all') => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } else {
      console.error('Copy action failed completely');
    }
  };

  const copyAll = () => {
    if (!copyModalData) return;
    const text = `${isRtl ? 'الموضوع' : 'Subject'}: ${copyModalData.subject}\n\n${copyModalData.body}`;
    handleCopy(text, 'all');
  };

  if (!copyModalData) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <Mail size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              {isRtl ? 'جاهز للإيميل — انسخ الرسالة' : 'Ready to Email — Copy Message'}
            </h3>
          </div>
          <button 
            onClick={hideCopyModal}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-400 hover:text-primary transition-all shadow-sm border border-slate-100 dark:border-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed text-center">
            {isRtl 
              ? 'بسبب قيود المتصفح، يرجى نسخ محتوى الرسالة ولصقها في Gmail يدوياً.' 
              : 'Due to browser restrictions, please copy the content and paste it into Gmail manually.'}
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">To</label>
              <div className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl p-4 font-bold text-slate-600 dark:text-slate-300">
                {copyModalData.to}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between px-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Subject</label>
                <button onClick={() => handleCopy(copyModalData.subject, 'subject')} className="text-primary text-xs font-black flex items-center gap-1 hover:underline">
                  {copiedField === 'subject' ? <CheckCircle size={14} /> : <Copy size={14} />}
                  {isRtl ? 'نسخ' : 'Copy'}
                </button>
              </div>
              <div className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl p-4 font-bold text-slate-900 dark:text-white">
                {copyModalData.subject}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between px-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Body</label>
                <button onClick={() => handleCopy(copyModalData.body, 'body')} className="text-primary text-xs font-black flex items-center gap-1 hover:underline">
                  {copiedField === 'body' ? <CheckCircle size={14} /> : <Copy size={14} />}
                  {isRtl ? 'نسخ' : 'Copy'}
                </button>
              </div>
              <div className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl p-5 font-bold text-slate-900 dark:text-white text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
                {copyModalData.body}
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button 
              onClick={copyAll}
              className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-blue-700 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              {copiedField === 'all' ? <CheckCircle size={22} /> : <Copy size={22} />}
              {isRtl ? 'نسخ الرسالة بالكامل' : 'Copy Full Message'}
            </button>
            <p className="text-[13px] text-center text-slate-400 font-bold">
              {isRtl ? 'افتح Gmail بنفسك والصق الرسالة.' : 'Open Gmail yourself and paste the message.'}
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
          <a 
            href={copyModalData.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-4 rounded-2xl font-black text-center flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <ExternalLink size={18} />
            {isRtl ? 'جرب فتح Gmail' : 'Try Opening Gmail'}
          </a>
          <button 
            onClick={hideCopyModal}
            className="flex-1 py-4 bg-slate-50 dark:bg-slate-900 text-slate-400 font-black rounded-2xl border border-slate-100 dark:border-slate-800"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyEmailModal;
