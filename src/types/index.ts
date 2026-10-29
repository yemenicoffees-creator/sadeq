export type Language = 'ar' | 'en';

export type PageId =
  | 'home'
  | 'about'
  | 'vision'
  | 'products'
  | 'category'
  | 'quality'
  | 'wholesale'
  | 'branches'
  | 'news'
  | 'article'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin'
  | '404';

export type ProductCategory = 'coffee' | 'cardamom' | 'saffron' | 'spices' | 'nuts';

export interface Product {
  id: string;
  category: ProductCategory;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  originAr: string;
  originEn: string;
  packageWeightAr: string;
  packageWeightEn: string;
  packageTypeAr: string;
  packageTypeEn: string;
  image: string;
  isAvailable: boolean;
  featured: boolean;
  brand: string;
  specs?: {
    labelAr: string;
    labelEn: string;
    valueAr: string;
    valueEn: string;
  }[];
}

export interface Branch {
  id: string;
  cityAr: string;
  cityEn: string;
  isMain?: boolean;
  addressAr: string;
  addressEn: string;
  phone: string;
  workingHoursAr: string;
  workingHoursEn: string;
  mapQuery: string;
}

export interface Article {
  id: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  authorAr: string;
  authorEn: string;
  categoryAr: string;
  categoryEn: string;
  readTimeAr: string;
  readTimeEn: string;
  image: string;
}

export interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface WholesaleInquiry {
  id: string;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  requestedProducts: string[];
  estimatedQuantity: string;
  subject: string;
  details: string;
  agreedTerms: boolean;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  notes?: string;
}

export interface SiteSettings {
  companyNameAr: string;
  companyNameEn: string;
  phone: string;
  email: string;
  website: string;
  countryAr: string;
  countryEn: string;
  headquartersAr: string;
  headquartersEn: string;
  enableWhatsapp: boolean;
  whatsappNumber: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface SiteContent {
  branding: {
    logoUrl: string;
    companyNameAr: string;
    companyNameEn: string;
    sloganAr: string;
    sloganEn: string;
  };
  hero: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    highlightAr: string;
    highlightEn: string;
    subtitleAr: string;
    subtitleEn: string;
    cta1Ar: string;
    cta1En: string;
    cta2Ar: string;
    cta2En: string;
    bgImage: string;
    floatingBoxTitleAr: string;
    floatingBoxTitleEn: string;
    floatingBoxSubtitleAr: string;
    floatingBoxSubtitleEn: string;
    floatingBoxImage: string;
  };
  about: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    paragraph1Ar: string;
    paragraph1En: string;
    paragraph2Ar: string;
    paragraph2En: string;
    image: string;
    bullet1Ar: string;
    bullet1En: string;
    bullet2Ar: string;
    bullet2En: string;
    bullet3Ar: string;
    bullet3En: string;
    bullet4Ar: string;
    bullet4En: string;
  };
  quality: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    image: string;
  };
  vision: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    visionTextAr: string;
    visionTextEn: string;
    missionTextAr: string;
    missionTextEn: string;
    valuesTextAr: string;
    valuesTextEn: string;
  };
  wholesale: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
  };
  footer: {
    aboutAr: string;
    aboutEn: string;
  };
}
