import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { initialFaqItems } from '../data/initialData';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { lang, t } = useApp();
  const [openId, setOpenId] = useState<string | null>(initialFaqItems[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#526647]/10 text-[#526647] text-xs font-bold border border-[#526647]/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faqTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
            {lang === 'ar' ? 'الأسئلة الأكثر شيوعًا' : 'Frequently Asked Questions'}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {initialFaqItems.map((item) => {
            const isOpen = openId === item.id;
            const question = lang === 'ar' ? item.questionAr : item.questionEn;
            const answer = lang === 'ar' ? item.answerAr : item.answerEn;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden text-start ${
                  isOpen
                    ? 'border-[#C49A55] bg-[#F7F2E9]/70 shadow-md ring-1 ring-[#C49A55]/30'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-start focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-[#38251D] flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C49A55] shrink-0" />
                    <span>{question}</span>
                  </span>
                  <div className="p-1 rounded-full bg-white/80 shrink-0 text-[#38251D]">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C49A55]" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-700 leading-relaxed border-t border-black/5 animate-fadeIn">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
