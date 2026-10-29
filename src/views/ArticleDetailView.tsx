import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, Check, Tag } from 'lucide-react';

export const ArticleDetailView: React.FC = () => {
  const { lang, t, currentArticleId, articles, navigateTo } = useApp();
  const [copied, setCopied] = useState(false);

  const article = articles.find((a) => a.id === currentArticleId) || articles[0];

  if (!article) return null;

  const title = lang === 'ar' ? article.titleAr : article.titleEn;
  const excerpt = lang === 'ar' ? article.excerptAr : article.excerptEn;
  const content = lang === 'ar' ? article.contentAr : article.contentEn;
  const category = lang === 'ar' ? article.categoryAr : article.categoryEn;
  const author = lang === 'ar' ? article.authorAr : article.authorEn;
  const readTime = lang === 'ar' ? article.readTimeAr : article.readTimeEn;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, text: excerpt, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-10 bg-[#F7F2E9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: t.nav.news, page: 'news' }]}
          currentPageTitle={title}
        />

        {/* Back button */}
        <button
          onClick={() => navigateTo('news')}
          className="mb-6 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#38251D] hover:text-[#C49A55] transition-colors"
        >
          {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{lang === 'ar' ? 'العودة لجميع المقالات' : 'Back to All Articles'}</span>
        </button>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl text-start">
          {/* Hero Banner Image */}
          <div className="relative h-72 sm:h-96 w-full bg-gray-900">
            <img
              src={article.image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 start-6 end-6 text-white space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#C49A55] text-white text-xs font-bold">
                {category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {title}
              </h1>
            </div>
          </div>

          {/* Article Meta Bar */}
          <div className="px-6 sm:px-10 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#C49A55]" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#526647]" />
                {readTime}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-4 h-4 text-[#38251D]" />
                {author}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-[#C49A55] text-gray-700 hover:text-[#38251D] flex items-center gap-1.5 text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? (lang === 'ar' ? 'تم نسخ الرابط' : 'Link Copied') : t.shareArticle}</span>
            </button>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-10 space-y-6 text-base text-gray-800 leading-relaxed font-normal">
            <p className="text-lg font-semibold text-[#38251D] leading-relaxed border-s-4 border-[#C49A55] ps-4">
              {excerpt}
            </p>

            <div className="space-y-4">
              <p>{content}</p>
              <p>
                {lang === 'ar'
                  ? 'تسعى شركة البن اليمني للتجارة دائمًا إلى تعزيز الوعي بجودة محاصيل البن وتطوير مفاهيم تجارة التوابل والهيل في المملكة العربية السعودية، من خلال تطبيق المعايير الدقيقة التي ترضي أذواق المستهلكين وتضمن ربحية وتنافسية شركائنا التجاريين.'
                  : 'Yemeni Coffee Trading Company continues to elevate crop awareness and quality assurance across the coffee and spice sectors in Saudi Arabia.'}
              </p>
            </div>

            {/* Bottom Commercial CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-[#F7F2E9] border border-[#C49A55]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-[#38251D] text-base">
                  {lang === 'ar' ? 'هل ترغب في استيراد أو توريد هذا المحصول؟' : 'Interested in Sourcing This Crop?'}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {lang === 'ar' ? 'تواصل مع فريق مبيعات الجملة للاستفسار عن الكميات المتوفرة' : 'Contact wholesale sales for available batch allocations'}
                </p>
              </div>
              <button
                onClick={() => navigateTo('contact')}
                className="px-5 py-2.5 rounded-xl bg-[#38251D] hover:bg-[#C49A55] text-white text-xs font-bold transition-colors shrink-0"
              >
                {t.contactSales}
              </button>
            </div>
          </div>
        </article>

      </div>
    </div>
  );
};
