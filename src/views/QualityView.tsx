import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { QualitySection } from '../components/QualitySection';
import { ShieldCheck, Award, CheckCircle2, ArrowLeft, ArrowRight, FileCheck, PhoneCall } from 'lucide-react';

export const QualityView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.quality} />

        {/* Page Header Banner */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-14 text-center space-y-4 border border-[#C49A55]/30 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A55_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10 space-y-3">
            <span className="text-xs font-bold text-[#C49A55] tracking-widest uppercase">
              {lang === 'ar' ? 'العناية بالمنتجات والمعايير الفنية' : 'Quality & Technical Standards'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F7F2E9]">
              {t.nav.quality}
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'الاهتمام بالفرز، التنقية، التعبئة المحكمة، والتخزين المنضبط لضمان المحافظة على الخصائص الطبيعية للبن والهيل والتوابل وفق أعلى المقاييس المعتمدة.'
                : 'Our systematic commitment to sorting, grading, barrier packaging, and climate-controlled warehousing.'}
            </p>
          </div>
        </div>

        {/* Standalone Quality Section Component */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm mb-12">
          <QualitySection />
        </div>

        {/* Detailed Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#526647]/10 text-[#526647] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#38251D] text-base">
              {lang === 'ar' ? 'معايير الرطوبة والكثافة' : 'Moisture & Density Control'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'ar'
                ? 'قياس دوري لنسبة رطوبة حبوب البن الخضراء (10-12%) لضمان استقرار التحميص والحفاظ على توازن النكهة الزيتية في الهيل والبهارات.'
                : 'Periodic calibrated moisture meters ensure green coffee beans remain within 10-12%, preserving essential oils and uniform roasting.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C49A55]/10 text-[#C49A55] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#38251D] text-base">
              {lang === 'ar' ? 'سلامة الغذاء والتتبع' : 'Food Safety & Traceability'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'ar'
                ? 'نظام تتبع موثق لكل إرسالية تجارية يربط بين تاريخ الحصاد وبلد المنشأ ورقم التشغيلة لضمان أعلى مستويات الأمان الغذائي.'
                : 'Documented batch traceability linking harvest dates, origins, and lot numbers complying with Saudi Food & Drug Authority standards.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#38251D]/10 text-[#38251D] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#38251D] text-base">
              {lang === 'ar' ? 'التعبئة والحماية العازلة' : 'Barrier Packaging Protocol'}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'ar'
                ? 'أكياس خيش طبيعية للبن الأخضر، وأكياس صمامات عازلة لعبوات راوية 5 كجم، وكراتين محكمة 10 كجم للقرنفل لحماية التوابل من الضوء والأكسدة.'
                : 'Natural jute bags for green coffee, barrier handles for 5kg Rawia bags, and rigid 10kg cartons protecting cloves from light.'}
            </p>
          </div>
        </div>

        {/* Dedicated Bottom CTA */}
        <div className="rounded-2xl bg-[#38251D] text-white p-6 sm:p-10 border border-[#C49A55]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md mb-10">
          <div className="space-y-2 text-center sm:text-start">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'طلب شهادات الجودة أو عينات فنية' : 'Request Quality Certificates or Samples'}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              {lang === 'ar'
                ? 'نوفر لشركائنا التجاريين والمحامص التقارير الفنية وشهادات المنشأ المطابقة للمواصفات السعودية.'
                : 'We furnish commercial clients with technical certificates, origin documentation, and sample lots.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-[#C49A55] hover:bg-[#b08743] text-[#38251D] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <FileCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تواصل مع قسم الجودة والمبيعات' : 'Contact Sales & Quality'}</span>
            </button>
            <a
              href="tel:920016645"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#C49A55]" />
              <span dir="ltr">920016645</span>
            </a>
          </div>
        </div>

        {/* Page Navigation Links */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200">
          <button
            onClick={() => navigateTo('wholesale')}
            className="px-6 py-3 rounded-xl bg-[#38251D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C49A55] transition-colors"
          >
            <span>{lang === 'ar' ? 'التالي: خدمات تجارة الجملة والتوريد' : 'Next: B2B Wholesale Services'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
          <button
            onClick={() => navigateTo('products')}
            className="px-6 py-3 rounded-xl border border-[#38251D] text-[#38251D] font-bold text-xs sm:text-sm hover:bg-[#38251D] hover:text-white transition-colors"
          >
            {lang === 'ar' ? 'الرجوع إلى صفحة المنتجات' : 'Back to Products'}
          </button>
        </div>

      </div>
    </div>
  );
};
