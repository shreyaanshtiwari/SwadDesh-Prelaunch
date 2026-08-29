import { MilestoneTier, TaskItem } from '@/types/foundingMember';

export const FOUNDING_TASKS_CONFIG: Omit<TaskItem, 'isCompleted' | 'completedDetail'>[] = [
    {
        id: 'task_join',
        number: '01',
        title: 'Join SwadDesh Early Access',
        description: 'Secured automatically upon joining our inaugural waitlist. You have officially unlocked Early Access.',
        badge: 'Early Access ✓',
    },
    {
        id: 'task_favourite_product',
        number: '02',
        title: 'Tell us your favourite regional Indian product',
        description: 'What delicacy or traditional ingredient from your home region would you love to discover on SwadDesh?',
        badge: '1 min',
    },
    {
        id: 'task_invite_friends',
        number: '03',
        title: 'Invite 3 friends to unlock Founding Member Privileges',
        description: 'Share your private invite link. Unlocks exclusive Founding Member Privileges as soon as 3 friends successfully join the waitlist.',
        badge: 'Founding Privileges',
    },
    {
        id: 'task_share',
        number: '04',
        title: 'Join Official WhatsApp Channel & Instagram',
        description: 'Stay in our royal inner circle for behind-the-scenes previews, secret tasting invites, and official launch announcements.',
        badge: 'VIP Community',
    },
];

export const FOUNDING_MILESTONES_CONFIG: Omit<MilestoneTier, 'isUnlocked' | 'isCurrent'>[] = [
    {
        id: 'tier_founding_benefits',
        requiredInvites: 3,
        title: 'Founding Member Privileges',
        badge: 'Tier 01 • 3 Invites',
        description: 'Unlock exclusive launch-day founding rates, priority dispatch on first-batch royal delicacies, and Founding Member recognition.',
        perks: [
            'Exclusive launch-day founding rates & discounts',
            'Priority dispatch on first-batch royal delicacies',
            'Founding Member status badge on your future account',
        ],
    },
    {
        id: 'tier_connoisseur_club',
        requiredInvites: 10,
        title: 'Royal Connoisseur Club',
        badge: 'Tier 02 • 10 Invites',
        description: 'Elevate to VIP standing with private masterclasses with heritage culinary masters and dedicated concierge support.',
        perks: [
            'Invitations to virtual tasting masterclasses with heritage culinary masters',
            'Behind-the-scenes seasonal previews',
            'Dedicated customer concierge support',
        ],
    },
    {
        id: 'tier_founders_box',
        requiredInvites: 25,
        title: "Founder's Box Eligibility",
        badge: 'Tier 03 • 25 Invites',
        description: 'Eligibility for a complimentary, hand-curated inaugural Royal Gift Box featuring rare regional treasures.',
        perks: [
            'Complimentary inaugural Royal Gift Box delivered to your doorstep at launch',
            'Exclusive early sample testing of upcoming regional delicacies',
            'Lifetime Founding Council recognition',
        ],
    },
];

export const SHARE_COPY = {
    defaultText: 'I just joined SwadDesh to rediscover the authentic, royal heritage flavors of Bharat. Check out their inaugural collection:',
    whatsappText: 'Namaste! I just reserved my spot for SwadDesh to discover authentic regional Indian delicacies straight from their heritage origins. Claim your invitation here: ',
    twitterText: 'Rediscovering authentic regional Indian delicacies with @SwadDesh. Joined the early access list: ',
};

export const LAUNCH_DISCLAIMER = 'All Founding Member privileges, milestones, and reward eligibility are subject to final launch terms and product availability.';
