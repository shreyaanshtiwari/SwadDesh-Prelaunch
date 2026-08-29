'use client';

import React, { useState } from 'react';
import { TaskId } from '@/types/foundingMember';
import { ShareModule } from './ShareModule';
import { Check, Sparkles, Send, Edit3, Heart, MessageCircle, Instagram, ExternalLink, Lock } from 'lucide-react';

interface TaskItemProps {
    id: TaskId;
    number: string;
    title: string;
    description: string;
    isCompleted: boolean;
    badge?: string;
    completedDetail?: string;
    referralCode: string;
    successfulInvites: number;
    favouriteProductValue?: string;
    onSaveFavouriteProduct: (product: string) => Promise<boolean>;
    onMarkShareCompleted: () => Promise<void>;
}

export const TaskItem: React.FC<TaskItemProps> = ({
    id,
    number,
    title,
    description,
    isCompleted,
    badge,
    completedDetail,
    referralCode,
    successfulInvites,
    favouriteProductValue = '',
    onSaveFavouriteProduct,
    onMarkShareCompleted,
}) => {
    // Task 02 local states
    const [productInput, setProductInput] = useState(favouriteProductValue);
    const [isEditingProduct, setIsEditingProduct] = useState(false);
    const [isSavingProduct, setIsSavingProduct] = useState(false);
    const [productError, setProductError] = useState('');

    // Task 04 local states
    const [hasClickedChannel, setHasClickedChannel] = useState(false);
    const [isMarkingDone, setIsMarkingDone] = useState(false);

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productInput.trim()) {
            setProductError('Please enter a delicacy or ingredient name.');
            return;
        }
        setProductError('');
        setIsSavingProduct(true);
        const ok = await onSaveFavouriteProduct(productInput.trim());
        setIsSavingProduct(false);
        if (ok) {
            setIsEditingProduct(false);
        }
    };

    const handleOpenWhatsAppChannel = () => {
        window.open('https://whatsapp.com/channel/0029VbCFW8047Xe27JERSS1V', '_blank', 'noopener,noreferrer');
        setHasClickedChannel(true);
    };

    const handleOpenInstagram = () => {
        window.open('https://www.instagram.com/swaddesh.in', '_blank', 'noopener,noreferrer');
        setHasClickedChannel(true);
    };

    const handleConfirmChannelJoined = async () => {
        if (!hasClickedChannel && !isCompleted) return;
        setIsMarkingDone(true);
        await onMarkShareCompleted();
        setIsMarkingDone(false);
    };

    return (
        <div
            className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                isCompleted
                    ? 'bg-white/95 border-[#d4af37]/60 shadow-[0_4px_20px_rgba(212,175,55,0.08)]'
                    : 'bg-white border-[#d4af37]/30 hover:border-[#d4af37]/60 shadow-sm'
            }`}
        >
            {/* Left status accent strip */}
            <div
                className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                    isCompleted
                        ? 'bg-gradient-to-b from-[#d4af37] to-[#b8860b]'
                        : 'bg-stone-300'
                }`}
            ></div>

            <div className="p-5 sm:p-6 pl-6 sm:pl-8 space-y-4">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#8b6914] bg-[#d4af37]/15 border border-[#d4af37]/30 px-2 py-0.5 rounded-md">
                            TASK {number}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold font-heading text-[#4a0404] leading-snug">
                            {title}
                        </h4>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        {badge && !isCompleted && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-[#5d4037] px-2.5 py-1 rounded-full border border-stone-200">
                                {badge}
                            </span>
                        )}

                        {isCompleted ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b7e3b] bg-[#e8f5e9] border border-[#a5d6a7] px-3 py-1 rounded-full">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Completed
                            </span>
                        ) : (
                            <span className="text-xs font-medium text-[#8b6914] bg-[#fdfbf7] border border-[#d4af37]/40 px-3 py-1 rounded-full">
                                In Progress
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5d4037] leading-relaxed">
                    {description}
                </p>

                {/* TASK 01 Body: Completed auto badge */}
                {id === 'task_join' && isCompleted && (
                    <div className="flex items-center gap-2 text-xs text-[#2b0202] bg-[#fef5e7] border border-[#d4af37]/40 px-4 py-2.5 rounded-xl">
                        <Sparkles className="w-4 h-4 text-[#b8860b]" />
                        <span className="font-medium">Early Access position officially confirmed on our waitlist.</span>
                    </div>
                )}

                {/* TASK 02 Body: Favourite Product */}
                {id === 'task_favourite_product' && (
                    <div className="space-y-3 pt-1">
                        {isCompleted && !isEditingProduct ? (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fdfbf7] border border-[#d4af37]/40 rounded-xl p-4">
                                <div className="space-y-0.5">
                                    <span className="text-[10px] uppercase tracking-wider text-[#8b6914] font-bold">
                                        Your Regional Delicacy Wish:
                                    </span>
                                    <p className="text-sm font-bold text-[#4a0404] flex items-center gap-2">
                                        <Heart className="w-3.5 h-3.5 text-[#8f0f0d] fill-[#8f0f0d]" />
                                        <span>{favouriteProductValue || productInput || 'Saved'}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsEditingProduct(true)}
                                    type="button"
                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8b6914] hover:text-[#4a0404] underline underline-offset-2 transition-colors self-start sm:self-auto"
                                >
                                    <Edit3 className="w-3 h-3" /> Edit Delicacy
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleProductSubmit} className="space-y-3">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. Banarasi Paan, Petha, Arse, Ghevar..."
                                        value={productInput}
                                        onChange={(e) => setProductInput(e.target.value)}
                                        disabled={isSavingProduct}
                                        className="flex-1 px-4 py-2.5 rounded-xl border border-[#d4af37]/60 bg-[#fdfbf7] text-sm text-[#4a0404] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSavingProduct}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] hover:opacity-95 active:scale-95 transition-all shadow-sm"
                                    >
                                        {isSavingProduct ? 'Saving...' : (
                                            <>
                                                <span>Save Wish</span>
                                                <Send className="w-3.5 h-3.5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                {productError && (
                                    <p className="text-xs text-[#c62828] font-medium">{productError}</p>
                                )}
                            </form>
                        )}
                    </div>
                )}

                {/* TASK 03 Body: Invite 3 friends */}
                {id === 'task_invite_friends' && (
                    <div className="space-y-4 pt-1">
                        {/* Progress meter */}
                        <div className="bg-[#fcfaf4] border border-[#d4af37]/30 rounded-xl p-3.5 space-y-2">
                            <div className="flex justify-between text-xs font-bold text-[#4a0404]">
                                <span>Invited Friends Status</span>
                                <span className="text-[#8f0f0d] font-mono">
                                    {successfulInvites} / 3 Joined
                                </span>
                            </div>
                            <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] transition-all duration-500 rounded-full"
                                    style={{ width: `${Math.min(100, (successfulInvites / 3) * 100)}%` }}
                                ></div>
                            </div>
                            <p className="text-[11px] text-[#5d4037]">
                                {successfulInvites >= 3
                                    ? '🎉 Founding Member Privileges unlocked! You have successfully introduced 3+ friends.'
                                    : `${3 - successfulInvites} more verified ${3 - successfulInvites === 1 ? 'friend' : 'friends'} needed to complete this task.`}
                            </p>
                        </div>

                        {/* Share module for inviting friends */}
                        <ShareModule
                            referralCode={referralCode}
                            successfulInvites={successfulInvites}
                        />
                    </div>
                )}

                {/* TASK 04 Body: VIP Community (WhatsApp Channel & Instagram) */}
                {id === 'task_share' && (
                    <div className="pt-1 space-y-3">
                        <div className="bg-[#fdfbf7] border border-[#d4af37]/30 rounded-xl p-4 sm:p-5 space-y-4">
                            <p className="text-xs sm:text-sm font-medium text-[#5d4037] leading-relaxed">
                                Connect with SwadDesh across official community channels for exclusive behind-the-scenes previews, secret tasting invites, and launch drops:
                            </p>

                            {/* Channel Action Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={handleOpenWhatsAppChannel}
                                    className="flex items-center justify-between p-3 rounded-xl border border-[#25D366]/40 bg-white hover:bg-[#25D366]/5 hover:border-[#25D366] transition-all group shadow-sm text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 text-[#128C7E] flex items-center justify-center group-hover:scale-105 transition-transform">
                                            <MessageCircle className="w-5 h-5 text-[#25D366]" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-[#2b0202]">WhatsApp Channel</div>
                                            <div className="text-[10px] text-[#5d4037]">Official Royal Updates</div>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-bold text-[#128C7E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                        Join <ExternalLink className="w-3 h-3" />
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleOpenInstagram}
                                    className="flex items-center justify-between p-3 rounded-xl border border-[#E1306C]/40 bg-white hover:bg-[#E1306C]/5 hover:border-[#E1306C] transition-all group shadow-sm text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center group-hover:scale-105 transition-transform">
                                            <Instagram className="w-5 h-5 text-[#E1306C]" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-[#2b0202]">Instagram @swaddesh.in</div>
                                            <div className="text-[10px] text-[#5d4037]">Visual Heritage Stories</div>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-bold text-[#E1306C] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                        Follow <ExternalLink className="w-3 h-3" />
                                    </span>
                                </button>
                            </div>

                            {/* Confirmation Row */}
                            <div className="pt-2 border-t border-[#d4af37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                {!isCompleted ? (
                                    <>
                                        <p className="text-[11px] text-[#8b6914] flex items-center gap-1.5">
                                            {!hasClickedChannel ? (
                                                <>
                                                    <Lock className="w-3.5 h-3.5 text-[#8b6914]" />
                                                    <span>Click <strong>Join</strong> or <strong>Follow</strong> above to unlock task confirmation.</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="w-3.5 h-3.5 text-[#1b7e3b]" />
                                                    <span className="text-[#1b7e3b] font-medium">Channel opened! Click the button to confirm.</span>
                                                </>
                                            )}
                                        </p>
                                        <button
                                            onClick={handleConfirmChannelJoined}
                                            type="button"
                                            disabled={!hasClickedChannel || isMarkingDone}
                                            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm ${
                                                hasClickedChannel
                                                    ? 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#2b0202] hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer ring-2 ring-[#ffd700]'
                                                    : 'bg-stone-200 text-stone-400 cursor-not-allowed opacity-60 border border-stone-300'
                                            }`}
                                        >
                                            <Check className="w-4 h-4 stroke-[3]" />
                                            <span>{isMarkingDone ? 'Confirming...' : "I Have Joined • Mark as Completed"}</span>
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-full flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b7e3b] bg-[#e8f5e9] border border-[#a5d6a7] px-3.5 py-1.5 rounded-xl">
                                            <Check className="w-3.5 h-3.5 stroke-[2.5]" /> VIP Community Access Confirmed
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
