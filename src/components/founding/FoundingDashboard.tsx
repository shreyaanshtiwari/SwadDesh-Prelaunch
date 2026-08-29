'use client';

import React, { useState, useEffect } from 'react';
import { FoundingMember, TaskId } from '@/types/foundingMember';
import { FOUNDING_TASKS_CONFIG } from '@/data/foundingMemberConfig';
import { TaskItem } from './TaskItem';
import { MilestoneTimeline } from './MilestoneTimeline';
import { Sparkles, Crown, CheckCircle2, Copy, Check, RotateCcw, Award } from 'lucide-react';
import { getReferralLink } from '@/lib/referralUtils';

interface FoundingDashboardProps {
    member: FoundingMember;
    onReset?: () => void;
    onUpdateMember?: (member: FoundingMember) => void;
    existingNotice?: string | null;
}

export const FoundingDashboard: React.FC<FoundingDashboardProps> = ({
    member: initialMember,
    onReset,
    onUpdateMember,
    existingNotice,
}) => {
    const [member, setMember] = useState<FoundingMember>(initialMember);
    const [codeCopied, setCodeCopied] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showNotice, setShowNotice] = useState(Boolean(existingNotice));

    // Synchronize local state with props
    useEffect(() => {
        setMember(initialMember);
    }, [initialMember]);

    // Smooth scroll to top of dashboard card when it mounts
    useEffect(() => {
        const el = document.getElementById('founding-dashboard-card') || document.getElementById('early-access');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    // Total tasks count
    const totalTasks = 4;
    const completedTasksCount = member.completed_tasks.length;
    const progressPercentage = Math.min(100, Math.round((completedTasksCount / totalTasks) * 100));

    // Handle Task 02 save
    const handleSaveFavouriteProduct = async (product: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/member', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'favourite_product',
                    identifier: member.referral_code || member.email,
                    product,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.member) {
                    setMember(data.member);
                    if (onUpdateMember) onUpdateMember(data.member);
                    // Also save to localStorage
                    localStorage.setItem('swaddesh_member_data', JSON.stringify(data.member));
                    return true;
                }
            }
        } catch (e) {
            console.error('Error saving favourite product:', e);
        }

        // Fallback local update
        const updatedTasks = new Set(member.completed_tasks);
        updatedTasks.add('task_favourite_product');
        const updated: FoundingMember = {
            ...member,
            favourite_product: product,
            completed_tasks: Array.from(updatedTasks),
        };
        setMember(updated);
        if (onUpdateMember) onUpdateMember(updated);
        localStorage.setItem('swaddesh_member_data', JSON.stringify(updated));
        return true;
    };

    // Handle Task 04 share completion
    const handleMarkShareCompleted = async () => {
        try {
            const res = await fetch('/api/member', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'share_completed',
                    identifier: member.referral_code || member.email,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.member) {
                    setMember(data.member);
                    if (onUpdateMember) onUpdateMember(data.member);
                    localStorage.setItem('swaddesh_member_data', JSON.stringify(data.member));
                    return;
                }
            }
        } catch (e) {
            console.error('Error recording share completion:', e);
        }

        // Fallback local update
        const updatedTasks = new Set(member.completed_tasks);
        updatedTasks.add('task_share');
        const updated: FoundingMember = {
            ...member,
            completed_tasks: Array.from(updatedTasks),
        };
        setMember(updated);
        if (onUpdateMember) onUpdateMember(updated);
        localStorage.setItem('swaddesh_member_data', JSON.stringify(updated));
    };

    // Refresh member data
    const refreshMemberData = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch(`/api/member?code=${encodeURIComponent(member.referral_code)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.member) {
                    setMember(data.member);
                    if (onUpdateMember) onUpdateMember(data.member);
                    localStorage.setItem('swaddesh_member_data', JSON.stringify(data.member));
                }
            }
        } catch (err) {
            console.error('Failed to sync member stats:', err);
        } finally {
            setIsRefreshing(false);
        }
    };

    const copyMemberCode = () => {
        navigator.clipboard.writeText(member.referral_code);
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
    };

    return (
        <div id="founding-dashboard-card" className="relative z-10 w-full max-w-4xl mx-auto text-left space-y-8 animate-fadeIn scroll-mt-24">
            {/* Existing Member Notice Banner */}
            {existingNotice && showNotice && (
                <div className="bg-[#fff9e6] border-2 border-[#d4af37] rounded-2xl p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 shadow-lg text-[#2b0202] animate-fadeIn">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d4af37]/25 border border-[#d4af37] flex items-center justify-center flex-shrink-0 text-[#8b6914] mt-0.5 sm:mt-0">
                            <Sparkles className="w-4 h-4 text-[#8b6914]" />
                        </div>
                        <div className="space-y-0.5 text-left">
                            <h4 className="text-xs sm:text-sm font-bold font-heading text-[#4a0404] uppercase tracking-wider">
                                Already Registered on Early Access
                            </h4>
                            <p className="text-xs text-[#5d4037] leading-relaxed">
                                {existingNotice}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowNotice(false)}
                        type="button"
                        className="text-stone-400 hover:text-[#4a0404] text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-stone-200 bg-white flex-shrink-0 cursor-pointer"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* VIP Welcome Header */}
            <div className="bg-gradient-to-b from-[#2b0202] to-[#3a0303] border-2 border-[#d4af37] rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-[0_25px_70px_rgba(43,2,2,0.4)]">
                {/* Decorative corner ornaments */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/60 pointer-events-none"></div>
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/60 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/60 pointer-events-none"></div>
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/60 pointer-events-none"></div>

                <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                    {/* Crown Icon */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(212,175,55,0.4)] border-4 border-[#2b0202]">
                        <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#2b0202] stroke-[1.8]" />
                    </div>

                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/50 px-4 py-1 rounded-full">
                            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                            <span className="text-[#ffd700] font-bold text-xs uppercase tracking-[2px] font-heading">
                                Founding Access
                            </span>
                        </div>
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-[#fef5e7]">
                            Welcome to SwadDesh 🎉
                        </h3>
                        <p className="text-[#f4ecd8] text-base sm:text-lg font-body font-light">
                            You're officially on the Early Access list.
                        </p>
                    </div>

                    {/* Founding Member Invitation Header */}
                    <div className="pt-2 border-t border-[#d4af37]/30 space-y-2">
                        <p className="text-lg sm:text-xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#d4af37] to-[#ffd700]">
                            Want to unlock exclusive Founding Member benefits?
                        </p>
                        <p className="text-xs sm:text-sm text-[#e6d5c3]/90 font-light max-w-xl mx-auto leading-relaxed">
                            Bring your people to SwadDesh and unlock exclusive benefits before launch. Complete the simple tasks below to elevate your standing.
                        </p>
                    </div>

                    {/* Live Progress Bar */}
                    <div className="pt-4 max-w-md mx-auto space-y-2">
                        <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                            <span className="text-[#ffd700] uppercase tracking-wider font-heading">
                                {completedTasksCount} of {totalTasks} tasks completed
                            </span>
                            <span className="text-[#fef5e7] font-mono">{progressPercentage}%</span>
                        </div>
                        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-[#d4af37]/40 p-0.5 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-[#d4af37] via-[#ffd700] to-[#d4af37] rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Member Card Bar */}
            <div className="bg-white rounded-2xl border border-[#d4af37]/50 p-5 sm:p-6 shadow-[0_10px_30px_rgba(107,10,9,0.06)] grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b6914]">
                        Member
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#4a0404] truncate font-heading">
                        {member.name}
                    </p>
                    <p className="text-[11px] text-[#5d4037] truncate">{member.state || 'India'}</p>
                </div>

                <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b6914]">
                        Access Status
                    </span>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1b7e3b]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirmed</span>
                    </div>
                    <p className="text-[11px] text-[#5d4037]">Inaugural Tier</p>
                </div>

                <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b6914]">
                        Verified Invites
                    </span>
                    <p className="text-sm sm:text-base font-bold text-[#8f0f0d] font-mono">
                        {member.successful_referrals || 0}
                    </p>
                    <p className="text-[11px] text-[#5d4037]">
                        {member.successful_referrals >= 3 ? 'Priority Unlocked' : `${3 - (member.successful_referrals || 0)} more to Priority`}
                    </p>
                </div>

                <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b6914]">
                        Private Invite ID
                    </span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#4a0404] bg-[#fdfbf7] border border-[#d4af37]/40 px-2 py-0.5 rounded">
                            {member.referral_code}
                        </span>
                        <button
                            onClick={copyMemberCode}
                            type="button"
                            title="Copy Code"
                            className="text-[#8b6914] hover:text-[#4a0404] p-1 transition-colors"
                        >
                            {codeCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                    </div>
                    <button
                        onClick={refreshMemberData}
                        type="button"
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-[#8b6914] hover:underline"
                    >
                        <RotateCcw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span>{isRefreshing ? 'Syncing...' : 'Sync stats'}</span>
                    </button>
                </div>
            </div>

            {/* Task Checklist Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[2px] text-[#8b6914] font-heading">
                            Founding Member Checklist
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold font-heading text-[#4a0404]">
                            Four Steps to Full Founding Standing
                        </h4>
                    </div>
                    <span className="text-xs font-bold font-mono text-[#8f0f0d] bg-[#d4af37]/20 border border-[#d4af37]/40 px-3 py-1 rounded-full">
                        {completedTasksCount} / {totalTasks} Completed
                    </span>
                </div>

                {/* The 4 Tasks */}
                <div className="space-y-4">
                    {FOUNDING_TASKS_CONFIG.map((task) => {
                        const isTaskCompleted = member.completed_tasks.includes(task.id as TaskId);

                        return (
                            <TaskItem
                                key={task.id}
                                id={task.id as TaskId}
                                number={task.number}
                                title={task.title}
                                description={task.description}
                                isCompleted={isTaskCompleted}
                                badge={task.badge}
                                referralCode={member.referral_code}
                                successfulInvites={member.successful_referrals || 0}
                                favouriteProductValue={member.favourite_product || member.interests}
                                onSaveFavouriteProduct={handleSaveFavouriteProduct}
                                onMarkShareCompleted={handleMarkShareCompleted}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Milestone Roadmap */}
            <MilestoneTimeline
                successfulInvites={member.successful_referrals || 0}
                currentMilestone={member.current_milestone}
            />

            {/* Footer Navigation / Reset */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#d4af37]/30 text-xs text-[#5d4037]">
                <p>
                    Signed in as <strong className="text-[#4a0404]">{member.email}</strong>
                    {member.phone ? <span className="text-[#8b6914] font-mono"> ({member.phone})</span> : ''}
                </p>
                {onReset && (
                    <button
                        onClick={onReset}
                        type="button"
                        className="text-[#8f0f0d] hover:text-[#4a0404] font-semibold underline underline-offset-4 transition-colors cursor-pointer"
                    >
                        Register another account / Sign out
                    </button>
                )}
            </div>
        </div>
    );
};
