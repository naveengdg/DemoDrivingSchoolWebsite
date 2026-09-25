/**
 * Vetri Driving Academy — Accessible Multi-line Textarea Component
 * ===============================================================
 * Role & Purpose:
 * - Multi-line message input used in the contact and lead enquiry forms.
 * - Supports custom placeholder text, vertical resizing, focus styling, and validation feedback.
 */

import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-road"
        >
          {label}
          {props.required && <span className="text-amber-dark ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={`
            w-full px-4 py-3.5 sm:py-3 rounded-xl border-2 border-steel-lighter
            bg-white text-road text-base placeholder:text-steel-light
            transition-all duration-200 resize-y
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

Textarea.displayName = 'Textarea';
