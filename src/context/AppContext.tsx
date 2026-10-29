import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  PageId,
  ProductCategory,
  Product,
  Branch,
  Article,
  WholesaleInquiry,
  SiteSettings,
  SiteContent,
} from '../types';
import {
  initialProducts,
  initialBranches,
  initialArticles,
  initialSiteSettings,
  initialSiteContent,
} from '../data/initialData';
import { translations } from '../data/translations';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof translations.ar;
  currentPage: PageId;
  currentCategory: ProductCategory | 'all';
  currentArticleId: string | null;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  navigateTo: (
    page: PageId,
    options?: { category?: ProductCategory | 'all'; articleId?: string; productId?: string }
  ) => void;
  products: Product[];
  branches: Branch[];
  articles: Article[];
  inquiries: WholesaleInquiry[];
  siteSettings: SiteSettings;
  siteContent: SiteContent;
  updateSiteContent: (content: SiteContent) => void;
  resetToDefaultContent: () => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  addInquiry: (inquiry: Omit<WholesaleInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: WholesaleInquiry['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateBranch: (branch: Branch) => void;
  addBranch: (branch: Branch) => void;
  deleteBranch: (id: string) => void;
  updateArticle: (article: Article) => void;
  addArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  updateSettings: (settings: SiteSettings) => void;
  inquiryModalProduct: Product | null;
  setInquiryModalProduct: (product: Product | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'yctc_lang',
  PRODUCTS: 'yctc_products_v2',
  BRANCHES: 'yctc_branches_v2',
  ARTICLES: 'yctc_articles_v1',
  INQUIRIES: 'yctc_inquiries_v1',
  SETTINGS: 'yctc_settings_v1',
  CONTENT: 'yctc_content_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language state
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      if (saved === 'en' || saved === 'ar') return saved;
    }
    return 'ar';
  });

  // Navigation state synced with URL hash
  const getPageFromHash = (): PageId => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    const validPages: PageId[] = [
      'home',
      'about',
      'vision',
      'products',
      'category',
      'quality',
      'wholesale',
      'branches',
      'news',
      'article',
      'contact',
      'privacy',
      'terms',
      'admin',
      '404',
    ];
    if (validPages.includes(hash as PageId)) {
      return hash as PageId;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [currentCategory, setCurrentCategory] = useState<ProductCategory | 'all'>('all');
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [inquiryModalProduct, setInquiryModalProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Data states with LocalStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialProducts;
  });

  const [branches, setBranches] = useState<Branch[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.BRANCHES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialBranches;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialArticles;
  });

  const [inquiries, setInquiries] = useState<WholesaleInquiry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        id: 'inq-seed-1',
        fullName: 'فهد العتيبي',
        companyName: 'مؤسسة أريج البن للتموين',
        phone: '0501234567',
        email: 'fahad@areejcoffee.sa',
        city: 'الرياض',
        businessType: 'محمصة قهوة',
        requestedProducts: ['القهوة والبن', 'الهيل'],
        estimatedQuantity: '20 شوال بن أخضر + 15 كرتون هيل',
        subject: 'طلب أسعار جملة للبن الخولاني والهيل الأخضر',
        details: 'نود الاستفسار عن كوتات التوريد الشهري للمحامص في منطقة الرياض ومواعيد الجدولة.',
        agreedTerms: true,
        createdAt: new Date().toISOString(),
        status: 'new',
      },
    ];
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialSiteSettings;
  });

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialSiteContent;
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // Keep HTML attributes in sync with Language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    }
  }, [lang]);

  // Sync state modifications to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(siteContent));
  }, [siteContent]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const updateSiteContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
  };

  const resetToDefaultContent = () => {
    setSiteContent(initialSiteContent);
    setSiteSettings(initialSiteSettings);
    setProducts(initialProducts);
    setBranches(initialBranches);
    setArticles(initialArticles);
    localStorage.removeItem(STORAGE_KEYS.CONTENT);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.BRANCHES);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
  };

  const navigateTo = (
    page: PageId,
    options?: { category?: ProductCategory | 'all'; articleId?: string; productId?: string }
  ) => {
    setCurrentPage(page);
    if (options?.category !== undefined) {
      setCurrentCategory(options.category);
    }
    if (options?.articleId !== undefined) {
      setCurrentArticleId(options.articleId);
    }
    if (options?.productId !== undefined) {
      setSelectedProductId(options.productId);
    }
    if (typeof window !== 'undefined') {
      const targetHash = page === 'home' ? '' : `#/${page}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash || window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addInquiry = (inquiryData: Omit<WholesaleInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: WholesaleInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: WholesaleInquiry['status'], notes?: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, status, ...(notes !== undefined ? { notes } : {}) } : inq
      )
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateBranch = (updated: Branch) => {
    setBranches((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const addBranch = (newBranch: Branch) => {
    setBranches((prev) => [...prev, newBranch]);
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  const updateArticle = (updated: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const addArticle = (newArt: Article) => {
    setArticles((prev) => [newArt, ...prev]);
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
  };

  const t = translations[lang];

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        currentPage,
        currentCategory,
        currentArticleId,
        selectedProductId,
        setSelectedProductId,
        navigateTo,
        products,
        branches,
        articles,
        inquiries,
        siteSettings,
        siteContent,
        updateSiteContent,
        resetToDefaultContent,
        isEditMode,
        toggleEditMode,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateProduct,
        addProduct,
        deleteProduct,
        updateBranch,
        addBranch,
        deleteBranch,
        updateArticle,
        addArticle,
        deleteArticle,
        updateSettings,
        inquiryModalProduct,
        setInquiryModalProduct,
        isAdminOpen,
        setIsAdminOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
