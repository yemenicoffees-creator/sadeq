import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, ArrowLeft, ArrowRight, ShieldCheck, Award, MapPin, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { lang, t, navigateTo, siteSettings, siteContent } = useApp();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#251712] overflow-hidden">
      {/* Background with warm cinematic lighting and rich coffee bean & spice imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteContent?.hero?.bgImage || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=2000&q=85"}
          alt="حبوب القهوة والهيل والبهارات الفاخرة"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 filter brightness-90 contrast-110"
        />
        {/* Subtle radial luxury gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#241712] via-[#241712]/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241712] via-transparent to-[#241712]/70 z-10" />
      </div>

      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-1/4 start-10 w-96 h-96 bg-[#C49A55]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 end-10 w-80 h-80 bg-[#526647]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Typography & CTAs (col-span 7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-start">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C49A55]/15 border border-[#C49A55]/40 text-[#C49A55] text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#C49A55]" />
              <span>
                {lang === 'ar'
                  ? (siteContent?.hero?.badgeAr || 'الموقع الرسمي • تجارة الجملة والتوريد بالمملكة العربية السعودية')
                  : (siteContent?.hero?.badgeEn || 'Official Corporate Portal • Wholesale Supply in KSA')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F7F2E9] leading-[1.2] tracking-tight">
              <span className="block text-white drop-shadow-md">
                «{lang === 'ar' ? (siteContent?.hero?.highlightAr || t.companyTagline) : (siteContent?.hero?.highlightEn || t.companyTagline)}»
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C49A55] via-[#e2be7e] to-[#C49A55] text-2xl sm:text-3xl md:text-4xl mt-3 font-bold">
                {lang === 'ar' ? (siteContent?.branding?.companyNameAr || t.companyName) : (siteContent?.branding?.companyNameEn || t.companyName)}
              </span>
            </h1>

            {/* Descriptive subtext */}
            <p className="text-base sm:text-lg md:text-xl text-[#F7F2E9]/90 leading-relaxed font-normal max-w-2xl">
              {lang === 'ar' ? (siteContent?.hero?.subtitleAr || t.heroDescription) : (siteContent?.hero?.subtitleEn || t.heroDescription)}
            </p>

            {/* Quick Key Metrics / Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-[#C49A55] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'معايير فرز دقيقة' : 'Rigorous Sorting'}
                  </div>
                  <div className="text-[11px] text-white/60">
                    {lang === 'ar' ? 'محاصيل نقية ومختارة' : 'Pristine Harvests'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-[#C49A55] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'فروع تغطي المملكة' : 'Kingdom-wide Network'}
                  </div>
                  <div className="text-[11px] text-white/60">
                    {lang === 'ar' ? 'الرياض والمدن الرئيسية' : 'Riyadh & Major Cities'}
                  </div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Award className="w-5 h-5 text-[#C49A55] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'تنوع المحاصيل' : 'Diverse Origins'}
                  </div>
                  <div className="text-[11px] text-white/60">
                    {lang === 'ar' ? 'بن، هيل، زعفران، بهارات' : 'Coffee, Cardamom, Spices'}
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigateTo('products')}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#b38844] hover:from-[#d6aa65] hover:to-[#c49a55] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group"
              >
                <span>{t.exploreProducts}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className="px-7 py-4 rounded-xl bg-[#38251D] hover:bg-[#4a3227] text-[#F7F2E9] border border-[#C49A55]/50 hover:border-[#C49A55] font-bold text-base transition-all flex items-center justify-center gap-3 shadow"
              >
                <span>{t.contactSales}</span>
              </button>
            </div>

            {/* Direct Phone Indicator */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-white/70">
              <span>{lang === 'ar' ? 'للتواصل المباشر مع المبيعات:' : 'Direct Sales Line:'}</span>
              <a
                href={`tel:${siteSettings.phone}`}
                className="text-[#C49A55] hover:text-white font-bold transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">{siteSettings.phone}</span>
              </a>
            </div>

          </div>

          {/* Visual Showcase (col-span 5): Real Product Hero Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Golden Border & Glow */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#C49A55] via-[#C49A55]/30 to-transparent shadow-2xl">
                <div className="rounded-[22px] bg-[#2C1C16]/90 backdrop-blur-xl p-6 sm:p-8 border border-white/10 space-y-6">
                  
                  {/* Card Header with real logo */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white p-1 border border-[#C49A55] flex items-center justify-center">
                        <img
                          src={siteContent?.branding?.logoUrl || "/assets/aistudio/Yemen_Coffee_logo______________2__3d5596d3.png"}
                          alt={t.companyName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">
                          {lang === 'ar' ? (siteContent?.branding?.companyNameAr || 'شركة البن اليمني للتجارة') : (siteContent?.branding?.companyNameEn || 'Yemeni Coffee Trading')}
                        </div>
                        <div className="text-[#C49A55] text-xs">
                          {lang === 'ar' ? (siteContent?.hero?.floatingBoxTitleAr || 'العلامة التجارية: راوية (Rawia)') : (siteContent?.hero?.floatingBoxTitleEn || 'Commercial Brand: Rawia')}
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#526647]/30 text-[#85a874] border border-[#526647]/50 text-xs font-bold">
                      {lang === 'ar' ? 'جملة تجارية' : 'Wholesale'}
                    </span>
                  </div>

                  {/* Featured Product Image Showcase */}
                  <div className="relative h-64 sm:h-72 w-full rounded-xl bg-gradient-to-b from-[#38251D] to-[#1c120d] flex items-center justify-center overflow-hidden border border-white/5 p-4 group">
                    <img
                      src={siteContent?.hero?.floatingBoxImage || "/assets/aistudio/_______________a9779794.png"}
                      alt="قهوة خولاني - محصول اليمن - 5 كجم"
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 start-3 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                      {lang === 'ar' ? (siteContent?.hero?.floatingBoxSubtitleAr || 'قهوة خولاني • محصول اليمن 5 كجم') : (siteContent?.hero?.floatingBoxSubtitleEn || 'Khawlani Coffee • Yemen 5KG')}
                    </div>
                  </div>

                  {/* Thumbnail Row of other real products */}
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      onClick={() => navigateTo('products')}
                      className="cursor-pointer rounded-lg bg-black/30 border border-white/10 p-2 text-center hover:border-[#C49A55] transition-all flex flex-col items-center"
                    >
                      <div className="h-12 w-full flex items-center justify-center">
                        <img
                          src="/assets/aistudio/5___b1c66e57.png"
                          alt="بن هرري"
                          className="max-h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-white/80 font-medium mt-1 truncate w-full">
                        {lang === 'ar' ? 'بن هرري 5 كجم' : 'Harari 5KG'}
                      </span>
                    </div>

                    <div
                      onClick={() => navigateTo('products')}
                      className="cursor-pointer rounded-lg bg-black/30 border border-white/10 p-2 text-center hover:border-[#C49A55] transition-all flex flex-col items-center"
                    >
                      <div className="h-12 w-full flex items-center justify-center">
                        <img
                          src="/assets/aistudio/_____________67dcf376.png"
                          alt="قهوة خضراء AAA"
                          className="max-h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-white/80 font-medium mt-1 truncate w-full">
                        {lang === 'ar' ? 'بن أخضر AAA' : 'Green Coffee AAA'}
                      </span>
                    </div>

                    <div
                      onClick={() => navigateTo('products')}
                      className="cursor-pointer rounded-lg bg-black/30 border border-white/10 p-2 text-center hover:border-[#C49A55] transition-all flex flex-col items-center"
                    >
                      <div className="h-12 w-full flex items-center justify-center">
                        <img
                          src="/assets/aistudio/______4578d008.png"
                          alt="قرنفل إندونيسي"
                          className="max-h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-white/80 font-medium mt-1 truncate w-full">
                        {lang === 'ar' ? 'قرنفل إندونيسي' : 'Cloves 10KG'}
                      </span>
                    </div>
                  </div>

                  {/* Card bottom info */}
                  <div className="pt-2 flex items-center justify-between text-xs text-white/70">
                    <span className="text-[#C49A55] font-semibold">
                      {lang === 'ar' ? 'متاح للطلب والتوريد التجاري' : 'Available for Commercial Supply'}
                    </span>
                    <button
                      onClick={() => navigateTo('products')}
                      className="text-white hover:text-[#C49A55] underline text-xs"
                    >
                      {lang === 'ar' ? 'عرض الكتالوج' : 'View Catalog'}
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
