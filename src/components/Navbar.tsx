import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Globe,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Building2,
  Package,
  Layers,
  FileText,
  Settings,
} from 'lucide-react';
import { PageId } from '../types';

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t, currentPage, navigateTo, siteSettings, siteContent, setIsAdminOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <Building2 className="w-4 h-4" /> },
    { id: 'about', label: t.nav.about, icon: <Layers className="w-4 h-4" /> },
    { id: 'products', label: t.nav.products, icon: <Package className="w-4 h-4" /> },
    { id: 'quality', label: t.nav.quality, icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'branches', label: t.nav.branches, icon: <Building2 className="w-4 h-4" /> },
    { id: 'news', label: t.nav.news, icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: t.nav.contact, icon: <Phone className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  };

  return (
    <>
      {/* Top Utility Bar: Phone, Saudi Arabia wholesale indicator, Website & Admin portal */}
      <div className="bg-[#241712] text-[#F7F2E9]/80 text-xs py-2 px-4 border-b border-[#C49A55]/20 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteSettings.phone}`}
              className="flex items-center gap-1.5 text-[#C49A55] hover:text-white transition-colors font-medium tracking-wider"
              aria-label={`Call ${siteSettings.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#C49A55]" />
              <span dir="ltr">{siteSettings.phone}</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/70">
              {lang === 'ar'
                ? 'تجارة الجملة للقهوة والهيل والبهارات في المملكة العربية السعودية'
                : 'B2B Wholesale of Coffee, Cardamom & Spices in Saudi Arabia'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1.5 text-[#F7F2E9] hover:text-[#C49A55] transition-colors text-[11px] px-2.5 py-1 rounded-md bg-[#C49A55]/20 hover:bg-[#C49A55]/30 border border-[#C49A55]/50 font-bold"
              title={lang === 'ar' ? 'مركز التحكم لتعديل النصوص والصور' : 'Control Center & Editor'}
            >
              <Settings className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>{lang === 'ar' ? 'مركز التحكم (CMS)' : 'Control Center'}</span>
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 font-semibold text-white/90 hover:text-[#C49A55] transition-colors py-0.5 px-2 rounded border border-white/10 hover:border-[#C49A55]/50 bg-white/5"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#C49A55]" />
              <span>{t.switchLang}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#38251D]/95 backdrop-blur-md shadow-xl border-b border-[#C49A55]/30 py-2.5'
            : 'bg-[#38251D] border-b border-[#C49A55]/20 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-start group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A55] rounded-lg p-1"
            aria-label={t.companyName}
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-1 shadow-md border-2 border-[#C49A55] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src={siteContent?.branding?.logoUrl || "/assets/aistudio/Yemen_Coffee_logo______________2__3d5596d3.png"}
                alt={t.companyName}
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#F7F2E9] font-bold text-base sm:text-lg tracking-tight group-hover:text-[#C49A55] transition-colors">
                {lang === 'ar' ? (siteContent?.branding?.companyNameAr || 'شركة البن اليمني للتجارة') : (siteContent?.branding?.companyNameEn || 'Yemeni Coffee Trading Co.')}
              </span>
              <span className="text-[#C49A55] text-xs font-medium tracking-wide">
                {lang === 'ar' ? (siteContent?.branding?.sloganAr || 'أصالة النكهة... وجودة تستحق الثقة') : (siteContent?.branding?.sloganEn || 'Authentic Flavor... Quality You Can Trust')}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;

              if (link.id === 'products') {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('products')}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        isActive
                          ? 'text-[#C49A55] bg-black/20 border-b-2 border-[#C49A55]'
                          : 'text-[#F7F2E9] hover:text-[#C49A55] hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {/* Products mega/category dropdown */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full start-0 mt-1 w-64 bg-[#2C1C16] border border-[#C49A55]/40 rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                        <div className="px-3 py-1.5 text-xs text-[#C49A55] font-bold border-b border-white/10 uppercase tracking-wider">
                          {t.categories.all}
                        </div>
                        <button
                          onClick={() => {
                            navigateTo('products', { category: 'all' });
                            setProductsDropdownOpen(false);
                          }}
                          className="w-full text-start px-4 py-2 text-sm text-[#F7F2E9] hover:bg-[#C49A55] hover:text-white transition-colors"
                        >
                          {t.categories.all}
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('products', { category: 'coffee' });
                            setProductsDropdownOpen(false);
                          }}
                          className="w-full text-start px-4 py-2 text-sm text-[#F7F2E9] hover:bg-[#C49A55] hover:text-white transition-colors flex items-center justify-between"
                        >
                          <span>{t.categories.coffee}</span>
                          <span className="text-[10px] bg-[#526647] text-white px-1.5 py-0.5 rounded">خولاني / هرري</span>
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('products', { category: 'cardamom' });
                            setProductsDropdownOpen(false);
                          }}
                          className="w-full text-start px-4 py-2 text-sm text-[#F7F2E9] hover:bg-[#C49A55] hover:text-white transition-colors"
                        >
                          {t.categories.cardamom}
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('products', { category: 'saffron' });
                            setProductsDropdownOpen(false);
                          }}
                          className="w-full text-start px-4 py-2 text-sm text-[#F7F2E9] hover:bg-[#C49A55] hover:text-white transition-colors"
                        >
                          {t.categories.saffron}
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('products', { category: 'spices' });
                            setProductsDropdownOpen(false);
                          }}
                          className="w-full text-start px-4 py-2 text-sm text-[#F7F2E9] hover:bg-[#C49A55] hover:text-white transition-colors"
                        >
                          {t.categories.spices}
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('products', { category: 'nuts' });
                            setProductsDropdownOpen(false);
                          }}
                          className="w-full text-start px-4 py-2 text-sm text-[#F7F2E9] hover:bg-[#C49A55] hover:text-white transition-colors"
                        >
                          {t.categories.nuts}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#C49A55] bg-black/25 font-bold border-b-2 border-[#C49A55]'
                      : 'text-[#F7F2E9] hover:text-[#C49A55] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Call & Primary CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteSettings.phone}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#C49A55]/60 text-[#C49A55] hover:bg-[#C49A55] hover:text-white transition-all text-xs font-bold"
              aria-label={`Call ${siteSettings.phone}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.callNow}</span>
            </a>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C49A55] to-[#a87d3b] hover:from-[#d6aa65] hover:to-[#b38844] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.nav.contact}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#F7F2E9] hover:text-[#C49A55] hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Panel */}
          <div className="fixed top-0 bottom-0 start-0 w-[85%] max-w-sm bg-[#2C1C16] border-e border-[#C49A55]/30 shadow-2xl z-50 flex flex-col p-6 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white p-1 border border-[#C49A55] flex items-center justify-center">
                  <img
                    src="/assets/aistudio/Yemen_Coffee_logo______________2__3d5596d3.png"
                    alt={t.companyName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-[#F7F2E9] font-bold text-sm leading-tight">
                    {lang === 'ar' ? 'شركة البن اليمني للتجارة' : 'Yemeni Coffee Trading Co.'}
                  </h2>
                  <p className="text-[#C49A55] text-[11px] font-medium">{siteSettings.phone}</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Switch in Drawer */}
            <div className="py-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/70">
                {lang === 'ar' ? 'اللغة الحالية: العربية' : 'Current Language: English'}
              </span>
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-xs font-bold text-[#C49A55] bg-white/5 border border-[#C49A55]/40 px-3 py-1.5 rounded-md"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t.switchLang}</span>
              </button>
            </div>

            {/* Navigation links */}
            <div className="py-4 space-y-1 flex-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-start ${
                      isActive
                        ? 'bg-[#C49A55] text-white font-bold'
                        : 'text-[#F7F2E9] hover:bg-white/5 hover:text-[#C49A55]'
                    }`}
                  >
                    <span className="text-[#C49A55] group-hover:text-white">{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                );
              })}

              <div className="pt-2">
                <button
                  onClick={() => handleNavClick('vision')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-white/70 hover:text-[#C49A55]"
                >
                  <span>{t.nav.vision}</span>
                </button>
                <button
                  onClick={() => handleNavClick('wholesale')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-white/70 hover:text-[#C49A55]"
                >
                  <span>{t.nav.wholesale}</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href={`tel:${siteSettings.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#38251D] border border-[#C49A55] text-[#C49A55] text-sm font-bold shadow"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">{siteSettings.phone}</span>
                <span>({t.callNow})</span>
              </a>

              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#C49A55] to-[#a87d3b] text-white text-sm font-bold shadow text-center"
              >
                {t.contactSales}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full text-center py-1.5 text-xs text-white/40 hover:text-[#C49A55] flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{t.nav.adminPortal}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
