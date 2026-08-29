export type TaskId = 'task_join' | 'task_favourite_product' | 'task_invite_friends' | 'task_share';

export interface TaskItem {
    id: TaskId;
    number: string;
    title: string;
    description: string;
    isCompleted: boolean;
    badge?: string;
    completedDetail?: string;
}

export interface MilestoneTier {
    id: string;
    requiredInvites: number;
    title: string;
    badge: string;
    description: string;
    perks: string[];
    isUnlocked: boolean;
    isCurrent: boolean;
}

export interface FoundingMember {
    name: string;
    email: string;
    phone: string;
    state: string;
    interests: string;
    comments?: string;
    favourite_product?: string;
    referral_code: string;
    referred_by?: string;
    successful_referrals: number;
    completed_tasks: TaskId[];
    current_milestone: string;
    created_at: string;
}

export interface WaitlistApiResponse {
    success: boolean;
    message: string;
    member?: FoundingMember;
    error?: string;
}

export interface MemberApiResponse {
    success: boolean;
    member?: FoundingMember;
    error?: string;
    message?: string;
}
