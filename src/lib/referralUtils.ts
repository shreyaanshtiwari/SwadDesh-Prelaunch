import { FOUNDING_MILESTONES_CONFIG } from '@/data/foundingMemberConfig';

/**
 * Generates a deterministic unique 6-character referral code prefixed with SD-
 * derived from the user's email, guaranteeing exact match across website & Google Sheets.
 */
export function generateReferralCode(email?: string): string {
    const clean = (email || '').toLowerCase().trim();
    if (!clean) {
        return 'SD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < clean.length; i++) {
        const ch = clean.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    let combined = Math.abs(h1) ^ Math.abs(h2);
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars[combined % chars.length];
        combined = Math.floor(combined / chars.length) ^ (h1 >>> (i * 4));
        combined = Math.abs(combined);
    }
    return `SD-${code}`;
}

/**
 * Builds the shareable referral link
 */
export function getReferralLink(referralCode: string, baseUrl?: string): string {
    const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://swaddesh.in');
    return `${origin}/?ref=${encodeURIComponent(referralCode)}`;
}

/**
 * Evaluates the highest unlocked milestone based on invite count
 */
export function getMilestoneByCount(successfulReferrals: number): string {
    let current = 'Early Access List';
    for (const tier of FOUNDING_MILESTONES_CONFIG) {
        if (successfulReferrals >= tier.requiredInvites) {
            current = tier.title;
        }
    }
    return current;
}

/**
 * Cleans phone number by removing spaces, dashes, +91
 */
export function normalizePhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
        return digits.substring(2);
    }
    return digits;
}
