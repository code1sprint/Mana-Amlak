import React from 'react';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  optional?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, helperText, error, optional, className = '', id, ...props }, ref) => {
    const inputId = id || `field-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className="flex flex-col gap-1.5 w-full text-right">
        <div className="flex items-center justify-between">
          <label
            htmlFor={inputId}
            className="text-xs sm:text-sm font-medium text-warm-charcoal"
          >
            {label}
          </label>
          {optional && (
            <span className="text-[11px] text-warm-muted">اختیاری</span>
          )}
        </div>

        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full px-4 py-3 bg-cream-card text-warm-charcoal placeholder:text-warm-faded text-sm rounded-editorial-sm border transition-colors duration-150 focus:outline-none focus:ring-1 ${
            error
              ? 'border-red-600 focus:border-red-600 focus:ring-red-600'
              : 'border-warm-border focus:border-teal focus:ring-teal'
          } ${className}`}
          {...props}
        />

        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-red-600 mt-0.5">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[11px] text-warm-muted mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
