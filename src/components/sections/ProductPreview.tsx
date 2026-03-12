import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { productStories } from '@/data/products';
import { Crown } from 'lucide-react';

export const ProductPreview = () => {
    // Only take the first 3 products for the preview section
    const displayProducts = productStories.slice(0, 3);

    return (
        <section id="products" className="relative border-b-[4px] border-[#d4af37] pt-10 pb-2 lg:pt-24 lg:pb-12 overflow-hidden z-10 bg-[#fffcf5]">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-[#d4af37] to-transparent"></div>

                <div className="text-center mb-8 lg:mb-12 space-y-4 relative z-10">
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-2 font-bold text-[#8f0f0d] uppercase tracking-[2px] mb-2 px-4 py-2 bg-[#8f0f0d]/5 rounded-full border border-[#8f0f0d]/10 text-sm">
                            <Crown className="w-4 h-4" strokeWidth={1.5} /> Our Collection
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-[56px] font-black text-[#4a0404] font-heading leading-tight max-w-3xl mx-auto drop-shadow-sm mt-4">
                        Royal Regional <i className="text-[#8f0f0d] font-light">Delicacies</i>
                    </h2>
                    <div className="flex items-center justify-center gap-4 py-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <div className="w-2 h-2 rotate-45 bg-[#ffd700]"></div>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>
                    <p className="text-[#8b6914] text-base sm:text-lg lg:text-xl font-heading italic max-w-2xl mx-auto px-4">
                        Handpicked authentic flavors from across India, prepared with ancestral wisdom.
                    </p>
                </div>

                {/* Asymmetrical Luxury Bento Grid */}
                <div className="max-w-7xl mx-auto relative z-10 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 lg:min-h-[600px]">

                        {/* Featured Item (Left) - Product 1 */}
                        <div className="lg:col-span-7 relative group flex">
                            {/* Decorative Dotted Frame (Outer) */}
                            <div className="absolute inset-[-12px] border-[2px] border-[#d4af37] border-dashed rounded-[20px] opacity-40 z-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>

                            <Link href={`/products/${displayProducts[0].id}`} className="relative z-10 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-[1px] border-[#d4af37]/40 shadow-[0_20px_60px_rgba(107,10,9,0.12)] transition-all duration-700 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex flex-col h-full hover:-translate-y-1">
                                {/* Regal Corner Ornaments */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37]/60 m-3 z-20 pointer-events-none"></div>
                                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d4af37]/60 m-3 z-20 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#d4af37]/60 m-3 z-20 pointer-events-none"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37]/60 m-3 z-20 pointer-events-none"></div>

                                {/* Soft Glow */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none z-10 transition-opacity duration-700 group-hover:opacity-100 opacity-50"></div>

                                <div className="relative h-56 sm:h-64 lg:h-[350px] w-full bg-[#fdfbf7] shrink-0 overflow-hidden flex items-center justify-center p-6 sm:p-8 border-b border-[#d4af37]/30">
                                    {/* Inner vignette for product */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.05)_100%)] pointer-events-none z-10"></div>
                                    <Image
                                        src={displayProducts[0].image}
                                        alt={displayProducts[0].name}
                                        fill
                                        className="object-contain p-2 sm:p-8 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-2xl z-0"
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                    />
                                </div>

                                <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center p-6 lg:p-12">
                                    <span className="text-[10px] font-bold tracking-[4px] text-[#ffd700] uppercase mb-2 sm:mb-4 opacity-80">
                                        ✦ Featured Selection ✦
                                    </span>
                                    <h3 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#fef5e7] mb-1 sm:mb-2 font-heading drop-shadow-md group-hover:text-[#ffd700] transition-colors duration-500">{displayProducts[0].name}</h3>
                                    <p className="text-[#d4af37] text-[10px] sm:text-sm lg:text-base italic mb-3 sm:mb-6 font-heading tracking-wide">~ {displayProducts[0].origin} ~</p>
                                    <p className="text-[#e6d5c3]/70 font-light leading-relaxed text-[11px] sm:text-sm lg:text-base mb-4 sm:mb-8 line-clamp-2 max-w-md mx-auto">{displayProducts[0].description}</p>

                                    <div className="mt-auto px-4 sm:px-6 py-2 border border-[#d4af37]/40 text-[#ffd700] text-[10px] sm:text-xs font-bold uppercase tracking-[2px] rounded-full group-hover:bg-[#d4af37]/10 transition-colors duration-300">
                                        Uncover Legacy
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Secondary Items (Right Stack/Row) */}
                        <div className="lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col gap-3 sm:gap-5 lg:gap-12 mt-2 lg:mt-0">

                            {/* Product 2 */}
                            <div className="flex-1 relative group flex">
                                {/* Decorative Dotted Frame (Outer) */}
                                <div className="absolute inset-[-10px] border-[2px] border-[#d4af37] border-dashed rounded-[20px] opacity-40 z-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>

                                <Link href={`/products/${displayProducts[1].id}`} className="relative z-10 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-[1px] border-[#d4af37]/40 shadow-[0_20px_60px_rgba(107,10,9,0.12)] transition-all duration-700 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row h-full hover:-translate-y-1">
                                    {/* Decorative Lines */}
                                    <div className="absolute top-2 left-2 bottom-2 right-2 border border-[#d4af37]/10 pointer-events-none z-20 transition-colors group-hover:border-[#d4af37]/30"></div>

                                    <div className="relative w-full sm:w-2/5 h-28 sm:h-auto bg-[#fdfbf7] shrink-0 border-b sm:border-b-0 sm:border-r border-[#d4af37]/30 p-2 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] pointer-events-none z-10"></div>
                                        <Image
                                            src={displayProducts[1].image}
                                            alt={displayProducts[1].name}
                                            fill
                                            className="object-contain p-2 sm:p-6 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-xl align-middle"
                                            sizes="(max-width: 640px) 100vw, 20vw"
                                        />
                                    </div>
                                    <div className="flex-1 p-3 sm:p-6 lg:p-8 relative flex flex-col justify-center items-center sm:items-start text-center sm:text-left z-30">
                                        <span className="text-[8px] sm:text-[9px] font-bold tracking-[3px] text-[#ffd700] uppercase mb-1 sm:mb-2 opacity-80">{displayProducts[1].origin}</span>
                                        <h3 className="text-base sm:text-2xl font-bold text-[#fef5e7] mb-1 sm:mb-2 font-heading group-hover:text-[#ffd700] transition-colors">{displayProducts[1].name}</h3>
                                        <p className="text-[#e6d5c3]/60 font-light text-[10px] sm:text-sm leading-relaxed line-clamp-1 sm:line-clamp-2 mb-3 sm:mb-6">{displayProducts[1].description}</p>
                                        <div className="mt-auto flex items-center text-[#d4af37] text-[9px] sm:text-[10px] font-bold uppercase tracking-[2px] group-hover:text-[#ffd700] transition-colors">
                                            <span className="border-b border-transparent group-hover:border-[#ffd700] pb-0.5 transition-all duration-300">View Details</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Product 3 */}
                            <div className="flex-1 relative group flex">
                                {/* Decorative Dotted Frame (Outer) */}
                                <div className="absolute inset-[-10px] border-[2px] border-[#d4af37] border-dashed rounded-[20px] opacity-40 z-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"></div>

                                <Link href={`/products/${displayProducts[2].id}`} className="relative z-10 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-[1px] border-[#d4af37]/40 shadow-[0_20px_60px_rgba(107,10,9,0.12)] transition-all duration-700 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex flex-col sm:flex-row h-full hover:-translate-y-1">
                                    {/* Decorative Lines */}
                                    <div className="absolute top-2 left-2 bottom-2 right-2 border border-[#d4af37]/10 pointer-events-none z-20 transition-colors group-hover:border-[#d4af37]/30"></div>

                                    <div className="flex-1 p-3 sm:p-6 lg:p-8 relative flex flex-col justify-center items-center sm:items-end text-center sm:text-right z-30 order-2 sm:order-1 border-t sm:border-t-0 sm:border-r border-[#d4af37]/30">
                                        <span className="text-[8px] sm:text-[9px] font-bold tracking-[3px] text-[#ffd700] uppercase mb-1 sm:mb-2 opacity-80">{displayProducts[2].origin}</span>
                                        <h3 className="text-base sm:text-2xl font-bold text-[#fef5e7] mb-1 sm:mb-2 font-heading group-hover:text-[#ffd700] transition-colors">{displayProducts[2].name}</h3>
                                        <p className="text-[#e6d5c3]/60 font-light text-[10px] sm:text-sm leading-relaxed line-clamp-1 sm:line-clamp-2 mb-3 sm:mb-6">{displayProducts[2].description}</p>
                                        <div className="mt-auto flex items-center text-[#d4af37] text-[9px] sm:text-[10px] font-bold uppercase tracking-[2px] group-hover:text-[#ffd700] transition-colors">
                                            <span className="border-b border-transparent group-hover:border-[#ffd700] pb-0.5 transition-all duration-300">View Details</span>
                                        </div>
                                    </div>
                                    <div className="relative w-full sm:w-2/5 h-28 sm:h-auto bg-[#fdfbf7] shrink-0 order-1 sm:order-2 p-2 flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] pointer-events-none z-10"></div>
                                        <Image
                                            src={displayProducts[2].image}
                                            alt={displayProducts[2].name}
                                            fill
                                            className="object-contain p-2 sm:p-6 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] drop-shadow-xl align-middle"
                                            sizes="(max-width: 640px) 100vw, 20vw"
                                        />
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-4 lg:mt-12 text-center relative z-10 flex flex-col items-center px-4 w-full">
                    <div className="mt-4 text-[#8b6914] text-base sm:text-lg font-heading italic">
                        Experience our exclusive collection of 3 heritage specialties
                    </div>
                </div>
            </div>
        </section >
    );
};
