import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Package, MessageSquareText, Eye, MapPin, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onInquire: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onInquire,
}) => {
  const { lang, t } = useApp();

  const title = lang === 'ar' ? product.titleAr : product.titleEn;
  const subtitle = lang === 'ar' ? product.subtitleAr : product.subtitleEn;
  const description = lang === 'ar' ? product.descriptionAr : product.descriptionEn;
  const origin = lang === 'ar' ? product.originAr : product.originEn;
  const weight = lang === 'ar' ? product.packageWeightAr : product.packageWeightEn;

  return (
    <div className="group bg-white rounded-2xl border border-[#38251D]/10 hover:border-[#C49A55]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-64 sm:h-72 w-full bg-gradient-to-b from-[#F7F2E9] to-[#ebe4d5] p-5 flex items-center justify-center overflow-hidden">
        {/* Availability Badge */}
        <div className="absolute top-3 start-3 z-10">
          {product.isAvailable ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#526647]/15 text-[#526647] border border-[#526647]/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#526647]" />
              {t.availableNow}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-200 text-gray-700">
              {t.currentlyUnavailable}
            </span>
          )}
        </div>

        {/* Brand / Origin badge */}
        <div className="absolute top-3 end-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#38251D] text-[#C49A55] shadow-sm">
            <MapPin className="w-3 h-3" />
            {origin}
          </span>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={title}
          className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Overlay Button */}
        <button
          onClick={() => onOpenDetails(product)}
          className="absolute inset-0 bg-[#38251D]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs"
          aria-label={`عرض تفاصيل ${title}`}
        >
          <span className="px-4 py-2 rounded-lg bg-[#38251D] text-[#C49A55] border border-[#C49A55] shadow-lg flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {t.productDetails}
          </span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between text-start space-y-4">
        <div>
          {/* Subtitle / Packaging type */}
          <div className="flex items-center justify-between text-xs text-[#526647] font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              {weight}
            </span>
            <span className="text-gray-500 text-[11px] truncate max-w-[140px]">{product.brand}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="text-base font-bold text-[#38251D] group-hover:text-[#C49A55] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {title}
          </h3>

          <p className="text-xs text-[#C49A55] font-medium mt-0.5">{subtitle}</p>

          {/* Description */}
          <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
          <button
            onClick={() => onInquire(product)}
            className="flex-1 py-2.5 px-3 rounded-lg bg-[#38251D] hover:bg-[#C49A55] text-white hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>{t.inquireAboutProduct}</span>
          </button>

          <button
            onClick={() => onOpenDetails(product)}
            className="p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:text-[#38251D] hover:border-[#38251D] transition-colors"
            title={t.productDetails}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
