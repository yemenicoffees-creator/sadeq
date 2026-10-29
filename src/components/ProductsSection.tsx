import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { Product, ProductCategory } from '../types';
import { filterProducts } from '../utils/wholesaleLogic';
import { Package, Search, Filter, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductsSectionProps {
  limit?: number;
  showFilters?: boolean;
  initialCategory?: ProductCategory | 'all';
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  limit,
  showFilters = true,
  initialCategory = 'all',
}) => {
  const { lang, t, products, navigateTo, setInquiryModalProduct } = useApp();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'coffee', label: t.categories.coffee },
    { id: 'cardamom', label: t.categories.cardamom },
    { id: 'saffron', label: t.categories.saffron },
    { id: 'spices', label: t.categories.spices },
    { id: 'nuts', label: t.categories.nuts },
  ];

  const filtered = filterProducts(products, activeCategory, searchQuery);
  const displayedProducts = limit ? filtered.slice(0, limit) : filtered;

  const handleInquire = (product: Product) => {
    setInquiryModalProduct(product);
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#526647]/10 text-[#526647] text-xs font-bold border border-[#526647]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.carefullySelected}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#38251D] tracking-tight">
            {lang === 'ar' ? 'منتجات مختارة بعناية' : 'Carefully Selected Products'}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {lang === 'ar'
              ? 'تشكيلة متكاملة لتجارة الجملة تشمل البن اليمني والإثيوبي، الهيل الأخضر والبهارات والزعفران والمكسرات التجارية لتلبية متطلبات قطاع الأعمال.'
              : 'A comprehensive wholesale catalog encompassing Yemeni and Ethiopian coffee, cardamom, natural spices, saffron, and nuts for commercial buyers.'}
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        {showFilters && (
          <div className="space-y-4 mb-10">
            {/* Category tabs */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                      isActive
                        ? 'bg-[#38251D] text-[#C49A55] border-2 border-[#C49A55] shadow'
                        : 'bg-[#F7F2E9] text-gray-700 hover:bg-[#ebe3d3] border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search input */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'ابحث باسم المنتج، المنشأ، أو النوع...'
                    : 'Search by product name, origin, or grade...'
                }
                className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-gray-200 bg-[#F7F2E9]/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A55] focus:bg-white transition-all text-start"
              />
              <Search className="w-4 h-4 text-gray-400 absolute top-3.5 start-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-3 end-3 text-xs text-gray-400 hover:text-gray-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setModalProduct(p)}
                onInquire={(p) => handleInquire(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F7F2E9] rounded-2xl border border-gray-200 p-8">
            <Package className="w-12 h-12 text-[#C49A55] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#38251D]">
              {lang === 'ar' ? 'لا توجد منتجات مطابقة للبحث' : 'No matching products found'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'ar'
                ? 'يرجى تجربة البحث بكلمات أخرى أو التواصل المباشر مع فريق المبيعات'
                : 'Try searching with different terms or reach out directly to our sales team'}
            </p>
          </div>
        )}

        {/* View All Products button if limited */}
        {limit && products.length > limit && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigateTo('products')}
              className="px-8 py-3.5 rounded-xl bg-[#38251D] hover:bg-[#4d3328] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all inline-flex items-center gap-2 group"
            >
              <span>{lang === 'ar' ? 'عرض جميع المنتجات والكتالوج الكامل' : 'View Full Catalog'}</span>
              {lang === 'ar' ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#C49A55]" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C49A55]" />
              )}
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onInquire={(p) => handleInquire(p)}
      />
    </section>
  );
};
