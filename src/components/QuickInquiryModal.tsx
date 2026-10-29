import React from 'react';
import { useApp } from '../context/AppContext';
import { WholesaleForm } from './WholesaleForm';
import { X, Package } from 'lucide-react';

export const QuickInquiryModal: React.FC = () => {
  const { lang, inquiryModalProduct, setInquiryModalProduct } = useApp();

  if (!inquiryModalProduct) return null;

  const title = lang === 'ar' ? inquiryModalProduct.titleAr : inquiryModalProduct.titleEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#C49A55]/40 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#38251D] text-white">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-[#C49A55]" />
            <h3 className="text-base font-bold text-white">
              {lang === 'ar' ? `استفسار تجاري عن: ${title}` : `Inquiry for: ${title}`}
            </h3>
          </div>
          <button
            onClick={() => setInquiryModalProduct(null)}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <WholesaleForm
            prefillProductName={title}
            onSuccess={() => {
              // keep open so user sees confirmation or closes
            }}
          />
        </div>
      </div>
    </div>
  );
};
