'use client';

import React, { useState, useEffect } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { TextAreaField } from '@/components/ui/TextAreaField';
import { SelectField } from '@/components/ui/SelectField';
import { FoundingDashboard } from '@/components/founding/FoundingDashboard';
import { FoundingMember } from '@/types/foundingMember';
import { Gift, Leaf, Sparkles, Users, Search, ArrowLeft } from 'lucide-react';

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
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    
    // Founding Member & Referral state
    const [referredByCode, setReferredByCode] = useState<string>('');
    const [currentMember, setCurrentMember] = useState<FoundingMember | null>(null);
    const [isLookupOpen, setIsLookupOpen] = useState(false);
    const [lookupIdentifier, setLookupIdentifier] = useState('');
    const [lookupStatus, setLookupStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [lookupError, setLookupError] = useState('');
    const [existingNotice, setExistingNotice] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({});

    // Capture referral query params & check existing session
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get('ref');
        const memberParam = urlParams.get('member') || urlParams.get('code');

        if (refParam) {
            setReferredByCode(refParam.toUpperCase().trim());
            sessionStorage.setItem('swaddesh_referred_by', refParam.toUpperCase().trim());
        }

        // Auto-load if member param in URL
        if (memberParam) {
            fetch(`/api/member?code=${encodeURIComponent(memberParam.trim())}`)
                .then((r) => r.json())
                .then((data) => {
                    if (data.success && data.member) {
                        setCurrentMember(data.member);
                        setStatus('success');
                        localStorage.setItem('swaddesh_member_data', JSON.stringify(data.member));
                    }
                })
                .catch(() => {});
            return;
        }

        // Check local storage session
        try {
            const savedMember = localStorage.getItem('swaddesh_member_data');
            if (savedMember) {
                const parsed = JSON.parse(savedMember);
                if (parsed && parsed.email) {
                    setCurrentMember(parsed);
                    setStatus('success');
                    // Sync latest stats with backend
                    fetch(`/api/member?email=${encodeURIComponent(parsed.email)}`)
                        .then((r) => r.json())
                        .then((data) => {
                            if (data.success && data.member) {
                                setCurrentMember(data.member);
                                localStorage.setItem('swaddesh_member_data', JSON.stringify(data.member));
                            } else if (data.error) {
                                localStorage.removeItem('swaddesh_member_data');
                                setCurrentMember(null);
                                setStatus('idle');
                            }
                        })
                        .catch(() => {});
                }
            }
        } catch (e) {
            // Ignore parse errors
        }
    }, []);

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

        setStatus('loading');
        setFieldErrors({});

        try {
            const storedReferrer = typeof window !== 'undefined' ? sessionStorage.getItem('swaddesh_referred_by') : '';
            const payload = {
                ...formData,
                referred_by: referredByCode || storedReferrer || undefined,
            };

            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'You are successfully added to the early access list.');
                if (data.member) {
                    setCurrentMember(data.member);
                    localStorage.setItem('swaddesh_member_data', JSON.stringify(data.member));
                }
                if (data.is_existing) {
                    setExistingNotice(`This email and mobile number were already registered. Signed in as ${data.member?.email} (${data.member?.phone}).`);
                } else {
                    setExistingNotice(null);
                }
                setFormData({ name: '', email: '', phone: '', state: '', interests: '', comments: '' });
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong. Please try again.');
                if (data.field === 'phone') {
                    setFieldErrors({ phone: data.error });
                } else if (data.field === 'email') {
                    setFieldErrors({ email: data.error });
                }
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to connect. Please try again later.');
        }
    };

    const handleLookupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!lookupIdentifier.trim()) {
            setLookupError('Please enter your email or referral code.');
            return;
        }

        setLookupStatus('loading');
        setLookupError('');

        try {
            const isEmail = lookupIdentifier.includes('@');
            const param = isEmail ? `email=${encodeURIComponent(lookupIdentifier.trim())}` : `code=${encodeURIComponent(lookupIdentifier.trim())}`;
            const res = await fetch(`/api/member?${param}`);
            const data = await res.json();

            if (res.ok && data.member) {
                setCurrentMember(data.member);
                setStatus('success');
                setExistingNotice(null);
                setIsLookupOpen(false);
                setLookupStatus('idle');
                localStorage.setItem('swaddesh_member_data', JSON.stringify(data.member));
            } else {
                setLookupStatus('error');
                setLookupError(data.error || 'Member not found. Please check and try again.');
            }
        } catch (err) {
            setLookupStatus('error');
            setLookupError('Network error. Please try again.');
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setCurrentMember(null);
        setExistingNotice(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('swaddesh_member_data');
        }
    };

    return (
        <Section id="early-access" className="relative overflow-hidden text-[#4a0404] pt-8 lg:pt-12 pb-4 lg:pb-10 border-b-[4px] border-[#d4af37] bg-gradient-to-b from-[#f4ecd8] to-[#fdfbf7]">
            {/* Elegant Background Patterns */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] rounded-full pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

            {/* Subtle Dotted Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 lg:space-y-8 px-4">
                
                {/* When User is viewing their Founding Member Dashboard */}
                {status === 'success' && currentMember ? (
                    <FoundingDashboard
                        member={currentMember}
                        existingNotice={existingNotice}
                        onReset={handleReset}
                        onUpdateMember={(updated) => setCurrentMember(updated)}
                    />
                ) : (
                    <>
                        {/* Section Header */}
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
                            
                            {/* Referred By Notice if visiting through a friend's link */}
                            {referredByCode && (
                                <div className="flex justify-center">
                                    <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/50 px-5 py-2 rounded-full shadow-sm text-xs font-semibold text-[#4a0404]">
                                        <Sparkles className="w-4 h-4 text-[#8f0f0d]" />
                                        <span>You've been personally invited by a Founding Member (<strong className="font-mono text-[#8f0f0d]">{referredByCode}</strong>).</span>
                                    </div>
                                </div>
                            )}

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

                        {/* Existing Member Resume Prompt */}
                        {currentMember && status !== 'success' && !isLookupOpen && (
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setStatus('success')}
                                    className="inline-flex items-center gap-2 bg-white/90 hover:bg-white border-2 border-[#d4af37] px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#4a0404] shadow-md hover:scale-102 transition-all"
                                >
                                    <Sparkles className="w-4 h-4 text-[#8f0f0d]" />
                                    <span>Welcome back {currentMember.name}! View your Founding Member Dashboard →</span>
                                </button>
                            </div>
                        )}

                        <div className="relative mx-auto max-w-lg mt-8">
                            {/* Decorative Form Outer Frame */}
                            <div className="absolute inset-[-12px] border-[2px] border-[#d4af37] border-dashed rounded-3xl opacity-40 z-0 pointer-events-none"></div>

                            {/* Check Status / Lookup Form Modal/Box */}
                            {isLookupOpen ? (
                                <div className="relative z-10 bg-white p-8 sm:p-10 rounded-2xl shadow-[0_25px_80px_rgba(107,10,9,0.08)] border border-[#d4af37]/40 text-left space-y-6">
                                    <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
                                        <h3 className="font-heading font-bold text-xl text-[#4a0404]">
                                            Check Founding Status
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setIsLookupOpen(false)}
                                            className="text-xs text-[#8b6914] hover:text-[#4a0404] font-semibold flex items-center gap-1"
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Signup
                                        </button>
                                    </div>
                                    <p className="text-xs text-[#5d4037]">
                                        Enter the email address or unique referral code (e.g. SD-XXXXXX) you used when joining the waitlist.
                                    </p>
                                    <form onSubmit={handleLookupSubmit} className="space-y-4">
                                        <InputField
                                            label="Email Address or Referral Code"
                                            placeholder="e.g. rahul@example.com or SD-7K9M2P"
                                            value={lookupIdentifier}
                                            onChange={(e) => setLookupIdentifier(e.target.value)}
                                            disabled={lookupStatus === 'loading'}
                                            error={lookupError}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            disabled={lookupStatus === 'loading'}
                                            className="relative bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] font-bold tracking-[1px] uppercase py-3.5 rounded-xl text-xs sm:text-sm shadow-sm"
                                        >
                                            {lookupStatus === 'loading' ? 'Searching...' : 'Access Dashboard'}
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                /* Main Early Access Registration Form */
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
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value });
                                                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                                            }}
                                            disabled={status === 'loading'}
                                            error={fieldErrors.email}
                                        />
                                        <div className="space-y-1">
                                            <InputField
                                                label="Phone Number"
                                                type="tel"
                                                placeholder="e.g. 98765 43210"
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, phone: e.target.value });
                                                    if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                                                }}
                                                disabled={status === 'loading'}
                                                error={fieldErrors.phone}
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

                                        {/* Invite / Referral Code Field */}
                                        <div className="space-y-2 group">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[13px] font-bold uppercase tracking-[1px] text-[#8b6914] ml-1 group-focus-within:text-[#d4af37] transition-colors">
                                                    Founding Invite Code <span className="text-[11px] font-normal normal-case opacity-70">(Optional)</span>
                                                </label>
                                                <span className="text-[10px] text-[#8b6914] opacity-80 font-medium">Got a code from a friend?</span>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. SD-87QYA8"
                                                    value={referredByCode}
                                                    onChange={(e) => setReferredByCode(e.target.value.toUpperCase())}
                                                    disabled={status === 'loading'}
                                                    className="flex h-[52px] w-full rounded-xl border-2 border-[#d4af37]/60 bg-white px-4 py-2 text-sm font-mono uppercase text-[#4a0404] placeholder:text-[#5d4037]/50 font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/10 focus:border-[#d4af37] hover:border-[#d4af37] shadow-sm"
                                                />
                                                {referredByCode.trim() && (
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-[#e8f5e9] border border-[#a5d6a7] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#1b7e3b] shadow-sm pointer-events-none">
                                                        <Sparkles className="w-3 h-3 text-[#1b7e3b]" />
                                                        <span>Invite Applied</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <TextAreaField
                                            label="Message / Feedback / Suggestions"
                                            placeholder="Share your thoughts, suggestions, or what you'd like to see from us... (Optional)"
                                            value={formData.comments}
                                            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                            disabled={status === 'loading'}
                                        />

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

                                    {/* Existing Member Lookup Switch */}
                                    <div className="pt-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => setIsLookupOpen(true)}
                                            className="text-xs text-[#8b6914] hover:text-[#4a0404] font-semibold underline underline-offset-4 transition-colors"
                                        >
                                            Already registered? View your Founding status & invites
                                        </button>
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
                    </>
                )}

            </div>
        </Section>
    );
};
