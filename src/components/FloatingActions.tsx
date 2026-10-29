import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, ArrowUp, MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { lang, t, siteSettings, navigateTo } = useApp();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      {/* Scroll to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#38251D] text-[#C49A55] border border-[#C49A55] shadow-xl hover:bg-[#C49A55] hover:text-white transition-all flex items-center justify-center transform hover:scale-105 active:scale-95"
          aria-label={lang === 'ar' ? 'الرجوع للأعلى' : 'Scroll to top'}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Direct Call Button */}
      <a
        href={`tel:${siteSettings.phone}`}
        className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#C49A55] hover:bg-[#b38844] text-white font-bold text-xs shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-2 border-white/40 group backdrop-blur-md"
        aria-label={`Call ${siteSettings.phone}`}
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
          <Phone className="w-3 h-3 text-white" />
        </div>
        <span className="hidden sm:inline">{t.callNow}</span>
        <span dir="ltr" className="tracking-wide font-extrabold">{siteSettings.phone}</span>
      </a>

      {/* Floating WhatsApp if enabled */}
      {siteSettings.enableWhatsapp && siteSettings.whatsappNumber && (
        <a
          href={`https://wa.me/${siteSettings.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-xl hover:scale-105 transition-all"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      )}

      {/* Floating Control Center Button */}
      <button
        onClick={() => navigateTo('admin')}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#38251D] text-[#C49A55] hover:bg-[#C49A55] hover:text-white border border-[#C49A55] font-bold text-xs shadow-xl transition-all transform hover:scale-105"
        title={lang === 'ar' ? 'مركز التحكم لتعديل النصوص والصور' : 'Control Center'}
      >
        <span className="text-xs">⚙️</span>
        <span className="hidden sm:inline">{lang === 'ar' ? 'مركز التحكم' : 'CMS'}</span>
      </button>
    </div>
  );
};
