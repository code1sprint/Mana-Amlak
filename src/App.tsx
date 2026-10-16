import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '@/src/context/ToastContext';
import { SmoothScrollProvider } from '@/src/context/SmoothScrollProvider';
import { FloatingMobileContact } from '@/src/components/FloatingMobileContact';
import { BrandLogo } from '@/src/components/BrandLogo';
import '@/src/lib/gsap';

const HomePage = lazy(() => import('@/src/pages/HomePage'));
const PropertiesPage = lazy(() => import('@/src/pages/PropertiesPage'));
const PropertyDetailPage = lazy(() => import('@/src/pages/PropertyDetailPage'));
const AboutPage = lazy(() => import('@/src/pages/AboutPage'));
const AgentsPage = lazy(() => import('@/src/pages/AgentsPage'));
const AgentDetailPage = lazy(() => import('@/src/pages/AgentDetailPage'));
const ContactPage = lazy(() => import('@/src/pages/ContactPage'));
const SubmitPropertyPage = lazy(() => import('@/src/pages/SubmitPropertyPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-cream-canvas flex items-center justify-center p-6 text-warm-charcoal">
      <div className="flex flex-col items-center gap-5">
        <BrandLogo asLink={false} imgClassName="h-24 w-auto" />
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-display font-medium text-warm-muted tracking-wide">
          در حال بارگذاری...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <SmoothScrollProvider>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/properties" element={<PropertiesPage />} />
                  <Route path="/properties/:slug" element={<PropertyDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/agents" element={<AgentsPage />} />
                  <Route path="/agents/:id" element={<AgentDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/submit-property" element={<SubmitPropertyPage />} />
                  {/* Catch-all redirect to Home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>

              {/* Mobile floating contact speed-dial */}
              <FloatingMobileContact />
            </SmoothScrollProvider>
          </BrowserRouter>
        </ToastProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
