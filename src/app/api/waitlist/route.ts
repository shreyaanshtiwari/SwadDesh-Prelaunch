import { NextResponse } from 'next/server';

// 1. You will need to replace this URL with your actual Google Apps Script Web App URL later
const GOOGLE_SHEETS_WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL || '';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, state, interests, comments } = body;

        // 1. Validation
        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
            return NextResponse.json({ error: 'Valid 10-digit Indian mobile number is required' }, { status: 400 });
        }

        // 2. Storage to Google Sheets via Web App URL
        if (!GOOGLE_SHEETS_WEB_APP_URL) {
            console.warn("GOOGLE_SHEETS_WEB_APP_URL is not set. Data is NOT being saved to Google Sheets.");
            return NextResponse.json({
                success: true,
                message: 'You are successfully added to the early access list. You will receive launch updates and exclusive discounts.'
            }, { status: 201 });
        }

        const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
            method: 'POST',
            body: JSON.stringify({
                name: name.trim(),
                email: email.toLowerCase().trim(),
                phone: phone.replace(/\s/g, ''),
                state: state || '',
                interests: interests || '',
                comments: comments || '',
                timestamp: new Date().toISOString()
            }),
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        if (!response.ok) {
            throw new Error(`Google Sheets API responded with status: ${response.status}`);
        }

        const responseText = await response.text();

        try {
            const result = JSON.parse(responseText);
            if (result.status === 'error') {
                if (result.message && result.message.includes('already exists')) {
                    return NextResponse.json({ error: 'This email is already on the waitlist!' }, { status: 400 });
                }
                throw new Error(result.message || 'Unknown error from Google Sheets');
            }
        } catch (e) {
            console.log("Non-JSON response from Google Script (likely a redirect success):", responseText.substring(0, 100));
        }

        // 3. Success Response
        return NextResponse.json({
            success: true,
            message: 'You are successfully added to the early access list. You will receive launch updates and exclusive discounts.'
        }, { status: 201 });

    } catch (error: any) {
        console.error('Waitlist API Error details:', error);
        return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
    }
}
