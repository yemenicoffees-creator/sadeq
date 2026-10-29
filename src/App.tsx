/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AdminCMSModal } from './components/AdminCMSModal';
import { QuickInquiryModal } from './components/QuickInquiryModal';

// Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { VisionView } from './views/VisionView';
import { ProductsView } from './views/ProductsView';
import { QualityView } from './views/QualityView';
import { WholesaleView } from './views/WholesaleView';
import { BranchesView } from './views/BranchesView';
import { NewsView } from './views/NewsView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { ContactView } from './views/ContactView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { TermsView } from './views/TermsView';
import { NotFoundView } from './views/NotFoundView';
import { AdminView } from './views/AdminView';

const MainLayout: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'vision':
        return <VisionView />;
      case 'products':
      case 'category':
        return <ProductsView />;
      case 'quality':
        return <QualityView />;
      case 'wholesale':
        return <WholesaleView />;
      case 'branches':
        return <BranchesView />;
      case 'news':
        return <NewsView />;
      case 'article':
        return <ArticleDetailView />;
      case 'contact':
        return <ContactView />;
      case 'privacy':
        return <PrivacyPolicyView />;
      case 'terms':
        return <TermsView />;
      case 'admin':
        return <AdminView />;
      case '404':
        return <NotFoundView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2E9] text-[#38251D]">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1">
        {renderCurrentView()}
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Floating Action Buttons (Direct Call, WhatsApp, Scroll to Top) */}
      <FloatingActions />

      {/* Admin CMS Management Modal */}
      <AdminCMSModal />

      {/* Quick Product Inquiry Modal */}
      <QuickInquiryModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
