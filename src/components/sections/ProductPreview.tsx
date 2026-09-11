'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Crown, Sparkles, Lock, Unlock, ArrowRight, CheckCircle2, Store } from 'lucide-react';
import { FoundingMember } from '@/types/foundingMember';

export const ProductPreview = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [member, setMember] = useState<FoundingMember | null>(null);

    useEffect(() => {
        // 1. Initial check from localStorage
        const checkMembership = () => {
            try {
                const stored = localStorage.getItem('swaddesh_member_data');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    if (parsed && (parsed.email || parsed.referral_code)) {
                        setMember(parsed);
                        setIsUnlocked(true);
                        return;
                    }
                }
            } catch (e) {
                // Ignore parse errors
            }
            setIsUnlocked(false);
            setMember(null);
        };

        checkMembership();

        // 2. Listen for custom event triggered when user registers/logs in
        const handleMemberUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail && (customEvent.detail.email || customEvent.detail.referral_code)) {
                setMember(customEvent.detail);
                setIsUnlocked(true);
            } else {
                checkMembership();
            }
        };

        window.addEventListener('swaddesh_member_updated', handleMemberUpdate);
        window.addEventListener('storage', checkMembership);

        return () => {
            window.removeEventListener('swaddesh_member_updated', handleMemberUpdate);
            window.removeEventListener('storage', checkMembership);
        };
    }, []);

    const scrollToEarlyAccess = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById('early-access');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section id="products" className="relative border-b-[4px] border-[#d4af37] pt-8 pb-12 lg:pt-16 lg:pb-20 overflow-hidden z-10 bg-[#fffcf5]">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[40px] bg-gradient-to-b from-[#d4af37] to-transparent opacity-40"></div>

                {/* Section Header */}
                <div className="text-center mb-8 lg:mb-12 space-y-4 relative z-10">
                    <div className="flex justify-center">
                        {isUnlocked ? (
                            <span className="inline-flex items-center gap-2 font-bold text-[#1b7e3b] uppercase tracking-[2px] mb-2 px-4 py-1.5 bg-[#e8f5e9] rounded-full border border-[#a5d6a7] text-xs sm:text-sm shadow-sm animate-pulse">
                                <Unlock className="w-4 h-4 text-[#1b7e3b]" /> Early Access Unlocked • Heritage Vault
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2 font-bold text-[#8f0f0d] uppercase tracking-[2px] mb-2 px-4 py-2 bg-[#8f0f0d]/5 rounded-full border border-[#8f0f0d]/10 text-xs sm:text-sm">
                                <Crown className="w-4 h-4" strokeWidth={1.5} /> The Heritage Vault
                            </span>
                        )}
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-[#4a0404] font-heading leading-tight max-w-4xl mx-auto drop-shadow-sm mt-2">
                        {isUnlocked ? (
                            <>
                                Revealed <i className="text-[#8f0f0d] font-light">Delicacies</i>
                            </>
                        ) : (
                            <>
                                Hidden <i className="text-[#8f0f0d] font-light">Delicacies</i>
                            </>
                        )}
                    </h2>

                    <div className="flex items-center justify-center gap-4 py-2">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <div className="w-2 h-2 rotate-45 bg-[#ffd700]"></div>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>

                    <p className="text-[#8b6914] text-base sm:text-lg lg:text-xl font-heading italic max-w-3xl mx-auto px-4">
                        {isUnlocked ? (
                            <span>
                                Welcome <strong className="text-[#4a0404] not-italic">{member?.name || 'Founding Patron'}</strong>! Your Early Access has unlocked the secret inaugural batch selections handcrafted by our generational master artisans.
                            </span>
                        ) : (
                            'Authentic generational recipes being prepared by historic master artisans. Join waitlist to see the products and uncover their master vendors.'
                        )}
                    </p>
                </div>

                {/* Main Cards Grid */}
                <div className="max-w-5xl mx-auto relative z-10">
                    {isUnlocked ? (
                        /* ================= REVEALED PRODUCTS (FOR MEMBERS) ================= */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in zoom-in-95 duration-500">
                            
                            {/* Revealed Product 1: Rajasthani Lehsun Chutney */}
                            <div className="relative group bg-white rounded-2xl border-2 border-[#d4af37] shadow-[0_15px_40px_rgba(107,10,9,0.08)] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(212,175,55,0.25)] flex flex-col">
                                <div className="relative aspect-square sm:aspect-[4/3] w-full bg-[#fdfbf7] overflow-hidden border-b border-[#d4af37]/30">
                                    <Image
                                        src="/products/lehsun_chutney.jpg"
                                        alt="Rajasthani Lehsun Chutney by Vijaylal Aachar Wale"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute top-3 left-3 bg-[#2b0202]/90 backdrop-blur-sm border border-[#d4af37]/60 text-[#ffd700] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                                        <span>100ml Glass Jar • Jaipur</span>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-[#e8f5e9] border border-[#a5d6a7] text-[#1b7e3b] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Unlocked</span>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-xs text-[#8b6914] font-semibold">
                                            <span>Origin: Jaipur, Rajasthan</span>
                                            <span>Packaging: 100ml Glass Jar</span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#4a0404] leading-tight">
                                            Rajasthani Lehsun Chutney
                                        </h3>

                                        {/* Specified Vendor Badge */}
                                        <div className="bg-gradient-to-r from-[#fef5e7] to-[#fff9e6] border border-[#d4af37]/60 rounded-xl p-3.5 flex items-start gap-3 shadow-inner">
                                            <div className="w-8 h-8 rounded-full bg-[#8f0f0d] flex items-center justify-center flex-shrink-0 text-white shadow-sm mt-0.5">
                                                <Store className="w-4 h-4 text-[#ffd700]" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="text-[11px] uppercase tracking-wider font-bold text-[#8b6914]">
                                                    Master Heritage Vendor
                                                </div>
                                                <div className="text-sm sm:text-base font-bold font-heading text-[#8f0f0d]">
                                                    Vijaylal Aachar Wale, Jaipur
                                                </div>
                                                <p className="text-xs text-[#5d4037] leading-relaxed pt-0.5">
                                                    Stone-pounded pungent native garlic blended with sun-dried Mathania red chilies & pure cold-pressed mustard oil.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-[#d4af37]/20 flex items-center justify-between">
                                        <span className="text-xs text-[#8b6914] font-medium italic">
                                            Inaugural Batch Allocation
                                        </span>
                                        <Link
                                            href="/products/lehsun-chutney"
                                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8f0f0d] hover:text-[#4a0404] transition-colors group/btn"
                                        >
                                            <span>View Heritage Story</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Revealed Product 2: Royal Mohanthal (Moongthal) */}
                            <div className="relative group bg-white rounded-2xl border-2 border-[#d4af37] shadow-[0_15px_40px_rgba(107,10,9,0.08)] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(212,175,55,0.25)] flex flex-col">
                                <div className="relative aspect-square sm:aspect-[4/3] w-full bg-[#fdfbf7] overflow-hidden border-b border-[#d4af37]/30">
                                    <Image
                                        src="/products/mohanthal.jpg"
                                        alt="Royal Mohanthal by Sondhya Halwai"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute top-3 left-3 bg-[#2b0202]/90 backdrop-blur-sm border border-[#d4af37]/60 text-[#ffd700] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                                        <Crown className="w-3.5 h-3.5 text-[#ffd700]" />
                                        <span>Royal Gift Box • Rajasthan</span>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-[#e8f5e9] border border-[#a5d6a7] text-[#1b7e3b] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        <span>Unlocked</span>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-xs text-[#8b6914] font-semibold">
                                            <span>Origin: Rajasthan</span>
                                            <span>Packaging: Royal SwadDesh Box</span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#4a0404] leading-tight">
                                            Royal Mohanthal (Moongthal)
                                        </h3>

                                        {/* Specified Vendor Badge */}
                                        <div className="bg-gradient-to-r from-[#fef5e7] to-[#fff9e6] border border-[#d4af37]/60 rounded-xl p-3.5 flex items-start gap-3 shadow-inner">
                                            <div className="w-8 h-8 rounded-full bg-[#8f0f0d] flex items-center justify-center flex-shrink-0 text-white shadow-sm mt-0.5">
                                                <Store className="w-4 h-4 text-[#ffd700]" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="text-[11px] uppercase tracking-wider font-bold text-[#8b6914]">
                                                    Master Heritage Confectioner
                                                </div>
                                                <div className="text-sm sm:text-base font-bold font-heading text-[#8f0f0d]">
                                                    Sondhya Halwai
                                                </div>
                                                <p className="text-xs text-[#5d4037] leading-relaxed pt-0.5">
                                                    Slow-roasted golden grain simmered in pure A2 bilona cow ghee, infused with Kashmiri kesar, cardamom & pistachios.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-[#d4af37]/20 flex items-center justify-between">
                                        <span className="text-xs text-[#8b6914] font-medium italic">
                                            Inaugural Batch Allocation
                                        </span>
                                        <Link
                                            href="/products/mohanthal"
                                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8f0f0d] hover:text-[#4a0404] transition-colors group/btn"
                                        >
                                            <span>View Heritage Story</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : (
                        /* ================= COVERED / LOCKED CARDS (BEFORE JOINING) ================= */
                        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
                            
                            {/* Mystery Card 1 */}
                            <div className="relative group cursor-pointer" onClick={scrollToEarlyAccess}>
                                <div className="absolute inset-[-6px] border border-[#d4af37]/30 border-dashed rounded-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-80"></div>
                                <div className="relative z-10 aspect-[4/5] rounded-xl bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-2 border-[#d4af37]/40 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-700 group-hover:shadow-[0_20px_60px_rgba(212,175,55,0.25)] group-hover:-translate-y-1.5 p-4">
                                    <div className="absolute inset-0 bg-[#000]/30 group-hover:bg-[#000]/10 transition-colors duration-700"></div>
                                    <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4af37 0.75px, transparent 0.75px)', backgroundSize: '15px 15px' }}></div>
                                    
                                    <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d4af37]/15 flex items-center justify-center mb-3 sm:mb-4 border border-[#d4af37]/30 group-hover:scale-110 group-hover:bg-[#d4af37]/25 transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                        <Lock className="text-[#ffd700] w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                                    </div>
                                    
                                    <div className="relative z-20 h-[1px] w-12 bg-[#d4af37]/50 mb-3 group-hover:w-24 transition-all duration-500"></div>
                                    
                                    <div className="relative z-20 text-[#ffd700] text-[10px] sm:text-xs uppercase font-bold tracking-[2px] sm:tracking-[3px] font-heading">
                                        Secret Relish Selection
                                    </div>
                                    <div className="relative z-20 text-[#e6d5c3]/70 text-[9px] sm:text-[11px] mt-1 italic">
                                        Jaipur Artisanal Treasure
                                    </div>
                                    <div className="relative z-20 mt-3 sm:mt-5 bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#2b0202] rounded-full px-3 sm:px-4 py-1.5 text-[9px] sm:text-xs font-black tracking-wide shadow-md group-hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] group-hover:scale-105 transition-all flex items-center gap-1.5">
                                        <Lock className="w-3 h-3 text-[#2b0202] flex-shrink-0" />
                                        <span>Join waitlist to see the products</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mystery Card 2 */}
                            <div className="relative group cursor-pointer" onClick={scrollToEarlyAccess}>
                                <div className="absolute inset-[-6px] border border-[#d4af37]/30 border-dashed rounded-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-80"></div>
                                <div className="relative z-10 aspect-[4/5] rounded-xl bg-gradient-to-br from-[#2b0202] to-[#4a0404] border-2 border-[#d4af37]/40 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-700 group-hover:shadow-[0_20px_60px_rgba(212,175,55,0.25)] group-hover:-translate-y-1.5 p-4">
                                    <div className="absolute inset-0 bg-[#000]/30 group-hover:bg-[#000]/10 transition-colors duration-700"></div>
                                    <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4af37 0.75px, transparent 0.75px)', backgroundSize: '15px 15px' }}></div>
                                    
                                    <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d4af37]/15 flex items-center justify-center mb-3 sm:mb-4 border border-[#d4af37]/30 group-hover:scale-110 group-hover:bg-[#d4af37]/25 transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                        <Lock className="text-[#ffd700] w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                                    </div>
                                    
                                    <div className="relative z-20 h-[1px] w-12 bg-[#d4af37]/50 mb-3 group-hover:w-24 transition-all duration-500"></div>
                                    
                                    <div className="relative z-20 text-[#ffd700] text-[10px] sm:text-xs uppercase font-bold tracking-[2px] sm:tracking-[3px] font-heading">
                                        Royal Confection Selection
                                    </div>
                                    <div className="relative z-20 text-[#e6d5c3]/70 text-[9px] sm:text-[11px] mt-1 italic">
                                        Generational Halwai Recipe
                                    </div>
                                    <div className="relative z-20 mt-3 sm:mt-5 bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-[#2b0202] rounded-full px-3 sm:px-4 py-1.5 text-[9px] sm:text-xs font-black tracking-wide shadow-md group-hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] group-hover:scale-105 transition-all flex items-center gap-1.5">
                                        <Lock className="w-3 h-3 text-[#2b0202] flex-shrink-0" />
                                        <span>Join waitlist to see the products</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                {/* Footer Banner Underneath Cards */}
                <div className="mt-8 lg:mt-12 text-center relative z-10 max-w-xl mx-auto">
                    {isUnlocked ? (
                        <div className="bg-[#2b0202] text-[#ffd700] p-4 sm:p-5 rounded-2xl border border-[#d4af37]/50 shadow-lg space-y-1">
                            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider font-heading flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#ffd700]" />
                                <span>Founding Patron Privilege Unlocked</span>
                            </p>
                            <p className="text-[11px] sm:text-xs text-[#e6d5c3]/80 leading-relaxed font-light">
                                As an Early Access patron, your spot for inaugural batch dispatches from <strong>Vijaylal Aachar Wale</strong> &amp; <strong>Sondhya Halwai</strong> is prioritized.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-[#8f0f0d] text-sm sm:text-base font-heading font-bold">
                                Secret inaugural delicacies are hidden in the vault
                            </p>
                            <button
                                onClick={scrollToEarlyAccess}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5bd3d] hover:to-[#c99710] text-[#2b0202] px-6 sm:px-8 py-3.5 rounded-full font-black uppercase tracking-wider text-xs sm:text-sm shadow-xl hover:scale-105 transition-all cursor-pointer border-2 border-[#ffd700]"
                            >
                                <Unlock className="w-4 h-4" />
                                <span>Join waitlist to see the products →</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
