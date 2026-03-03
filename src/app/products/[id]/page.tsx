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
        title: product ? `${product.name} | SwaadDesh` : 'Product Not Found',
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
                    <Link href="/products" className="text-[#ffd700] flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                        ← Back to Collection
                    </Link>
                    <div className="text-[#ffd700] text-sm font-heading italic">SwaadDesh Heritage</div>
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
                                <span className="inline-block text-[#8f0f0d] font-bold uppercase tracking-[4px] text-xs mb-3">
                                    {product.origin}
                                </span>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#4a0404] font-heading leading-tight mb-4">
                                    {product.name}
                                </h1>
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

                            <div className="pt-6 space-y-6">
                                <Link
                                    href="/#early-access"
                                    className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#8f0f0d] to-[#6b0a09] text-[#ffd700] font-bold tracking-[1px] sm:tracking-[2px] uppercase rounded-full shadow-[0_10px_30px_rgba(143,15,13,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] transition-all duration-300 border border-[#d4af37]/50 text-xs sm:text-base whitespace-nowrap"
                                >
                                    Experience the Legend
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                                <p className="text-[#8b6914] text-xs font-heading italic text-center sm:text-left">
                                    * Currently available for exclusive pre-launch waitlist
                                </p>
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
