import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { FileText, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

export const TermsView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={t.nav.terms} />

        {/* Header */}
        <div className="rounded-3xl bg-[#38251D] text-white p-8 sm:p-12 text-start space-y-3 mb-10 border border-[#C49A55]/30 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C49A55] text-xs font-bold">
            <FileText className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الضوابط التجارية' : 'Commercial Terms'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#F7F2E9]">
            {t.nav.terms}
          </h1>
          <p className="text-xs sm:text-sm text-white/70">
            {lang === 'ar'
              ? 'الشروط والأحكام المنظمة للتعامل والاستفسار التجاري • شركة البن اليمني للتجارة'
              : 'Terms and Conditions Governing Wholesale Inquiries • Yemeni Coffee Trading Company'}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm text-start space-y-8 text-gray-800 leading-relaxed text-sm mb-10">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '1. طبيعة الموقع والخدمات' : '1. Nature of the Corporate Website'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'يعد هذا الموقع (yemenicoffee.co) المنصة المؤسسية الرسمية لشركة البن اليمني للتجارة لعرض منتجاتها في تجارة الجملة للقهوة والبن والهيل والزعفران والبهارات والمكسرات، واستقبال الاستفسارات والطلبات التجارية. الموقع ليس متجرًا للبيع المباشر بالتجزئة للأفراد ولا يقدم خدمات الدفع الإلكتروني المباشر.'
                : 'This website is the official corporate portal of Yemeni Coffee Trading Company. It serves as a showcase of wholesale catalog offerings and a portal for commercial B2B procurement inquiries. It does not provide consumer retail checkout.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '2. عروض الأسعار والكميات' : '2. Quotations & Supply Agreements'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'تخضع أسعار محاصيل القهوة والهيل والبهارات لمتغيرات الأسواق العالمية والمواسم وحجم الكميات المطلوبة. لا يُعتبر تقديم استفسار عبر الموقع عقد توريد ملزم إلا بعد اعتماد وتوقيع عروض الأسعار أو فواتير الشراء الرسمية المعتمدة من إدارة المبيعات.'
                : 'Agricultural commodities are subject to harvest season availability and global commodity rates. Submitting an inquiry does not constitute a binding supply agreement until official quotation acceptance.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '3. حقوق الملكية الفكرية والعلامات التجارية' : '3. Intellectual Property'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'جميع حقوق النشر، العلامات التجارية (بما يشمل شعار شركة البن اليمني للتجارة، وعلامة "راوية Rawia")، والصور والتصميمات ومحتويات الموقع، مملوكة حصرًا للشركة ومحمية بموجب أنظمة حماية الملكية الفكرية في المملكة العربية السعودية.'
                : 'All brand identities, logos, including Yemeni Coffee Trading Co. and "Rawia" trademarks, product photography, and text content are the exclusive property of the company.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#38251D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C49A55]" />
              {lang === 'ar' ? '4. القانون الواجب التطبيق' : '4. Applicable Law'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'تخضع هذه الشروط وتُفسر وفقًا للأنظمة واللوائح المعمول بها في المملكة العربية السعودية، وتختص محاكم المملكة بالنظر في أي نزاع قد ينشأ عنها.'
                : 'These terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia.'}
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
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 rounded-xl border border-[#38251D] text-[#38251D] font-bold text-xs sm:text-sm hover:bg-[#38251D] hover:text-white transition-colors"
          >
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </button>
        </div>

      </div>
    </div>
  );
};
