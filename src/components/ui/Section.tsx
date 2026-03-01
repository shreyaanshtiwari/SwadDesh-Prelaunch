import React from 'react';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
    className?: string;
    containerClassName?: string;
    id?: string;
    children: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({
    className = '',
    containerClassName = '',
    id,
    children,
    ...props
}) => {
    return (
        <section id={id} className={`py-16 md:py-24 ${className}`} {...props}>
            <div className={`container mx-auto px-4 md:px-6 max-w-7xl ${containerClassName}`}>
                {children}
            </div>
        </section>
    );
};
