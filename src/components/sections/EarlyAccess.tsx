'use client';

import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';

export const EarlyAccess = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim()) {
            setStatus('error');
            setMessage('Name and email are required.');
            return;
        }

        if (!validateEmail(formData.email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'You are successfully added to the early access list. You will receive launch updates and exclusive discounts.');
                setFormData({ name: '', email: '' });
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to connect. Please try again later.');
        }
    };

    return (
        <Section id="early-access" className="relative overflow-hidden text-[#4a0404] pt-12 pb-28 border-b-[4px] border-[#d4af37] bg-gradient-to-b from-[#f4ecd8] to-[#fdfbf7]">
            {/* Elegant Background Patterns */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] rounded-full pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

            {/* Subtle Dotted Grid Overlay (optional for texture) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10 px-4">
                <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <span className="text-[#b8860b] font-bold uppercase tracking-[4px] text-xs">A Taste of Royalty</span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>
                    <h2 className="text-4xl md:text-[56px] font-black tracking-tight font-heading drop-shadow-sm text-[#4a0404]">
                        Join the <span className="text-[#8f0f0d] font-light italic">Waitlist</span>
                    </h2>
                    <p className="text-[#8b6914] text-lg md:text-xl font-heading italic max-w-2xl mx-auto">
                        Be the first to experience authentic heritage flavors and claim an exclusive 20% early-bird privileges on your inaugural royal feast.
                    </p>
                </div>

                <div className="relative mx-auto max-w-lg mt-8">
                    {/* Decorative Form Outer Frame */}
                    <div className="absolute inset-[-12px] border-[2px] border-[#d4af37] border-dashed rounded-3xl opacity-40 z-0 pointer-events-none"></div>

                    {status === 'success' ? (
                        <div className="relative z-10 bg-white/80 backdrop-blur-md border border-[#d4af37]/40 p-10 rounded-2xl flex flex-col items-center shadow-[0_20px_40px_rgba(212,175,55,0.15)] text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(212,175,55,0.3)] border-4 border-white">
                                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold mb-3 font-heading text-[#4a0404]">Welcome Aboard!</h3>
                            <p className="text-[#5d4037] leading-relaxed text-lg">{message}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative z-10 bg-gradient-to-br from-[#ffffff] to-[#fffcf5] p-10 rounded-2xl shadow-[0_20px_60px_rgba(107,10,9,0.05)] border border-[#d4af37]/30 text-left space-y-6">
                            {/* Inner Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37]/40 m-4 pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d4af37]/40 m-4 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#d4af37]/40 m-4 pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37]/40 m-4 pointer-events-none"></div>

                            <div className="space-y-5 relative z-10 pt-2">
                                <InputField
                                    label="Full Name"
                                    type="text"
                                    placeholder="e.g. Rahul Sharma"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={status === 'loading'}
                                />
                                <InputField
                                    label="Email Address"
                                    type="email"
                                    placeholder="rahul@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={status === 'loading'}
                                />

                                {status === 'error' && (
                                    <p className="text-[#c62828] text-sm font-medium bg-[#ffebee] p-3 rounded-md border border-[#ffcdd2] text-center">{message}</p>
                                )}
                            </div>

                            <div className="pt-2 relative z-10">
                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={status === 'loading'}
                                    className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] border border-[#ffd700]/50 font-bold tracking-[2px] uppercase py-4 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
                                >
                                    {status === 'loading' ? 'Securing Spot...' : 'Claim Early Access'}
                                </Button>
                            </div>

                            <p className="text-[11px] text-[#8b6914] text-center uppercase tracking-[2px] font-bold mt-6 opacity-70 relative z-10">
                                ~ We respect your privacy. No spam. ~
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </Section>
    );
};
