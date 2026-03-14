import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

export const ProductPreview = () => {
    return (
        <section id="products" className="relative border-b-[4px] border-[#d4af37] pt-8 pb-8 lg:pt-16 lg:pb-16 overflow-hidden z-10 bg-[#fffcf5]">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[40px] bg-gradient-to-b from-[#d4af37] to-transparent opacity-40"></div>

                <div className="text-center mb-8 lg:mb-12 space-y-4 relative z-10">
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-2 font-bold text-[#8f0f0d] uppercase tracking-[2px] mb-2 px-4 py-2 bg-[#8f0f0d]/5 rounded-full border border-[#8f0f0d]/10 text-xs sm:text-sm">
                            <Crown className="w-4 h-4" strokeWidth={1.5} /> The Heritage Vault
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#4a0404] font-heading leading-tight max-w-4xl mx-auto drop-shadow-sm mt-2">
                        Hidden <i className="text-[#8f0f0d] font-light">Delicacies</i>
                    </h2>
                    <div className="flex items-center justify-center gap-4 py-2">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <div className="w-2 h-2 rotate-45 bg-[#ffd700]"></div>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>
                    <p className="text-[#8b6914] text-base sm:text-lg lg:text-xl font-heading italic max-w-3xl mx-auto px-4">
                        Authentic flavors being perfected by our master artisans. Coming to your doorstep soon.
                    </p>
                </div>

                {/* Two Anonymous Mystery Cards */}
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
                        
                        {/* Mystery Card 1 */}
                        <div className="relative group">
                            <div className="absolute inset-[-6px] border border-[#d4af37]/30 border-dashed rounded-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"></div>
                            <div className="relative z-10 aspect-[4/5] rounded-xl bg-gradient-to-br from-[#2b0202] to-[#4a0404] border border-[#d4af37]/30 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-700 group-hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] group-hover:-translate-y-1">
                                <div className="absolute inset-0 bg-[#000]/20 group-hover:bg-transparent transition-colors duration-700"></div>
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}></div>
                                
                                <div className="relative z-20 w-20 h-20 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4 border border-[#d4af37]/20 group-hover:scale-110 transition-transform duration-500">
                                    <Sparkles className="text-[#ffd700] w-10 h-10" />
                                </div>
                                <div className="relative z-20 h-[1px] w-12 bg-[#d4af37]/40 mb-4 group-hover:w-20 transition-all duration-500"></div>
                                <div className="relative z-20 text-[#ffd700] text-[10px] uppercase font-bold tracking-[4px] opacity-60">Locked Selection</div>
                            </div>
                        </div>

                        {/* Mystery Card 2 */}
                        <div className="relative group">
                            <div className="absolute inset-[-6px] border border-[#d4af37]/30 border-dashed rounded-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"></div>
                            <div className="relative z-10 aspect-[4/5] rounded-xl bg-gradient-to-br from-[#2b0202] to-[#4a0404] border border-[#d4af37]/30 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-700 group-hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] group-hover:-translate-y-1">
                                <div className="absolute inset-0 bg-[#000]/20 group-hover:bg-transparent transition-colors duration-700"></div>
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}></div>
                                
                                <div className="relative z-20 w-20 h-20 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4 border border-[#d4af37]/20 group-hover:scale-110 transition-transform duration-500">
                                    <Crown className="text-[#ffd700] w-10 h-10" />
                                </div>
                                <div className="relative z-20 h-[1px] w-12 bg-[#d4af37]/40 mb-4 group-hover:w-20 transition-all duration-500"></div>
                                <div className="relative z-20 text-[#ffd700] text-[10px] uppercase font-bold tracking-[4px] opacity-60">Legacy Uncovering</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-12 lg:mt-16 text-center relative z-10">
                    <p className="inline-block text-[#8f0f0d] text-sm sm:text-base font-heading font-black tracking-[1px] uppercase border-b border-[#8f0f0d]/30 pb-1 animate-pulse">
                        Revealing Soon
                    </p>
                </div>
            </div>
        </section >
    );
};
