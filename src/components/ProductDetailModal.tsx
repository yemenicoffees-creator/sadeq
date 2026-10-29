import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { X, MapPin, Package, ShieldCheck, MessageSquareText, Phone } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onInquire: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onInquire,
}) => {
  const { lang, t, siteSettings } = useApp();

  if (!product) return null;

  const title = lang === 'ar' ? product.titleAr : product.titleEn;
  const subtitle = lang === 'ar' ? product.subtitleAr : product.subtitleEn;
  const description = lang === 'ar' ? product.descriptionAr : product.descriptionEn;
  const origin = lang === 'ar' ? product.originAr : product.originEn;
  const weight = lang === 'ar' ? product.packageWeightAr : product.packageWeightEn;
  const packageType = lang === 'ar' ? product.packageTypeAr : product.packageTypeEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#C49A55]/30 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#38251D] text-white">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C49A55]" />
            <h3 className="text-base sm:text-lg font-bold">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-start">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Image display */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#F7F2E9] to-[#ebe4d5] rounded-2xl p-6 flex items-center justify-center border border-gray-100 min-h-[260px]">
              <img
                src={product.image}
                alt={title}
                className="max-h-64 max-w-full object-contain filter drop-shadow-xl"
              />
            </div>

            {/* Info Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold text-[#C49A55] tracking-wider uppercase">
                  {product.brand}
                </span>
                <h4 className="text-xl font-extrabold text-[#38251D]">{title}</h4>
                <p className="text-sm text-[#526647] font-semibold mt-0.5">{subtitle}</p>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">{description}</p>

              {/* Attributes grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#38251D]/10">
                  <div className="text-[11px] text-gray-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#C49A55]" />
                    {t.origin}
                  </div>
                  <div className="text-sm font-bold text-[#38251D] mt-0.5">{origin}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F2E9] border border-[#38251D]/10">
                  <div className="text-[11px] text-gray-500 flex items-center gap-1 font-medium">
                    <Package className="w-3.5 h-3.5 text-[#526647]" />
                    {t.weight}
                  </div>
                  <div className="text-sm font-bold text-[#38251D] mt-0.5">{weight}</div>
                </div>

                <div className="col-span-2 p-3 rounded-xl bg-[#F7F2E9] border border-[#38251D]/10">
                  <div className="text-[11px] text-gray-500 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C49A55]" />
                    {t.packaging}
                  </div>
                  <div className="text-sm font-semibold text-[#38251D] mt-0.5">{packageType}</div>
                </div>
              </div>

              {/* Specific specifications if available */}
              {product.specs && product.specs.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-bold text-[#38251D] mb-2">
                    {lang === 'ar' ? 'المواصفات الفنية التجارية:' : 'Commercial Specifications:'}
                  </div>
                  <div className="space-y-1.5">
                    {product.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="text-xs flex items-center justify-between py-1 border-b border-gray-100"
                      >
                        <span className="text-gray-500">
                          {lang === 'ar' ? spec.labelAr : spec.labelEn}
                        </span>
                        <span className="font-bold text-[#38251D]">
                          {lang === 'ar' ? spec.valueAr : spec.valueEn}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <span>{lang === 'ar' ? 'للاستفسار الفوري:' : 'Immediate Inquiry:'}</span>
            <a
              href={`tel:${siteSettings.phone}`}
              className="text-[#38251D] hover:text-[#C49A55] font-bold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#C49A55]" />
              <span dir="ltr">{siteSettings.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition-colors"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>

            <button
              onClick={() => {
                onClose();
                onInquire(product);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#a87d3b] hover:from-[#d6aa65] hover:to-[#b38844] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>{t.inquireAboutProduct}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
