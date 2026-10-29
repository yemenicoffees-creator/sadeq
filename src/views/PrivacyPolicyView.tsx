import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, Lock, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.privacy} />

        {/* Header */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-12 text-start space-y-3 mb-10 border border-[#C49A55]/30 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C49A55] text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الوثائق الرسمية' : 'Official Documents'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#F7F2E9]">
            {t.nav.privacy}
          </h1>
          <p className="text-xs sm:text-sm text-white/70">
            {lang === 'ar'
              ? 'تاريخ آخر تحديث: أكتوبر 2026 • شركة البن اليمني للتجارة'
              : 'Last Updated: October 2026 • Yemeni Coffee Trading Company'}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm text-start space-y-8 text-gray-800 leading-relaxed text-sm mb-10">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '1. التزامنا بحماية الخصوصية' : '1. Privacy Commitment'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'تلتزم شركة البن اليمني للتجارة (yemenicoffee.co) بحماية خصوصية بيانات زوار الموقع وعملائنا التجاريين وتجار الجملة. توضح هذه السياسة كيفية جمع البيانات واستخدامها وحمايتها وفقًا للأنظمة المعمول بها في المملكة العربية السعودية.'
                : 'Yemeni Coffee Trading Company (yemenicoffee.co) is firmly committed to protecting the privacy of visitors, commercial accounts, and wholesalers in accordance with Saudi regulations.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '2. البيانات التي نقوم بجمعها' : '2. Information We Collect'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'نقوم فقط بجمع البيانات التي يقدمها العميل طواعية من خلال نموذج الاستفسارات التجارية أو الاتصال الهاتفي، وتشمل: الاسم الكامل، اسم المنشأة أو المؤسسة التجارية، رقم الهاتف، البريد الإلكتروني، المدينة، نوع النشاط التجاري، وتفاصيل الطلب التجاري المطلوب.'
                : 'We collect information voluntarily submitted through our commercial inquiry forms or phone calls: Full Name, Company Name, Contact Phone, Email, City, Business Type, and specific order requirements.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '3. الغرض من استخدام البيانات' : '3. Purpose of Use'}
            </h2>
            <ul className="list-disc ps-5 space-y-1.5 text-gray-700">
              <li>
                {lang === 'ar'
                  ? 'التواصل مع مسؤولي المشتريات وتزويدهم بعروض الأسعار ومواصفات المحاصيل المتوفرة.'
                  : 'Contacting procurement officers to provide price quotes and available crop specifications.'}
              </li>
              <li>
                {lang === 'ar'
                  ? 'تنسيق عمليات التوريد ومتابعة استفسارات الفروع عبر المملكة.'
                  : 'Coordinating wholesale supply logistics and addressing branch queries.'}
              </li>
              <li>
                {lang === 'ar'
                  ? 'تحسين جودة الخدمة وتقديم الدعم الفني التجاري.'
                  : 'Improving service responsiveness and trade client support.'}
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '4. حماية البيانات وعدم المشاركة' : '4. Data Protection & Confidentiality'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'لا نقوم ببيع أو تأجير أو مشاركة بيانات المنشآت والعملاء مع أي أطراف ثالثة لأغراض دعائية أو تسويقية. تظل كافة التفاصيل التجارية وسجلات الاستفسارات سرية ومحصورة في إدارة المبيعات المختصة.'
                : 'We never sell, rent, or share commercial account information with third parties. All inquiries and procurement requests remain strictly confidential.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '5. التواصل بشأن الخصوصية' : '5. Privacy Inquiries'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'لأي استفسارات بخصوص سياسة الخصوصية، يمكنكم التواصل مع الإدارة القانونية والتجارية عبر الهاتف الموحد 920016645 أو البريد الإلكتروني info@yemenicoffee.co.'
                : 'For privacy inquiries, please contact our administrative team via 920016645 or info@yemenicoffee.co.'}
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200">
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-3 rounded-xl bg-[#38251D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#C49A55] transition-colors"
          >
            <span>{lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Home'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
          <button
            onClick={() => navigateTo('terms')}
            className="px-6 py-3 rounded-xl border border-[#38251D] text-[#38251D] font-bold text-xs sm:text-sm hover:bg-[#38251D] hover:text-white transition-colors"
          >
            {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </button>
        </div>

      </div>
    </div>
  );
};
