import fs from 'fs';
import path from 'path';
import { FoundingMember, TaskId } from '@/types/foundingMember';
import { getMilestoneByCount, normalizePhone } from './referralUtils';

// In-memory cache for fast lookups across requests in Node runtime
const memberCacheByEmail = new Map<string, FoundingMember>();
const memberCacheByCode = new Map<string, FoundingMember>();
// Map to track who referred whom: Set of "referrerCode:refereeEmail"
const referralCredits = new Set<string>();

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'members.json');

let isInitialized = false;

function ensureDataFile() {
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify({ members: [], credits: [] }, null, 2), 'utf-8');
        }
    } catch (e) {
        console.warn('Could not initialize local .data directory:', e);
    }
}

function loadFromDisk() {
    try {
        ensureDataFile();
        if (fs.existsSync(DATA_FILE)) {
            const raw = fs.readFileSync(DATA_FILE, 'utf-8');
            const data = JSON.parse(raw);
            memberCacheByEmail.clear();
            memberCacheByCode.clear();
            referralCredits.clear();

            if (Array.isArray(data.members)) {
                for (const m of data.members) {
                    memberCacheByEmail.set(m.email.toLowerCase().trim(), m);
                    if (m.referral_code) {
                        memberCacheByCode.set(m.referral_code.toUpperCase().trim(), m);
                    }
                }
            }
            if (Array.isArray(data.credits)) {
                for (const c of data.credits) {
                    referralCredits.add(c);
                }
            }
        }
    } catch (e) {
        console.warn('Failed to read members.json from disk:', e);
    }
}

function persistToDisk() {
    try {
        ensureDataFile();
        const allMembers = Array.from(memberCacheByEmail.values());
        const allCredits = Array.from(referralCredits);
        fs.writeFileSync(
            DATA_FILE,
            JSON.stringify({ members: allMembers, credits: allCredits }, null, 2),
            'utf-8'
        );
    } catch (e) {
        console.warn('Failed to write members.json to disk:', e);
    }
}

function enrichMemberWithStats(member: FoundingMember): FoundingMember {
    const allMembers = Array.from(memberCacheByEmail.values());
    const memberCode = member.referral_code.toUpperCase().trim();
    const memberEmail = member.email.toLowerCase().trim();

    // Dynamically calculate verified referral signups from all registered members
    const referees = allMembers.filter(m => {
        if (m.email.toLowerCase().trim() === memberEmail) return false;
        if (!m.referred_by) return false;
        const refBy = m.referred_by.toUpperCase().trim();
        return refBy === memberCode || refBy.startsWith(memberCode) || memberCode.startsWith(refBy);
    });

    const realCount = typeof member.successful_referrals === 'number' ? member.successful_referrals : referees.length;
    const tasks = new Set<TaskId>(member.completed_tasks || ['task_join']);
    
    if (realCount >= 3) {
        tasks.add('task_invite_friends');
    } else {
        tasks.delete('task_invite_friends');
    }
    if (member.favourite_product || member.interests) {
        tasks.add('task_favourite_product');
    }

    return {
        ...member,
        successful_referrals: realCount,
        completed_tasks: Array.from(tasks),
        current_milestone: getMilestoneByCount(realCount),
    };
}

export function getMemberByEmail(email: string): FoundingMember | null {
    loadFromDisk();
    const found = memberCacheByEmail.get(email.toLowerCase().trim());
    return found ? enrichMemberWithStats(found) : null;
}

export function getMemberByPhone(phone: string): FoundingMember | null {
    loadFromDisk();
    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone) return null;
    for (const m of memberCacheByEmail.values()) {
        if (m.phone && normalizePhone(m.phone) === cleanPhone) {
            return enrichMemberWithStats(m);
        }
    }
    return null;
}

export function getMemberByCode(code: string): FoundingMember | null {
    loadFromDisk();
    if (!code) return null;
    const clean = code.toUpperCase().trim().replace(/[^A-Z0-9-]/g, '');

    // 1. Direct match
    let found = memberCacheByCode.get(clean);
    if (found) return enrichMemberWithStats(found);

    // 2. Missing "SD-" prefix
    if (!clean.startsWith('SD-')) {
        found = memberCacheByCode.get(`SD-${clean}`);
        if (found) return enrichMemberWithStats(found);
    }

    // 3. Trailing character tolerance (e.g. SD-87QE9L0 -> SD-87QE9L)
    if (clean.length > 9 && clean.startsWith('SD-')) {
        const truncated = clean.substring(0, 9);
        found = memberCacheByCode.get(truncated);
        if (found) return enrichMemberWithStats(found);
    }

    // 4. Scan all members
    for (const m of memberCacheByCode.values()) {
        const mCode = m.referral_code.toUpperCase().trim();
        if (clean.includes(mCode) || mCode.includes(clean)) {
            return enrichMemberWithStats(m);
        }
    }

    return null;
}

export function findMember(identifier: string): FoundingMember | null {
    loadFromDisk();
    const cleanId = identifier.trim();
    if (cleanId.includes('@')) {
        return getMemberByEmail(cleanId);
    }
    return getMemberByCode(cleanId);
}

export async function saveMember(member: FoundingMember): Promise<FoundingMember> {
    loadFromDisk();
    const normalizedEmail = member.email.toLowerCase().trim();
    const normalizedCode = member.referral_code.toUpperCase().trim();

    const enriched = enrichMemberWithStats({
        ...member,
        email: normalizedEmail,
        referral_code: normalizedCode,
    });

    memberCacheByEmail.set(normalizedEmail, enriched);
    memberCacheByCode.set(normalizedCode, enriched);
    persistToDisk();

    return enriched;
}

/**
 * Validates and records a successful referral signup
 */
export async function recordReferral(
    referrerCode: string,
    refereeEmail: string,
    refereePhone: string
): Promise<{ success: boolean; referrer?: FoundingMember }> {
    loadFromDisk();
    const cleanRefereeEmail = refereeEmail.toLowerCase().trim();

    const referrer = getMemberByCode(referrerCode);
    if (!referrer) {
        return { success: false };
    }

    // Prevent exact self-referral (same email)
    if (referrer.email.toLowerCase().trim() === cleanRefereeEmail) {
        return { success: false };
    }

    const cleanCode = referrer.referral_code.toUpperCase().trim();
    const creditKey = `${cleanCode}:${cleanRefereeEmail}`;
    referralCredits.add(creditKey);

    const updated = enrichMemberWithStats(referrer);
    await saveMember(updated);

    return { success: true, referrer: updated };
}

/**
 * Updates a member's favourite product (Task 02)
 */
export async function updateFavouriteProduct(
    identifier: string,
    favouriteProduct: string
): Promise<FoundingMember | null> {
    loadFromDisk();
    const member = findMember(identifier);
    if (!member) return null;

    member.favourite_product = favouriteProduct.trim();
    const tasks = new Set(member.completed_tasks || []);
    tasks.add('task_favourite_product');
    member.completed_tasks = Array.from(tasks);

    return await saveMember(member);
}

/**
 * Marks Task 04 (Share SwadDesh) as completed
 */
export async function markShareCompleted(identifier: string): Promise<FoundingMember | null> {
    loadFromDisk();
    const member = findMember(identifier);
    if (!member) return null;

    const tasks = new Set(member.completed_tasks || []);
    tasks.add('task_share');
    member.completed_tasks = Array.from(tasks);

    return await saveMember(member);
}
