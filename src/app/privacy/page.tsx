import React from 'react';
import Link from 'next/link';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
    title: 'Privacy Policy | SwaadDesh',
    description: 'Privacy Policy for SwaadDesh',
};

export default function PrivacyPolicy() {
    return (
        <main className="flex min-h-screen flex-col bg-[#fffcf5]">
            <div className="flex-grow py-20 px-4 md:px-8 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-[#d4af37] to-transparent"></div>

                <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-8 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(107,10,9,0.05)] border border-[#d4af37]/30 relative z-10">
                    <div className="mb-12 text-center border-b border-[#d4af37]/20 pb-8">
                        <span className="inline-block font-bold text-[#8f0f0d] uppercase tracking-[2px] mb-4 text-sm">Legal</span>
                        <h1 className="text-4xl md:text-5xl font-black font-heading text-[#4a0404] mb-4">Privacy Policy</h1>
                        <p className="text-[#8b6914] italic font-heading">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
                    </div>

                    <div className="space-y-8 text-[#5d4037] leading-relaxed prose-p:mb-4 prose-h2:text-2xl prose-h2:font-heading prose-h2:text-[#4a0404] prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-xl prose-h3:font-heading prose-h3:text-[#8f0f0d] prose-h3:mt-6 prose-h3:mb-3 prose-li:mb-2 prose-ul:list-disc prose-ul:pl-6">
                        <h2>1. Introduction</h2>
                        <p>Welcome to SwadDesh. Currently, SwadDesh is in its pre-launch phase. This privacy policy explains how we handle the personal information you provide when joining our waitlist and interacting with our pre-launch website.</p>

                        <h2>2. Information We Collect</h2>
                        <p>During our pre-launch phase, we collect very limited information. Specifically, when you join our waitlist or contact us, we collect:</p>
                        <ul>
                            <li><strong>Contact Information:</strong> Your name and email address.</li>
                            <li><strong>Communication Data:</strong> Information you choose to provide if you contact us directly via email.</li>
                        </ul>

                        <h2>3. How We Use Your Information</h2>
                        <p>The information we collect is used solely for the following purposes:</p>
                        <ul>
                            <li>To add you to our waitlist and secure your early-bird privileges.</li>
                            <li>To send you updates regarding our launch dates, exclusive offers, and product sneak peeks.</li>
                            <li>To respond to your inquiries if you reach out to us.</li>
                        </ul>
                        <p>We do not share, sell, or rent your personal information to any third parties.</p>

                        <h2>4. Security</h2>
                        <p>We value the trust you place in us by providing your information. We use appropriate measures to protect your data from unauthorized access or disclosure.</p>

                        <h2>5. Your Rights</h2>
                        <p>You may request to be removed from our waitlist and mailing list at any time. If you wish to have your information deleted from our records, simply contact us using the email below, or use the unsubscribe link provided in any of our promotional emails.</p>

                        <h2>6. Changes to This Policy</h2>
                        <p>As we transition from our pre-launch phase to a fully operational e-commerce platform, this Privacy Policy will be updated to reflect our full services. We will notify waitlist members of significant updates to this policy.</p>

                        <h2>7. Contact Us</h2>
                        <p>If you have any questions about this privacy policy, please contact us at:</p>
                        <p>Email: <a href="mailto:swaddesh111077@gmail.com" className="text-[#d4af37] font-bold hover:underline">swaddesh111077@gmail.com</a></p>
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
