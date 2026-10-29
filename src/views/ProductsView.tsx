import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductsSection } from '../components/ProductsSection';
import { PhoneCall, FileText, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const ProductsView: React.FC = () => {
  const { lang, t, currentCategory, navigateTo, setInquiryModalProduct } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.products} />

        {/* Page Header Banner */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-14 text-center space-y-4 border border-[#C49A55]/30 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A55_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10 space-y-3">
            <span className="text-xs font-bold text-[#C49A55] tracking-widest uppercase">
              {lang === 'ar' ? 'الكتالوج التجاري المعتمد' : 'Official Wholesale Catalog'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F7F2E9]">
              {t.nav.products}
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'تصفح تشكيلة منتجات شركة البن اليمني للتجارة من القهوة، الهيل، الزعفران، البهارات والمكسرات مع مواصفاتها الفنية التجارية وتعبئتها المعتمدة.'
                : 'Browse our full wholesale range across coffee, cardamom, saffron, natural spices, and premium commercial nuts.'}
            </p>
          </div>
        </div>

        {/* Products Grid & Filters Component */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm mb-12">
          <ProductsSection initialCategory={currentCategory} showFilters={true} />
        </div>

        {/* Dedicated Page Bottom B2B Action Card */}
        <div className="rounded-2xl bg-gradient-to-r from-[#38251D] to-[#4a3127] text-white p-6 sm:p-10 border border-[#C49A55]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md mb-10">
          <div className="space-y-2 text-center md:text-start">
            <div className="inline-flex items-center gap-2 text-[#C49A55] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'توريد تجاري بالجملة وحاويات ومستودعات' : 'Bulk & Commercial Procurement'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'هل تبحث عن كميات تجارية أو مواصفات خاصة؟' : 'Looking for custom wholesale quantities or specs?'}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              {lang === 'ar'
                ? 'فريق مبيعات الجملة جاهز لتقديم عروض الأسعار المخصصة وتزويدكم بالعينات والشهادات الفنية.'
                : 'Our dedicated B2B team is ready to prepare tailored quotes, certificates, and commercial dispatch schedules.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-[#C49A55] hover:bg-[#b08743] text-[#38251D] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طلب تسعيرة تجارية' : 'Request Official Quote'}</span>
            </button>
            <a
              href="tel:920016645"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#C49A55]" />
              <span dir="ltr">920016645</span>
            </a>
          </div>
        </div>

        {/* Page Navigation Links */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200">
          <button
            onClick={() => navigateTo('quality')}
            className="px-6 py-3 rounded-xl bg-[#38251D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C49A55] transition-colors"
          >
            <span>{lang === 'ar' ? 'التالي: صفحة الجودة والمعايير' : 'Next: Quality Standards'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
          <button
            onClick={() => navigateTo('branches')}
            className="px-6 py-3 rounded-xl border border-[#38251D] text-[#38251D] font-bold text-xs sm:text-sm hover:bg-[#38251D] hover:text-white transition-colors"
          >
            {lang === 'ar' ? 'عرض فروعنا في المملكة' : 'View Kingdom Branches'}
          </button>
        </div>

      </div>
    </div>
  );
};
