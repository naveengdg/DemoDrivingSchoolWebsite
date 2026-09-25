/**
 * Vetri Driving Academy — Interactive Card Container Component
 * =============================================================
 * Role & Purpose:
 * - Foundational content card container used for course items, instructors, reviews, and forms.
 * - Features subtle elevation shadow and smooth CSS hover lift transitions.
 * - Supports responsive padding scales (sm, md, lg) for optimal mobile and desktop spacing.
 */

import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  sm: 'p-3.5 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-5 sm:p-8',
};

export function Card({
  children,
  hover = true,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-card shadow-card
        ${hover ? 'transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-card-hover' : ''}
        ${paddingClasses[padding]}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
