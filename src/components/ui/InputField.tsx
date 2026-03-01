import React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ className = '', label, error, id, ...props }, ref) => {
        const fallbackId = React.useId();
        const generatedId = id || fallbackId;

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label
                        htmlFor={generatedId}
                        className="text-sm font-medium leading-none text-text-dark peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={generatedId}
                    ref={ref}
                    className={`flex h-11 w-full rounded-md border border-border-color bg-white px-3 py-2 text-sm placeholder:text-text-gray focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${error ? 'border-red-500 focus:ring-red-500' : ''
                        } ${className}`}
                    {...props}
                />
                {error && (
                    <p className="text-sm font-medium text-red-500">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

InputField.displayName = 'InputField';
