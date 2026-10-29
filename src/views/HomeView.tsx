import React from 'react';
import { useApp } from '../context/AppContext';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Coffee,
  Building2,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { lang, t, products, branches, navigateTo, setInquiryModalProduct, setSelectedProductId, siteContent } = useApp();

  // Pick the top 4 flagship products for the homepage highlight
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <main className="space-y-0">
      {/* 1. Grand Hero Section */}
      <Hero />

      {/* 2. Executive Welcome & About Gateway */}
      <section className="py-20 bg-[#F7F2E9] border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src={siteContent?.about?.image || "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80"}
                  alt="شركة البن اليمني للتجارة"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -end-6 bg-[#38251D] text-white p-4 rounded-2xl shadow-xl border border-[#C49A55] max-w-xs flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/aistudio/_______________a9779794.png"
                    alt="قهوة خولاني"
                    className="h-full object-contain"
                  />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-[#C49A55]">
                    {lang === 'ar' ? 'العلامة التجارية راوية' : 'Rawia Trademark'}
                  </div>
                  <div className="text-[11px] text-white/80">
                    {lang === 'ar' ? 'أجود محاصيل البن والهيل' : 'Finest Coffee & Cardamom'}
                  </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C49A55]/15 text-[#38251D] text-xs font-bold border border-[#C49A55]/30">
                <Coffee className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>{lang === 'ar' ? (siteContent?.about?.badgeAr || 'مرحبًا بكم في البن اليمني') : (siteContent?.about?.badgeEn || 'Welcome to Yemeni Coffee')}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#38251D] leading-tight">
                {lang === 'ar' ? (siteContent?.about?.titleAr || t.aboutTitle) : (siteContent?.about?.titleEn || t.aboutTitle)}
              </h2>

              <p className="text-base sm:text-lg text-[#38251D]/80 leading-relaxed">
                {lang === 'ar' ? (siteContent?.about?.paragraph1Ar || t.aboutParagraph1) : (siteContent?.about?.paragraph1En || t.aboutParagraph1)}
              </p>

              {/* 3 Value bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38251D]">
                  <CheckCircle2 className="w-4 h-4 text-[#526647] shrink-0" />
                  <span>{lang === 'ar' ? 'محاصيل يمنية وإثيوبية وهندية منتقاة' : 'Curated Yemeni, Ethiopian & Indian crops'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38251D]">
                  <CheckCircle2 className="w-4 h-4 text-[#526647] shrink-0" />
                  <span>{lang === 'ar' ? 'أفخر درجات الهيل الأخضر والزعفران' : 'Premium Green Cardamom & Pure Saffron'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38251D]">
                  <CheckCircle2 className="w-4 h-4 text-[#526647] shrink-0" />
                  <span>{lang === 'ar' ? 'تغليف تجاري عازل يحفظ النكهة والزيوت' : 'Aroma-seal commercial packaging'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38251D]">
                  <CheckCircle2 className="w-4 h-4 text-[#526647] shrink-0" />
                  <span>{lang === 'ar' ? 'شبكة توريد وفروع تغطي مدن المملكة' : 'Nationwide branch & logistics network'}</span>
                </div>
              </div>

              {/* Action Button: Dedicated About Page */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('about')}
                  className="px-7 py-3.5 rounded-xl bg-[#38251D] hover:bg-[#4d3328] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center gap-2 group"
                >
                  <span>{lang === 'ar' ? 'اقرأ المزيد في صفحة من نحن' : 'Read More on About Us Page'}</span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#C49A55]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C49A55]" />
                  )}
                </button>

                <button
                  onClick={() => navigateTo('vision')}
                  className="px-6 py-3.5 rounded-xl border border-[#C49A55] text-[#38251D] hover:bg-[#C49A55] hover:text-white font-bold text-sm transition-all"
                >
                  <span>{t.nav.vision}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Products Preview Gateway */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-start">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#526647]/10 text-[#526647] text-xs font-bold border border-[#526647]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'محاصيل ومنتجات مختارة' : 'Signature Wholesale Crops'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
                {lang === 'ar' ? 'أبرز منتجات تجارة الجملة' : 'Featured Wholesale Products'}
              </h2>
              <p className="text-sm text-gray-600">
                {lang === 'ar'
                  ? 'لمحة عن المحاصيل المعتمدة لدى الشركة، المعبأة خصيصًا لتلبية متطلبات المحامص وتجار التجزئة في المملكة.'
                  : 'A preview of our certified crops packed specifically for roasteries and retailers across KSA.'}
              </p>
            </div>

            {/* Direct button to separate Products page */}
            <div>
              <button
                onClick={() => navigateTo('products')}
                className="px-6 py-3 rounded-xl bg-[#38251D] hover:bg-[#4d3328] text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 group whitespace-nowrap"
              >
                <span>{lang === 'ar' ? 'تصفح الكتالوج الكامل في صفحة المنتجات' : 'Browse Full Products Page'}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#C49A55]" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C49A55]" />
                )}
              </button>
            </div>
          </div>

          {/* 4 Flagship Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpenDetails={(prod) => setSelectedProductId(prod.id)}
                onInquire={(prod) => setInquiryModalProduct(prod)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us (6 Advantages) */}
      <WhyChooseUs />

      {/* 5. Branches Summary Gateway */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#38251D] text-white rounded-3xl p-8 sm:p-14 border border-[#C49A55]/30 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-start">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#C49A55] text-xs font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'فروعنا في 8 مواقع تجارية بالمملكة' : 'Our 8 Kingdom-Wide Branches'}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F7F2E9]">
                  {lang === 'ar' ? 'شبكة فروع ومستودعات تغطي أهم المناطق' : 'Comprehensive Supply Hubs Across Saudi Arabia'}
                </h2>

                <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
                  {lang === 'ar'
                    ? 'المركز الرئيسي بالرياض، فرع عتيقة، الدمام، المدينة المنورة، خميس مشيط، نجران، بيشة، وسكاكا. ساعات العمل الموحدة: 8:00 ص - 12:00 م | 3:00 م - 8:00 م.'
                    : 'Riyadh HQ, Atiqa, Dammam, Madinah, Khamis Mushait, Najran, Bisha, and Sakaka. Working Hours: 8 AM - 12 PM | 3 PM - 8 PM.'}
                </p>

                {/* Cities badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'الرياض (المركز الرئيسي)',
                    'الرياض (فرع عتيقة)',
                    'الدمام',
                    'المدينة المنورة',
                    'خميس مشيط',
                    'نجران',
                    'بيشة',
                    'سكاكا',
                  ].map((city, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-xs text-[#F7F2E9] font-medium"
                    >
                      📍 {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Dedicated Branches Page */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                <button
                  onClick={() => navigateTo('branches')}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#C49A55] hover:bg-[#b38844] text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{lang === 'ar' ? 'الانتقال لصفحة الفروع الرسمية' : 'Visit Dedicated Branches Page'}</span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. Executive B2B Contact Gateway */}
      <section className="py-20 bg-[#F7F2E9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#38251D] text-[#C49A55] flex items-center justify-center mx-auto shadow-md">
            <Phone className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#38251D]">
            {t.contactTitle}
          </h2>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'تفضل بزيارة صفحة تواصل معنا لتقديم استفساركم التجاري أو طلب عروض الأسعار، أو اتصل مباشرة بالرقم الموحد 920016645.'
              : 'Visit our dedicated Contact Us page to submit wholesale inquiries and request price quotations, or call 920016645.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#a87d3b] hover:from-[#d6aa65] hover:to-[#b38844] text-white font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>{lang === 'ar' ? 'فتح صفحة تواصل معنا ونموذج الاستفسار' : 'Open Contact & Inquiry Page'}</span>
              {lang === 'ar' ? (
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            <a
              href="tel:920016645"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white border border-[#38251D]/20 text-[#38251D] hover:border-[#38251D] font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#C49A55]" />
              <span dir="ltr">920016645</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};
