import React from 'react';
import { useApp } from '../context/AppContext';
import { WholesaleForm } from './WholesaleForm';
import { Phone, Mail, Globe, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  prefillProductName?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefillProductName }) => {
  const { lang, t, siteSettings } = useApp();

  return (
    <section id="contact-section" className="py-20 bg-[#F7F2E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#38251D]/10 text-[#38251D] text-xs font-bold border border-[#38251D]/20">
            <Phone className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>{t.nav.contact}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
            «{t.contactTitle}»
          </h2>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card (col-span 5) */}
          <div className="lg:col-span-5 space-y-6 text-start">
            <div className="bg-[#38251D] text-white rounded-3xl p-8 sm:p-10 border border-[#C49A55]/30 shadow-2xl space-y-6">
              
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-white p-1.5 border border-[#C49A55] flex items-center justify-center shrink-0">
                  <img
                    src="/assets/aistudio/Yemen_Coffee_logo______________2__3d5596d3.png"
                    alt={t.companyName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t.companyName}</h3>
                  <p className="text-xs text-[#C49A55]">{t.saudiArabia}</p>
                </div>
              </div>

              {/* Direct Call Button Box */}
              <div className="p-4 rounded-2xl bg-[#C49A55]/20 border border-[#C49A55]/40 space-y-2">
                <span className="text-xs text-[#F7F2E9]/80 font-medium">
                  {lang === 'ar' ? 'الرقم الموحد المباشر:' : 'Unified Direct Line:'}
                </span>
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#C49A55] hover:bg-[#b38844] text-white font-black text-lg sm:text-xl transition-all shadow-md group"
                >
                  <span dir="ltr">{siteSettings.phone}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                </a>
                <p className="text-[11px] text-white/60">
                  {lang === 'ar'
                    ? 'متاح خلال ساعات العمل الرسمية لتجار الجملة والشركات'
                    : 'Available during official business hours for commercial accounts'}
                </p>
              </div>

              {/* Contact Information List */}
              <div className="space-y-4 pt-2 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-[#C49A55]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">{t.websiteLabel}</div>
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

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#C49A55]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">{t.emailLabel}</div>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="font-bold text-white hover:text-[#C49A55] transition-colors"
                    >
                      {siteSettings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#C49A55]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">{t.addressLabel}</div>
                    <div className="font-semibold text-white">
                      {lang === 'ar' ? siteSettings.headquartersAr : siteSettings.headquartersEn}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#526647]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">
                      {lang === 'ar' ? 'أوقات العمل الرسمية' : 'Business Hours'}
                    </div>
                    <div className="font-medium text-white/90 text-xs">
                      {lang === 'ar'
                        ? 'السبت - الخميس: 8:00 صباحاً - 6:00 مساءً'
                        : 'Saturday - Thursday: 8:00 AM - 6:00 PM'}
                    </div>
                  </div>
                </div>
              </div>

              {/* B2B Assurance badge */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C49A55] shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'خصوصية تامة لبيانات الشركات واستفسارات عروض الأسعار.'
                    : 'Strict confidentiality for corporate inquiries & RFP quotes.'}
                </span>
              </div>

            </div>
          </div>

          {/* Wholesale Form (col-span 7) */}
          <div className="lg:col-span-7">
            <WholesaleForm prefillProductName={prefillProductName} />
          </div>

        </div>

      </div>
    </section>
  );
};
