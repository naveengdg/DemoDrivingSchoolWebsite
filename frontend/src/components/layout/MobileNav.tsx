/**
 * Vetri Driving Academy — Mobile Drawer Navigation Component
 * ==========================================================
 * Role & Purpose:
 * - Slide-in mobile menu triggered by the hamburger icon on small screens.
 * - Animates via Framer Motion with staggered link reveal effects.
 * - Displays active page indicators, business working hours, and 1-tap WhatsApp and Call CTAs.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, BUSINESS } from '@/lib/constants';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: { x: '100%' },
  open: { x: 0 },
};

const linkVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-road/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-cream z-50 lg:hidden
                       flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-steel-lighter bg-white/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center font-display font-bold text-road text-base">
                  V
                </div>
                <div>
                  <span className="font-display font-bold text-road text-base block leading-tight">
                    Vetri
                  </span>
                  <span className="text-[10px] text-steel font-medium block">
                    Driving Academy
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-road/5 hover:bg-road/10 text-road transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.path} custom={i} variants={linkVariants}>
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all
                      ${location.pathname === link.path
                        ? 'bg-amber text-road shadow-sm'
                        : 'text-road hover:bg-road/5 active:bg-road/10'
                      }
                    `.trim()}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs opacity-50">&rarr;</span>
                  </Link>
                </motion.div>
              ))}

              {/* Quick Academy Info in Drawer */}
              <div className="mt-6 pt-5 border-t border-steel-lighter/80 space-y-2.5 text-xs text-steel px-2">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-amber-dark shrink-0" />
                  <span>Mon–Sat: 6:00 AM – 7:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-amber-dark shrink-0" />
                  <span>Bypass Road, Mattuthavani, Madurai</span>
                </div>
              </div>
            </div>

            {/* Action buttons at bottom */}
            <div className="p-4 border-t border-steel-lighter bg-white/80 space-y-2">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber text-road font-bold text-sm shadow-md active:scale-98 transition-all"
              >
                <Phone size={16} />
                Call {BUSINESS.phoneDisplay}
              </a>
              <a
                href={BUSINESS.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-sm active:scale-98 transition-all"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
