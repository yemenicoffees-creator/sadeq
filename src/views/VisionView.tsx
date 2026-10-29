import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { VisionMissionValues } from '../components/VisionMissionValues';
import { PartnershipsSection } from '../components/PartnershipsSection';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const VisionView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.vision} />

        {/* Header Banner */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-14 text-center space-y-4 border border-[#C49A55]/30 relative overflow-hidden mb-12 shadow-xl">
          <span className="text-xs font-bold text-[#C49A55] tracking-widest uppercase">
            {lang === 'ar' ? 'المبادئ والرؤية المستقبلية' : 'Corporate Principles & Vision'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F7F2E9]">
            {t.nav.vision}
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'نهج استراتيجي وقيم مؤسسية ترتكز على الجودة، المصداقية، وشراكات تجارية تدوم في المملكة العربية السعودية.'
              : 'Our strategic roadmap and institutional principles centered on quality, integrity, and enduring partnerships.'}
          </p>
        </div>

        {/* Vision, Mission, Values */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
          <VisionMissionValues />
        </div>

        {/* Partnerships Section */}
        <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
          <PartnershipsSection />
        </div>

        {/* Page Nav */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200">
          <button
            onClick={() => navigateTo('about')}
            className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold text-xs sm:text-sm hover:border-[#38251D] transition-colors"
          >
            {lang === 'ar' ? 'السابق: صفحة من نحن' : 'Previous: About Page'}
          </button>

          <button
            onClick={() => navigateTo('products')}
            className="px-6 py-3 rounded-xl bg-[#38251D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C49A55] transition-colors"
          >
            <span>{lang === 'ar' ? 'التالي: صفحة المنتجات والكتالوج' : 'Next: Products Page'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
};
