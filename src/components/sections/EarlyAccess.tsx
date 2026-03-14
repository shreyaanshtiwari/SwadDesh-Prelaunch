'use client';

import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { TextAreaField } from '@/components/ui/TextAreaField';
import { SelectField } from '@/components/ui/SelectField';
import { Gift, Leaf, Sparkles, Users } from 'lucide-react';

const INDIAN_STATES = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Puducherry', label: 'Puducherry' },
];

export const EarlyAccess = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        state: '', 
        interests: '',
        comments: '' 
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.state || !formData.interests.trim()) {
            setStatus('error');
            setMessage('All fields except comments are required.');
            return;
        }

        if (!validateEmail(formData.email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        if (!validatePhone(formData.phone)) {
            setStatus('error');
            setMessage('Please enter a valid 10-digit Indian mobile number.');
            return;
        }

        if (!agreedToTerms) {
            setStatus('error');
            setMessage('Please agree to the Terms & Conditions and Privacy Policy.');
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
                setFormData({ name: '', email: '', phone: '', state: '', interests: '', comments: '' });
                setAgreedToTerms(false);
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
        <Section id="early-access" className="relative overflow-hidden text-[#4a0404] pt-8 lg:pt-12 pb-4 lg:pb-10 border-b-[4px] border-[#d4af37] bg-gradient-to-b from-[#f4ecd8] to-[#fdfbf7]">
            {/* Elegant Background Patterns */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] rounded-full pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

            {/* Subtle Dotted Grid Overlay (optional for texture) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 lg:space-y-8 px-4">
                <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                        <span className="text-[#b8860b] font-bold uppercase tracking-[4px] text-xs">Authentic Taste of Bharat</span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                    </div>
                    <h2 className="text-3xl md:text-[56px] font-black tracking-tight font-heading drop-shadow-sm text-[#4a0404]">
                        Join the <span className="text-[#8f0f0d] font-light italic">Waitlist</span>
                    </h2>
                    <p className="text-[#8b6914] text-lg md:text-xl font-heading italic max-w-2xl mx-auto">
                        Be the first to experience Swaddesh heritage flavors and claim exclusive privileges on your inaugural royal feast.
                    </p>
                    {/* Waitlist Incentive */}
                    <div className="mt-6 flex justify-center">
                        <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 px-6 py-3 rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.05)]">
                            <Gift className="w-5 h-5 text-[#8f0f0d] animate-pulse" strokeWidth={1.5} />
                            <span className="text-[#4a0404] font-bold text-sm tracking-wide">
                                EXCLUSIVE: First <span className="text-[#8f0f0d]">500</span> members receive a complimentary Royal Sample Box!
                            </span>
                        </div>
                    </div>
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
                            <p className="text-[#5d4037] leading-relaxed text-lg mb-8">{message}</p>

                            <Button
                                onClick={() => setStatus('idle')}
                                className="relative bg-[#fdfbf7] text-[#4a0404] hover:bg-[#d4af37]/20 border border-[#d4af37]/50 font-bold tracking-[2px] uppercase py-3 px-8 rounded-full text-sm transition-all duration-300 hover:scale-[1.02]"
                            >
                                Done
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative z-10 bg-white p-10 rounded-2xl shadow-[0_25px_80px_rgba(107,10,9,0.08)] border border-[#d4af37]/40 text-left space-y-6">
                            {/* Inner Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37]/40 m-4 pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d4af37]/40 m-4 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#d4af37]/40 m-4 pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37]/40 m-4 pointer-events-none"></div>

                            <div className="space-y-5 relative z-20 pt-2">
                                <p className="text-[11px] text-[#8b6914] text-center uppercase tracking-[2px] font-bold opacity-70">
                                    ~ We respect your privacy ~
                                </p>
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
                                <div className="space-y-1">
                                    <InputField
                                        label="Phone Number"
                                        type="tel"
                                        placeholder="e.g. 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={status === 'loading'}
                                    />
                                    <p className="text-[10px] text-[#8b6914] ml-1 opacity-80 font-medium">✨ No spam. Highly Secured.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SelectField
                                        label="State"
                                        options={INDIAN_STATES}
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        disabled={status === 'loading'}
                                    />
                                    <InputField
                                        label="Interests in Delicacies"
                                        placeholder="e.g. Padukiya, Arse, Petha"
                                        value={formData.interests}
                                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                <TextAreaField
                                    label="Message / Feedback / Suggestions"
                                    placeholder="Share your thoughts, suggestions, or what you'd like to see from us... (Optional)"
                                    value={formData.comments}
                                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                    disabled={status === 'loading'}
                                />

                                {/* Terms & Privacy Policy Checkbox */}
                                <label className="flex items-start gap-3 cursor-pointer group select-none">
                                    <div className="relative mt-0.5 flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            disabled={status === 'loading'}
                                            className="sr-only peer"
                                        />
                                        <div className="w-5 h-5 rounded border-2 border-[#d4af37]/60 bg-white peer-checked:bg-[#d4af37] peer-checked:border-[#b8860b] transition-all duration-200 flex items-center justify-center shadow-sm group-hover:border-[#d4af37]">
                                            {agreedToTerms && (
                                                <svg className="w-3 h-3 text-[#2b0202]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-[12px] text-[#5d4037] leading-relaxed">
                                        I agree to the{' '}
                                        <a href="/terms" target="_blank" className="text-[#8f0f0d] font-semibold underline underline-offset-2 hover:text-[#d4af37] transition-colors">Terms & Conditions</a>
                                        {' '}and{' '}
                                        <a href="/privacy" target="_blank" className="text-[#8f0f0d] font-semibold underline underline-offset-2 hover:text-[#d4af37] transition-colors">Privacy Policy</a>
                                    </span>
                                </label>

                                {status === 'error' && (
                                    <p className="text-[#c62828] text-sm font-medium bg-[#ffebee] p-3 rounded-md border border-[#ffcdd2] text-center">{message}</p>
                                )}
                            </div>

                            <div className="pt-2 relative z-10 w-full group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#ffd700] to-[#d4af37] rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={status === 'loading'}
                                    className="relative bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] border border-[#ffd700]/50 font-bold tracking-[1px] sm:tracking-[2px] uppercase py-4 rounded-xl text-[10px] sm:text-sm transition-all duration-300 hover:scale-[1.02] whitespace-nowrap"
                                >
                                    {status === 'loading' ? 'Securing Spot...' : 'Claim Early Access'}
                                </Button>
                            </div>

                        </form>
                    )}
                </div>

                {/* Trust Badges under Form */}
                <div className="relative z-0 !mt-4 lg:!mt-4 flex flex-nowrap justify-center items-start gap-4 sm:gap-6 md:gap-12 opacity-80 overflow-hidden max-w-full mx-auto">
                    <div className="flex flex-col items-center gap-2 group cursor-default flex-1 max-w-[100px] md:max-w-none">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-white/50 backdrop-blur-sm group-hover:bg-[#d4af37]/10 transition-colors">
                            <Leaf className="w-5 h-5 md:w-6 md:h-6 text-[#8f0f0d]" strokeWidth={1.5} />
                        </div>
                        <span className="text-[#4a0404] text-[9px] md:text-[11px] font-bold uppercase tracking-widest font-heading text-center leading-tight">
                            <span className="block">100%</span>
                            <span className="block">Organic</span>
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default flex-1 max-w-[100px] md:max-w-none">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-white/50 backdrop-blur-sm group-hover:bg-[#d4af37]/10 transition-colors">
                            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#8f0f0d]" strokeWidth={1.5} />
                        </div>
                        <span className="text-[#4a0404] text-[9px] md:text-[11px] font-bold uppercase tracking-widest font-heading text-center leading-tight">
                            <span className="block">Preservative</span>
                            <span className="block">Free</span>
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-default flex-1 max-w-[100px] md:max-w-none">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-white/50 backdrop-blur-sm group-hover:bg-[#d4af37]/10 transition-colors">
                            <Users className="w-5 h-5 md:w-6 md:h-6 text-[#8f0f0d]" strokeWidth={1.5} />
                        </div>
                        <span className="text-[#4a0404] text-[9px] md:text-[11px] font-bold uppercase tracking-widest font-heading text-center leading-tight">
                            <span className="block">Ethically</span>
                            <span className="block">Sourced</span>
                        </span>
                    </div>
                </div>
            </div>
        </Section>
    );
};
