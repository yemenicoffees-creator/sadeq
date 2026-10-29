import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { WholesaleSection } from '../components/WholesaleSection';
import { PartnershipsSection } from '../components/PartnershipsSection';
import { Briefcase, Building2, Truck, FileSpreadsheet, ArrowLeft, ArrowRight, PhoneCall } from 'lucide-react';

export const WholesaleView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.wholesale} />

        {/* Page Header Banner */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-14 text-center space-y-4 border border-[#C49A55]/30 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A55_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10 space-y-3">
            <span className="text-xs font-bold text-[#C49A55] tracking-widest uppercase">
              {lang === 'ar' ? 'حلول التوريد للشركات وتجار الجملة' : 'B2B Wholesale & Supply Solutions'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F7F2E9]">
              {t.nav.wholesale}
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'خدمات التوريد التجاري المخصصة للمحامص، محلات القهوة والبهارات، المقاهي ومؤسسات الإعاشة والضيافة في جميع مدن المملكة.'
                : 'Dedicated commercial procurement solutions for roasters, retailers, hospitality, and distributors.'}
            </p>
          </div>
        </div>

        {/* Standalone Wholesale Section Component */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm mb-12">
          <WholesaleSection />
        </div>

        {/* Partnerships & Client Sectors Component */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm mb-12">
          <PartnershipsSection />
        </div>

        {/* Dedicated Wholesale CTA Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-[#38251D] to-[#2a1c15] text-white p-6 sm:p-10 border border-[#C49A55]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md mb-10">
          <div className="space-y-2 text-center sm:text-start">
            <div className="inline-flex items-center gap-2 text-[#C49A55] text-xs font-bold">
              <Truck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'خدمة توريد وشحن سريع لجميع مناطق المملكة' : 'Kingdom-wide Commercial Dispatch'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'جاهزون لعقد شراكة توريد منتظمة مع منشأتكم' : 'Ready to Establish a Long-term Supply Agreement?'}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              {lang === 'ar'
                ? 'تواصل مع ممثل مبيعات الجملة المعتمد واحصل على خطة توريد مجدولة وأسعار كميات تنافسية.'
                : 'Connect with our commercial sales representative for scheduled supply contracts and volume rates.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-[#C49A55] hover:bg-[#b08743] text-[#38251D] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تقديم طلب تسعيرة تجارية' : 'Submit Commercial RFP'}</span>
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
            onClick={() => navigateTo('branches')}
            className="px-6 py-3 rounded-xl bg-[#38251D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C49A55] transition-colors"
          >
            <span>{lang === 'ar' ? 'التالي: شبكة فروعنا ومستودعاتنا' : 'Next: Our Branch Network'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
          <button
            onClick={() => navigateTo('products')}
            className="px-6 py-3 rounded-xl border border-[#38251D] text-[#38251D] font-bold text-xs sm:text-sm hover:bg-[#38251D] hover:text-white transition-colors"
          >
            {lang === 'ar' ? 'تصفح منتجات الجملة' : 'Browse Wholesale Catalog'}
          </button>
        </div>

      </div>
    </div>
  );
};
