import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { validateInquiryForm, InquiryFormData } from '../utils/wholesaleLogic';
import { Send, CheckCircle2, AlertCircle, Sparkles, Building, Phone, Mail, MapPin, Package } from 'lucide-react';

interface WholesaleFormProps {
  prefillProductName?: string;
  onSuccess?: () => void;
}

export const WholesaleForm: React.FC<WholesaleFormProps> = ({
  prefillProductName,
  onSuccess,
}) => {
  const { lang, t, addInquiry } = useApp();

  const productOptions = [
    { id: 'coffee', labelAr: 'القهوة والبن (خولاني، هرري، قهوة خضراء)', labelEn: 'Coffee & Beans (Khawlani, Harari, Green Coffee)' },
    { id: 'cardamom', labelAr: 'الهيل الأخضر الفاخر (هندي / جامبو)', labelEn: 'Premium Green Cardamom (Indian / Jumbo)' },
    { id: 'saffron', labelAr: 'الزعفران الطبيعي (سوبر نقيل)', labelEn: 'Natural Saffron (Super Negin)' },
    { id: 'spices', labelAr: 'البهارات والتوابل (قرنفل إندونيسي وسريلانكي وبقية التوابل)', labelEn: 'Spices & Cloves (Indonesian, Sri Lankan & Assorted)' },
    { id: 'nuts', labelAr: 'المكسرات التجارية (كاجو، لوز، فستق، جوز)', labelEn: 'Commercial Wholesale Nuts (Cashew, Almond, Pistachio)' },
  ];

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    city: '',
    businessType: '',
    requestedProducts: prefillProductName ? [prefillProductName] : [],
    estimatedQuantity: '',
    subject: prefillProductName
      ? lang === 'ar'
        ? `استفسار تجاري بخصوص: ${prefillProductName}`
        : `Wholesale inquiry regarding: ${prefillProductName}`
      : '',
    details: '',
    agreedTerms: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (prefillProductName) {
      setFormData((prev) => ({
        ...prev,
        subject:
          lang === 'ar'
            ? `استفسار تجاري بخصوص: ${prefillProductName}`
            : `Wholesale inquiry regarding: ${prefillProductName}`,
        requestedProducts: prev.requestedProducts.includes(prefillProductName)
          ? prev.requestedProducts
          : [...prev.requestedProducts, prefillProductName],
      }));
    }
  }, [prefillProductName, lang]);

  const handleProductToggle = (label: string) => {
    setFormData((prev) => {
      const exists = prev.requestedProducts.includes(label);
      const updated = exists
        ? prev.requestedProducts.filter((p) => p !== label)
        : [...prev.requestedProducts, label];
      return { ...prev, requestedProducts: updated };
    });
    if (errors.requestedProducts) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.requestedProducts;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateInquiryForm(formData, lang);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable saving and state registration
    setTimeout(() => {
      addInquiry({
        fullName: formData.fullName,
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        businessType: formData.businessType,
        requestedProducts: formData.requestedProducts,
        estimatedQuantity: formData.estimatedQuantity || '',
        subject: formData.subject,
        details: formData.details,
        agreedTerms: formData.agreedTerms,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      city: '',
      businessType: '',
      requestedProducts: [],
      estimatedQuantity: '',
      subject: '',
      details: '',
      agreedTerms: false,
      honeypot: '',
    });
    setErrors({});
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C49A55]/40 shadow-2xl text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#526647]/15 text-[#526647] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-extrabold text-[#38251D]">
          {t.form.successTitle}
        </h3>

        <p className="text-sm sm:text-base text-gray-700 max-w-lg mx-auto leading-relaxed">
          {t.form.successMessage}
        </p>

        <div className="p-4 rounded-xl bg-[#F7F2E9] max-w-md mx-auto text-xs text-gray-600 text-start space-y-1">
          <div>
            <span className="font-bold">{lang === 'ar' ? 'اسم المنشأة:' : 'Company:'}</span>{' '}
            {formData.companyName}
          </div>
          <div>
            <span className="font-bold">{lang === 'ar' ? 'رقم التواصل:' : 'Phone:'}</span>{' '}
            <span dir="ltr">{formData.phone}</span>
          </div>
          <div>
            <span className="font-bold">{lang === 'ar' ? 'رقم المتابعة الداخلي:' : 'Ref ID:'}</span>{' '}
            YCTC-{Date.now().toString().slice(-6)}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={resetForm}
            className="px-6 py-2.5 rounded-xl bg-[#38251D] hover:bg-[#C49A55] text-white text-xs font-bold transition-colors"
          >
            {t.form.submitAnother}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C49A55]/30 shadow-2xl text-start space-y-6"
      noValidate
    >
      {/* Honeypot hidden input for anti-spam */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Leave empty</label>
        <input
          type="text"
          id="website_hp"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#38251D]">
          {t.form.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">{t.form.subtitle}</p>
      </div>

      {/* Top Banner notice */}
      <div className="p-3.5 rounded-xl bg-[#F7F2E9] border border-[#C49A55]/30 text-xs text-gray-700 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-[#C49A55] shrink-0 mt-0.5" />
        <span>
          {lang === 'ar'
            ? 'مخصص لطلبات التوريد بالجملة والتعامل التجاري مع الشركات والمحامص والمتاجر في المملكة العربية السعودية.'
            : 'Designed for commercial wholesale volume inquiries and B2B corporate relations in Saudi Arabia.'}
        </span>
      </div>

      {/* 2-Column Grid for basic info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-[#38251D] mb-1">
            {t.form.fullName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder={t.form.fullNamePlaceholder}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A55] ${
              errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-bold text-[#38251D] mb-1">
            {t.form.companyName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder={t.form.companyNamePlaceholder}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A55] ${
              errors.companyName ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'
            }`}
          />
          {errors.companyName && (
            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.companyName}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-[#38251D] mb-1">
            {t.form.phone} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            dir="ltr"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={t.form.phonePlaceholder}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-start transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A55] ${
              errors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'
            }`}
          />
          {errors.phone && (
            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#38251D] mb-1">
            {t.form.email} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            dir="ltr"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.form.emailPlaceholder}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-start transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A55] ${
              errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-bold text-[#38251D] mb-1">
            {t.form.city} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder={t.form.cityPlaceholder}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A55] ${
              errors.city ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'
            }`}
          />
          {errors.city && (
            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.city}
            </p>
          )}
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-xs font-bold text-[#38251D] mb-1">
            {t.form.businessType} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A55] ${
              errors.businessType ? 'border-red-500 bg-red-50/30' : 'border-gray-200'
            }`}
          >
            <option value="">{lang === 'ar' ? '-- اختر نوع النشاط --' : '-- Select Business Type --'}</option>
            {t.form.businessTypeOptions.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.businessType && (
            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.businessType}
            </p>
          )}
        </div>
      </div>

      {/* Requested Products Checkboxes */}
      <div>
        <label className="block text-xs font-bold text-[#38251D] mb-2">
          {t.form.requestedProducts} <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {productOptions.map((opt) => {
            const label = lang === 'ar' ? opt.labelAr : opt.labelEn;
            const isChecked = formData.requestedProducts.includes(label);

            return (
              <label
                key={opt.id}
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
                  isChecked
                    ? 'border-[#C49A55] bg-[#C49A55]/10 text-[#38251D] font-bold'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleProductToggle(label)}
                  className="rounded text-[#C49A55] focus:ring-[#C49A55]"
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
        {errors.requestedProducts && (
          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.requestedProducts}
          </p>
        )}
      </div>

      {/* Estimated Quantity & Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#38251D] mb-1">
            {t.form.estimatedQuantity}
          </label>
          <input
            type="text"
            value={formData.estimatedQuantity}
            onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
            placeholder={t.form.estimatedQuantityPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A55]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#38251D] mb-1">
            {t.form.subject} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder={t.form.subjectPlaceholder}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A55] ${
              errors.subject ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'
            }`}
          />
          {errors.subject && (
            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      {/* Details */}
      <div>
        <label className="block text-xs font-bold text-[#38251D] mb-1">
          {t.form.details} <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          placeholder={t.form.detailsPlaceholder}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C49A55] ${
            errors.details ? 'border-red-500 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'
          }`}
        />
        {errors.details && (
          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.details}
          </p>
        )}
      </div>

      {/* Privacy Agreement */}
      <div className="pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreedTerms}
            onChange={(e) => setFormData({ ...formData, agreedTerms: e.target.checked })}
            className="mt-0.5 rounded text-[#C49A55] focus:ring-[#C49A55]"
          />
          <span className="text-xs text-gray-700 leading-normal">{t.form.agreePrivacy}</span>
        </label>
        {errors.agreedTerms && (
          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.agreedTerms}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C49A55] to-[#a87d3b] hover:from-[#d6aa65] hover:to-[#b38844] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>{t.form.submitting}</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{t.form.submit}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
