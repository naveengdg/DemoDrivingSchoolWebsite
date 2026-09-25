/**
 * Vetri Driving Academy — Mobile Sticky Bottom Action Bar
 * ========================================================
 * Role & Purpose:
 * - High-conversion sticky mobile bottom bar designed specifically for smartphone users.
 * - Provides 3 instant actions: "Call Now", "WhatsApp", and "Enrol Now".
 * - Visible only on mobile viewports (<768px) with elevated backdrop-blur styling.
 */

import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '@/lib/constants';

export function MobileBottomBar() {
  return (
    <nav
      aria-label="Quick mobile contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2.5 flex items-center gap-2.5 md:hidden"
    >
      {/* Tap to Call */}
      <a
        href={`tel:${BUSINESS.phone}`}
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-amber text-road font-bold text-xs tracking-wide shadow-sm active:scale-95 transition-all"
        aria-label="Call Vetri Driving Academy"
      >
        <Phone size={16} className="shrink-0 fill-road/10" />
        <span>Call Now</span>
      </a>

      {/* WhatsApp Message */}
      <a
        href={BUSINESS.socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs tracking-wide shadow-sm active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={16} className="shrink-0" />
        <span>WhatsApp</span>
      </a>

      {/* Quick Enrol Link */}
      <Link
        to="/contact"
        className="inline-flex items-center justify-center py-3 px-3.5 rounded-xl border border-road/20 bg-road text-cream font-semibold text-xs active:scale-95 transition-all shrink-0"
        aria-label="Enrol in a driving course"
      >
        <Calendar size={15} className="text-amber shrink-0" />
        <span className="ml-1.5 hidden xs:inline">Enrol</span>
      </Link>
    </nav>
  );
}
