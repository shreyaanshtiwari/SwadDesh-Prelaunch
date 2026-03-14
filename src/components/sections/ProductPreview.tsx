import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Crown, Sparkles, ChefHat, MapPin } from 'lucide-react';

export const ProductPreview = () => {
    const categories = [
        { title: "The Royal Sweets", region: "Benaras & Lucknow", icon: <Crown className="w-6 h-6" /> },
        { title: "Sacred Ghee", region: "The Braj Foundation", icon: <Sparkles className="w-6 h-6" /> },
        { title: "Ancestral Pickles", region: "Mithila Regions", icon: <ChefHat className="w-6 h-6" /> },
        { title: "Sun-Dried Spices", region: "Rajasthan Deserts", icon: <MapPin className="w-6 h-6" /> },
    ];

    return (
        <section id="products" className="relative border-b-[4px] border-[#d4af37] pt-10 pb-16 lg:pt-24 lg:pb-24 overflow-hidden z-10 bg-[#fffcf5]">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-[#d4af37] to-transparent"></div>

                <div className="text-center mb-12 lg:mb-20 space-y-4 relative z-10">
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-2 font-bold text-[#8f0f0d] uppercase tracking-[2px] mb-2 px-4 py-2 bg-[#8f0f0d]/5 rounded-full border border-[#8f0f0d]/10 text-sm">
                            <Crown className="w-4 h-4" strokeWidth={1.5} /> The Heritage Vault
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-[64px] font-black text-[#4a0404] font-heading leading-tight max-w-4xl mx-auto drop-shadow-sm mt-4">
                        Discover Bharat's <i className="text-[#8f0f0d] font-light">Hidden Gems</i>
                    </h2>
                    <div className="flex items-center justify-center gap-4 py-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <div className="w-2 h-2 rotate-45 bg-[#ffd700]"></div>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>
                    <p className="text-[#8b6914] text-lg sm:text-xl lg:text-2xl font-heading italic max-w-3xl mx-auto px-4">
                        Our master artisans are currently reviving hundreds of lost recipes. We don't just sell products; we bring back legacies.
                    </p>
                </div>

                {/* Expansive Heritage Grid */}
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        
                        {/* Interactive Mystery Cards */}
                        {categories.map((cat, idx) => (
                            <div key={idx} className="relative group perspective">
                                <div className="absolute inset-[-4px] border border-[#d4af37]/20 border-dashed rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 h-[400px] rounded-xl bg-gradient-to-br from-[#2b0202] to-[#4a0404] border border-[#d4af37]/30 p-8 flex flex-col items-center justify-between text-center transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)] group-hover:-translate-y-2">
                                    
                                    {/* Locked Image Overlay */}
                                    <div className="absolute inset-0 bg-[#000]/40 group-hover:bg-transparent transition-colors duration-700 rounded-xl overflow-hidden flex items-center justify-center">
                                        <div className="w-full h-full bg-[#1a0101] flex items-center justify-center opacity-80 group-hover:opacity-0 transition-opacity duration-500 absolute inset-0">
                                            {/* Stylized Silhouette placeholder */}
                                            <div className="w-32 h-32 rounded-full border border-[#d4af37]/20 flex items-center justify-center">
                                              <Crown className="w-12 h-12 text-[#d4af37]/30" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative z-20 w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 border border-[#d4af37]/30 group-hover:bg-[#d4af37]/20 group-hover:scale-110 transition-all duration-500">
                                        <div className="text-[#ffd700]">{cat.icon}</div>
                                    </div>

                                    <div className="relative z-20 space-y-3">
                                        <span className="text-[10px] font-bold tracking-[4px] text-[#ffd700] uppercase opacity-70">✦ {cat.region} ✦</span>
                                        <h3 className="text-2xl font-bold text-[#fef5e7] font-heading group-hover:text-[#ffd700] transition-colors">{cat.title}</h3>
                                        <div className="h-[2px] w-8 bg-[#d4af37]/30 mx-auto group-hover:w-16 transition-all duration-500"></div>
                                    </div>

                                    <div className="relative z-20 w-full pt-6">
                                        <div className="text-[11px] tracking-[2px] text-[#e6d5c3]/60 uppercase font-black mb-4">Unlocking Soon</div>
                                        <div className="bg-[#d4af37]/10 border border-[#d4af37]/20 py-2 px-4 rounded-full text-[#ffd700] text-[10px] uppercase font-bold tracking-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            Stay Tuned
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Large Reveal Banner - Infinite Possibilities */}
                        <div className="lg:col-span-4 mt-8">
                            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2b0202] via-[#4a0404] to-[#2b0202] border border-[#d4af37]/40 shadow-2xl"></div>
                                
                                {/* Background Patterns */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
                                
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 lg:p-12 z-10">
                                    <div className="text-[#ffd700] flex items-center gap-3 mb-4">
                                        <Sparkles className="w-5 h-5 sm:w-6 h-6 animate-pulse" />
                                        <span className="text-xs sm:text-sm font-bold tracking-[5px] uppercase">The Collection is Growing</span>
                                        <Sparkles className="w-5 h-5 sm:w-6 h-6 animate-pulse" />
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fef5e7] mb-6 font-heading">Missing a taste from your <i className="text-[#ffd700] font-light">Ancestry?</i></h3>
                                    <p className="max-w-3xl text-sm sm:text-base lg:text-lg text-[#e6d5c3]/80 mb-8 font-heading italic">
                                        "From the deserts of Jaisalmer to the hills of Munnar—we are scouring the length and breadth of Bharat."
                                    </p>
                                    
                                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                                        <span className="px-5 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#ffd700] text-[10px] sm:text-xs font-bold uppercase tracking-[2px]">300+ Recipes in R&D</span>
                                        <span className="px-5 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#ffd700] text-[10px] sm:text-xs font-bold uppercase tracking-[2px]">50+ Master Artisans</span>
                                        <span className="px-5 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#ffd700] text-[10px] sm:text-xs font-bold uppercase tracking-[2px]">A Billion Memories</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 lg:mt-24 text-center relative z-10 flex flex-col items-center px-4 w-full">
                    <p className="text-[#8f0f0d] text-lg sm:text-xl font-heading font-black tracking-[1px] uppercase border-b border-[#8f0f0d]/30 pb-2">
                        Something Royal is Simmering.
                    </p>
                </div>
            </div>
        </section >
    );
};
