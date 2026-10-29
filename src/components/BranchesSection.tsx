import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Clock, ExternalLink, Building2, MessageSquareText } from 'lucide-react';
import { Branch } from '../types';

export const BranchesSection: React.FC = () => {
  const { lang, t, branches, siteSettings, navigateTo } = useApp();
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(branches[0] || null);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#38251D]/10 text-[#38251D] text-xs font-bold border border-[#38251D]/20">
            <Building2 className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>{t.branchesTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
            {lang === 'ar' ? 'فروعنا وشبكة التوزيع بالمملكة' : 'Our Branch & Supply Network'}
          </h2>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            {t.branchesSubtitle}
          </p>
        </div>

        {/* 7 Saudi Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {branches.map((branch) => {
            const cityName = lang === 'ar' ? branch.cityAr : branch.cityEn;
            const address = lang === 'ar' ? branch.addressAr : branch.addressEn;
            const hours = lang === 'ar' ? branch.workingHoursAr : branch.workingHoursEn;
            const isSelected = selectedBranch?.id === branch.id;

            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border text-start flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-[#38251D] text-white border-[#C49A55] shadow-xl ring-2 ring-[#C49A55]/30'
                    : 'bg-[#F7F2E9] text-[#38251D] border-gray-200 hover:border-[#C49A55] hover:bg-white shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-lg font-bold ${
                        isSelected ? 'text-[#C49A55]' : 'text-[#38251D]'
                      }`}
                    >
                      {cityName}
                    </span>
                    {branch.isMain && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C49A55] text-white">
                        {t.mainBranch}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? 'text-white/80' : 'text-gray-600'
                    }`}
                  >
                    {address}
                  </p>
                </div>

                <div className="pt-3 border-t border-current/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C49A55] shrink-0" />
                      <a
                        href={`tel:${branch.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold hover:underline"
                        dir="ltr"
                      >
                        {branch.phone}
                      </a>
                    </div>
                    {/* Direct WhatsApp link */}
                    <a
                      href={`https://wa.me/966${branch.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors text-[10px] font-bold flex items-center gap-1"
                      title={lang === 'ar' ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp'}
                    >
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#526647] shrink-0 mt-0.5" />
                    <span className="opacity-80 text-[11px] leading-tight">{hours}</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-[#C49A55]' : 'text-[#38251D]'}>
                    {lang === 'ar' ? 'عرض تفاصيل الفرع' : 'Branch Details'}
                  </span>
                  <MapPin className="w-4 h-4 text-[#C49A55]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Branch Detail Box / Action Bar */}
        {selectedBranch && (
          <div className="bg-[#2C1C16] text-white rounded-3xl p-6 sm:p-8 border border-[#C49A55]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-start space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C49A55]" />
                <h3 className="text-xl font-bold text-white">
                  {lang === 'ar' ? selectedBranch.cityAr : selectedBranch.cityEn}
                </h3>
                {selectedBranch.isMain && (
                  <span className="text-xs bg-[#C49A55] text-white px-2 py-0.5 rounded-full font-bold">
                    {t.mainBranch}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                {lang === 'ar' ? selectedBranch.addressAr : selectedBranch.addressEn}
              </p>
              <div className="text-xs text-[#C49A55] flex items-center gap-3 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#526647]" />
                <span>{lang === 'ar' ? selectedBranch.workingHoursAr : selectedBranch.workingHoursEn}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <a
                href={`tel:${selectedBranch.phone}`}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C49A55]" />
                <span dir="ltr">{selectedBranch.phone}</span>
              </a>

              <a
                href={`https://wa.me/966${selectedBranch.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                <span>واتساب الفرع</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-[#C49A55] hover:bg-[#b38844] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.viewOnMap}</span>
              </a>
            </div>
          </div>
        )}

        {/* Inquire Nearest Branch CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-3.5 rounded-xl bg-[#38251D] hover:bg-[#4d3328] text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
          >
            <MessageSquareText className="w-4 h-4 text-[#C49A55]" />
            <span>{t.inquireNearestBranch}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
