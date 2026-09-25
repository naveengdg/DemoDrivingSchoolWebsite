/**
 * Vetri Driving Academy — Root Application Component
 * ===================================================
 * Role & Purpose:
 * - Configures TanStack React Query client with automatic 5-minute data caching.
 * - Sets up React Router with code-split lazy-loaded route views:
 *     • /         -> HomePage (Hero, Stats, Featured Courses, Fleet, Testimonials)
 *     • /courses  -> CoursesPage (Full driving curriculum & pricing)
 *     • /services -> ServicesPage (Licence support, timetable, FAQ)
 *     • /reviews  -> ReviewsPage (Student ratings & Google review metrics)
 *     • /about    -> AboutPage (Academy story, certified instructors, values)
 *     • /contact  -> ContactPage (Instant lead enquiry form, address, WhatsApp, phone)
 * - Implements idle-time route prefetching for instant page navigation without spinners.
 */

import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';

// Route-level code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ReviewsPage = lazy(() => import('@/pages/ReviewsPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 15 * 60 * 1000, // 15 minutes garbage collection time
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-amber border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  // Preload all routes during browser idle time for instant, zero-delay navigation
  useEffect(() => {
    const prefetchRoutes = () => {
      import('@/pages/CoursesPage');
      import('@/pages/ServicesPage');
      import('@/pages/ReviewsPage');
      import('@/pages/AboutPage');
      import('@/pages/ContactPage');
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(prefetchRoutes);
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(prefetchRoutes, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
