import { Product } from '../types';

export interface InquiryFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  requestedProducts: string[];
  estimatedQuantity?: string;
  subject: string;
  details: string;
  agreedTerms: boolean;
  honeypot?: string; // Bot protection
}

export function validateInquiryForm(
  data: InquiryFormData,
  lang: 'ar' | 'en' = 'ar'
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Check honeypot (if filled, it's a bot)
  if (data.honeypot && data.honeypot.trim() !== '') {
    errors.bot = lang === 'ar' ? 'تم رفض الطلب' : 'Submission rejected';
    return { isValid: false, errors };
  }

  // Full Name
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName =
      lang === 'ar'
        ? 'يرجى إدخال الاسم الكامل (حرفين على الأقل)'
        : 'Please enter a valid full name (at least 2 characters)';
  }

  // Company Name
  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName =
      lang === 'ar'
        ? 'يرجى إدخال اسم الشركة أو المنشأة'
        : 'Please enter your business or company name';
  }

  // Saudi / International Phone check
  const cleanPhone = (data.phone || '').replace(/[\s-]/g, '');
  const phoneRegex = /^(\+?966|0)?5[0-9]{8}$|^[0-9+]{8,16}$/;
  if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
    errors.phone =
      lang === 'ar'
        ? 'يرجى إدخال رقم جوال صحيح (مثال: 05xxxxxxxx)'
        : 'Please enter a valid phone number (e.g., 05xxxxxxxx)';
  }

  // Email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email =
      lang === 'ar'
        ? 'يرجى إدخال بريد إلكتروني صحيح'
        : 'Please enter a valid email address';
  }

  // City
  if (!data.city || data.city.trim().length < 2) {
    errors.city =
      lang === 'ar' ? 'يرجى تحديد المدينة' : 'Please specify your city';
  }

  // Business Type
  if (!data.businessType || data.businessType.trim() === '') {
    errors.businessType =
      lang === 'ar'
        ? 'يرجى اختيار نوع النشاط التجاري'
        : 'Please select your business type';
  }

  // Requested Products
  if (!data.requestedProducts || data.requestedProducts.length === 0) {
    errors.requestedProducts =
      lang === 'ar'
        ? 'يرجى اختيار فئة واحدة على الأقل من المنتجات المطلوبة'
        : 'Please select at least one requested product category';
  }

  // Subject
  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject =
      lang === 'ar'
        ? 'يرجى كتابة عنوان للاستفسار'
        : 'Please enter an inquiry subject';
  }

  // Details
  if (!data.details || data.details.trim().length < 5) {
    errors.details =
      lang === 'ar'
        ? 'يرجى كتابة تفاصيل الاستفسار أو الطلب (5 أحرف على الأقل)'
        : 'Please provide more details regarding your request';
  }

  // Privacy Agreement
  if (!data.agreedTerms) {
    errors.agreedTerms =
      lang === 'ar'
        ? 'يجب الموافقة على سياسة الخصوصية للمتابعة'
        : 'You must agree to the privacy policy to proceed';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterProducts(
  products: Product[],
  categoryFilter: string,
  searchQuery: string = ''
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((p) => {
    // Category match
    const matchesCategory =
      categoryFilter === 'all' || p.category === categoryFilter;
    if (!matchesCategory) return false;

    // Search query match
    if (!query) return true;

    return (
      p.titleAr.toLowerCase().includes(query) ||
      p.titleEn.toLowerCase().includes(query) ||
      p.subtitleAr.toLowerCase().includes(query) ||
      p.subtitleEn.toLowerCase().includes(query) ||
      p.descriptionAr.toLowerCase().includes(query) ||
      p.descriptionEn.toLowerCase().includes(query) ||
      p.originAr.toLowerCase().includes(query) ||
      p.originEn.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query)
    );
  });
}

export function formatSaudiPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned === '920016645') {
    return '9200 16645';
  }
  return phone;
}
