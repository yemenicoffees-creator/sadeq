import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { BranchesSection } from '../components/BranchesSection';
import { Building2, PhoneCall, Clock, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';

export const BranchesView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.branches} />

        {/* Page Header Banner */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-14 text-center space-y-4 border border-[#C49A55]/30 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A55_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10 space-y-3">
            <span className="text-xs font-bold text-[#C49A55] tracking-widest uppercase">
              {lang === 'ar' ? 'فروعنا في المملكة العربية السعودية' : 'Kingdom-Wide Branch Network'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F7F2E9]">
              {t.nav.branches}
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-3xl mx-auto">
              {lang === 'ar'
                ? 'تتواجد فروعنا في الرياض (المركز الرئيسي وفرع عتيقة)، الدمام، المدينة المنورة، خميس مشيط، نجران، بيشة، وسكاكا.'
                : 'Our branches cover Riyadh (Headquarters & Atiqa), Dammam, Madinah, Khamis Mushait, Najran, Bisha, and Sakaka.'}
            </p>
            <div className="inline-flex items-center gap-2 bg-[#C49A55]/20 text-[#C49A55] px-4 py-1.5 rounded-full text-xs font-bold border border-[#C49A55]/30 mt-2">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'ساعات العمل الرسمية: 8:00 ص - 12:00 م | 3:00 م - 8:00 م (السبت - الخميس)'
                  : 'Official Working Hours: 8:00 AM - 12:00 PM | 3:00 PM - 8:00 PM (Sat - Thu)'}
              </span>
            </div>
          </div>
        </div>

        {/* Standalone Branches Section Component */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm mb-12">
          <BranchesSection />
        </div>

        {/* Dedicated Fast Dispatch & Unified Line Card */}
        <div className="rounded-2xl bg-[#38251D] text-white p-6 sm:p-10 border border-[#C49A55]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md mb-10">
          <div className="space-y-2 text-center sm:text-start">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'ar' ? 'الرقم الموحد للإدارة والمبيعات المركزية' : 'Unified Central Sales & Management Line'}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              {lang === 'ar'
                ? 'فريق الدعم اللوجستي وتجارة الجملة بخدمتكم للربط المباشر مع أقرب فرع أو مستودع لمقر منشأتكم.'
                : 'Central dispatch assists commercial buyers in connecting with the nearest regional distribution hub.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:920016645"
              className="px-6 py-3 rounded-xl bg-[#C49A55] hover:bg-[#b08743] text-[#38251D] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span dir="ltr">920016645</span>
            </a>
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              {lang === 'ar' ? 'نموذج التواصل التجاري' : 'B2B Contact Form'}
            </button>
          </div>
        </div>

        {/* Page Navigation Links */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200">
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 rounded-xl bg-[#38251D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C49A55] transition-colors"
          >
            <span>{lang === 'ar' ? 'التالي: صفحة تواصل معنا' : 'Next: Contact Page'}</span>
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
