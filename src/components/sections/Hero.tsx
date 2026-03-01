'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
    const scrollToEarlyAccess = () => {
        const el = document.getElementById('early-access');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[70vh] flex items-center justify-center pt-16 pb-12 overflow-hidden bg-[#2b0202] border-b-[6px] border-[#d4af37]">

            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/herobackground.png"
                    alt="Royal Texture"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#4a0404]/80 via-[#2b0202]/60 to-[#2b0202]"></div>

                {/* Glowing Orbs for Luxury Feel */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(128,0,32,0.3)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">

                {/* Left: Royal Typography & CTA */}
                <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6">

                    {/* Badge */}
                    <div className="flex justify-center lg:justify-start">
                        <div className="inline-flex items-center gap-3 bg-black/40 border border-[#d4af37]/40 backdrop-blur-md px-5 py-2 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.1)]">
                            <span className="text-[#ffd700] text-sm md:text-base">✨</span>
                            <span className="text-[#fef5e7] text-sm md:text-base font-bold tracking-[3px] uppercase font-heading">
                                The Essence of Royal India
                            </span>
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-6xl md:text-[80px] font-black leading-[1.05] text-[#fef5e7] font-heading drop-shadow-xl">
                            Taste the <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#b8860b]">
                                Royal Legacy
                            </span>
                        </h1>
                        <p className="text-[#e6d5c3] text-lg sm:text-xl md:text-2xl font-body font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Embark on a culinary journey through time. We deliver forgotten regional delicacies, crafted by master artisans, straight to your grand dining table.
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center lg:items-start gap-6">
                        <Button
                            size="lg"
                            onClick={scrollToEarlyAccess}
                            className="group relative overflow-hidden bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] border-none font-bold text-lg px-10 py-4 h-auto rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Claim Early Access
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Button>

                        <div className="flex items-center gap-4 text-[#e6d5c3] font-medium">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af37]/30 bg-black/20 backdrop-blur-sm">
                                🔒
                            </span>
                            <span className="text-sm tracking-wide">Invite Only<br />Waitlist</span>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#d4af37]/20 max-w-2xl mx-auto lg:mx-0">
                        <div className="text-center lg:text-left space-y-1">
                            <span className="block text-[#ffd700] font-black text-2xl md:text-3xl font-heading">100%</span>
                            <span className="block text-[#e6d5c3]/70 text-[10px] sm:text-xs uppercase tracking-widest font-bold">Authentic</span>
                        </div>
                        <div className="text-center lg:text-left space-y-1 border-l border-[#d4af37]/20 pl-4">
                            <span className="block text-[#ffd700] font-black text-2xl md:text-3xl font-heading">Zero</span>
                            <span className="block text-[#e6d5c3]/70 text-[10px] sm:text-xs uppercase tracking-widest font-bold">Preservatives</span>
                        </div>
                        <div className="text-center lg:text-left space-y-1 border-l border-[#d4af37]/20 pl-4">
                            <span className="block text-[#ffd700] font-black text-2xl md:text-3xl font-heading">Pure</span>
                            <span className="block text-[#e6d5c3]/70 text-[10px] sm:text-xs uppercase tracking-widest font-bold">Ingredients</span>
                        </div>
                    </div>

                </div>

                {/* Right: The Grand Royal Platter */}
                <div className="lg:col-span-6 xl:col-span-5 relative h-full min-h-[450px] flex items-center justify-center mt-8 lg:mt-0">

                    {/* Elaborate Framing */}
                    <div className="relative w-full aspect-square max-w-[500px]">

                        {/* Outer Dashed Orbit */}
                        <div className="absolute inset-[-10%] border border-[#d4af37]/30 border-dashed rounded-full animate-[spin_60s_linear_infinite]"></div>

                        {/* Inner Glowing Ring */}
                        <div className="absolute inset-[-2%] border-2 border-[#d4af37]/50 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.2)]"></div>

                        {/* Main Image Container */}
                        <div className="absolute inset-0 rounded-full overflow-hidden border-[12px] border-[#4a0404] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 group">
                            <Image
                                src="/swaaddesh.png"
                                alt="Authentic Indian Food Spread"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out origin-center"
                                priority
                            />
                            {/* Inner Royal Vignette */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(43,2,2,0.6)_100%)] pointer-events-none"></div>
                        </div>

                        {/* Floating Floating Badges */}
                        <div className="absolute top-[10%] -left-[10%] z-20 bg-gradient-to-br from-[#ffffff] to-[#fffcf5] p-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3)] border border-[#d4af37]/30 animate-[float_4s_ease-in-out_infinite] backdrop-blur-md">
                            <div className="flex items-center gap-3 border border-[#d4af37]/20 rounded-xl px-4 py-2 bg-white/50">
                                <span className="text-2xl">🌶️</span>
                                <span className="font-bold text-[#4a0404] text-sm uppercase tracking-wider font-heading">Rich Spices</span>
                            </div>
                        </div>

                        <div className="absolute bottom-[20%] -right-[5%] z-20 bg-gradient-to-br from-[#ffffff] to-[#fffcf5] p-3 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3)] border border-[#d4af37]/30 animate-[float_5s_ease-in-out_infinite_alternate] backdrop-blur-md">
                            <div className="flex items-center gap-3 border border-[#d4af37]/20 rounded-xl px-4 py-2 bg-white/50">
                                <span className="text-2xl">🍯</span>
                                <span className="font-bold text-[#4a0404] text-sm uppercase tracking-wider font-heading">100% Natural</span>
                            </div>
                        </div>

                        {/* Bottom Center Seal */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-b from-[#d4af37] to-[#8b6914] w-[90px] h-[90px] rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.4)] border-4 border-[#2b0202]">
                            <svg className="w-8 h-8 text-[#2b0202]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};
