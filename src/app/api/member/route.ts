import { NextResponse } from 'next/server';
import { findMember, updateFavouriteProduct, markShareCompleted, getMemberByEmail, getMemberByCode, saveMember } from '@/lib/memberStore';
import { generateReferralCode } from '@/lib/referralUtils';
import { FoundingMember, TaskId } from '@/types/foundingMember';

const GOOGLE_SHEETS_WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL || '';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const email = searchParams.get('email');

        if (!code && !email) {
            return NextResponse.json({ error: 'Referral code or email is required' }, { status: 400 });
        }

        const queryEmail = email ? email.toLowerCase().trim() : undefined;
        const queryCode = code ? code.toUpperCase().trim() : undefined;

        // 1. Direct Lookup with Google Sheets (Single Source of Truth)
        if (GOOGLE_SHEETS_WEB_APP_URL) {
            try {
                const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'lookup',
                        email: queryEmail,
                        code: queryCode,
                    }),
                    headers: { 'Content-Type': 'text/plain' },
                    signal: AbortSignal.timeout(4000),
                });

                if (response.ok) {
                    const text = await response.text();
                    try {
                        const data = JSON.parse(text);
                        if (data.status === 'success' && data.member) {
                            const raw = data.member;
                            const refCode = raw.referral_code || generateReferralCode(raw.email);
                            const hasProduct = Boolean(raw.interests && raw.interests.trim());
                            const tasks: TaskId[] = ['task_join'];
                            if (hasProduct) tasks.push('task_favourite_product');

                            const liveReferrals = typeof raw.successful_referrals === 'number' ? raw.successful_referrals : 0;
                            if (liveReferrals >= 3) tasks.push('task_invite_friends');

                            const syncedMember: FoundingMember = {
                                name: raw.name || 'Founding Member',
                                email: raw.email.toLowerCase().trim(),
                                phone: (raw.phone || '').toString(),
                                state: raw.state || '',
                                interests: raw.interests || '',
                                favourite_product: raw.interests || undefined,
                                comments: raw.comments || '',
                                referral_code: refCode,
                                referred_by: raw.referred_by || undefined,
                                successful_referrals: liveReferrals,
                                completed_tasks: tasks,
                                current_milestone: raw.current_milestone || (liveReferrals >= 25 ? "Founder's Box" : liveReferrals >= 10 ? "Founding Member Benefits" : liveReferrals >= 3 ? "Priority Early Access" : "Early Access List"),
                                created_at: raw.created_at || new Date().toISOString(),
                            };
                            const saved = await saveMember(syncedMember);
                            return NextResponse.json({ success: true, member: saved });
                        } else if (data.status === 'error') {
                            // If Google Sheet explicitly confirms Member not found, reject with 404
                            return NextResponse.json({ error: 'Member not found. Please check your email/code or join the waitlist.' }, { status: 404 });
                        }
                    } catch (parseErr) {
                        // fallback to local handling if non-JSON
                    }
                }
            } catch (e) {
                console.warn('Google Sheets live lookup notice:', e);
            }
        }

        // 2. Fallback to Local Store if Google Sheets offline
        let member: FoundingMember | null = null;
        if (code) {
            member = getMemberByCode(code);
        } else if (email) {
            member = getMemberByEmail(email);
        }

        if (!member) {
            return NextResponse.json({ error: 'Member not found. Please check your email/code or join the waitlist.' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            member,
        });
    } catch (error) {
        console.error('Member lookup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, identifier, product } = body;

        if (!identifier) {
            return NextResponse.json({ error: 'Member identifier (email or code) is required' }, { status: 400 });
        }

        let updatedMember = null;

        if (action === 'favourite_product') {
            if (!product || !product.trim()) {
                return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
            }
            updatedMember = await updateFavouriteProduct(identifier, product.trim());
        } else if (action === 'share_completed') {
            updatedMember = await markShareCompleted(identifier);
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        if (!updatedMember) {
            return NextResponse.json({ error: 'Member not found to update' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Task updated successfully',
            member: updatedMember,
        });
    } catch (error) {
        console.error('Member update error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
