import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/components/LanguageContext';
import FluidBackground from '@/components/FluidBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ServicePage = lazy(() => import('@/pages/ServicePage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  if (window.location.hash) return null;
  window.scrollTo(0, 0);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <FluidBackground />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services/:slug" element={<ServicePage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
        <ScrollToTop />
      </BrowserRouter>
    </LanguageProvider>
  );
}
