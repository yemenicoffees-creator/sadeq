import React from 'react';
import { useApp } from '../context/AppContext';
import { Eye, Compass, Award, Star, Heart, Check, Users, Sparkles } from 'lucide-react';

export const VisionMissionValues: React.FC = () => {
  const { lang, t } = useApp();

  const valueIcons = [
    <Award className="w-5 h-5 text-[#C49A55]" />,
    <Check className="w-5 h-5 text-[#C49A55]" />,
    <Star className="w-5 h-5 text-[#C49A55]" />,
    <Heart className="w-5 h-5 text-[#C49A55]" />,
    <Sparkles className="w-5 h-5 text-[#C49A55]" />,
    <Users className="w-5 h-5 text-[#C49A55]" />,
  ];

  return (
    <section className="py-20 bg-[#38251D] text-white relative overflow-hidden">
      {/* Background Subtle Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 start-0 w-96 h-96 bg-[#C49A55] rounded-full blur-3xl" />
        <div className="absolute bottom-0 end-0 w-96 h-96 bg-[#526647] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#C49A55] text-xs font-bold border border-white/10">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.visionTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F7F2E9] tracking-tight">
            {lang === 'ar' ? 'ركائز هويتنا ومسيرتنا التجارية' : 'Pillars of Our Corporate Identity'}
          </h2>
        </div>

        {/* Vision & Mission Two-Column Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Vision Card */}
          <div className="bg-[#2C1C16] rounded-3xl p-8 sm:p-10 border border-[#C49A55]/30 shadow-xl space-y-5 text-start relative group hover:border-[#C49A55] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#C49A55]/20 border border-[#C49A55]/40 flex items-center justify-center text-[#C49A55]">
              <Eye className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[#F7F2E9]">
              {t.visionLabel}
            </h3>

            <p className="text-sm sm:text-base text-[#F7F2E9]/85 leading-relaxed font-normal">
              {t.visionText}
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-[#2C1C16] rounded-3xl p-8 sm:p-10 border border-[#526647]/50 shadow-xl space-y-5 text-start relative group hover:border-[#526647] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#526647]/30 border border-[#526647]/50 flex items-center justify-center text-[#82a373]">
              <Compass className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[#F7F2E9]">
              {t.missionLabel}
            </h3>

            <p className="text-sm sm:text-base text-[#F7F2E9]/85 leading-relaxed font-normal">
              {t.missionText}
            </p>
          </div>

        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-[#C49A55]">
              {t.valuesLabel}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              {lang === 'ar'
                ? 'مبادئ راسخة توجه كل خطوة في عملياتنا وعلاقاتنا مع الشركاء'
                : 'Steadfast principles guiding our daily operations and client relationships'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#241712] rounded-2xl p-6 border border-white/10 hover:border-[#C49A55]/60 transition-all text-start space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    {valueIcons[idx % valueIcons.length]}
                  </div>
                  <h4 className="text-base font-bold text-white">{val.title}</h4>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
