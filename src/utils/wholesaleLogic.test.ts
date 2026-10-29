import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiryForm, filterProducts, InquiryFormData } from './wholesaleLogic';
import { Product } from '../types';

test('validateInquiryForm rejects empty data with correct error fields', () => {
  const emptyData: InquiryFormData = {
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    city: '',
    businessType: '',
    requestedProducts: [],
    subject: '',
    details: '',
    agreedTerms: false,
  };

  const result = validateInquiryForm(emptyData, 'ar');
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.companyName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.email);
  assert.ok(result.errors.city);
  assert.ok(result.errors.businessType);
  assert.ok(result.errors.requestedProducts);
  assert.ok(result.errors.agreedTerms);
});

test('validateInquiryForm accepts valid Saudi wholesale inquiry', () => {
  const validData: InquiryFormData = {
    fullName: 'سعد القحطاني',
    companyName: 'مؤسسة قهوة الأصالة التجارية',
    phone: '0551234567',
    email: 'info@asalah-coffee.sa',
    city: 'الرياض',
    businessType: 'محمصة قهوة',
    requestedProducts: ['القهوة والبن', 'الهيل'],
    estimatedQuantity: '20 شوال',
    subject: 'طلب توريد قهوة خولاني وهيل هندي أخضر',
    details: 'نود الاستفسار عن توفر كميات جملة من البن الخولاني 5 كجم والهيل الأخضر للتوريد الأسبوعي.',
    agreedTerms: true,
  };

  const result = validateInquiryForm(validData, 'ar');
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateInquiryForm catches bot submission via honeypot', () => {
  const botData: InquiryFormData = {
    fullName: 'Spam Bot',
    companyName: 'Spam Co',
    phone: '0551234567',
    email: 'bot@spam.com',
    city: 'Riyadh',
    businessType: 'Other',
    requestedProducts: ['coffee'],
    subject: 'Spam Subject',
    details: 'Buy cheap watches now',
    agreedTerms: true,
    honeypot: 'http://spam-link.com',
  };

  const result = validateInquiryForm(botData, 'ar');
  assert.equal(result.isValid, false);
  assert.ok(result.errors.bot);
});

test('filterProducts correctly filters by category and keyword search', () => {
  const sampleProducts: Product[] = [
    {
      id: 'p1',
      category: 'coffee',
      titleAr: 'قهوة خولاني يمنية',
      titleEn: 'Yemeni Khawlani Coffee',
      subtitleAr: '5 كجم',
      subtitleEn: '5 KG',
      descriptionAr: 'بن يمني ممتاز',
      descriptionEn: 'Premium Yemeni beans',
      originAr: 'اليمن',
      originEn: 'Yemen',
      packageWeightAr: '5 كجم',
      packageWeightEn: '5 KG',
      packageTypeAr: 'كيس',
      packageTypeEn: 'Bag',
      image: '',
      isAvailable: true,
      featured: true,
      brand: 'راوية',
    },
    {
      id: 'p2',
      category: 'cardamom',
      titleAr: 'هيل أخضر هندي جامبو',
      titleEn: 'Indian Green Cardamom Jumbo',
      subtitleAr: 'كرتون 10 كجم',
      subtitleEn: '10 KG Carton',
      descriptionAr: 'هيل أخضر فرز أول',
      descriptionEn: 'First grade green cardamom',
      originAr: 'الهند',
      originEn: 'India',
      packageWeightAr: '10 كجم',
      packageWeightEn: '10 KG',
      packageTypeAr: 'كرتون',
      packageTypeEn: 'Carton',
      image: '',
      isAvailable: true,
      featured: true,
      brand: 'شركة البن اليمني',
    },
  ];

  // Category filter
  const coffeeOnly = filterProducts(sampleProducts, 'coffee');
  assert.equal(coffeeOnly.length, 1);
  assert.equal(coffeeOnly[0].id, 'p1');

  // Search filter
  const searchResults = filterProducts(sampleProducts, 'all', 'خولاني');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'p1');

  // English search
  const enResults = filterProducts(sampleProducts, 'all', 'Cardamom');
  assert.equal(enResults.length, 1);
  assert.equal(enResults[0].id, 'p2');
});
