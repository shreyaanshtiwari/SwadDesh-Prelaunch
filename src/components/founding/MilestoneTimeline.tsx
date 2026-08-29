'use client';

import React from 'react';
import { FOUNDING_MILESTONES_CONFIG, LAUNCH_DISCLAIMER } from '@/data/foundingMemberConfig';
import { Sparkles, Check, Lock, ShieldCheck } from 'lucide-react';

interface MilestoneTimelineProps {
    successfulInvites: number;
    currentMilestone: string;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
    successfulInvites,
    currentMilestone,
}) => {
    return (
        <div className="bg-gradient-to-br from-[#2b0202] to-[#1a0101] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 text-[#fef5e7] shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none rounded-full"></div>
            
            <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d4af37]/20 pb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#ffd700]" />
                            <span className="text-[11px] uppercase tracking-[2px] font-bold text-[#ffd700] font-heading">
                                Milestone Privileges
                            </span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold font-heading text-[#fef5e7] mt-1">
                            Founding Member Roadmap
                        </h4>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-[#d4af37]/15 border border-[#d4af37]/40 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
                        <ShieldCheck className="w-4 h-4 text-[#ffd700]" />
                        <span className="text-xs font-bold tracking-wide text-[#ffd700]">
                            {successfulInvites} {successfulInvites === 1 ? 'Verified Invite' : 'Verified Invites'}
                        </span>
                    </div>
                </div>

                <p className="text-sm text-[#e6d5c3]/90 font-light leading-relaxed">
                    Bring your people to SwadDesh and unlock exclusive benefits before launch. Each milestone elevates your founding standing.
                </p>

                {/* Milestone Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {FOUNDING_MILESTONES_CONFIG.map((tier, idx) => {
                        const isUnlocked = successfulInvites >= tier.requiredInvites;
                        const isNextTarget = !isUnlocked && (idx === 0 || successfulInvites >= FOUNDING_MILESTONES_CONFIG[idx - 1].requiredInvites);

                        return (
                            <div
                                key={tier.id}
                                className={`relative rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                                    isUnlocked
                                        ? 'bg-gradient-to-b from-[#d4af37]/20 to-[#800020]/40 border-[#ffd700] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                                        : isNextTarget
                                        ? 'bg-white/5 border-[#d4af37]/50 hover:border-[#ffd700]/70'
                                        : 'bg-black/20 border-white/10 opacity-70'
                                }`}
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase font-bold tracking-[1.5px] text-[#ffd700]/80">
                                            {tier.badge}
                                        </span>
                                        {isUnlocked ? (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#d4af37] text-[#2b0202] px-2 py-0.5 rounded-full">
                                                <Check className="w-3 h-3 stroke-[3]" /> Unlocked
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#e6d5c3]/60">
                                                <Lock className="w-3 h-3" /> Locked
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h5 className="font-heading font-bold text-base text-[#fef5e7]">
                                            {tier.title}
                                        </h5>
                                        <p className="text-xs text-[#e6d5c3]/80 leading-relaxed mt-1">
                                            {tier.description}
                                        </p>
                                    </div>

                                    {/* Perks List */}
                                    <ul className="space-y-1.5 pt-2 border-t border-white/10">
                                        {tier.perks.map((perk, pIdx) => (
                                            <li key={pIdx} className="text-[11px] text-[#f4ecd8] flex items-start gap-1.5">
                                                <span className="text-[#ffd700] mt-0.5">•</span>
                                                <span className="leading-tight">{perk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Progress Footer within card */}
                                <div className="mt-4 pt-3 border-t border-white/10">
                                    {isUnlocked ? (
                                        <p className="text-[11px] font-semibold text-[#ffd700] flex items-center gap-1">
                                            ✓ Privileges Confirmed
                                        </p>
                                    ) : (
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px] text-[#e6d5c3]/70">
                                                <span>Progress</span>
                                                <span>{successfulInvites}/{tier.requiredInvites}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#d4af37] to-[#ffd700] transition-all duration-500 rounded-full"
                                                    style={{ width: `${Math.min(100, (successfulInvites / tier.requiredInvites) * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-[#e6d5c3]/60 italic text-center pt-2">
                    * {LAUNCH_DISCLAIMER}
                </p>
            </div>
        </div>
    );
};
