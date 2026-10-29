import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageId } from '../types';

interface BreadcrumbProps {
  currentPageTitle: string;
  parentPage?: { id: PageId; title: string };
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPageTitle, parentPage }) => {
  const { lang, navigateTo } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-xs text-gray-500 font-medium flex-wrap">
        <li>
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1 text-gray-600 hover:text-[#C49A55] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </button>
        </li>

        <li>
          {lang === 'ar' ? (
            <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          )}
        </li>

        {parentPage && (
          <>
            <li>
              <button
                onClick={() => navigateTo(parentPage.id)}
                className="text-gray-600 hover:text-[#C49A55] transition-colors"
              >
                {parentPage.title}
              </button>
            </li>
            <li>
              {lang === 'ar' ? (
                <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              )}
            </li>
          </>
        )}

        <li className="text-[#38251D] font-bold" aria-current="page">
          {currentPageTitle}
        </li>
      </ol>
    </nav>
  );
};
