import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    className?: string;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`rounded-2xl border border-border-color bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-gold-light ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
