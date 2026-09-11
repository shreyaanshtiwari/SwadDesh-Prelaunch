import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productStories } from '@/data/products';
import { Footer } from '@/components/sections/Footer';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const p = await params;
    const product = productStories.find((p_obj) => p_obj.id === p.id);
    return {
        title: product ? `${product.name} | SwadDesh` : 'Product Not Found',
        description: product?.description,
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const p = await params;
    const product = productStories.find((product) => product.id === p.id);

    if (!product) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col bg-[#fffcf5]">
            {/* Header / Back Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#2b0202]/90 backdrop-blur-md border-b border-[#d4af37]/30 px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="text-[#ffd700] flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                        ← Back to Home
                    </Link>
                    <div className="text-[#ffd700] text-sm font-heading italic">SwadDesh Heritage</div>
                </div>
            </div>

            <section className="pt-20 pb-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                        {/* Left: Product Image & Spotlight */}
                        <div className="relative group">
                            {/* Decorative Frame */}
                            <div className="absolute inset-[-10px] border-[2px] border-[#d4af37] border-dashed rounded-[32px] opacity-20 pointer-events-none"></div>

                            <div className="relative aspect-square rounded-[32px] overflow-hidden bg-[#fdfbf7] border border-[#d4af37]/40 shadow-2xl flex items-center justify-center p-6 sm:p-12 lg:p-16">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.05)_100%)]"></div>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8 sm:p-12 hover:scale-105 transition-transform duration-700"
                                    priority
                                />

                                {/* Floating Seal */}
                                <div className="absolute bottom-6 right-6 bg-gradient-to-br from-[#d4af37] to-[#8b6914] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl border-2 border-[#2b0202]">
                                    <span className="text-xl sm:text-2xl text-[#2b0202]">👑</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Heritage & Details */}
                        <div className="space-y-6 flex flex-col justify-center">
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="inline-block text-[#8f0f0d] font-bold uppercase tracking-[4px] text-xs">
                                        {product.origin}
                                    </span>
                                    {product.packaging && (
                                        <>
                                            <span className="text-[#d4af37] text-xs">•</span>
                                            <span className="text-[#8b6914] text-xs font-semibold bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/20">
                                                {product.packaging}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#4a0404] font-heading leading-tight mb-3">
                                    {product.name}
                                </h1>
                                {product.vendor && (
                                    <div className="inline-flex items-center gap-2 bg-[#d4af37]/15 border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4a0404] mb-2">
                                        <span className="opacity-80">Heritage Artisan:</span>
                                        <span className="text-[#8f0f0d] font-heading font-black">{product.vendor}</span>
                                    </div>
                                )}
                                <p className="text-xl sm:text-2xl text-[#8b6914] font-heading italic">
                                    "{product.tagline}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#d4af37] to-transparent"></div>
                                <div className="text-gold text-lg">❖</div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="bg-[#2b0202] text-[#ffd700] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#d4af37]/40">
                                        The Royal Legacy
                                    </span>
                                </div>
                                <p className="text-[#2c1810] text-base sm:text-lg leading-relaxed font-body whitespace-pre-line">
                                    {product.history}
                                </p>
                            </div>

                            {/* Pre-Launch Showcase Only Notice */}
                            <div className="pt-4 space-y-4">
                                <div className="bg-gradient-to-r from-[#2b0202] to-[#3a0303] border border-[#d4af37]/60 rounded-2xl p-5 sm:p-6 shadow-lg space-y-2">
                                    <div className="inline-flex items-center gap-1.5 bg-[#d4af37]/20 border border-[#d4af37]/40 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#ffd700]">
                                        <span>Showcase Preview Only</span>
                                    </div>
                                    <h4 className="text-base sm:text-lg font-bold font-heading text-[#fef5e7]">
                                        Currently Not Available for Order
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#e6d5c3]/80 leading-relaxed font-light">
                                        This delicacy is currently in pre-launch preview for our waitlist members to explore authentic regional origins. Ordering will officially open on launch day.
                                    </p>
                                </div>

                                <div>
                                    <Link
                                        href="/#products"
                                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-[#fdfbf7] text-[#4a0404] hover:text-[#8f0f0d] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-[#d4af37]/60 shadow-sm transition-all hover:scale-102"
                                    >
                                        <span>← Back to Heritage Delicacies</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators Section */}
            <section className="bg-[#2b0202] py-8 sm:py-12 px-4 border-y-4 border-[#d4af37]">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 sm:gap-16">
                    <div className="text-center space-y-1 sm:space-y-2">
                        <span className="block text-[#ffd700] font-black text-lg sm:text-3xl font-heading">100%</span>
                        <span className="block text-[#e6d5c3]/70 text-[8px] sm:text-[10px] uppercase tracking-[1px] sm:tracking-[3px] font-bold">Authentic</span>
                    </div>
                    <div className="text-center space-y-1 sm:space-y-2">
                        <span className="block text-[#ffd700] font-black text-lg sm:text-3xl font-heading">Ancestral</span>
                        <span className="block text-[#e6d5c3]/70 text-[8px] sm:text-[10px] uppercase tracking-[1px] sm:tracking-[3px] font-bold">Recipes</span>
                    </div>
                    <div className="text-center space-y-1 sm:space-y-2">
                        <span className="block text-[#ffd700] font-black text-lg sm:text-3xl font-heading">Zero</span>
                        <span className="block text-[#e6d5c3]/70 text-[8px] sm:text-[10px] uppercase tracking-[1px] sm:tracking-[3px] font-bold whitespace-nowrap">Preservatives</span>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
