/**
 * Vetri Driving Academy — Accessible Text Input Component
 * ========================================================
 * Role & Purpose:
 * - Reusable form text input supporting ref forwarding, accessible label linking,
 *   touch-optimized tap targets, amber focus rings, and inline validation error messages.
 */

import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-road"
        >
          {label}
          {props.required && <span className="text-amber-dark ml-1">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3.5 sm:py-3 rounded-xl border-2 border-steel-lighter
            bg-white text-road text-base placeholder:text-steel-light
            transition-all duration-200
            focus:border-amber focus:ring-0 focus:outline-none
            hover:border-steel
            ${error ? 'border-red-400 focus:border-red-400' : ''}
            ${className}
          `.trim()}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
