import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Settings,
  Package,
  Building2,
  FileText,
  MessageSquare,
  Shield,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  ExternalLink,
  Download,
} from 'lucide-react';
import { Product, Branch, Article, ProductCategory } from '../types';

export const AdminCMSModal: React.FC = () => {
  const {
    lang,
    isAdminOpen,
    setIsAdminOpen,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    branches,
    updateBranch,
    articles,
    updateArticle,
    addArticle,
    deleteArticle,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    siteSettings,
    updateSettings,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'products' | 'branches' | 'articles' | 'settings'>('inquiries');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Settings form state
  const [tempSettings, setTempSettings] = useState(siteSettings);

  if (!isAdminOpen) return null;

  const showNotice = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(tempSettings);
    showNotice(lang === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
  };

  const exportInquiriesCSV = () => {
    const headers = ['ID', 'Date', 'Status', 'Full Name', 'Company', 'Phone', 'Email', 'City', 'Business Type', 'Products', 'Details'];
    const rows = inquiries.map((inq) => [
      inq.id,
      inq.createdAt,
      inq.status,
      `"${inq.fullName}"`,
      `"${inq.companyName}"`,
      `"${inq.phone}"`,
      `"${inq.email}"`,
      `"${inq.city}"`,
      `"${inq.businessType}"`,
      `"${inq.requestedProducts.join(' - ')}"`,
      `"${(inq.details || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wholesale_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#C49A55]/40 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#241712] text-white border-b border-[#C49A55]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C49A55] flex items-center justify-center text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {lang === 'ar' ? 'لوحة تحكم إدارة محتوى الموقع (CMS)' : 'Content Management System (CMS)'}
              </h3>
              <p className="text-[11px] text-[#C49A55]">
                {lang === 'ar' ? 'شركة البن اليمني للتجارة • إدارة الاستفسارات والمنتجات والفروع' : 'Yemeni Coffee Trading Co. • Portal Admin'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close admin modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#38251D] px-6 py-2.5 flex items-center gap-2 overflow-x-auto border-b border-white/10 scrollbar-none">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-[#C49A55] text-white shadow'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الاستفسارات الواردة' : 'Wholesale Inquiries'}</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded-full text-[10px]">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#C49A55] text-white shadow'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إدارة المنتجات' : 'Products'}</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded-full text-[10px]">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'branches'
                ? 'bg-[#C49A55] text-white shadow'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الفروع' : 'Branches'}</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded-full text-[10px]">
              {branches.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-[#C49A55] text-white shadow'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الأخبار والمقالات' : 'Articles'}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#C49A55] text-white shadow'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إعدادات الموقع وSEO' : 'Site & SEO Settings'}</span>
          </button>
        </div>

        {/* Notice alert */}
        {savedNotice && (
          <div className="bg-green-600 text-white px-6 py-2 text-xs font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-start">
          
          {/* TAB 1: Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#38251D]">
                    {lang === 'ar' ? 'سجل طلبات واستفسارات تجار الجملة' : 'Wholesale B2B Inquiry Log'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {lang === 'ar' ? 'البيانات محفوظة محلياً وتظهر للمديرين فقط' : 'Protected trade requests stored securely'}
                  </p>
                </div>

                {inquiries.length > 0 && (
                  <button
                    onClick={exportInquiriesCSV}
                    className="px-3 py-1.5 rounded-lg bg-[#526647] hover:bg-[#43533a] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'تصدير CSV' : 'Export CSV'}</span>
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  {lang === 'ar' ? 'لا توجد استفسارات واردة حالياً.' : 'No wholesale inquiries registered yet.'}
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:bg-white transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
                        <div>
                          <span className="text-xs text-[#C49A55] font-bold">
                            {new Date(inq.createdAt).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                          </span>
                          <h5 className="font-bold text-[#38251D] text-base mt-0.5">
                            {inq.companyName} • <span className="font-normal text-sm">{inq.fullName}</span>
                          </h5>
                          <span className="text-xs text-gray-500">
                            {inq.businessType} - {inq.city}
                          </span>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-xs font-bold py-1.5 px-3 rounded-lg border border-gray-300 bg-white"
                          >
                            <option value="new">{lang === 'ar' ? 'جديد (New)' : 'New'}</option>
                            <option value="reviewed">{lang === 'ar' ? 'قيد المراجعة' : 'Under Review'}</option>
                            <option value="contacted">{lang === 'ar' ? 'تم التواصل' : 'Contacted'}</option>
                            <option value="closed">{lang === 'ar' ? 'مكتمل' : 'Closed'}</option>
                          </select>

                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Contact Channels */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-700">
                        <a href={`tel:${inq.phone}`} className="text-[#38251D] hover:underline flex items-center gap-1">
                          <span dir="ltr">📞 {inq.phone}</span>
                        </a>
                        <a href={`mailto:${inq.email}`} className="text-[#38251D] hover:underline flex items-center gap-1">
                          ✉️ {inq.email}
                        </a>
                      </div>

                      {/* Products requested & Details */}
                      <div className="text-xs text-gray-800 space-y-1">
                        <div>
                          <span className="font-bold text-[#38251D]">
                            {lang === 'ar' ? 'المنتجات المطلوبة:' : 'Requested Products:'}
                          </span>{' '}
                          {inq.requestedProducts.join(' • ')}
                        </div>
                        {inq.estimatedQuantity && (
                          <div>
                            <span className="font-bold text-[#38251D]">
                              {lang === 'ar' ? 'الكمية التقديرية:' : 'Estimated Qty:'}
                            </span>{' '}
                            {inq.estimatedQuantity}
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-[#38251D]">
                            {lang === 'ar' ? 'الموضوع:' : 'Subject:'}
                          </span>{' '}
                          {inq.subject}
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-gray-200 mt-2">
                          <p className="whitespace-pre-wrap text-gray-700">{inq.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Products Management */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#38251D]">
                    {lang === 'ar' ? 'إدارة كتالوج المنتجات وتوفرها' : 'Catalog & Inventory Management'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {lang === 'ar' ? 'تعديل الأسماء، الصور، والأوزان، أو تحديد توفر المنتج' : 'Edit products, images, or availability status'}
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#C49A55] hover:bg-[#b38844] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}</span>
                </button>
              </div>

              {/* Add Product Form Modal / Section */}
              {isAddingProduct && (
                <div className="p-5 rounded-2xl bg-[#F7F2E9] border border-[#C49A55] space-y-4">
                  <h5 className="font-bold text-[#38251D] text-sm">
                    {lang === 'ar' ? 'إضافة منتج تجاري جديد' : 'Add New Commercial Product'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      id="new-title-ar"
                      placeholder="اسم المنتج بالعربية (مثال: بن يمني مالمور)"
                      className="p-2.5 rounded-lg border bg-white"
                    />
                    <input
                      type="text"
                      id="new-title-en"
                      placeholder="Product Name in English"
                      className="p-2.5 rounded-lg border bg-white"
                    />
                    <select id="new-category" className="p-2.5 rounded-lg border bg-white">
                      <option value="coffee">القهوة والبن</option>
                      <option value="cardamom">الهيل</option>
                      <option value="saffron">الزعفران</option>
                      <option value="spices">البهارات والتوابل</option>
                      <option value="nuts">المكسرات</option>
                    </select>
                    <input
                      type="text"
                      id="new-origin"
                      placeholder="بلد المنشأ (مثال: اليمن)"
                      className="p-2.5 rounded-lg border bg-white"
                    />
                    <input
                      type="text"
                      id="new-weight"
                      placeholder="الوزن التجاري (مثال: 5 كجم)"
                      className="p-2.5 rounded-lg border bg-white"
                    />
                    <input
                      type="text"
                      id="new-image"
                      placeholder="مسار الصورة أو رابط (مثال: /assets/aistudio/...)"
                      className="p-2.5 rounded-lg border bg-white"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setIsAddingProduct(false)}
                      className="px-4 py-1.5 rounded-lg border text-xs"
                    >
                      {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      onClick={() => {
                        const titleAr = (document.getElementById('new-title-ar') as HTMLInputElement)?.value;
                        const titleEn = (document.getElementById('new-title-en') as HTMLInputElement)?.value;
                        const cat = (document.getElementById('new-category') as HTMLSelectElement)?.value as ProductCategory;
                        const origin = (document.getElementById('new-origin') as HTMLInputElement)?.value;
                        const weight = (document.getElementById('new-weight') as HTMLInputElement)?.value;
                        const image = (document.getElementById('new-image') as HTMLInputElement)?.value;

                        if (titleAr) {
                          addProduct({
                            id: `prod-${Date.now()}`,
                            category: cat || 'coffee',
                            titleAr: titleAr,
                            titleEn: titleEn || titleAr,
                            subtitleAr: `عبوة تجارية ${weight || '5 كجم'}`,
                            subtitleEn: `Commercial Pack ${weight || '5 KG'}`,
                            descriptionAr: 'منتج تجاري فاخر مختار بعناية لقطاع الأعمال.',
                            descriptionEn: 'Carefully curated commercial product for wholesale accounts.',
                            originAr: origin || 'اليمن',
                            originEn: origin || 'Yemen',
                            packageWeightAr: weight || '5 كجم',
                            packageWeightEn: weight || '5 KG',
                            packageTypeAr: 'عبوة تجارية محكمة الإغلاق',
                            packageTypeEn: 'Sealed commercial package',
                            image: image || '/assets/aistudio/_______________a9779794.png',
                            isAvailable: true,
                            featured: false,
                            brand: 'شركة البن اليمني للتجارة',
                          });
                          setIsAddingProduct(false);
                          showNotice(lang === 'ar' ? 'تمت إضافة المنتج' : 'Product added');
                        }
                      }}
                      className="px-4 py-1.5 rounded-lg bg-[#38251D] text-white text-xs font-bold"
                    >
                      {lang === 'ar' ? 'حفظ المنتج' : 'Save Product'}
                    </button>
                  </div>
                </div>
              )}

              {/* Product List Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-[#F7F2E9] p-1 shrink-0 flex items-center justify-center">
                        <img src={p.image} alt={p.titleAr} className="max-h-full object-contain" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-[#38251D] line-clamp-1">
                          {lang === 'ar' ? p.titleAr : p.titleEn}
                        </h5>
                        <p className="text-xs text-gray-500">
                          {p.packageWeightAr} • {p.originAr}
                        </p>
                        <button
                          onClick={() => {
                            updateProduct({ ...p, isAvailable: !p.isAvailable });
                            showNotice(lang === 'ar' ? 'تم تعديل حالة التوفر' : 'Availability toggled');
                          }}
                          className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            p.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.isAvailable ? (lang === 'ar' ? '✓ متاح للطلب' : 'Available') : (lang === 'ar' ? '✗ قيد التوريد' : 'Unavailable')}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Branches Management */}
          {activeTab === 'branches' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#38251D]">
                  {lang === 'ar' ? 'فروع الشركة بالمملكة العربية السعودية' : 'Branch Management'}
                </h4>
                <p className="text-xs text-gray-500">
                  {lang === 'ar' ? 'تحديث أرقام التواصل، العناوين، وساعات العمل لكل فرع' : 'Update branch details'}
                </p>
              </div>

              <div className="space-y-4">
                {branches.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-[#38251D] text-base">
                        {b.cityAr} ({b.cityEn}) {b.isMain && <span className="text-xs text-[#C49A55] font-normal">[المركز الرئيسي]</span>}
                      </h5>
                      <span className="text-xs font-semibold text-gray-500">{b.phone}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-gray-500 block mb-1">العنوان بالعربية</label>
                        <input
                          type="text"
                          value={b.addressAr}
                          onChange={(e) => updateBranch({ ...b, addressAr: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-gray-500 block mb-1">ساعات العمل</label>
                        <input
                          type="text"
                          value={b.workingHoursAr}
                          onChange={(e) => updateBranch({ ...b, workingHoursAr: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Articles */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#38251D]">
                    {lang === 'ar' ? 'الأخبار والمقالات التجارية' : 'Articles & Trade Insights'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {lang === 'ar' ? 'نشر وتحديث مقالات التوعية بالبن والهيل والتوابل' : 'Manage articles'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {articles.map((art) => (
                  <div key={art.id} className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-[#38251D] text-sm">{art.titleAr}</h5>
                      <span className="text-xs text-gray-400">{art.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{art.excerptAr}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Site Settings & SEO */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#38251D]">
                  {lang === 'ar' ? 'إعدادات الشركة وبيانات SEO' : 'Corporate Settings & SEO'}
                </h4>
                <p className="text-xs text-gray-500">
                  {lang === 'ar' ? 'تحديث رقم الهاتف، البريد الإلكتروني، وعناوين المقر الرئيسي' : 'Update settings and tags'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'اسم الشركة بالعربية' : 'Company Name (AR)'}
                  </label>
                  <input
                    type="text"
                    value={tempSettings.companyNameAr}
                    onChange={(e) => setTempSettings({ ...tempSettings, companyNameAr: e.target.value })}
                    className="w-full p-2.5 rounded-lg border"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'اسم الشركة بالإنجليزية' : 'Company Name (EN)'}
                  </label>
                  <input
                    type="text"
                    value={tempSettings.companyNameEn}
                    onChange={(e) => setTempSettings({ ...tempSettings, companyNameEn: e.target.value })}
                    className="w-full p-2.5 rounded-lg border"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'رقم الهاتف الموحد' : 'Unified Phone Number'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={tempSettings.phone}
                    onChange={(e) => setTempSettings({ ...tempSettings, phone: e.target.value })}
                    className="w-full p-2.5 rounded-lg border text-start"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'البريد الإلكتروني التجاري' : 'Official Email'}
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    value={tempSettings.email}
                    onChange={(e) => setTempSettings({ ...tempSettings, email: e.target.value })}
                    className="w-full p-2.5 rounded-lg border text-start"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">
                    {lang === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={tempSettings.website}
                    onChange={(e) => setTempSettings({ ...tempSettings, website: e.target.value })}
                    className="w-full p-2.5 rounded-lg border text-start"
                  />
                </div>
              </div>

              {/* WhatsApp Toggle */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                  <input
                    type="checkbox"
                    checked={tempSettings.enableWhatsapp}
                    onChange={(e) => setTempSettings({ ...tempSettings, enableWhatsapp: e.target.checked })}
                    className="rounded text-[#C49A55]"
                  />
                  <span>{lang === 'ar' ? 'تفعيل زر واتساب العائم للشركة' : 'Enable Floating WhatsApp Button'}</span>
                </label>

                {tempSettings.enableWhatsapp && (
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      {lang === 'ar' ? 'رقم واتساب المعتمد (مع مفتاح الدولة)' : 'Authorized WhatsApp Number'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={tempSettings.whatsappNumber}
                      onChange={(e) => setTempSettings({ ...tempSettings, whatsappNumber: e.target.value })}
                      placeholder="9665xxxxxxxx"
                      className="p-2 border rounded-lg text-xs w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#38251D] hover:bg-[#C49A55] text-white font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'حفظ كافة الإعدادات' : 'Save All Settings'}</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <span>{lang === 'ar' ? 'نظام إدارة المحتوى الداخلي • شركة البن اليمني للتجارة' : 'Internal CMS • Yemeni Coffee Trading Co.'}</span>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="px-4 py-1.5 rounded-lg border bg-white hover:bg-gray-100 font-bold text-gray-700"
          >
            {lang === 'ar' ? 'إغلاق اللوحة' : 'Close Admin'}
          </button>
        </div>
      </div>
    </div>
  );
};
