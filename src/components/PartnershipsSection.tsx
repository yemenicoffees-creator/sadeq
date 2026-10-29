import React from 'react';
import { useApp } from '../context/AppContext';
import { Handshake, ArrowLeft, ArrowRight, TrendingUp, ShieldCheck, Clock } from 'lucide-react';

export const PartnershipsSection: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <section className="py-20 bg-gradient-to-r from-[#241712] via-[#38251D] to-[#241712] text-white relative overflow-hidden">
      {/* Decorative background ambient */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A55_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#C49A55] text-xs font-bold border border-[#C49A55]/30">
          <Handshake className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'علاقات تجارية مستدامة' : 'Sustainable Business Alliances'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F7F2E9] tracking-tight">
          «{t.partnershipTitle}»
        </h2>

        <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
          {t.partnershipText}
        </p>

        {/* 3 Pillars of Partnership */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-start pt-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <TrendingUp className="w-6 h-6 text-[#C49A55]" />
            <h3 className="text-base font-bold text-white">
              {lang === 'ar' ? 'نمو مشترك' : 'Mutual Growth'}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              {lang === 'ar'
                ? 'ندعم شركاءنا باستقرار التوريد وجودة المحاصيل لتوسيع حصصهم السوقية.'
                : 'Empowering partners with dependable supply stability to expand market footprint.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#C49A55]" />
            <h3 className="text-base font-bold text-white">
              {lang === 'ar' ? 'التزام بالمواصفات' : 'Specification Adherence'}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              {lang === 'ar'
                ? 'ثبات درجات الفرز والنقاء من موسم إلى آخر دون تذبذب في الجودة.'
                : 'Consistent screen sizes and moisture thresholds across all crop deliveries.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <Clock className="w-6 h-6 text-[#C49A55]" />
            <h3 className="text-base font-bold text-white">
              {lang === 'ar' ? 'استجابة سريعة' : 'Swift Response'}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              {lang === 'ar'
                ? 'إدارة حسابات تجارية مخصصة تلبي احتياجات الطلبات العاجلة والجدولة الدورية.'
                : 'Dedicated trade account reps for expedited order cycles and recurring schedules.'}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#a87d3b] hover:from-[#d6aa65] hover:to-[#b38844] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-3 group"
          >
            <span>{t.becomePartner}</span>
            {lang === 'ar' ? (
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
