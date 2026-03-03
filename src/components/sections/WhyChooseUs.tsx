import React from 'react';
import { Section } from '@/components/ui/Section';
import { Leaf, ShieldCheck, HandHeart } from 'lucide-react'; // Using lucide-react for better, consistent icons

const features = [
    {
        title: '100% Authentic',
        description: 'We source strictly from original regions to preserve the native taste and traditional preparation methods lost to time.',
        icon: <ShieldCheck className="w-10 h-10 text-[#ffd700]" strokeWidth={1.5} />,
        accent: 'The Golden Promise'
    },
    {
        title: 'Direct from Artisans',
        description: 'We partner exclusively with local producers and rural cooperatives, ensuring fair trade and unmatched heritage quality.',
        icon: <HandHeart className="w-10 h-10 text-[#ffd700]" strokeWidth={1.5} />,
        accent: 'Empowering Roots'
    },
    {
        title: 'No Preservatives',
        description: 'Pure, noble ingredients. Zero artificial colors, flavors, or chemical preservatives. Just honest, royal delicacies.',
        icon: <Leaf className="w-10 h-10 text-[#ffd700]" strokeWidth={1.5} />,
        accent: 'Unadulterated Purity'
    },
];

export const WhyChooseUs = () => {
    return (
        <Section id="why-us" className="!pt-4 !pb-2 lg:!pt-12 lg:!pb-8 relative border-b-[4px] border-[#d4af37] bg-gradient-to-b from-[#fdfbf7] to-[#f4ecd8] overflow-hidden">
            {/* Soft decorative background patterns */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(143,15,13,0.03)_0%,transparent_70%)] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

            <div className="text-center mb-4 lg:mb-10 space-y-4 relative z-10 px-4">
                <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 font-bold text-[#b8860b] uppercase tracking-[2px] sm:tracking-[4px] text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 border border-[#d4af37]/30 rounded-full bg-white/50 backdrop-blur-sm shadow-sm whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rotate-45 bg-[#8b0a09]"></span>
                        The SwaadDesh Standard
                        <span className="w-1.5 h-1.5 rotate-45 bg-[#8b0a09]"></span>
                    </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-[56px] font-black text-[#4a0404] font-heading leading-tight drop-shadow-sm whitespace-nowrap">
                    Why Choose <i className="text-[#8f0f0d] font-light">SwaadDesh?</i>
                </h2>
                <div className="flex items-center justify-center gap-4 py-4">
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                    <div className="w-2.5 h-2.5 rotate-45 border border-[#d4af37]"></div>
                    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="group flex flex-col items-center bg-gradient-to-br from-[#ffffff] to-[#fff8eb] p-10 lg:p-12 rounded-2xl text-center shadow-[0_20px_40px_rgba(107,10,9,0.06)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(212,175,55,0.15)] border border-[#d4af37]/30 relative overflow-hidden"
                    >
                        {/* Regal Corner Ornaments */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#d4af37]/40 m-3 z-20 pointer-events-none transition-all duration-500 group-hover:m-2 group-hover:border-[#b8860b]"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#d4af37]/40 m-3 z-20 pointer-events-none transition-all duration-500 group-hover:m-2 group-hover:border-[#b8860b]"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#d4af37]/40 m-3 z-20 pointer-events-none transition-all duration-500 group-hover:m-2 group-hover:border-[#b8860b]"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#d4af37]/40 m-3 z-20 pointer-events-none transition-all duration-500 group-hover:m-2 group-hover:border-[#b8860b]"></div>

                        {/* Subtle Card Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                        {/* Icon Container */}
                        <div className="relative mb-8 z-10">
                            <div className="w-20 h-20 rounded-full bg-[#fdfbf7] flex items-center justify-center border border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:scale-110 transition-transform duration-500 ease-out group-hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                                {React.cloneElement(feature.icon as React.ReactElement, { className: "w-10 h-10 text-[#d4af37]" } as any)}
                            </div>
                            <div className="absolute -inset-2 border border-[#d4af37] border-dashed rounded-full opacity-30 group-hover:rotate-45 transition-transform duration-1000"></div>
                        </div>

                        <div className="relative z-10 flex-1 flex flex-col">
                            <span className="text-[10px] text-[#b8860b] font-bold uppercase tracking-[3px] mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                ~ {feature.accent} ~
                            </span>
                            <h3 className="text-2xl lg:text-[28px] font-bold text-[#4a0404] font-heading mb-4 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-[#5d4037] leading-relaxed text-[15px] font-light mt-auto">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 lg:mt-10 text-center">
                <div className="inline-block px-12 py-3 border-t border-b border-[#d4af37]/30 text-[#8b6914] italic font-heading text-lg">
                    Experience the uncompromised taste of royalty.
                </div>
            </div>
        </Section>
    );
};
