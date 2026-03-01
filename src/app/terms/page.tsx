import React from 'react';
import Link from 'next/link';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
    title: 'Terms of Service | SwaadDesh',
    description: 'Terms of Service for SwaadDesh',
};

export default function TermsOfService() {
    return (
        <main className="flex min-h-screen flex-col bg-[#fffcf5]">
            <div className="flex-grow py-20 px-4 md:px-8 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-[#d4af37] to-transparent"></div>

                <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-8 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(107,10,9,0.05)] border border-[#d4af37]/30 relative z-10">
                    <div className="mb-12 text-center border-b border-[#d4af37]/20 pb-8">
                        <span className="inline-block font-bold text-[#8f0f0d] uppercase tracking-[2px] mb-4 text-sm">Legal</span>
                        <h1 className="text-4xl md:text-5xl font-black font-heading text-[#4a0404] mb-4">Terms of Service</h1>
                        <p className="text-[#8b6914] italic font-heading">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
                    </div>

                    <div className="space-y-8 text-[#5d4037] leading-relaxed prose-p:mb-4 prose-h2:text-2xl prose-h2:font-heading prose-h2:text-[#4a0404] prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-xl prose-h3:font-heading prose-h3:text-[#8f0f0d] prose-h3:mt-6 prose-h3:mb-3 prose-li:mb-2 prose-ul:list-disc prose-ul:pl-6">
                        <h2>1. Agreement to Terms</h2>
                        <p>Welcome to SwaadDesh. Currently, we operate as a informational pre-launch website. By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the website.</p>

                        <h2>2. Waitlist and Early Access</h2>
                        <p>By joining our waitlist, you agree to provide accurate information (your name and email address) for the purpose of receiving updates about our launch and exclusive early-bird privileges. We reserve the right to limit waitlist spaces or revoke early-access offers at our discretion to prevent abuse.</p>

                        <h2>3. Intellectual Property</h2>
                        <p>The content, layout, design, data, graphics, and products showcased on this website are protected by intellectual property laws. You may not copy, reproduce, or use our branding or product previews for commercial purposes without our express permission.</p>

                        <h2>4. Product Information</h2>
                        <p>SwaadDesh aims to provide authentic regional Indian delicacies. As we are currently in a pre-launch phase, all descriptions of products, planned offerings, and any tentative pricing mentioned on this site are indicative and subject to change before our official launch.</p>

                        <h2>5. Disclaimer</h2>
                        <p>The materials on SwaadDesh&apos;s website are provided on an &apos;as is&apos; basis. As this is a pre-launch informational site, we do not currently sell products or process transactions through this website.</p>

                        <h2>6. Future Updates</h2>
                        <p>These Terms of Service will be updated significantly once our e-commerce platform goes live for public purchasing. Continued use of the website after such changes will constitute consent to the new terms.</p>

                        <h2>7. Governing Law</h2>
                        <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
                    </div>

                    <div className="mt-16 text-center pt-8 border-t border-[#d4af37]/20">
                        <Link href="/" className="inline-flex items-center gap-2 text-[#4a0404] font-bold hover:text-[#d4af37] transition-colors group">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
