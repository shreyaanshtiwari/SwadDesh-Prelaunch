import { NextResponse } from 'next/server';
import { generateReferralCode } from '@/lib/referralUtils';
import { saveMember, getMemberByEmail, getMemberByPhone, recordReferral } from '@/lib/memberStore';
import { FoundingMember, TaskId } from '@/types/foundingMember';

const GOOGLE_SHEETS_WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL || '';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, state, interests, comments, referred_by } = body;

        // 1. Basic Form Validation
        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email is required', field: 'email' }, { status: 400 });
        }

        if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
            return NextResponse.json({ error: 'Valid 10-digit Indian mobile number is required', field: 'phone' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedPhone = phone.replace(/\s/g, '');
        const finalReferralCode = generateReferralCode(normalizedEmail);

        // 2. Primary Source of Truth: Google Sheets Live Sync & Conflict Validation
        if (GOOGLE_SHEETS_WEB_APP_URL) {
            try {
                const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name.trim(),
                        email: normalizedEmail,
                        phone: normalizedPhone,
                        state: state || '',
                        interests: interests || '',
                        comments: comments || '',
                        referral_code: finalReferralCode,
                        referred_by: referred_by ? referred_by.trim() : '',
                        current_milestone: 'Early Access List',
                        timestamp: new Date().toISOString()
                    }),
                    headers: { 'Content-Type': 'text/plain' },
                    signal: AbortSignal.timeout(6000),
                });

                if (response.ok) {
                    const responseText = await response.text();
                    try {
                        const result = JSON.parse(responseText);

                        // If Google Sheet detected a conflict error on phone or email
                        if (result.status === 'error' && result.field) {
                            return NextResponse.json({
                                error: result.message || 'Validation error',
                                field: result.field,
                            }, { status: 400 });
                        }

                        if (result.status === 'success' && result.member) {
                            const raw = result.member;
                            const hasProduct = Boolean((raw.interests && raw.interests.trim()) || (interests && interests.trim()));
                            const tasks: TaskId[] = ['task_join'];
                            if (hasProduct) tasks.push('task_favourite_product');

                            const liveMember: FoundingMember = {
                                name: raw.name || name.trim(),
                                email: raw.email.toLowerCase().trim(),
                                phone: (raw.phone || normalizedPhone).toString(),
                                state: raw.state || state || '',
                                interests: raw.interests || interests || '',
                                favourite_product: raw.interests || (hasProduct ? interests.trim() : undefined),
                                comments: raw.comments || comments || '',
                                referral_code: raw.referral_code || finalReferralCode,
                                referred_by: raw.referred_by || (referred_by ? referred_by.trim() : undefined),
                                successful_referrals: typeof raw.successful_referrals === 'number' ? raw.successful_referrals : 0,
                                completed_tasks: tasks,
                                current_milestone: raw.current_milestone || 'Early Access List',
                                created_at: raw.created_at || new Date().toISOString(),
                            };

                            const saved = await saveMember(liveMember);
                            if (referred_by && referred_by.trim() && !result.is_existing) {
                                await recordReferral(referred_by, normalizedEmail, normalizedPhone);
                            }

                            return NextResponse.json({
                                success: true,
                                is_existing: Boolean(result.is_existing),
                                message: result.is_existing
                                    ? `Already registered! Signed in as ${saved.email} (${saved.phone}).`
                                    : 'You are successfully added to the early access list.',
                                member: saved,
                            }, { status: 200 });
                        }
                    } catch (e) {
                        // Fallback to local handling if non-JSON
                    }
                }
            } catch (sheetError) {
                console.warn('Google Sheets forward error:', sheetError);
            }
        }

        // 3. Fallback Local Storage (when Google Sheets is offline)
        const cleanPhone10 = normalizedPhone.replace(/\D/g, '').slice(-10);
        const memberByEmail = getMemberByEmail(normalizedEmail);
        const memberByPhone = getMemberByPhone(normalizedPhone);

        if (memberByPhone && memberByPhone.email.toLowerCase().trim() !== normalizedEmail) {
            return NextResponse.json({
                error: `This mobile number is already registered under ${memberByPhone.email}. Please use that email or another number.`,
                field: 'phone',
            }, { status: 400 });
        }

        if (memberByEmail && memberByEmail.phone.replace(/\D/g, '').slice(-10) !== cleanPhone10) {
            return NextResponse.json({
                error: `This email address is already registered with mobile number ending in ...${memberByEmail.phone.slice(-4)}.`,
                field: 'email',
            }, { status: 400 });
        }

        let member: FoundingMember | null = memberByEmail && memberByPhone ? memberByEmail : (memberByEmail || memberByPhone || null);
        let isExisting = Boolean(member);

        if (!member) {
            const hasProduct = Boolean(interests && interests.trim());
            const initialTasks: TaskId[] = ['task_join'];
            if (hasProduct) initialTasks.push('task_favourite_product');

            member = await saveMember({
                name: name.trim(),
                email: normalizedEmail,
                phone: normalizedPhone,
                state: state || '',
                interests: interests || '',
                favourite_product: hasProduct ? interests.trim() : undefined,
                comments: comments || '',
                referral_code: finalReferralCode,
                referred_by: referred_by ? referred_by.trim() : undefined,
                successful_referrals: 0,
                completed_tasks: initialTasks,
                current_milestone: 'Early Access List',
                created_at: new Date().toISOString(),
            });

            if (referred_by && referred_by.trim()) {
                await recordReferral(referred_by, normalizedEmail, normalizedPhone);
            }
        }

        return NextResponse.json({
            success: true,
            is_existing: isExisting,
            message: isExisting
                ? `Already registered! Signed in as ${member.email} (${member.phone}).`
                : 'You are successfully added to the early access list.',
            member: member,
        }, { status: 200 });

    } catch (error: any) {
        console.error('Waitlist API Error details:', error);
        return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
    }
}
