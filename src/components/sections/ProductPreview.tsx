import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { productStories } from '@/data/products';

export const ProductPreview = () => {
    // Only take the first 3 products for the preview section
    const displayProducts = productStories.slice(0, 3);

    return (
        <Section id="products" className="relative border-b-[4px] border-[#d4af37] py-16 overflow-hidden z-10">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-[#d4af37] to-transparent"></div>

            <div className="text-center mb-12 space-y-4 relative z-10">
                <div className="flex justify-center">
                    <span className="inline-block font-bold text-[#8f0f0d] uppercase tracking-[2px] mb-2 px-4 py-2 bg-[#8f0f0d]/5 rounded-full border border-[#8f0f0d]/10 text-sm">
                        ⚜️ Our Collection
                    </span>
                </div>
                <h2 className="text-4xl md:text-[56px] font-black text-[#4a0404] font-heading leading-tight max-w-3xl mx-auto drop-shadow-sm mt-4">
                    Royal Regional <i className="text-[#8f0f0d] font-light">Delicacies</i>
                </h2>
                <div className="flex items-center justify-center gap-4 py-4">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                    <div className="w-2 h-2 rotate-45 bg-[#ffd700]"></div>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                </div>
                <p className="text-[#8b6914] text-lg sm:text-xl font-heading italic max-w-2xl mx-auto">
                    Handpicked authentic flavors from across India, prepared with ancestral wisdom.
                </p>
            </div>

            {/* Asymmetrical Luxury Bento Grid */}
            <div className="max-w-7xl mx-auto relative z-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:min-h-[600px]">

                    {/* Featured Item (Left) - Product 1 */}
                    <div className="lg:col-span-7 relative group flex">
                        {/* Decorative Dotted Frame (Outer) */}
                        <div className="absolute inset-[-12px] border-[2px] border-[#d4af37] border-dashed rounded-[20px] opacity-40 z-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>

                        <Link href="/products" className="relative z-10 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-[1px] border-[#d4af37]/40 shadow-[0_20px_60px_rgba(107,10,9,0.12)] transition-all duration-700 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex flex-col h-full hover:-translate-y-1">
                            {/* Regal Corner Ornaments */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37]/60 m-3 z-20 pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d4af37]/60 m-3 z-20 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#d4af37]/60 m-3 z-20 pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37]/60 m-3 z-20 pointer-events-none"></div>

                            {/* Soft Glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none z-10 transition-opacity duration-700 group-hover:opacity-100 opacity-50"></div>

                            <div className="relative h-64 lg:h-[350px] w-full bg-[#fdfbf7] shrink-0 overflow-hidden flex items-center justify-center p-8 border-b border-[#d4af37]/30">
                                {/* Inner vignette for product */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.05)_100%)] pointer-events-none z-10"></div>
                                <Image
                                    src={displayProducts[0].image}
                                    alt={displayProducts[0].name}
                                    fill
                                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-2xl z-0"
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                />
                            </div>

                            <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center p-8 lg:p-12">
                                <span className="text-[10px] font-bold tracking-[4px] text-[#ffd700] uppercase mb-4 opacity-80">
                                    ✦ Featured Selection ✦
                                </span>
                                <h3 className="text-4xl lg:text-5xl font-bold text-[#fef5e7] mb-2 font-heading drop-shadow-md group-hover:text-[#ffd700] transition-colors duration-500">{displayProducts[0].name}</h3>
                                <p className="text-[#d4af37] text-sm lg:text-base italic mb-6 font-heading tracking-wide">~ {displayProducts[0].origin} ~</p>
                                <p className="text-[#e6d5c3]/70 font-light leading-relaxed text-sm lg:text-base mb-8 line-clamp-2 max-w-md mx-auto">{displayProducts[0].description}</p>

                                <div className="mt-auto px-6 py-2 border border-[#d4af37]/40 text-[#ffd700] text-xs font-bold uppercase tracking-[2px] rounded-full group-hover:bg-[#d4af37]/10 transition-colors duration-300">
                                    Uncover Legacy
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Secondary Items (Right Stack) */}
                    <div className="lg:col-span-5 flex flex-col gap-10 lg:gap-12 mt-4 lg:mt-0">

                        {/* Product 2 */}
                        <div className="flex-1 relative group flex">
                            {/* Decorative Dotted Frame (Outer) */}
                            <div className="absolute inset-[-10px] border-[2px] border-[#d4af37] border-dashed rounded-[20px] opacity-40 z-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>

                            <Link href="/products" className="relative z-10 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-[1px] border-[#d4af37]/40 shadow-[0_20px_60px_rgba(107,10,9,0.12)] transition-all duration-700 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row h-full hover:-translate-y-1">
                                {/* Decorative Lines */}
                                <div className="absolute top-2 left-2 bottom-2 right-2 border border-[#d4af37]/10 pointer-events-none z-20 transition-colors group-hover:border-[#d4af37]/30"></div>

                                <div className="relative w-full sm:w-2/5 h-48 sm:h-auto bg-[#fdfbf7] shrink-0 border-b sm:border-b-0 sm:border-r border-[#d4af37]/30 p-4 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] pointer-events-none z-10"></div>
                                    <Image
                                        src={displayProducts[1].image}
                                        alt={displayProducts[1].name}
                                        fill
                                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-xl align-middle"
                                        sizes="(max-width: 640px) 100vw, 20vw"
                                    />
                                </div>
                                <div className="flex-1 p-6 lg:p-8 relative flex flex-col justify-center items-center sm:items-start text-center sm:text-left z-30">
                                    <span className="text-[9px] font-bold tracking-[3px] text-[#ffd700] uppercase mb-2 opacity-80">{displayProducts[1].origin}</span>
                                    <h3 className="text-2xl font-bold text-[#fef5e7] mb-2 font-heading group-hover:text-[#ffd700] transition-colors">{displayProducts[1].name}</h3>
                                    <p className="text-[#e6d5c3]/60 font-light text-xs sm:text-sm leading-relaxed line-clamp-2 mb-6">{displayProducts[1].description}</p>
                                    <div className="mt-auto flex items-center text-[#d4af37] text-[10px] font-bold uppercase tracking-[2px] group-hover:text-[#ffd700] transition-colors">
                                        <span className="border-b border-transparent group-hover:border-[#ffd700] pb-0.5 transition-all duration-300">View Details</span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Product 3 */}
                        <div className="flex-1 relative group flex">
                            {/* Decorative Dotted Frame (Outer) */}
                            <div className="absolute inset-[-10px] border-[2px] border-[#d4af37] border-dashed rounded-[20px] opacity-40 z-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>

                            <Link href="/products" className="relative z-10 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-[1px] border-[#d4af37]/40 shadow-[0_20px_60px_rgba(107,10,9,0.12)] transition-all duration-700 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row h-full hover:-translate-y-1">
                                {/* Decorative Lines */}
                                <div className="absolute top-2 left-2 bottom-2 right-2 border border-[#d4af37]/10 pointer-events-none z-20 transition-colors group-hover:border-[#d4af37]/30"></div>

                                <div className="flex-1 p-6 lg:p-8 relative flex flex-col justify-center items-center sm:items-end text-center sm:text-right z-30 order-2 sm:order-1 border-t sm:border-t-0 sm:border-r border-[#d4af37]/30">
                                    <span className="text-[9px] font-bold tracking-[3px] text-[#ffd700] uppercase mb-2 opacity-80">{displayProducts[2].origin}</span>
                                    <h3 className="text-2xl font-bold text-[#fef5e7] mb-2 font-heading group-hover:text-[#ffd700] transition-colors">{displayProducts[2].name}</h3>
                                    <p className="text-[#e6d5c3]/60 font-light text-xs sm:text-sm leading-relaxed line-clamp-2 mb-6">{displayProducts[2].description}</p>
                                    <div className="mt-auto flex items-center text-[#d4af37] text-[10px] font-bold uppercase tracking-[2px] group-hover:text-[#ffd700] transition-colors">
                                        <span className="border-b border-transparent group-hover:border-[#ffd700] pb-0.5 transition-all duration-300">View Details</span>
                                    </div>
                                </div>
                                <div className="relative w-full sm:w-2/5 h-48 sm:h-auto bg-[#fdfbf7] shrink-0 order-1 sm:order-2 p-4 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] pointer-events-none z-10"></div>
                                    <Image
                                        src={displayProducts[2].image}
                                        alt={displayProducts[2].name}
                                        fill
                                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-xl align-middle"
                                        sizes="(max-width: 640px) 100vw, 20vw"
                                    />
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-12 text-center relative z-10 flex flex-col items-center">
                <Link href="/products" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#4a0404] font-bold tracking-[2px] uppercase rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.5)] border border-[#ffd700]">
                    <span className="relative z-10">Discover All Pre-launch Products</span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#ffd700] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
                <div className="mt-4 text-[#8b6914] text-sm font-heading italic">
                    Explore our full catalog of 10 heritage specialties
                </div>
            </div>
        </Section >
    );
};
