import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Coffee, ShieldCheck, Building2, ArrowLeft, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.about} />

        {/* Page Header Banner */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-14 text-center space-y-4 border border-[#C49A55]/30 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A55_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10 space-y-3">
            <span className="text-xs font-bold text-[#C49A55] tracking-widest uppercase">
              {lang === 'ar' ? 'عراقة التجارة والأصالة' : 'Heritage & Distinction'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F7F2E9]">
              {t.nav.about}
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'تعرف على قصة شركة البن اليمني للتجارة، مسيرتنا في استيراد أجود محاصيل البن والتوابل، والتزامنا الراسخ بتموين قطاع الأعمال في المملكة.'
                : 'Discover the story of Yemeni Coffee Trading Company and our commitment to supplying pristine coffee and spice harvests.'}
            </p>
          </div>
        </div>

        {/* Standalone About Section Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm mb-12">
          <AboutSection />
        </div>

        {/* 3 Pillars of Identity */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-start mb-12">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F7F2E9] flex items-center justify-center text-[#C49A55]">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#38251D]">
              {lang === 'ar' ? 'أصالة البن اليمني' : 'Authentic Yemeni Coffee'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {lang === 'ar'
                ? 'المدرجات الجبلية اليمنية تمنح محاصيل البن الخولاني خواص نكهة فريدة متوارثة عبر القرون، نعتز بتقديمها بالمواصفات الأصلية لعملائنا في السعودية.'
                : 'Yemeni mountain terraces impart Khawlani beans with celebrated character, preserved through traditional care.'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F7F2E9] flex items-center justify-center text-[#526647]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#38251D]">
              {lang === 'ar' ? 'معايير الفرز الدقيق' : 'Precision Sorting'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {lang === 'ar'
                ? 'نطبق تدابير صارمة لفحص الحبوب وتدريجها للتأكد من خلوها من الشوائب وملاءمتها للتحميص التجاري الفاخر.'
                : 'Strict grading safeguards bean uniformity, moisture limits, and screen size for consistent batch roasting.'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F7F2E9] flex items-center justify-center text-[#C49A55]">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#38251D]">
              {lang === 'ar' ? 'انتشار وموثوقية' : 'Distribution Footprint'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {lang === 'ar'
                ? 'مستودعات وفروع تغطي مختلف مناطق المملكة لتأمين سرعة التوريد وتلبية احتياجات تجار الجملة والمحامص والمطاعم.'
                : 'Strategic warehousing nationwide guarantees dependable fulfillment for retailers and commercial food services.'}
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Navigation Forward */}
        <div className="pt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 mt-12">
          <button
            onClick={() => navigateTo('vision')}
            className="px-6 py-3 rounded-xl bg-[#38251D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C49A55] transition-colors"
          >
            <span>{lang === 'ar' ? 'التالي: صفحة الرؤية والرسالة والقيم' : 'Next: Vision & Values Page'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          <button
            onClick={() => navigateTo('products')}
            className="px-6 py-3 rounded-xl border border-[#38251D] text-[#38251D] font-bold text-xs sm:text-sm hover:bg-[#38251D] hover:text-white transition-colors"
          >
            {lang === 'ar' ? 'الانتقال لصفحة المنتجات' : 'Go to Products Page'}
          </button>
        </div>

      </div>
    </div>
  );
};
