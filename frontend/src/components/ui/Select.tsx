/**
 * Vetri Driving Academy — Accessible Select Dropdown Component
 * =============================================================
 * Role & Purpose:
 * - Native dropdown select component customized to match the academy design system.
 * - Used in the enrolment enquiry form to select courses (LMV, Two-Wheeler, HMV, Refresher).
 * - Fully accessible on mobile operating systems with native touch selection menus.
 */

import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder, id, className = '', ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-road"
        >
          {label}
          {props.required && <span className="text-amber-dark ml-1">*</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full px-4 py-3.5 sm:py-3 rounded-xl border-2 border-steel-lighter
            bg-white text-road text-base
            transition-all duration-200
            focus:border-amber focus:ring-0 focus:outline-none
            hover:border-steel
            ${error ? 'border-red-400 focus:border-red-400' : ''}
            ${className}
          `.trim()}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
