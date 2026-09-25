/**
 * Vetri Driving Academy — Section Heading Component
 * =================================================
 * Role & Purpose:
 * - Provides consistent visual hierarchy, typography, and subtitle copy across all page sections.
 * - Includes an animated gold amber accent bar and scroll entrance animation via ScrollReveal.
 */

import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={`mb-8 sm:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-road text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 sm:mt-4 text-sm sm:text-lg text-steel max-w-2xl mx-auto text-balance leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 sm:mt-6 h-1 w-12 sm:w-16 bg-amber rounded-full ${centered ? 'mx-auto' : ''}`} />
    </ScrollReveal>
  );
}
