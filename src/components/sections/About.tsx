import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';

export const About = () => {
    return (
        <Section id="about" className="py-28 relative overflow-hidden border-b-[4px] border-[#d4af37]">
            {/* Soft decorative background elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(128,0,32,0.04)_0%,transparent_70%)] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

                    {/* Left: Royal Typography & Content */}
                    <div className="space-y-8 order-2 lg:order-1 relative">
                        {/* Decorative watermark */}
                        <div className="absolute top-[-40px] left-0 text-[180px] text-[#d4af37] opacity-[0.06] font-heading select-none pointer-events-none leading-none">
                            S
                        </div>

                        <div className="space-y-5 relative z-10">
                            <span className="inline-block text-[#b8860b] font-bold tracking-[4px] uppercase text-sm border-b border-[#d4af37]/40 pb-2">
                                The Royal Legacy
                            </span>
                            <h2 className="text-[48px] lg:text-[60px] font-black text-[#4a0404] font-heading leading-tight drop-shadow-sm">
                                A Heritage of <br />
                                <i className="text-[#800020] font-light">Endless Flavors</i>
                            </h2>
                            <div className="royal-separator !ml-0"></div>
                        </div>

                        <div className="space-y-6 text-[#5d4037] text-lg leading-relaxed font-body relative z-10">
                            <p className="text-[#4a0404] font-semibold text-xl italic font-heading">
                                "Preserving the culinary jewels of India's glorious past, meant to be experienced, not just tasted."
                            </p>
                            <p>
                                SwaadDesh was born from a profound nostalgia for majestic feasts. In a fast-paced modern world, the true essence of traditional delicacies is often lost. We journey across magnificent regions to uncover age-old recipes lost to time.
                            </p>
                            <p>
                                By sourcing only the finest native ingredients—exactly as they were used in royal kitchens centuries ago—and partnering exclusively with master local artisans, we ensure every bite connects you back to your deepest roots.
                            </p>
                        </div>

                        {/* Premium Badges */}
                        <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-[#e0c080]/60 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-[#d4af37] shadow-sm flex items-center justify-center">
                                    <span className="text-xl">👑</span>
                                </div>
                                <div>
                                    <span className="block font-heading font-bold text-[#4a0404] text-lg">Authentic</span>
                                    <span className="text-sm text-[#8b6914] uppercase tracking-widest text-[10px] font-bold">100% Traditional</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-[#d4af37] shadow-sm flex items-center justify-center">
                                    <span className="text-xl">🌿</span>
                                </div>
                                <div>
                                    <span className="block font-heading font-bold text-[#4a0404] text-lg">Pure</span>
                                    <span className="text-sm text-[#8b6914] uppercase tracking-widest text-[10px] font-bold">Native Ingredients</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Indian Arch Royal Visuals */}
                    <div className="relative h-[650px] w-full flex justify-center items-center order-1 lg:order-2">
                        {/* The Royal Arch (Mehrab style) */}
                        <div className="relative w-[85%] h-[90%] bg-gradient-to-br from-[#ffffff] to-[#fff8eb] p-4 rounded-t-full shadow-[0_20px_60px_rgba(107,10,9,0.12)] border border-[#d4af37]/40 z-10 group">

                            {/* Inner Arch Image */}
                            <div className="relative w-full h-full rounded-t-full overflow-hidden border-[6px] border-[#fef5e7] border-b-0 shadow-inner">
                                <Image
                                    src="/heritage_palace.png"
                                    alt="Majestic Indian Heritage Architecture"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#4a0404]/10 via-transparent to-[#4a0404]/80 opacity-60"></div>
                            </div>

                            {/* Decorative Arch Framing (outer) */}
                            <div className="absolute inset-[-15px] border-[2px] border-[#d4af37] border-dashed rounded-t-full opacity-40 rounded-b-xl z-0 pointer-events-none"></div>
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    );
};
