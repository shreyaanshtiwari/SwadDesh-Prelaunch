'use client';

import React from 'react';

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
};

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
    ({ className = '', label, error, id, ...props }, ref) => {
        const fallbackId = React.useId();
        const generatedId = id || fallbackId;

        return (
            <div className="w-full space-y-2 group">
                {label && (
                    <label
                        htmlFor={generatedId}
                        className="text-[13px] font-bold uppercase tracking-[1px] text-[#8b6914] ml-1 group-focus-within:text-[#d4af37] transition-colors"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <textarea
                        id={generatedId}
                        ref={ref}
                        className={`flex min-h-[120px] w-full rounded-xl border-2 border-[#d4af37]/60 bg-white px-4 py-3 text-sm text-[#4a0404] placeholder:text-[#5d4037]/60 font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/10 focus:border-[#d4af37] hover:border-[#d4af37] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 shadow-sm resize-none ${error ? 'border-red-500 focus:ring-red-500/10 focus:border-red-500' : ''
                            } ${className}`}
                        {...props}
                        suppressHydrationWarning
                    />
                    {/* Subtle Glow Effect on Hover/Focus */}
                    <div className="absolute inset-0 rounded-xl bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300"></div>
                </div>
                {error && (
                    <p className="text-xs font-semibold text-red-600 ml-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

TextAreaField.displayName = 'TextAreaField';
