'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Sparkles, Lock, ArrowRight } from 'lucide-react';

export const Hero = () => {
    const scrollToEarlyAccess = () => {
        const el = document.getElementById('early-access');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-4 sm:pt-28 sm:pb-10 lg:pt-32 overflow-hidden bg-[#2b0202] border-b-[6px] border-[#d4af37]">

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
                        <div className="inline-flex items-center gap-2 sm:gap-3 bg-black/40 border border-[#d4af37]/40 backdrop-blur-md px-4 py-1.5 sm:px-5 sm:py-2 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.1)] max-w-full">
                            <Sparkles className="w-4 h-4 text-[#ffd700]" strokeWidth={1.5} />
                            <span className="text-[#fef5e7] text-[10px] xs:text-xs sm:text-sm md:text-base font-bold tracking-[2px] sm:tracking-[3px] uppercase font-heading whitespace-nowrap">
                                Taste Your Roots
                            </span>
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-6xl md:text-[80px] font-black leading-[1.1] md:leading-[1.05] text-[#fef5e7] font-heading drop-shadow-xl">
                            Taste the <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#b8860b]">
                                Royal Legacy
                            </span>
                        </h1>
                        <p className="text-[#e6d5c3] text-[13px] sm:text-lg lg:text-xl xl:text-2xl font-body font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            From the nostalgic flavors of home to hidden regional gems—we bring back the authentic traditions and familiar feelings you've been searching for.
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center sm:justify-center lg:justify-start lg:items-start gap-6">
                        <Button
                            size="lg"
                            onClick={scrollToEarlyAccess}
                            className="group relative overflow-hidden bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] border-none font-bold text-lg px-10 py-4 h-auto rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.5)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Claim Early Access
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Button>

                        <div className="flex items-center gap-4 text-[#e6d5c3] font-medium">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af37]/30 bg-black/20 backdrop-blur-sm text-[#ffd700]">
                                <Lock className="w-4 h-4" strokeWidth={1.5} />
                            </span>
                            <span className="text-sm tracking-wide whitespace-nowrap">Invite Only Waitlist</span>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#d4af37]/20 max-w-2xl mx-auto lg:mx-0">
                        <div className="text-center lg:text-left space-y-1">
                            <span className="block text-[#ffd700] font-black text-xl sm:text-2xl md:text-3xl font-heading">100%</span>
                            <span className="block text-[#e6d5c3]/70 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-widest font-bold">Authentic</span>
                        </div>
                        <div className="text-center lg:text-left space-y-1 border-l border-[#d4af37]/20 pl-2 sm:pl-4">
                            <span className="block text-[#ffd700] font-black text-xl sm:text-2xl md:text-3xl font-heading">Zero</span>
                            <span className="block text-[#e6d5c3]/70 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-widest font-bold">Preservatives</span>
                        </div>
                        <div className="text-center lg:text-left space-y-1 border-l border-[#d4af37]/20 pl-2 sm:pl-4">
                            <span className="block text-[#ffd700] font-black text-xl sm:text-2xl md:text-3xl font-heading">Pure</span>
                            <span className="block text-[#e6d5c3]/70 text-[8px] sm:text-[10px] md:text-xs uppercase tracking-widest font-bold">Ingredients</span>
                        </div>
                    </div>

                </div>

                {/* Right: The Grand Royal Platter */}
                <div className="lg:col-span-6 xl:col-span-5 relative h-full min-h-[350px] sm:min-h-[450px] flex items-center justify-center -mt-6 lg:mt-0">

                    {/* Elaborate Framing */}
                    <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] mx-auto">

                        {/* Outer Dashed Orbit */}
                        <div className="absolute inset-[-10%] border border-[#d4af37]/30 border-dashed rounded-full animate-[spin_60s_linear_infinite]"></div>

                        {/* Inner Glowing Ring */}
                        <div className="absolute inset-[-2%] border-2 border-[#d4af37]/50 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.2)]"></div>

                        {/* Main Image Container */}
                        <div className="absolute inset-0 rounded-full overflow-hidden border-[12px] border-[#4a0404] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 group">
                            <Image
                                src="/swaddesh.png"
                                alt="Authentic Indian Food Spread"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out origin-center"
                                priority
                            />
                            {/* Inner Royal Vignette */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(43,2,2,0.6)_100%)] pointer-events-none"></div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};
