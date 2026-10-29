import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Article } from '../types';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, Check, FileText } from 'lucide-react';

interface NewsSectionProps {
  limit?: number;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ limit }) => {
  const { lang, t, articles, navigateTo } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayedArticles = limit ? articles.slice(0, limit) : articles;

  const handleShare = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: lang === 'ar' ? article.titleAr : article.titleEn,
        text: lang === 'ar' ? article.excerptAr : article.excerptEn,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section className="py-20 bg-[#F7F2E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#38251D]/10 text-[#38251D] text-xs font-bold border border-[#38251D]/20">
            <FileText className="w-3.5 h-3.5 text-[#C49A55]" />
            <span>{t.newsTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
            {lang === 'ar' ? 'مقالات وإضاءات تجارية' : 'Industry Insights & Articles'}
          </h2>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            {t.newsSubtitle}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article) => {
            const title = lang === 'ar' ? article.titleAr : article.titleEn;
            const excerpt = lang === 'ar' ? article.excerptAr : article.excerptEn;
            const category = lang === 'ar' ? article.categoryAr : article.categoryEn;
            const author = lang === 'ar' ? article.authorAr : article.authorEn;
            const readTime = lang === 'ar' ? article.readTimeAr : article.readTimeEn;

            return (
              <article
                key={article.id}
                onClick={() => navigateTo('article', { articleId: article.id })}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#38251D]/10 hover:border-[#C49A55] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-start"
              >
                <div>
                  {/* Article Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 start-3">
                      <span className="px-3 py-1 rounded-full bg-[#38251D]/80 backdrop-blur-md text-[#C49A55] text-xs font-bold">
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C49A55]" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#526647]" />
                        {readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#38251D] group-hover:text-[#C49A55] transition-colors line-clamp-2 leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#38251D] group-hover:text-[#C49A55] flex items-center gap-1.5 transition-colors">
                    <span>{t.readMore}</span>
                    {lang === 'ar' ? (
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </span>

                  <button
                    onClick={(e) => handleShare(e, article)}
                    className="p-2 rounded-lg text-gray-400 hover:text-[#38251D] hover:bg-gray-100 transition-colors"
                    title={t.shareArticle}
                    aria-label={t.shareArticle}
                  >
                    {copiedId === article.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Articles button if limited */}
        {limit && articles.length > limit && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigateTo('news')}
              className="px-8 py-3.5 rounded-xl bg-[#38251D] hover:bg-[#4d3328] text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>{lang === 'ar' ? 'عرض جميع المقالات والأخبار' : 'View All Articles'}</span>
              {lang === 'ar' ? (
                <ArrowLeft className="w-4 h-4 text-[#C49A55]" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#C49A55]" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
