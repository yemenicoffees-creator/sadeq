import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, CheckCircle2, ShieldCheck, Briefcase, Globe2, Handshake, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { lang, t } = useApp();

  const icons = [
    <Layers className="w-6 h-6 text-[#C49A55]" />,
    <CheckCircle2 className="w-6 h-6 text-[#C49A55]" />,
    <ShieldCheck className="w-6 h-6 text-[#C49A55]" />,
    <Briefcase className="w-6 h-6 text-[#C49A55]" />,
    <Globe2 className="w-6 h-6 text-[#C49A55]" />,
    <Handshake className="w-6 h-6 text-[#C49A55]" />,
  ];

  return (
    <section className="py-20 bg-[#F7F2E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#38251D]/10 text-[#38251D] text-xs font-bold border border-[#38251D]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>{t.whyTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
            «{t.whySubtitle}»
          </h2>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {lang === 'ar'
              ? 'نحرص على تزويد عملائنا التجاريين بحلول موثوقة في استيراد وتوريد منتجات القهوة والهيل والتوابل وفق أعلى معايير الجودة والاستمرارية.'
              : 'Dedicated to providing our commercial partners with dependable supply solutions across coffee, cardamom, and spice categories.'}
          </p>
        </div>

        {/* 6 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.whyItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#38251D]/10 hover:border-[#C49A55] shadow-sm hover:shadow-xl transition-all duration-300 text-start space-y-4 transform hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F2E9] group-hover:bg-[#38251D] transition-colors flex items-center justify-center">
                {icons[index % icons.length]}
              </div>

              <h3 className="text-lg font-bold text-[#38251D] group-hover:text-[#C49A55] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
