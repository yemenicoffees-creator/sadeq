import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ImagePickerInput } from '../components/ImagePickerInput';
import {
  Settings,
  Package,
  Building2,
  FileText,
  MessageSquare,
  ShieldCheck,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Download,
  Upload,
  Eye,
  Layers,
  Sparkles,
  Phone,
  Image as ImageIcon,
  Check,
  X,
  Clock,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Product, Branch, Article, ProductCategory, SiteContent, SiteSettings } from '../types';

export const AdminView: React.FC = () => {
  const {
    lang,
    t,
    navigateTo,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    branches,
    updateBranch,
    addBranch,
    deleteBranch,
    articles,
    updateArticle,
    addArticle,
    deleteArticle,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    siteSettings,
    updateSettings,
    siteContent,
    updateSiteContent,
    resetToDefaultContent,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'hero' | 'about' | 'products' | 'quality' | 'branches' | 'articles' | 'branding' | 'inquiries' | 'backup'
  >('hero');

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Local draft states
  const [contentDraft, setContentDraft] = useState<SiteContent>(siteContent);
  const [settingsDraft, setSettingsDraft] = useState<SiteSettings>(siteSettings);

  // Product edit modal/form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Branch add form state
  const [isAddingBranch, setIsAddingBranch] = useState(false);

  // Article form state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  const showNotification = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSaveContent = () => {
    updateSiteContent(contentDraft);
    showNotification(lang === 'ar' ? '✓ تم حفظ تعديلات النصوص والصور بنجاح وتطبيقها على الموقع' : 'Content & media changes applied successfully');
  };

  const handleSaveSettings = () => {
    updateSettings(settingsDraft);
    showNotification(lang === 'ar' ? '✓ تم حفظ إعدادات الشركة وبيانات التواصل' : 'Company info updated');
  };

  // Export all database & content to JSON file
  const handleExportBackup = () => {
    const backupData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      siteSettings: settingsDraft,
      siteContent: contentDraft,
      products,
      branches,
      articles,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `yctc_website_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification(lang === 'ar' ? 'تم تنزيل النسخة الاحتياطية بنجاح' : 'Backup downloaded');
  };

  // Import JSON backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.siteContent) {
          updateSiteContent(parsed.siteContent);
          setContentDraft(parsed.siteContent);
        }
        if (parsed.siteSettings) {
          updateSettings(parsed.siteSettings);
          setSettingsDraft(parsed.siteSettings);
        }
        showNotification(lang === 'ar' ? 'تم استيراد وتطبيق النسخة الاحتياطية بنجاح!' : 'Backup imported successfully!');
      } catch (err) {
        alert(lang === 'ar' ? 'الملف غير صالح' : 'Invalid backup JSON file');
      }
    };
    reader.readAsText(file);
  };

  // Export CSV for Inquiries
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
    <div className="py-8 bg-[#F7F2E9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb currentPageTitle={lang === 'ar' ? 'مركز التحكم وإدارة المحتوى (CMS)' : 'Content Control Center (CMS)'} />

        {/* Top Header Banner */}
        <div className="rounded-3xl bg-[#241712] text-white p-6 sm:p-10 border border-[#C49A55]/40 shadow-xl mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49A55]/20 text-[#C49A55] text-xs font-bold border border-[#C49A55]/30">
                <Settings className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'مركز التحكم الشامل بالمحتوى والصور' : 'Official Portal Control Center'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F7F2E9]">
                {lang === 'ar' ? 'لوحة تحكم شركة البن اليمني للتجارة' : 'YCTC Portal Control Center'}
              </h1>
              <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
                {lang === 'ar'
                  ? 'من خلال هذا المركز يمكنك تعديل أي كتابة أو صورة في كافة صفحات الموقع، وإدارة المنتجات والفروع والاستفسارات الواردة، مع معاينة وتطبيق فوري.'
                  : 'Manage and update texts, images, catalog items, branches, and B2B inquiries across all site pages.'}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                onClick={() => navigateTo('home')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-all shadow"
              >
                <Eye className="w-4 h-4 text-[#C49A55]" />
                <span>{lang === 'ar' ? 'معاينة الموقع المباشر' : 'Preview Live Site'}</span>
              </button>

              <button
                onClick={handleSaveContent}
                className="px-5 py-2.5 rounded-xl bg-[#C49A55] hover:bg-[#b38844] text-[#38251D] font-bold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حفظ كافة التغييرات' : 'Save All Changes'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Notification */}
        {savedNotice && (
          <div className="fixed top-20 start-1/2 -translate-x-1/2 z-50 bg-[#526647] text-white px-6 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border border-white/20 animate-bounce">
            <CheckCircle className="w-5 h-5 text-[#C49A55]" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* Main Grid: Tabs Sidebar + Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          
          {/* Navigation Tabs (col-span 3) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-3 border border-gray-200 shadow-sm space-y-1">
            {[
              { id: 'hero', labelAr: 'الواجهة الرئيسية (Hero)', labelEn: 'Homepage Hero', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'about', labelAr: 'من نحن والرؤية', labelEn: 'About & Vision', icon: <Layers className="w-4 h-4" /> },
              { id: 'products', labelAr: `إدارة المنتجات والصور (${products.length})`, labelEn: `Products (${products.length})`, icon: <Package className="w-4 h-4" /> },
              { id: 'quality', labelAr: 'الجودة وتجارة الجملة', labelEn: 'Quality & Wholesale', icon: <ShieldCheck className="w-4 h-4" /> },
              { id: 'branches', labelAr: `إدارة الفروع (${branches.length})`, labelEn: `Branches (${branches.length})`, icon: <Building2 className="w-4 h-4" /> },
              { id: 'articles', labelAr: `المقالات والأخبار (${articles.length})`, labelEn: `Articles (${articles.length})`, icon: <FileText className="w-4 h-4" /> },
              { id: 'branding', labelAr: 'الهوية وبيانات التواصل', labelEn: 'Branding & Contact Info', icon: <Settings className="w-4 h-4" /> },
              { id: 'inquiries', labelAr: `الاستفسارات الواردة (${inquiries.length})`, labelEn: `Inquiries (${inquiries.length})`, icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'backup', labelAr: 'النسخ الاحتياطي والاستعادة', labelEn: 'Backup & Restore', icon: <Download className="w-4 h-4" /> },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-start ${
                    isActive
                      ? 'bg-[#38251D] text-[#C49A55] shadow-md border-r-4 sm:border-r-0 sm:border-s-4 border-[#C49A55]'
                      : 'text-gray-700 hover:bg-[#F7F2E9] hover:text-[#38251D]'
                  }`}
                >
                  <span className={isActive ? 'text-[#C49A55]' : 'text-gray-400'}>{tab.icon}</span>
                  <span className="flex-1">{lang === 'ar' ? tab.labelAr : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Form & Controls Panel (col-span 9) */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm text-start">
            
            {/* 1. HERO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-bold text-[#38251D]">
                    {lang === 'ar' ? 'تعديل نصوص وصور الواجهة الرئيسية (Hero Section)' : 'Hero Section Controls'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'ar' ? 'تحكم بالعنوان الرئيسي، الشارة العلوية، النص التعريفي، وصورة الخلفية' : 'Edit hero headlines, badges, background photo, and action buttons.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Background Image with Picker */}
                  <div className="p-4 rounded-2xl bg-[#F7F2E9]/60 border border-gray-200">
                    <ImagePickerInput
                      label={lang === 'ar' ? 'صورة خلفية الواجهة الرئيسية (Hero Background)' : 'Hero Background Image'}
                      value={contentDraft.hero.bgImage}
                      onChange={(newUrl) => setContentDraft({
                        ...contentDraft,
                        hero: { ...contentDraft.hero, bgImage: newUrl }
                      })}
                      helperText={lang === 'ar' ? 'يمكنك رفع صورة من جهازك أو اختيار خلفية حبوب القهوة من المعرض' : 'Upload an image or pick a stock texture.'}
                    />
                  </div>

                  {/* Top Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        {lang === 'ar' ? 'الشارة العلوية بالعربية' : 'Top Badge (AR)'}
                      </label>
                      <input
                        type="text"
                        value={contentDraft.hero.badgeAr}
                        onChange={(e) => setContentDraft({
                          ...contentDraft,
                          hero: { ...contentDraft.hero, badgeAr: e.target.value }
                        })}
                        className="w-full p-2.5 border rounded-xl text-xs bg-white text-start"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        {lang === 'ar' ? 'الشارة العلوية بالإنجليزية' : 'Top Badge (EN)'}
                      </label>
                      <input
                        type="text"
                        value={contentDraft.hero.badgeEn}
                        onChange={(e) => setContentDraft({
                          ...contentDraft,
                          hero: { ...contentDraft.hero, badgeEn: e.target.value }
                        })}
                        className="w-full p-2.5 border rounded-xl text-xs bg-white text-start"
                      />
                    </div>
                  </div>

                  {/* Main Headline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        {lang === 'ar' ? 'العنوان البارز الأول (Tagline)' : 'Primary Tagline'}
                      </label>
                      <input
                        type="text"
                        value={contentDraft.hero.highlightAr}
                        onChange={(e) => setContentDraft({
                          ...contentDraft,
                          hero: { ...contentDraft.hero, highlightAr: e.target.value }
                        })}
                        className="w-full p-2.5 border rounded-xl text-xs bg-white text-start"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        {lang === 'ar' ? 'العنوان الرئيسي (اسم الشركة)' : 'Main Title'}
                      </label>
                      <input
                        type="text"
                        value={contentDraft.hero.titleAr}
                        onChange={(e) => setContentDraft({
                          ...contentDraft,
                          hero: { ...contentDraft.hero, titleAr: e.target.value }
                        })}
                        className="w-full p-2.5 border rounded-xl text-xs bg-white text-start"
                      />
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'ar' ? 'النص التعريفي التفصيلي' : 'Hero Subtitle Description'}
                    </label>
                    <textarea
                      rows={3}
                      value={contentDraft.hero.subtitleAr}
                      onChange={(e) => setContentDraft({
                        ...contentDraft,
                        hero: { ...contentDraft.hero, subtitleAr: e.target.value }
                      })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-white text-start"
                    />
                  </div>

                  {/* Hero Floating Showcase Card */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                    <h4 className="font-bold text-xs text-[#38251D]">
                      {lang === 'ar' ? 'البطاقة العائمة الجانبية (راوية خولاني)' : 'Hero Floating Showcase'}
                    </h4>
                    <ImagePickerInput
                      label={lang === 'ar' ? 'صورة المنتج العائم في الهيرو' : 'Floating Card Product Image'}
                      value={contentDraft.hero.floatingBoxImage}
                      onChange={(newUrl) => setContentDraft({
                        ...contentDraft,
                        hero: { ...contentDraft.hero, floatingBoxImage: newUrl }
                      })}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">عنوان البطاقة</label>
                        <input
                          type="text"
                          value={contentDraft.hero.floatingBoxTitleAr}
                          onChange={(e) => setContentDraft({
                            ...contentDraft,
                            hero: { ...contentDraft.hero, floatingBoxTitleAr: e.target.value }
                          })}
                          className="w-full p-2 border rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">وصف البطاقة</label>
                        <input
                          type="text"
                          value={contentDraft.hero.floatingBoxSubtitleAr}
                          onChange={(e) => setContentDraft({
                            ...contentDraft,
                            hero: { ...contentDraft.hero, floatingBoxSubtitleAr: e.target.value }
                          })}
                          className="w-full p-2 border rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleSaveContent}
                      className="px-6 py-2.5 rounded-xl bg-[#38251D] hover:bg-[#C49A55] text-white font-bold text-xs flex items-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تطبيق وحفظ تعديلات الواجهة' : 'Apply & Save Hero'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ABOUT & VISION TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-bold text-[#38251D]">
                    {lang === 'ar' ? 'تعديل صفحة من نحن والرؤية والرسالة' : 'About & Corporate Vision'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'ar' ? 'تعديل تاريخ وتأسيس الشركة، الصورة التعريفية، ونصوص الرؤية والرسالة والقيم' : 'Edit narrative, about photos, and institutional principles.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* About Image */}
                  <div className="p-4 rounded-2xl bg-[#F7F2E9]/60 border border-gray-200">
                    <ImagePickerInput
                      label={lang === 'ar' ? 'صورة قسم من نحن' : 'About Section Image'}
                      value={contentDraft.about.image}
                      onChange={(newUrl) => setContentDraft({
                        ...contentDraft,
                        about: { ...contentDraft.about, image: newUrl }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'ar' ? 'عنوان قسم من نحن' : 'About Title'}
                    </label>
                    <input
                      type="text"
                      value={contentDraft.about.titleAr}
                      onChange={(e) => setContentDraft({
                        ...contentDraft,
                        about: { ...contentDraft.about, titleAr: e.target.value }
                      })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'ar' ? 'الفقرة الأولى (نبذة التأسيس)' : 'Paragraph 1'}
                    </label>
                    <textarea
                      rows={3}
                      value={contentDraft.about.paragraph1Ar}
                      onChange={(e) => setContentDraft({
                        ...contentDraft,
                        about: { ...contentDraft.about, paragraph1Ar: e.target.value }
                      })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'ar' ? 'الفقرة الثانية (التزام الجودة والتنقية)' : 'Paragraph 2'}
                    </label>
                    <textarea
                      rows={3}
                      value={contentDraft.about.paragraph2Ar}
                      onChange={(e) => setContentDraft({
                        ...contentDraft,
                        about: { ...contentDraft.about, paragraph2Ar: e.target.value }
                      })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-white"
                    />
                  </div>

                  {/* Vision, Mission, Values */}
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                    <h4 className="font-bold text-sm text-[#38251D]">
                      {lang === 'ar' ? 'نصوص الرؤية والرسالة والقيم' : 'Vision, Mission & Core Values'}
                    </h4>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">الرؤية (Vision)</label>
                      <textarea
                        rows={2}
                        value={contentDraft.vision.visionTextAr}
                        onChange={(e) => setContentDraft({
                          ...contentDraft,
                          vision: { ...contentDraft.vision, visionTextAr: e.target.value }
                        })}
                        className="w-full p-2.5 border rounded-xl text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">الرسالة (Mission)</label>
                      <textarea
                        rows={2}
                        value={contentDraft.vision.missionTextAr}
                        onChange={(e) => setContentDraft({
                          ...contentDraft,
                          vision: { ...contentDraft.vision, missionTextAr: e.target.value }
                        })}
                        className="w-full p-2.5 border rounded-xl text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">القيم المؤسسية (Values)</label>
                      <textarea
                        rows={2}
                        value={contentDraft.vision.valuesTextAr}
                        onChange={(e) => setContentDraft({
                          ...contentDraft,
                          vision: { ...contentDraft.vision, valuesTextAr: e.target.value }
                        })}
                        className="w-full p-2.5 border rounded-xl text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleSaveContent}
                      className="px-6 py-2.5 rounded-xl bg-[#38251D] hover:bg-[#C49A55] text-white font-bold text-xs flex items-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'حفظ نصوص من نحن والرؤية' : 'Save About & Vision'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. PRODUCTS TAB (FULL CONTROL WITH IMAGE MODAL) */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#38251D]">
                      {lang === 'ar' ? 'إدارة كتالوج المنتجات وتعديل الصور' : 'Product Catalog & Image Editor'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {lang === 'ar'
                        ? 'تعديل صور المنتجات أو رفع صور جديدة، تعديل الأوزان، الأسماء، التوفر، والتصنيف'
                        : 'Update product packaging photos, commercial weights, availability, and specs.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddingProduct(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#C49A55] hover:bg-[#b38844] text-[#38251D] font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إضافة منتج تجاري جديد' : 'Add New Product'}</span>
                  </button>
                </div>

                {/* Edit / Add Modal Form */}
                {(isAddingProduct || editingProduct) && (
                  <div className="p-6 rounded-2xl bg-[#F7F2E9] border-2 border-[#C49A55] space-y-4 shadow-lg animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                      <h4 className="font-bold text-sm text-[#38251D]">
                        {editingProduct
                          ? (lang === 'ar' ? `تعديل منتج: ${editingProduct.titleAr}` : `Edit: ${editingProduct.titleEn}`)
                          : (lang === 'ar' ? 'إضافة منتج تجاري جديد' : 'Add Commercial Product')}
                      </h4>
                      <button
                        onClick={() => {
                          setIsAddingProduct(false);
                          setEditingProduct(null);
                        }}
                        className="text-gray-500 hover:text-black"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Product Image Picker */}
                    <ImagePickerInput
                      label={lang === 'ar' ? 'صورة المنتج التجاري (اختر من صور راوية، أو ارفع ملف من جهازك)' : 'Product Image'}
                      value={editingProduct ? editingProduct.image : ''}
                      onChange={(newUrl) => {
                        if (editingProduct) {
                          setEditingProduct({ ...editingProduct, image: newUrl });
                        }
                      }}
                      helperText={lang === 'ar' ? 'ستظهر هذه الصورة في الكتالوج والصفحة الرئيسية ومودال التفاصيل' : 'Visible in catalog and detail modal.'}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-gray-700 font-bold mb-1">اسم المنتج بالعربية</label>
                        <input
                          type="text"
                          id="edit-prod-title-ar"
                          defaultValue={editingProduct?.titleAr || ''}
                          placeholder="مثال: قهوة خولاني - محصول اليمن"
                          className="w-full p-2.5 border rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold mb-1">اسم المنتج بالإنجليزية</label>
                        <input
                          type="text"
                          id="edit-prod-title-en"
                          defaultValue={editingProduct?.titleEn || ''}
                          placeholder="e.g. Khawlani Coffee - Yemen Harvest"
                          className="w-full p-2.5 border rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold mb-1">التصنيف</label>
                        <select
                          id="edit-prod-category"
                          defaultValue={editingProduct?.category || 'coffee'}
                          className="w-full p-2.5 border rounded-lg bg-white font-medium"
                        >
                          <option value="coffee">القهوة والبن</option>
                          <option value="cardamom">الهيل</option>
                          <option value="saffron">الزعفران</option>
                          <option value="spices">البهارات والتوابل</option>
                          <option value="nuts">المكسرات</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold mb-1">بلد المنشأ</label>
                        <input
                          type="text"
                          id="edit-prod-origin"
                          defaultValue={editingProduct?.originAr || ''}
                          placeholder="اليمن / إثيوبيا / الهند / إندونيسيا"
                          className="w-full p-2.5 border rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold mb-1">الوزن التجاري للعبوة</label>
                        <input
                          type="text"
                          id="edit-prod-weight"
                          defaultValue={editingProduct?.packageWeightAr || ''}
                          placeholder="5 كجم / 10 كجم"
                          className="w-full p-2.5 border rounded-lg bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold mb-1">العلامة التجارية</label>
                        <input
                          type="text"
                          id="edit-prod-brand"
                          defaultValue={editingProduct?.brand || 'راوية (Rawia)'}
                          placeholder="راوية (Rawia) / شركة البن اليمني للتجارة"
                          className="w-full p-2.5 border rounded-lg bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-gray-700 font-bold mb-1">الوصف الفني للمنتج</label>
                        <textarea
                          rows={2}
                          id="edit-prod-desc"
                          defaultValue={editingProduct?.descriptionAr || ''}
                          placeholder="مواصفات الحبة وخصائصها"
                          className="w-full p-2.5 border rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs font-bold">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            id="edit-prod-available"
                            defaultChecked={editingProduct ? editingProduct.isAvailable : true}
                            className="rounded text-[#C49A55]"
                          />
                          <span>متاح للطلب التجاري</span>
                        </label>

                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            id="edit-prod-featured"
                            defaultChecked={editingProduct ? editingProduct.featured : false}
                            className="rounded text-[#C49A55]"
                          />
                          <span>عرض في الواجهة الرئيسية (Featured)</span>
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsAddingProduct(false);
                            setEditingProduct(null);
                          }}
                          className="px-4 py-2 border rounded-xl text-xs bg-white"
                        >
                          إلغاء
                        </button>

                        <button
                          onClick={() => {
                            const titleAr = (document.getElementById('edit-prod-title-ar') as HTMLInputElement)?.value;
                            const titleEn = (document.getElementById('edit-prod-title-en') as HTMLInputElement)?.value;
                            const cat = (document.getElementById('edit-prod-category') as HTMLSelectElement)?.value as ProductCategory;
                            const origin = (document.getElementById('edit-prod-origin') as HTMLInputElement)?.value;
                            const weight = (document.getElementById('edit-prod-weight') as HTMLInputElement)?.value;
                            const brand = (document.getElementById('edit-prod-brand') as HTMLInputElement)?.value;
                            const desc = (document.getElementById('edit-prod-desc') as HTMLTextAreaElement)?.value;
                            const isAvailable = (document.getElementById('edit-prod-available') as HTMLInputElement)?.checked;
                            const isFeatured = (document.getElementById('edit-prod-featured') as HTMLInputElement)?.checked;

                            if (!titleAr) {
                              alert('يرجى إدخال اسم المنتج بالعربية');
                              return;
                            }

                            if (editingProduct) {
                              updateProduct({
                                ...editingProduct,
                                titleAr,
                                titleEn: titleEn || titleAr,
                                category: cat,
                                originAr: origin || 'اليمن',
                                packageWeightAr: weight || '5 كجم',
                                brand: brand || 'شركة البن اليمني للتجارة',
                                descriptionAr: desc || '',
                                isAvailable,
                                featured: isFeatured,
                              });
                              showNotification(lang === 'ar' ? '✓ تم تحديث المنتج بنجاح' : 'Product updated');
                            } else {
                              addProduct({
                                id: `prod-${Date.now()}`,
                                category: cat || 'coffee',
                                titleAr,
                                titleEn: titleEn || titleAr,
                                subtitleAr: `عبوة تجارية ${weight || '5 كجم'}`,
                                subtitleEn: `Commercial Pack ${weight || '5 KG'}`,
                                descriptionAr: desc || 'منتج تجاري فاخر مختار بعناية لقطاع الأعمال.',
                                descriptionEn: 'Premium commercial crop.',
                                originAr: origin || 'اليمن',
                                originEn: 'Yemen',
                                packageWeightAr: weight || '5 كجم',
                                packageWeightEn: '5 KG',
                                packageTypeAr: 'عبوة تجارية محكمة الإغلاق',
                                packageTypeEn: 'Sealed commercial package',
                                image: '/assets/aistudio/_______________a9779794.png',
                                isAvailable,
                                featured: isFeatured,
                                brand: brand || 'شركة البن اليمني للتجارة',
                              });
                              showNotification(lang === 'ar' ? '✓ تمت إضافة المنتج الجديد للكتالوج' : 'New product added');
                            }

                            setIsAddingProduct(false);
                            setEditingProduct(null);
                          }}
                          className="px-5 py-2 rounded-xl bg-[#38251D] text-white font-bold text-xs hover:bg-[#C49A55] transition-colors"
                        >
                          حفظ التعديلات
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Products Grid list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-[#C49A55] transition-all flex items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-[#F7F2E9] p-1.5 flex items-center justify-center shrink-0 border border-gray-100">
                          <img
                            src={prod.image}
                            alt={prod.titleAr}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-[#38251D] line-clamp-1">
                              {prod.titleAr}
                            </h5>
                            {prod.featured && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C49A55] text-white font-bold shrink-0">
                                رئيسي
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-gray-500">
                            {prod.packageWeightAr} • {prod.originAr}
                          </p>

                          <div className="flex items-center gap-2 pt-0.5">
                            <button
                              onClick={() => {
                                updateProduct({ ...prod, isAvailable: !prod.isAvailable });
                                showNotification(lang === 'ar' ? 'تم تعديل حالة التوفر' : 'Availability changed');
                              }}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                prod.isAvailable
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {prod.isAvailable ? '✓ متوفر للطلب' : '✗ غير متوفر'}
                            </button>

                            <button
                              onClick={() => {
                                updateProduct({ ...prod, featured: !prod.featured });
                                showNotification(lang === 'ar' ? 'تم تعديل العرض في الواجهة' : 'Featured toggled');
                              }}
                              className="text-[10px] text-gray-500 hover:text-[#C49A55] underline"
                            >
                              {prod.featured ? 'إلغاء التمييز' : 'تمييز بالرئيسية'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-[#C49A55] hover:text-white text-gray-700 transition-colors"
                          title="تعديل المنتج وتغيير الصورة"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`هل أنت متأكد من حذف المنتج: ${prod.titleAr}؟`)) {
                              deleteProduct(prod.id);
                              showNotification(lang === 'ar' ? 'تم حذف المنتج' : 'Product deleted');
                            }
                          }}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-red-600 hover:text-white text-gray-400 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. QUALITY & WHOLESALE TAB */}
            {activeTab === 'quality' && (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-bold text-[#38251D]">
                    {lang === 'ar' ? 'تعديل قسم الجودة والمعايير وحلول التوريد' : 'Quality Standards & Wholesale Services'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'ar' ? 'تعديل نصوص المعايير الفنية والفرز والتخزين المعتمد' : 'Configure technical testing parameters and wholesale descriptions.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'ar' ? 'عنوان قسم الجودة' : 'Quality Section Title'}
                    </label>
                    <input
                      type="text"
                      value={contentDraft.quality.titleAr}
                      onChange={(e) => setContentDraft({
                        ...contentDraft,
                        quality: { ...contentDraft.quality, titleAr: e.target.value }
                      })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'ar' ? 'النص التعريفي للجودة والمعايير' : 'Quality Description'}
                    </label>
                    <textarea
                      rows={3}
                      value={contentDraft.quality.subtitleAr}
                      onChange={(e) => setContentDraft({
                        ...contentDraft,
                        quality: { ...contentDraft.quality, subtitleAr: e.target.value }
                      })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'ar' ? 'عنوان قسم تجارة الجملة والتوريد' : 'Wholesale Section Title'}
                    </label>
                    <input
                      type="text"
                      value={contentDraft.wholesale.titleAr}
                      onChange={(e) => setContentDraft({
                        ...contentDraft,
                        wholesale: { ...contentDraft.wholesale, titleAr: e.target.value }
                      })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'ar' ? 'النص التعريفي لتجارة الجملة' : 'Wholesale Description'}
                    </label>
                    <textarea
                      rows={3}
                      value={contentDraft.wholesale.subtitleAr}
                      onChange={(e) => setContentDraft({
                        ...contentDraft,
                        wholesale: { ...contentDraft.wholesale, subtitleAr: e.target.value }
                      })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-white"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleSaveContent}
                      className="px-6 py-2.5 rounded-xl bg-[#38251D] hover:bg-[#C49A55] text-white font-bold text-xs flex items-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'حفظ نصوص الجودة والتوريد' : 'Save Quality & Wholesale'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 5. BRANCHES TAB */}
            {activeTab === 'branches' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#38251D]">
                      {lang === 'ar' ? 'إدارة فروع الشركة وأرقام التواصل الرسمية' : 'Branch Management & Official Numbers'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {lang === 'ar'
                        ? 'تعديل أرقام الهواتف، العناوين، وساعات العمل المعتمدة لكل فرع (8:00 ص - 12:00 م | 3:00 م - 8:00 م)'
                        : 'Manage branch phone numbers, addresses, and working hours.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddingBranch(true)}
                    className="px-4 py-2 rounded-xl bg-[#C49A55] hover:bg-[#b38844] text-[#38251D] font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إضافة فرع جديد' : 'Add Branch'}</span>
                  </button>
                </div>

                {/* Add Branch Inline Form */}
                {isAddingBranch && (
                  <div className="p-5 rounded-2xl bg-[#F7F2E9] border border-[#C49A55] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#38251D]">إضافة فرع جديد بالمملكة</h4>
                      <button onClick={() => setIsAddingBranch(false)} className="text-gray-400 hover:text-black">✕</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input id="new-branch-city-ar" placeholder="اسم المدينة بالعربية (مثال: حائل)" className="p-2 border rounded-lg bg-white" />
                      <input id="new-branch-city-en" placeholder="City in English" className="p-2 border rounded-lg bg-white" />
                      <input id="new-branch-phone" placeholder="رقم الهاتف (مثال: 055xxxxxxx)" className="p-2 border rounded-lg bg-white" dir="ltr" />
                      <input id="new-branch-hours" defaultValue="السبت - الخميس: 8:00 ص - 12:00 م | 3:00 م - 8:00 م" className="p-2 border rounded-lg bg-white" />
                      <input id="new-branch-address" placeholder="العنوان التفصيلي" className="p-2 border rounded-lg bg-white sm:col-span-2" />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsAddingBranch(false)} className="px-3 py-1.5 border rounded-lg text-xs bg-white">إلغاء</button>
                      <button
                        onClick={() => {
                          const cityAr = (document.getElementById('new-branch-city-ar') as HTMLInputElement)?.value;
                          const cityEn = (document.getElementById('new-branch-city-en') as HTMLInputElement)?.value;
                          const phone = (document.getElementById('new-branch-phone') as HTMLInputElement)?.value;
                          const hours = (document.getElementById('new-branch-hours') as HTMLInputElement)?.value;
                          const address = (document.getElementById('new-branch-address') as HTMLInputElement)?.value;

                          if (cityAr && phone) {
                            addBranch({
                              id: `branch-${Date.now()}`,
                              cityAr,
                              cityEn: cityEn || cityAr,
                              addressAr: address || cityAr,
                              addressEn: cityEn || cityAr,
                              phone,
                              workingHoursAr: hours || 'السبت - الخميس: 8:00 ص - 12:00 م | 3:00 م - 8:00 م',
                              workingHoursEn: 'Sat - Thu: 8:00 AM - 12:00 PM | 3:00 PM - 8:00 PM',
                              mapQuery: `${cityAr}، المملكة العربية السعودية`,
                              isMain: false,
                            });
                            setIsAddingBranch(false);
                            showNotification(lang === 'ar' ? 'تمت إضافة الفرع بنجاح' : 'Branch added');
                          }
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#38251D] text-white font-bold text-xs"
                      >
                        حفظ الفرع
                      </button>
                    </div>
                  </div>
                )}

                {/* Branches List */}
                <div className="space-y-4">
                  {branches.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl border border-gray-200 bg-white space-y-3 shadow-sm hover:border-[#C49A55] transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-[#38251D]">
                            {b.cityAr}
                          </span>
                          {b.isMain && (
                            <span className="text-[10px] bg-[#C49A55] text-white font-bold px-2 py-0.5 rounded-full">
                              المركز الرئيسي
                            </span>
                          )}
                        </div>

                        {!b.isMain && (
                          <button
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من حذف فرع ${b.cityAr}؟`)) {
                                deleteBranch(b.id);
                                showNotification(lang === 'ar' ? 'تم حذف الفرع' : 'Branch deleted');
                              }
                            }}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-gray-500 font-bold block mb-1">رقم الهاتف الرسمي</label>
                          <input
                            type="text"
                            dir="ltr"
                            value={b.phone}
                            onChange={(e) => updateBranch({ ...b, phone: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-gray-50 font-bold text-start"
                          />
                        </div>

                        <div>
                          <label className="text-gray-500 font-bold block mb-1">ساعات العمل الرسمية</label>
                          <input
                            type="text"
                            value={b.workingHoursAr}
                            onChange={(e) => updateBranch({ ...b, workingHoursAr: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-gray-50 text-start"
                          />
                        </div>

                        <div>
                          <label className="text-gray-500 font-bold block mb-1">رابط استعلام الخريطة</label>
                          <input
                            type="text"
                            value={b.mapQuery}
                            onChange={(e) => updateBranch({ ...b, mapQuery: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-gray-50 text-start"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="text-gray-500 font-bold block mb-1">العنوان التفصيلي</label>
                          <input
                            type="text"
                            value={b.addressAr}
                            onChange={(e) => updateBranch({ ...b, addressAr: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-gray-50 text-start"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. ARTICLES TAB */}
            {activeTab === 'articles' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#38251D]">
                      {lang === 'ar' ? 'إدارة مقالات المركز الإعلامي والتوعية' : 'Media Center & Insights'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {lang === 'ar' ? 'إضافة وتعديل مقالات البن اليمني والهيل والتوابل ومعايير الفرز' : 'Publish and manage industry articles.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddingArticle(true)}
                    className="px-4 py-2 rounded-xl bg-[#C49A55] hover:bg-[#b38844] text-[#38251D] font-bold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إضافة مقال جديد' : 'New Article'}</span>
                  </button>
                </div>

                {isAddingArticle && (
                  <div className="p-5 rounded-2xl bg-[#F7F2E9] border border-[#C49A55] space-y-3">
                    <h4 className="font-bold text-sm text-[#38251D]">إضافة مقال جديد</h4>
                    <input id="new-art-title" placeholder="عنوان المقال بالعربية" className="w-full p-2.5 border rounded-lg text-xs bg-white" />
                    <input id="new-art-excerpt" placeholder="مقتطف قصير من المقال" className="w-full p-2.5 border rounded-lg text-xs bg-white" />
                    <textarea id="new-art-content" rows={4} placeholder="محتوى المقال كاملاً" className="w-full p-2.5 border rounded-lg text-xs bg-white" />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsAddingArticle(false)} className="px-3 py-1.5 border rounded-lg text-xs bg-white">إلغاء</button>
                      <button
                        onClick={() => {
                          const title = (document.getElementById('new-art-title') as HTMLInputElement)?.value;
                          const excerpt = (document.getElementById('new-art-excerpt') as HTMLInputElement)?.value;
                          const content = (document.getElementById('new-art-content') as HTMLTextAreaElement)?.value;
                          if (title) {
                            addArticle({
                              id: `art-${Date.now()}`,
                              titleAr: title,
                              titleEn: title,
                              excerptAr: excerpt || title,
                              excerptEn: excerpt || title,
                              contentAr: content || title,
                              contentEn: content || title,
                              date: new Date().toISOString().split('T')[0],
                              authorAr: 'شركة البن اليمني للتجارة',
                              authorEn: 'YCTC Editorial',
                              categoryAr: 'محاصيل وتجارة',
                              categoryEn: 'Trade Insights',
                              readTimeAr: '3 دقائق',
                              readTimeEn: '3 min read',
                              image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80',
                            });
                            setIsAddingArticle(false);
                            showNotification(lang === 'ar' ? 'تمت إضافة المقال' : 'Article published');
                          }
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#38251D] text-white text-xs font-bold"
                      >
                        نشر المقال
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {articles.map((art) => (
                    <div key={art.id} className="p-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <img src={art.image} alt={art.titleAr} className="w-16 h-14 rounded-lg object-cover" />
                        <div>
                          <h5 className="font-bold text-sm text-[#38251D] line-clamp-1">{art.titleAr}</h5>
                          <span className="text-[11px] text-gray-400">{art.date} • {art.categoryAr}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('حذف هذا المقال؟')) {
                            deleteArticle(art.id);
                            showNotification('تم الحذف');
                          }
                        }}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. BRANDING & CONTACT INFO TAB */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-bold text-[#38251D]">
                    {lang === 'ar' ? 'الهوية المؤسسية وأرقام الاتصال الرسمية' : 'Branding & Corporate Identity'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'ar' ? 'تعديل شعار الشركة، الهاتف الموحد 920016645، البريد الإلكتروني، وزر الواتساب' : 'Official logos, company phones, email, and website.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Logo Picker */}
                  <div className="p-4 rounded-2xl bg-[#F7F2E9]/60 border border-gray-200">
                    <ImagePickerInput
                      label={lang === 'ar' ? 'شعار الشركة الرسمي (Logo)' : 'Official Corporate Logo'}
                      value={contentDraft.branding.logoUrl}
                      onChange={(newUrl) => setContentDraft({
                        ...contentDraft,
                        branding: { ...contentDraft.branding, logoUrl: newUrl }
                      })}
                      helperText={lang === 'ar' ? 'يظهر الشعار في رأس الصفحة (Header)، التذييل (Footer)، والبطاقات الرسمية' : 'Visible in navbar, footer, and cards.'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">اسم الشركة بالعربية</label>
                      <input
                        type="text"
                        value={settingsDraft.companyNameAr}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, companyNameAr: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">اسم الشركة بالإنجليزية</label>
                      <input
                        type="text"
                        value={settingsDraft.companyNameEn}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, companyNameEn: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">الهاتف الموحد الرسمي</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={settingsDraft.phone}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, phone: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-white text-start"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">البريد الإلكتروني التجاري</label>
                      <input
                        type="email"
                        dir="ltr"
                        value={settingsDraft.email}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, email: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-white text-start"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1">الموقع الإلكتروني</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={settingsDraft.website}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, website: e.target.value })}
                        className="w-full p-2.5 border rounded-xl bg-white text-start"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Floating Button Configuration */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                      <input
                        type="checkbox"
                        checked={settingsDraft.enableWhatsapp}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, enableWhatsapp: e.target.checked })}
                        className="rounded text-[#C49A55]"
                      />
                      <span>{lang === 'ar' ? 'تفعيل زر واتساب العائم للشركة' : 'Enable Floating WhatsApp Button'}</span>
                    </label>

                    {settingsDraft.enableWhatsapp && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          {lang === 'ar' ? 'رقم واتساب المعتمد (مع مفتاح الدولة بدون صفر، مثال: 966554494338)' : 'WhatsApp Number with Country Code'}
                        </label>
                        <input
                          type="text"
                          dir="ltr"
                          value={settingsDraft.whatsappNumber}
                          onChange={(e) => setSettingsDraft({ ...settingsDraft, whatsappNumber: e.target.value })}
                          placeholder="966554494338"
                          className="p-2 border rounded-lg text-xs w-full max-w-sm"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => {
                        handleSaveSettings();
                        handleSaveContent();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#38251D] hover:bg-[#C49A55] text-white font-bold text-xs flex items-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'حفظ إعدادات الهوية والتواصل' : 'Save Branding & Contact'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 8. INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#38251D]">
                      {lang === 'ar' ? 'سجل طلبات واستفسارات تجار الجملة' : 'B2B Wholesale Inquiries Log'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {lang === 'ar' ? 'استعراض طلبات عروض الأسعار الواردة من المحامص والمؤسسات' : 'Review incoming requests.'}
                    </p>
                  </div>

                  {inquiries.length > 0 && (
                    <button
                      onClick={exportInquiriesCSV}
                      className="px-4 py-2 rounded-xl bg-[#526647] hover:bg-[#43533a] text-white font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'تصدير كملف CSV' : 'Export CSV'}</span>
                    </button>
                  )}
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-sm">
                    {lang === 'ar' ? 'لا توجد طلبات واردة حتى الآن.' : 'No inquiries yet.'}
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

                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="text-xs font-bold py-1.5 px-3 rounded-lg border border-gray-300 bg-white"
                            >
                              <option value="new">جديد (New)</option>
                              <option value="reviewed">قيد المراجعة</option>
                              <option value="contacted">تم التواصل</option>
                              <option value="closed">مكتمل</option>
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

                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-700">
                          <a href={`tel:${inq.phone}`} className="text-[#38251D] hover:underline">
                            <span dir="ltr">📞 {inq.phone}</span>
                          </a>
                          <a href={`mailto:${inq.email}`} className="text-[#38251D] hover:underline">
                            ✉️ {inq.email}
                          </a>
                        </div>

                        <div className="text-xs text-gray-800 space-y-1">
                          <div>
                            <span className="font-bold text-[#38251D]">المنتجات المطلوبة:</span>{' '}
                            {inq.requestedProducts.join(' • ')}
                          </div>
                          {inq.estimatedQuantity && (
                            <div>
                              <span className="font-bold text-[#38251D]">الكمية التقديرية:</span>{' '}
                              {inq.estimatedQuantity}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-[#38251D]">الموضوع:</span>{' '}
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

            {/* 9. BACKUP & RESTORE TAB */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-bold text-[#38251D]">
                    {lang === 'ar' ? 'النسخ الاحتياطي واستعادة البيانات الأصلية' : 'Backup & Data Restoration'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === 'ar' ? 'حفظ وتصدير كافة تعديلاتك، أو استيرادها في أي وقت، أو استعادة المحتوى المصنعي الأصلي' : 'Export and import website content JSON backups.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Export Card */}
                  <div className="p-6 rounded-2xl bg-[#F7F2E9] border border-[#C49A55]/40 space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C49A55] text-white flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base text-[#38251D]">
                      {lang === 'ar' ? 'تنزيل نسخة احتياطية كاملة (JSON)' : 'Export Full Backup (JSON)'}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {lang === 'ar'
                        ? 'احفظ ملف JSON يحتوي على كافة نصوصك، صورك، منتجاتك، وفروعك للرجوع إليه عند الحاجة.'
                        : 'Download a JSON file containing all customized texts, images, catalog items, and branches.'}
                    </p>
                    <button
                      onClick={handleExportBackup}
                      className="w-full py-2.5 rounded-xl bg-[#38251D] hover:bg-[#4d3328] text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-[#C49A55]" />
                      <span>{lang === 'ar' ? 'تصدير النسخة الاحتياطية' : 'Export JSON Backup'}</span>
                    </button>
                  </div>

                  {/* Import Card */}
                  <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[#526647] text-white flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base text-[#38251D]">
                      {lang === 'ar' ? 'استيراد نسخة احتياطية سابقة' : 'Import JSON Backup'}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {lang === 'ar'
                        ? 'ارفع ملف نسخة احتياطية بصيغة JSON لاستعادة كافة البيانات فورًا.'
                        : 'Upload a previously saved JSON file to restore your site settings and texts.'}
                    </p>
                    <label className="w-full py-2.5 rounded-xl border-2 border-dashed border-[#526647] hover:bg-[#526647]/5 text-[#526647] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'اختيار ملف النسخة الاحتياطية' : 'Select Backup JSON File'}</span>
                      <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Factory Reset Danger Zone */}
                <div className="pt-6 border-t border-red-100">
                  <div className="p-6 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-red-800">
                        {lang === 'ar' ? 'استعادة المحتوى الافتراضي الأصلي للشركة' : 'Restore Default Factory Content'}
                      </h4>
                      <p className="text-xs text-red-600 mt-1">
                        {lang === 'ar'
                          ? 'سيقوم هذا الخيار بإعادة تعيين كافة النصوص والصور إلى النسخة الأصلية المعتمدة لشركة البن اليمني للتجارة.'
                          : 'Resets all texts, images, and catalog entries back to the official default state.'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('تحذير: هل أنت متأكد من استعادة المحتوى الافتراضي الأصلي وإلغاء كافة التعديلات المخصصة؟')) {
                          resetToDefaultContent();
                          showNotification('تمت استعادة المحتوى الافتراضي الأصلي');
                          setTimeout(() => window.location.reload(), 1000);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'استعادة المحتوى الافتراضي' : 'Reset to Default'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
