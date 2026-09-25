/**
 * Vetri Driving Academy — Call-to-Action (CTA) Conversion Banner
 * ===============================================================
 * Role & Purpose:
 * - High-conversion closing banner used across the Homepage, Courses, Services, and Reviews pages.
 * - Prompts prospective learners to take immediate action with direct phone call and WhatsApp chat links.
 */

import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
}

export function CTABanner({
  title = 'Ready to Start Your Driving Journey?',
  subtitle = 'Contact us today for a free consultation. Our team will help you choose the right course and schedule.',
}: CTABannerProps) {
  return (
    <section className="section-padding">
      <div className="section-container">
        <ScrollReveal>
          <div className="bg-road rounded-2xl p-6 sm:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-steel/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-cream text-balance">
                {title}
              </h2>
              <p className="mt-3 sm:mt-4 text-cream/70 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
                {subtitle}
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl
                           bg-amber text-road font-bold text-sm sm:text-base
                           hover:bg-amber-dark transition-colors duration-200
                           active:scale-[0.97] shadow-lg shadow-amber/25"
                >
                  <Phone size={18} />
                  Call {BUSINESS.phoneDisplay}
                </a>
                <a
                  href={BUSINESS.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl
                           border-2 border-cream/30 text-cream font-semibold text-sm sm:text-base
                           hover:bg-cream/10 transition-colors duration-200"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
