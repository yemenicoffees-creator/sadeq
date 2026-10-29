import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Globe, Mail, MapPin, Shield, Layers, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageId } from '../types';

export const Footer: React.FC = () => {
  const { lang, t, navigateTo, siteSettings, siteContent, setIsAdminOpen } = useApp();
  const currentYear = new Date().getFullYear();

  const quickLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'vision', label: t.nav.vision },
    { id: 'products', label: t.nav.products },
    { id: 'quality', label: t.nav.quality },
    { id: 'wholesale', label: t.nav.wholesale },
    { id: 'branches', label: t.nav.branches },
    { id: 'news', label: t.nav.news },
    { id: 'contact', label: t.nav.contact },
    { id: 'privacy', label: t.nav.privacy },
    { id: 'terms', label: t.nav.terms },
  ];

  return (
    <footer className="bg-[#241712] text-[#F7F2E9] border-t-2 border-[#C49A55]/30 pt-16 pb-8 relative overflow-hidden">
      {/* Background Ambient Decor */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-[#C49A55]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-start">
          
          {/* Brand Info (col-span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#C49A55] flex items-center justify-center shrink-0">
                <img
                  src={siteContent?.branding?.logoUrl || "/assets/aistudio/Yemen_Coffee_logo______________2__3d5596d3.png"}
                  alt={t.companyName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  {lang === 'ar' ? (siteContent?.branding?.companyNameAr || t.companyName) : (siteContent?.branding?.companyNameEn || t.companyName)}
                </h3>
                <span className="text-[#C49A55] text-xs font-semibold">
                  {lang === 'ar' ? 'سجل تجاري معتمد • تجارة الجملة' : 'Certified Wholesale Commercial Entity'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              {lang === 'ar' ? (siteContent?.footer?.aboutAr || t.footerAbout) : (siteContent?.footer?.aboutEn || t.footerAbout)}
            </p>

            <div className="pt-2">
              <div className="text-xs text-[#C49A55] font-semibold mb-2">
                {lang === 'ar' ? 'العلامة التجارية المسجلة:' : 'Registered Brand:'}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-[#526647]" />
                <span className="font-bold">{lang === 'ar' ? 'راوية (Rawia)' : 'Rawia Brand'}</span>
                <span className="text-white/40 text-[10px]">
                  {lang === 'ar' ? 'قهوة خولاني، هرري، بهارات، وقرنفل' : 'Coffee, Cloves & Spices'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links (col-span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-[#C49A55] uppercase tracking-wider border-b border-white/10 pb-2">
              {t.quickLinks}
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.slice(0, 8).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigateTo(link.id)}
                    className="text-white/70 hover:text-[#C49A55] transition-colors py-1 flex items-center gap-1 group text-start"
                  >
                    <span className="text-[#C49A55] opacity-0 group-hover:opacity-100 transition-opacity">
                      {lang === 'ar' ? '‹' : '›'}
                    </span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-2 flex items-center gap-4 text-xs">
              <button
                onClick={() => navigateTo('privacy')}
                className="text-white/60 hover:text-[#C49A55] transition-colors"
              >
                {t.nav.privacy}
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => navigateTo('terms')}
                className="text-white/60 hover:text-[#C49A55] transition-colors"
              >
                {t.nav.terms}
              </button>
            </div>
          </div>

          {/* Contact Details (col-span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-[#C49A55] uppercase tracking-wider border-b border-white/10 pb-2">
              {t.contactInfo}
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C49A55] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/50">{t.phoneLabel}</div>
                  <a
                    href={`tel:${siteSettings.phone}`}
                    className="font-bold text-white hover:text-[#C49A55] transition-colors text-sm"
                  >
                    <span dir="ltr">{siteSettings.phone}</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-[#C49A55] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/50">{t.websiteLabel}</div>
                  <a
                    href={`https://${siteSettings.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-[#C49A55] transition-colors"
                  >
                    {siteSettings.website}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C49A55] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/50">{t.emailLabel}</div>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="font-semibold text-white/90 hover:text-[#C49A55] transition-colors"
                  >
                    {siteSettings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A55] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/50">{t.addressLabel}</div>
                  <span className="text-white/80">{t.saudiArabia}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Branches list in Footer (col-span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-[#C49A55] uppercase tracking-wider border-b border-white/10 pb-2">
              {lang === 'ar' ? 'فروع التوزيع' : 'Branch Hubs'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                { ar: 'المركز الرئيسي', en: 'Headquarters' },
                { ar: 'عتيقة', en: 'Atiqa' },
                { ar: 'الدمام', en: 'Dammam' },
                { ar: 'المدينة المنورة', en: 'Madinah' },
                { ar: 'خميس مشيط', en: 'Khamis' },
                { ar: 'نجران', en: 'Najran' },
                { ar: 'بيشة', en: 'Bisha' },
                { ar: 'سكاكا', en: 'Sakaka' },
              ].map((b, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo('branches')}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-[#C49A55] hover:text-white transition-colors text-[11px] text-white/80 border border-white/5"
                >
                  {lang === 'ar' ? b.ar : b.en}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('admin')}
                className="w-full text-start flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#C49A55] transition-colors text-xs font-bold"
              >
                <Settings className="w-3.5 h-3.5 text-[#C49A55]" />
                <span>{lang === 'ar' ? 'مركز التحكم وتعديل الموقع' : 'Control Center (CMS)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Auto-updated Year */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            <p>
              {lang === 'ar'
                ? `جميع الحقوق محفوظة © ${currentYear} شركة البن اليمني للتجارة`
                : `All Rights Reserved © ${currentYear} Yemeni Coffee Trading Company`}
            </p>
          </div>

          <div className="text-[11px] text-white/40">
            {t.commercialDisclaimer}
          </div>
        </div>

      </div>
    </footer>
  );
};
