/**
 * Vetri Driving Academy — Badge Pill Component
 * =============================================
 * Role & Purpose:
 * - Displays status indicators, course tags (e.g. "Most Popular", "Govt. Approved"), and categories.
 * - Supports 4 semantic color themes (default, success, amber, steel) and 2 size scales.
 */

import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'amber' | 'steel';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-road/10 text-road',
  success: 'bg-success-light text-success',
  amber: 'bg-amber-pale text-amber-dark',
  steel: 'bg-steel-lighter text-steel',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
      `.trim()}
    >
      {children}
    </span>
  );
}
