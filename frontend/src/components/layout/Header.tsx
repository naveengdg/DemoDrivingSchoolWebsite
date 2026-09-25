/**
 * Vetri Driving Academy — Sticky Navigation Header Component
 * ==========================================================
 * Role & Purpose:
 * - Persistent top navigation bar displaying the brand logo, primary route links, and a direct Call CTA button.
 * - Dynamically adapts styling from transparent to elevated frosted glass upon page scroll.
 * - Integrates with MobileNav for full-screen slide-out navigation on mobile devices.
 */

import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Phone } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_LINKS, BUSINESS } from '@/lib/constants';
import { MobileNav } from './MobileNav';

export function Header() {
  const isScrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header
        className={`
          sticky top-0 left-0 right-0 z-40
          bg-cream/95 backdrop-blur-md
          border-b border-steel-lighter/60
          transition-all duration-200 ease-out
          ${isScrolled ? 'shadow-header py-2.5 sm:py-3' : 'py-3 sm:py-4'}
        `.trim()}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo — Always show name on mobile & desktop */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
              aria-label="Vetri Driving Academy Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span className="font-display font-bold text-road text-base sm:text-lg">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-road text-base sm:text-lg leading-tight block">
                  Vetri
                </span>
                <span className="text-[10px] sm:text-xs text-steel font-medium -mt-0.5 block whitespace-nowrap">
                  Driving Academy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${location.pathname === link.path
                      ? 'text-amber-dark bg-amber/10'
                      : 'text-road hover:text-amber-dark hover:bg-amber/5'
                    }
                  `.trim()}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action buttons + Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Mobile Quick Call Button */}
              <a
                href={`tel:${BUSINESS.phone}`}
                className="md:hidden w-9 h-9 rounded-xl bg-amber text-road flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                aria-label="Call Vetri Driving Academy"
              >
                <Phone size={16} />
              </a>

              {/* Desktop Call CTA */}
              <a
                href={`tel:${BUSINESS.phone}`}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-amber text-road font-semibold text-sm
                         hover:bg-amber-dark transition-colors duration-200
                         active:scale-[0.97] shadow-sm shadow-amber/20"
              >
                <Phone size={16} />
                {BUSINESS.phoneDisplay}
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobile}
                className="lg:hidden p-2 rounded-xl bg-white border border-steel-lighter text-road hover:bg-road/5 active:scale-95 transition-all shadow-xs"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
              >
                <Menu size={20} className="text-road" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}
