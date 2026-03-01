import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/sections/Footer';
import { productStories } from '@/data/products';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pre-launch Collection | SwaadDesh',
    description: 'Explore our authentic, handcrafted regional delicacies curated for the grand launch.',
};

export default function ProductsPage() {
    return (
        <main className="flex min-h-screen flex-col bg-[#fffcf5]">
            {/* Header/Navigation */}
            <header className="sticky top-0 z-50 w-full bg-[#8f0f0d] border-b border-[#d4af37]/30 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group relative z-10 hover:opacity-90 transition-opacity">
                        <div className="relative w-40 h-10">
                            <Image
                                src="/logo.png"
                                alt="SwaadDesh"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                    <Link href="/" className="text-[#ffd700] font-heading tracking-widest text-sm uppercase hover:text-white transition-colors flex items-center gap-2 border border-[#d4af37]/50 px-4 py-2 rounded-full hover:bg-white/10">
                        <span>←</span> Back to Home
                    </Link>
                </div>
            </header>

            {/* Page Hero - Matching Homepage Aesthetic */}
            <section className="relative min-h-[30vh] flex items-center justify-center py-12 overflow-hidden bg-[#2b0202] border-b-[6px] border-[#d4af37]">
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
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6 px-4">
                    {/* Badge */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-3 bg-black/40 border border-[#d4af37]/40 backdrop-blur-md px-5 py-2 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.1)]">
                            <span className="text-[#ffd700] text-sm md:text-base">✨</span>
                            <span className="text-[#fef5e7] text-sm md:text-base font-bold tracking-[3px] uppercase font-heading">
                                The Heritage Collection
                            </span>
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl md:text-[60px] font-black leading-[1.05] text-[#fef5e7] font-heading drop-shadow-xl">
                            Authentic Flavors, <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#b8860b]">
                                Reborn.
                            </span>
                        </h1>
                        <p className="text-[#e6d5c3] text-base sm:text-lg font-body font-light leading-relaxed max-w-2xl mx-auto">
                            Discover 10 carefully curated culinary jewels from across India, coming soon to your doorstep.
                        </p>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-24 px-4 relative z-10">
                {/* Decorative background lines */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-[#d4af37] to-transparent"></div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {productStories.map((product) => (
                            <Card key={product.id} className="group overflow-hidden rounded-[24px] border border-[#d4af37]/30 shadow-[0_15px_40px_rgba(107,10,9,0.08)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] hover:-translate-y-3 transition-all duration-500 bg-white flex flex-col p-0 relative">
                                {/* Elegant Corner accents */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] rounded-tl-[24px] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] rounded-tr-[24px] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>

                                <div className="relative h-80 overflow-hidden border-b border-[#d4af37]/20 bg-[#fdfbf7] p-8">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"></div>

                                    {/* Origin Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#8f0f0d] text-xs font-bold px-4 py-1.5 rounded-full border border-[#d4af37] shadow-lg font-heading tracking-widest uppercase flex items-center gap-2 z-10">
                                        <span>📍</span> {product.origin}
                                    </div>

                                    {/* Floating Tagline */}
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                        <p className="text-[#ffd700] font-heading italic text-lg leading-snug text-center font-medium drop-shadow-md">
                                            "{product.tagline}"
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Content Area */}
                                <div className="p-8 flex-1 flex flex-col bg-white relative z-20">
                                    <h3 className="text-3xl font-bold text-[#4a0404] mb-3 font-heading drop-shadow-sm group-hover:text-[#8f0f0d] transition-colors">{product.name}</h3>
                                    <p className="text-[#5d4037] flex-1 leading-relaxed text-sm mb-2">{product.description}</p>

                                    {/* Uncover the History Hint */}
                                    <div className="pt-4 mt-auto border-t border-[#d4af37]/20 flex items-center gap-2 text-[#8b6914] text-xs font-bold uppercase tracking-widest relative z-[60] w-max group-hover:opacity-0 transition-opacity duration-300">
                                        <span className="animate-pulse">📜</span> Hover to uncover legacy
                                    </div>
                                </div>

                                {/* Legacy Content Overlay - Now structurally positioned OVER the ENTIRE CARD based on full card hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2b0202] via-[#4a0404]/98 to-[#8f0f0d]/98 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-[100] p-8 flex flex-col justify-end text-[#fdfbf7] pointer-events-none group-hover:pointer-events-auto rounded-[24px]">
                                    <div className="relative z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100 flex flex-col h-full pointer-events-auto">
                                        <div className="absolute -top-10 right-0 text-[#ffd700] opacity-10 transform -rotate-12 scale-150 pointer-events-none">
                                            ⚜️
                                        </div>
                                        <h4 className="flex items-center gap-2 text-[#ffd700] font-bold uppercase tracking-[3px] text-xs mb-4 border-b border-[#d4af37]/30 pb-2">
                                            <span className="text-xl">👑</span> The Royal Legacy
                                        </h4>
                                        <div className="overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-[#d4af37]/80 scrollbar-track-transparent flex-1 pointer-events-auto pb-4">
                                            <p className="text-sm leading-relaxed italic text-[#fef5e7] whitespace-pre-line drop-shadow-md cursor-text">
                                                {product.history}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-br from-[#fdfbf7] to-[#f4ecd8] border-t border-[#d4af37]/30 text-center px-4">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black text-[#4a0404] font-heading">
                        Craving These Delicacies?
                    </h2>
                    <p className="text-[#8b6914] text-lg font-heading italic">
                        Join our exclusive waitlist today and be the first to experience the true taste of India when we launch.
                    </p>
                    <Link href="/#early-access" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#8f0f0d] to-[#6b0a09] text-[#ffd700] font-bold tracking-[2px] uppercase rounded-full shadow-[0_10px_30px_rgba(143,15,13,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 border border-[#d4af37]/50 text-sm sm:text-base">
                        Join the Waitlist
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
