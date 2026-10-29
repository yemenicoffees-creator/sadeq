import React from 'react';
import { useApp } from '../context/AppContext';
import { Coffee, Home, ArrowLeft, ArrowRight } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  const { lang, t, navigateTo } = useApp();

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 bg-[#F7F2E9]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#C49A55]/30 shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#38251D] text-[#C49A55] flex items-center justify-center mx-auto shadow-lg">
          <Coffee className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-black text-[#C49A55]">404</span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#38251D]">
            {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {lang === 'ar'
              ? 'عذرًا، الصفحة التي تحاول الوصول إليها غير متوفرة أو تم نقلها. يرجى العودة إلى الصفحة الرئيسية لتصفح منتجاتنا وفروعنا.'
              : 'The requested page could not be located. Please return to the home page to explore our wholesale products and branches.'}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-3.5 rounded-xl bg-[#38251D] hover:bg-[#C49A55] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            <Home className="w-4 h-4" />
            <span>{lang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Return to Home'}</span>
            {lang === 'ar' ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
