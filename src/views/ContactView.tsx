import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ContactSection } from '../components/ContactSection';
import { FAQSection } from '../components/FAQSection';
import { PhoneCall, Building2, Clock, Mail, MessageSquareText, ArrowLeft, ArrowRight } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.contact} />

        {/* Page Header Banner */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-14 text-center space-y-4 border border-[#C49A55]/30 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A55_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10 space-y-3">
            <span className="text-xs font-bold text-[#C49A55] tracking-widest uppercase">
              {lang === 'ar' ? 'فريق المبيعات واستفسارات الجملة' : 'Sales Team & B2B Inquiries'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F7F2E9]">
              {t.nav.contact}
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'يسعدنا تواصلكم واستقبال طلبات عروض الأسعار واستفسارات التوريد التجاري عبر الهاتف الموحد 920016645 أو نموذج التواصل المعتمد.'
                : 'We welcome your commercial volume inquiries via our unified line 920016645 or corporate form.'}
            </p>
          </div>
        </div>

        {/* Standalone Contact Component */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm mb-12">
          <ContactSection />
        </div>

        {/* Standalone FAQ Component */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200 shadow-sm mb-12">
          <FAQSection />
        </div>

        {/* Page Navigation Links */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200">
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-3 rounded-xl bg-[#38251D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C49A55] transition-colors"
          >
            <span>{lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Home'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
          <button
            onClick={() => navigateTo('branches')}
            className="px-6 py-3 rounded-xl border border-[#38251D] text-[#38251D] font-bold text-xs sm:text-sm hover:bg-[#38251D] hover:text-white transition-colors"
          >
            {lang === 'ar' ? 'عرض فروعنا في المملكة' : 'View Branches'}
          </button>
        </div>

      </div>
    </div>
  );
};
