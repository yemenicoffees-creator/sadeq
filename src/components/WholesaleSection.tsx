import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building,
  Store,
  Flame,
  Coffee,
  UtensilsCrossed,
  Boxes,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle,
} from 'lucide-react';

export const WholesaleSection: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  const sectorIcons = [
    <Building className="w-5 h-5 text-[#C49A55]" />,
    <Store className="w-5 h-5 text-[#C49A55]" />,
    <Flame className="w-5 h-5 text-[#C49A55]" />,
    <Coffee className="w-5 h-5 text-[#C49A55]" />,
    <UtensilsCrossed className="w-5 h-5 text-[#C49A55]" />,
    <Boxes className="w-5 h-5 text-[#C49A55]" />,
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Target Sectors (col-span 7) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#526647]/10 text-[#526647] text-xs font-bold border border-[#526647]/20">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.b2bWholesale}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
              {t.wholesaleTitle}
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              {t.wholesaleSubtitle}
            </p>

            <div className="pt-2">
              <h3 className="text-base sm:text-lg font-bold text-[#38251D] mb-4">
                {t.targetSectorsTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {t.targetSectors.map((sector, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#38251D]/10 hover:border-[#C49A55] transition-colors flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                      {sectorIcons[i % sectorIcons.length]}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#38251D]">
                      {sector}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigateTo('contact')}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#a87d3b] hover:from-[#d6aa65] hover:to-[#b38844] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>{t.requestCommercialContact}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <button
                onClick={() => navigateTo('wholesale')}
                className="px-6 py-3.5 rounded-xl border border-[#38251D] text-[#38251D] hover:bg-[#38251D] hover:text-white font-bold text-sm transition-all text-center"
              >
                {lang === 'ar' ? 'تفاصيل التوريد والاشتراطات' : 'Wholesale Policies'}
              </button>
            </div>

          </div>

          {/* Right Visual Image (col-span 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-[#2C1C16] to-[#1c120d] p-6 text-white space-y-6">
              
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                  alt="مستودعات تجارة الجملة والتوزيع"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 start-4 end-4">
                  <div className="text-sm font-bold text-[#C49A55]">
                    {lang === 'ar' ? 'شبكة لوجستية وتخزين منضبط' : 'Regulated Storage & Logistics'}
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">
                    {lang === 'ar' ? 'جاهزية عالية لتلبية الطلبات التجارية' : 'Reliable B2B fulfillment capacity'}
                  </div>
                </div>
              </div>

              {/* Real Wholesale Cloves Card */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/______4578d008.png"
                    alt="قرنفل إندونيسي 10 كجم"
                    className="h-full object-contain"
                  />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'تعبئة الجملة الأصلية (كرتون 10 كجم)' : 'Master Wholesale Cartons (10 KG)'}
                  </div>
                  <div className="text-[11px] text-white/60 mt-1">
                    {lang === 'ar'
                      ? 'مخصصة لمحلات التوابل والمحامص والموزعين'
                      : 'Tailored for spice retailers, roasteries & distributors'}
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
