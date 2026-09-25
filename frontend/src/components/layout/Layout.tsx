/**
 * Vetri Driving Academy — Master Page Layout Shell
 * ================================================
 * Role & Purpose:
 * - Wraps every page with the sticky Header, dynamic main content area, Footer,
 *   and the mobile bottom quick-action bar.
 * - Handles instant scroll restoration to top whenever the URL route changes.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomBar } from './MobileBottomBar';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  // Scroll to top instantly on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
