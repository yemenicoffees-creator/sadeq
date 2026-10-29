import React from 'react';
import { useApp } from '../context/AppContext';
import { Coffee, Sparkles, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { lang, t, navigateTo, siteContent } = useApp();

  return (
    <section className="py-20 bg-[#F7F2E9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Images Grid (col-span 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Main large image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={siteContent?.about?.image || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80"}
                  alt="مزارع القهوة والبن وحبوب الهيل"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating card with Real Coffee Sack */}
              <div className="absolute -bottom-8 -end-4 sm:-bottom-10 sm:-end-6 bg-[#38251D] text-white p-4 rounded-xl shadow-2xl border-2 border-[#C49A55] max-w-xs flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/_____________67dcf376.png"
                    alt="قهوة خضراء AAA"
                    className="h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#C49A55]">
                    {lang === 'ar' ? 'درجات نقاء معتمدة' : 'Verified Purity Grades'}
                  </div>
                  <div className="text-[11px] text-white/80">
                    {lang === 'ar' ? 'محاصيل يمنية، إثيوبية، وهندية' : 'Yemeni, Ethiopian & Indian Crops'}
                  </div>
                </div>
              </div>

              {/* Decorative gold badge */}
              <div className="absolute -top-4 -start-4 w-12 h-12 rounded-full bg-[#C49A55] flex items-center justify-center shadow-lg text-white">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Text Content (col-span 7) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49A55]/15 text-[#38251D] text-xs font-bold border border-[#C49A55]/30">
              <Coffee className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>{lang === 'ar' ? (siteContent?.about?.badgeAr || 'نبذة عن الشركة') : (siteContent?.about?.badgeEn || 'About the Company')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#38251D] leading-tight">
              {lang === 'ar' ? (siteContent?.about?.titleAr || t.aboutTitle) : (siteContent?.about?.titleEn || t.aboutTitle)}
            </h2>

            <p className="text-base sm:text-lg text-[#38251D]/80 leading-relaxed">
              {lang === 'ar' ? (siteContent?.about?.paragraph1Ar || t.aboutParagraph1) : (siteContent?.about?.paragraph1En || t.aboutParagraph1)}
            </p>

            <p className="text-base sm:text-lg text-[#38251D]/80 leading-relaxed">
              {lang === 'ar' ? (siteContent?.about?.paragraph2Ar || t.aboutParagraph2) : (siteContent?.about?.paragraph2En || t.aboutParagraph2)}
            </p>

            {/* Core commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#526647] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-[#38251D]">
                  {lang === 'ar'
                    ? 'انتقاء محاصيل البن الخولاني والهرري الأصيلة'
                    : 'Authentic Khawlani & Harari bean curation'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#526647] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-[#38251D]">
                  {lang === 'ar'
                    ? 'أفخر درجات الهيل الأخضر والزعفران الطبيعي'
                    : 'Premier green cardamom & natural saffron'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#526647] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-[#38251D]">
                  {lang === 'ar'
                    ? 'تغليف تجاري يحفظ النكهة والزيوت العطرية'
                    : 'Aroma-lock commercial packaging'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#526647] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-[#38251D]">
                  {lang === 'ar'
                    ? 'التزام بالموثوقية وتلبية احتياجات تجار الجملة'
                    : 'Reliable supply for Saudi wholesale merchants'}
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3 rounded-xl bg-[#38251D] hover:bg-[#4d3328] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>{t.learnMoreAboutUs}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <button
                onClick={() => navigateTo('vision')}
                className="px-6 py-3 rounded-xl border border-[#C49A55] text-[#38251D] hover:bg-[#C49A55] hover:text-white font-bold text-sm transition-all"
              >
                <span>{t.nav.vision}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
