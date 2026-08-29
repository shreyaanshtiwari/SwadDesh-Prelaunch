'use client';

import React, { useState } from 'react';
import { getReferralLink } from '@/lib/referralUtils';
import { SHARE_COPY } from '@/data/foundingMemberConfig';
import { Copy, Check, Share2, MessageCircle, Users } from 'lucide-react';

interface ShareModuleProps {
    referralCode: string;
    successfulInvites: number;
    onShareTriggered?: () => void;
}

export const ShareModule: React.FC<ShareModuleProps> = ({
    referralCode,
    successfulInvites,
    onShareTriggered,
}) => {
    const [copied, setCopied] = useState(false);
    const referralLink = getReferralLink(referralCode);

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(referralLink);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = referralLink;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setCopied(true);
            if (onShareTriggered) onShareTriggered();
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleWhatsAppShare = () => {
        const text = `${SHARE_COPY.whatsappText}${referralLink}`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        if (onShareTriggered) onShareTriggered();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleNativeShare = async () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: 'SwadDesh Early Access Invitation',
                    text: SHARE_COPY.defaultText,
                    url: referralLink,
                });
                if (onShareTriggered) onShareTriggered();
            } catch (err) {
                // User cancelled share
            }
        } else {
            handleCopy();
        }
    };

    const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

    return (
        <div className="space-y-4">
            {/* Invite Link Box */}
            <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#8b6914]">
                    Your Unique Invite Link
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="flex-1 relative flex items-center bg-[#fffcf5] border-2 border-[#d4af37]/60 rounded-xl px-3.5 py-2.5 shadow-inner">
                        <span className="text-xs sm:text-sm font-mono font-medium text-[#4a0404] truncate select-all">
                            {referralLink}
                        </span>
                    </div>

                    <button
                        onClick={handleCopy}
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-[1px] bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] hover:shadow-[0_4px_15px_rgba(212,175,55,0.35)] active:scale-95 transition-all duration-200"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 stroke-[2.5]" />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                <span>Copy Link</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                    onClick={handleWhatsAppShare}
                    type="button"
                    className="flex items-center justify-center gap-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#1b7e3b] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-200 active:scale-98"
                >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" fill="#25D366" />
                    <span>Share on WhatsApp</span>
                </button>

                {canNativeShare ? (
                    <button
                        onClick={handleNativeShare}
                        type="button"
                        className="flex items-center justify-center gap-2 bg-[#800020]/10 hover:bg-[#800020]/15 border border-[#800020]/30 text-[#800020] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-200 active:scale-98"
                    >
                        <Share2 className="w-4 h-4 text-[#800020]" />
                        <span>More Share Options</span>
                    </button>
                ) : (
                    <button
                        onClick={handleCopy}
                        type="button"
                        className="flex items-center justify-center gap-2 bg-[#d4af37]/15 hover:bg-[#d4af37]/25 border border-[#d4af37]/40 text-[#5d4037] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-200 active:scale-98"
                    >
                        <Copy className="w-4 h-4 text-[#8b6914]" />
                        <span>Copy Share Message</span>
                    </button>
                )}
            </div>

            {/* Referral Requirement Clarification */}
            <div className="flex items-start gap-2 bg-[#fdfbf7] border border-[#d4af37]/30 rounded-lg p-3 text-left">
                <Users className="w-4 h-4 text-[#8b6914] flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#5d4037] leading-relaxed">
                    <span className="font-semibold text-[#4a0404]">How referral credits work: </span>
                    Your count updates when a friend successfully registers for Early Access using your link. Clicks alone do not qualify.
                </div>
            </div>
        </div>
    );
};
