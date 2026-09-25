/**
 * Vetri Driving Academy — Universal Button Component
 * ===================================================
 * Role & Purpose:
 * - Renders consistent, accessible buttons across the entire design system.
 * - Supports 4 variants (primary amber, secondary dark, outline, ghost) and 3 sizes.
 * - Supports internal routing (via React Router `to` prop), external links (`href`), or standard native buttons.
 * - Features dynamic click-ripple micro-animations for high-touch user feedback.
 */

import { type ButtonHTMLAttributes, type ReactNode, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  as?: 'button' | 'a';
  href?: string;
  to?: string;
}

const variantClasses = {
  primary:
    'bg-amber text-road font-semibold hover:bg-amber-dark active:scale-[0.97] shadow-md hover:shadow-lg',
  secondary:
    'bg-road text-cream font-semibold hover:bg-road-light active:scale-[0.97]',
  outline:
    'border-2 border-road text-road font-semibold hover:bg-road hover:text-cream active:scale-[0.97]',
  ghost:
    'text-road font-medium hover:bg-road/5 active:scale-[0.97]',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  as = 'button',
  href,
  to,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleRipple = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: oklch(0.98 0.005 85 / 0.3);
        transform: scale(0);
        animation: rippleEffect 0.5s ease-out forwards;
        pointer-events: none;
      `;

      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    },
    []
  );

  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center gap-2
    transition-all duration-200 ease-out cursor-pointer
    focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  if (as === 'a' && href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={baseClasses}
      onClick={(e) => {
        handleRipple(e);
        props.onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
