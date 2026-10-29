import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, Search, PackageCheck, ThermometerSnowflake, Sparkles } from 'lucide-react';

export const QualitySection: React.FC = () => {
  const { lang, t } = useApp();

  const stepIcons = [
    <Search className="w-6 h-6 text-[#C49A55]" />,
    <CheckCircle2 className="w-6 h-6 text-[#C49A55]" />,
    <PackageCheck className="w-6 h-6 text-[#C49A55]" />,
    <ThermometerSnowflake className="w-6 h-6 text-[#C49A55]" />,
  ];

  return (
    <section className="py-20 bg-[#F7F2E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#526647]/10 text-[#526647] text-xs font-bold border border-[#526647]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.nav.quality}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
            «{t.qualityTitle}»
          </h2>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            {t.qualitySubtitle}
          </p>
        </div>

        {/* 4 Quality Stages Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.qualitySteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#38251D]/10 hover:border-[#C49A55] shadow-sm hover:shadow-xl transition-all duration-300 text-start space-y-4 relative group"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#F7F2E9] group-hover:bg-[#38251D] transition-colors flex items-center justify-center">
                  {stepIcons[idx]}
                </div>
                <span className="text-2xl font-black text-[#C49A55]/30 group-hover:text-[#C49A55] transition-colors">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#38251D] group-hover:text-[#C49A55] transition-colors">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Realistic Packaging & Storage Showcase */}
        <div className="bg-[#38251D] rounded-3xl p-8 sm:p-10 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#C49A55]/30">
          <div className="lg:col-span-7 space-y-4 text-start">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C49A55]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'العناية بالمنتجات الطبيعية' : 'Care for Natural Harvests'}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {lang === 'ar'
                ? 'الحفاظ على الخصائص الطبيعية والزيوت العطرية'
                : 'Preserving Natural Aromatics & Essential Oils'}
            </h3>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {lang === 'ar'
                ? 'تتطلب محاصيل البن والهيل والقرنفل تعاملاً دقيقًا يحميها من الرطوبة والضوء والحرارة. نعتمد أكياس صمام هوائي، وأجولة خيش طبيعية منسوجة بعناية، وصناديق كرتونية محكمة الإغلاق لمنع فقدان النكهة أثناء النقل والتخزين التجاري في فروعنا بالمملكة.'
                : 'Coffee crops, green cardamom, and cloves require precise handling against humidity, UV light, and heat. We utilize barrier valve pouches, authentic woven jute sacks, and airtight cartons to protect flavor integrity across our Saudi wholesale warehouses.'}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center flex flex-col items-center">
              <div className="h-24 w-full flex items-center justify-center">
                <img
                  src="/assets/aistudio/______db8288c6.png"
                  alt="بن لقمتي 5 كجم"
                  className="max-h-full object-contain"
                />
              </div>
              <span className="text-[11px] font-bold text-[#C49A55] mt-2">
                {lang === 'ar' ? 'أكياس صمام 5 كجم' : '5 KG Valve Pouches'}
              </span>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center flex flex-col items-center">
              <div className="h-24 w-full flex items-center justify-center">
                <img
                  src="/assets/aistudio/_____________67dcf376.png"
                  alt="قهوة خضراء شوال 10 كجم"
                  className="max-h-full object-contain"
                />
              </div>
              <span className="text-[11px] font-bold text-[#C49A55] mt-2">
                {lang === 'ar' ? 'أشوال خيش 10 كجم' : '10 KG Jute Sacks'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
