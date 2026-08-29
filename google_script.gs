/**
 * Google Apps Script to handle Waitlist Form Submissions & Lookups
 * Saves data to Google Sheets, provides lookup by email/referral code, and sends confirmation email.
 */

// Deterministic Referral Code Generator (Identical to Website algorithm)
function generateReferralCodeForEmail(email) {
  const clean = (email || '').toLowerCase().trim();
  if (!clean) return 'SD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
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
  return 'SD-' + code;
}

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const waitlistSheet = ss.getActiveSheet();
    const emailToFind = (e.parameter.email || '').toLowerCase().trim();
    const codeToFind = (e.parameter.code || '').toUpperCase().trim();

    if (!emailToFind && !codeToFind) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Email or code parameter required'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const lastRow = waitlistSheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Member not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Read columns A through K (11 columns)
    const data = waitlistSheet.getRange(2, 1, lastRow - 1, 11).getValues();
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowEmail = (row[2] || '').toString().toLowerCase().trim();
      const rowCode = (row[8] || '').toString().toUpperCase().trim();

      if ((emailToFind && rowEmail === emailToFind) || (codeToFind && (rowCode === codeToFind || generateReferralCodeForEmail(rowEmail) === codeToFind))) {
        let refCode = rowCode;
        if (!refCode) {
          refCode = generateReferralCodeForEmail(rowEmail);
          waitlistSheet.getRange(i + 2, 9).setValue(refCode);
        }

        // Count active referrals in Google Sheet
        let activeReferrals = 0;
        for (let j = 0; j < data.length; j++) {
          if (j === i) continue;
          const otherRefBy = (data[j][9] || '').toString().toUpperCase().trim();
          if (otherRefBy && (otherRefBy === refCode || otherRefBy.startsWith(refCode) || refCode.startsWith(otherRefBy))) {
            activeReferrals++;
          }
        }

        return ContentService.createTextOutput(JSON.stringify({
          'status': 'success',
          'member': {
            'name': row[1] || 'Founding Member',
            'email': rowEmail,
            'phone': (row[3] || '').toString(),
            'state': row[4] || '',
            'interests': row[5] || '',
            'comments': row[7] || '',
            'referral_code': refCode,
            'referred_by': row[9] || '',
            'successful_referrals': activeReferrals,
            'current_milestone': row[10] || 'Early Access List',
            'created_at': row[0] || new Date().toISOString()
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': 'Member not found'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const waitlistSheet = ss.getActiveSheet();
    const reviewsSheet = ss.getSheetByName('reviews') || ss.getSheetByName('Reviews');
    
    // Action 1: Lookup request
    if (data.action === 'lookup') {
      const emailToFind = (data.email || '').toLowerCase().trim();
      const codeToFind = (data.code || '').toUpperCase().trim();
      const lastRow = waitlistSheet.getLastRow();
      if (lastRow > 1) {
        const rows = waitlistSheet.getRange(2, 1, lastRow - 1, 11).getValues();
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const rowEmail = (row[2] || '').toString().toLowerCase().trim();
          const rowCode = (row[8] || '').toString().toUpperCase().trim();

          if ((emailToFind && rowEmail === emailToFind) || (codeToFind && (rowCode === codeToFind || generateReferralCodeForEmail(rowEmail) === codeToFind))) {
            let refCode = rowCode;
            if (!refCode) {
              refCode = generateReferralCodeForEmail(rowEmail);
              waitlistSheet.getRange(i + 2, 9).setValue(refCode);
            }

            // Count active referrals in Google Sheet
            let activeReferrals = 0;
            for (let j = 0; j < rows.length; j++) {
              if (j === i) continue;
              const otherRefBy = (rows[j][9] || '').toString().toUpperCase().trim();
              if (otherRefBy && (otherRefBy === refCode || otherRefBy.startsWith(refCode) || refCode.startsWith(otherRefBy))) {
                activeReferrals++;
              }
            }

            return ContentService.createTextOutput(JSON.stringify({
              'status': 'success',
              'member': {
                'name': row[1] || 'Founding Member',
                'email': rowEmail,
                'phone': (row[3] || '').toString(),
                'state': row[4] || '',
                'interests': row[5] || '',
                'comments': row[7] || '',
                'referral_code': refCode,
                'referred_by': row[9] || '',
                'successful_referrals': activeReferrals,
                'current_milestone': row[10] || 'Early Access List',
                'created_at': row[0] || new Date().toISOString()
              }
            })).setMimeType(ContentService.MimeType.JSON);
          }
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Member not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Action 2: Standard Signup
    const emailToFind = (data.email || '').toLowerCase().trim();
    const phoneDigits = (data.phone || '').toString().replace(/\D/g, '').slice(-10);
    const lastRow = waitlistSheet.getLastRow();
    const finalReferralCode = data.referral_code || generateReferralCodeForEmail(emailToFind);

    if (lastRow > 1) {
      const rows = waitlistSheet.getRange(2, 1, lastRow - 1, 11).getValues();
      let emailMatchRow = null;
      let emailMatchIndex = -1;
      let phoneMatchRow = null;
      let phoneMatchIndex = -1;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowEmail = (row[2] || '').toString().toLowerCase().trim();
        const rowPhoneDigits = (row[3] || '').toString().replace(/\D/g, '').slice(-10);

        if (emailToFind && rowEmail === emailToFind) {
          emailMatchRow = row;
          emailMatchIndex = i;
        }
        if (phoneDigits && rowPhoneDigits === phoneDigits) {
          phoneMatchRow = row;
          phoneMatchIndex = i;
        }
      }

      // Conflict 1: Phone registered with different email
      if (phoneMatchRow && (!emailMatchRow || phoneMatchIndex !== emailMatchIndex)) {
        return ContentService.createTextOutput(JSON.stringify({
          'status': 'error',
          'field': 'phone',
          'message': 'This mobile number is already registered with another email.'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      // Conflict 2: Email registered with different phone
      if (emailMatchRow && (!phoneMatchRow || emailMatchIndex !== phoneMatchIndex)) {
        return ContentService.createTextOutput(JSON.stringify({
          'status': 'error',
          'field': 'email',
          'message': 'This email is already registered with another mobile number.'
        })).setMimeType(ContentService.MimeType.JSON);
      }

      // Exact Match: Both Email AND Phone match same row -> Login
      if (emailMatchRow && phoneMatchRow && emailMatchIndex === phoneMatchIndex) {
        const row = emailMatchRow;
        let refCode = (row[8] || '').toString().trim() || finalReferralCode;
        let referredBy = (row[9] || '').toString().trim() || data.referred_by || '';
        let milestone = (row[10] || '').toString().trim() || data.current_milestone || 'Early Access List';

        waitlistSheet.getRange(emailMatchIndex + 2, 9).setValue(refCode);
        if (referredBy) waitlistSheet.getRange(emailMatchIndex + 2, 10).setValue(referredBy);
        waitlistSheet.getRange(emailMatchIndex + 2, 11).setValue(milestone);

        return ContentService.createTextOutput(JSON.stringify({
          'status': 'success',
          'is_existing': true,
          'message': 'Member logged in with matching credentials',
          'member': {
            'name': row[1] || data.name,
            'email': emailToFind,
            'phone': (row[3] || data.phone || '').toString(),
            'state': row[4] || data.state || '',
            'interests': row[5] || data.interests || '',
            'comments': row[7] || data.comments || '',
            'referral_code': refCode,
            'referred_by': referredBy,
            'current_milestone': milestone,
            'created_at': row[0] || new Date().toISOString()
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    const timestamp = data.timestamp || new Date().toISOString();

    // 1. Append to Primary Waitlist Sheet
    // Columns: Timestamp, Name, Email, Phone, State, Interests, Email Status, Comments, Referral Code, Referred By, Milestone
    waitlistSheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.state,
      data.interests,
      "Sent", // Email Status
      data.comments || '',
      finalReferralCode,
      data.referred_by || '',
      data.current_milestone || 'Early Access List'
    ]);

    // 2. Append to Reviews Table (if comments present)
    if (data.comments && data.comments.trim() && reviewsSheet) {
        reviewsSheet.appendRow([
            timestamp,
            data.name,
            data.comments.trim(),
            data.email
        ]);
    }

    // Send Confirmation Email
    sendConfirmationEmail({
      ...data,
      referral_code: finalReferralCode
    });

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Successfully added to waitlist'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(data) {
  const subject = "Welcome to the Royal SwadDesh Waitlist";
  const logoUrl = "https://swaddesh.in/Logo.png";
  const inviteCode = data.referral_code || '';
  const inviteLink = inviteCode ? `https://swaddesh.in/?ref=${inviteCode}` : 'https://swaddesh.in';
  
  const htmlBody = `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; border: 2px solid #d4af37; background-color: #1a0101; color: #fdfbf7; overflow: hidden; border-radius: 8px;">
      <div style="text-align: center; padding: 40px 20px; border-bottom: 1px solid #d4af37;">
        <img src="${logoUrl}" alt="SwadDesh Logo" style="width: 180px; display: block; margin: 0 auto;">
        <div style="height: 1px; width: 60px; background-color: #d4af37; margin: 20px auto 0 auto;"></div>
      </div>
      
      <div style="padding: 40px;">
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; color: #ffd700;">Pranam <strong>${data.name}</strong>,</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #fdfbf7; opacity: 0.9;">
          Thank you for joining the exclusive SwadDesh waitlist. We are thrilled to have you with us on this journey to rediscover the authentic, royal heritage flavors of Bharat.
        </p>
        
        <div style="background-color: #2b0202; border-radius: 12px; padding: 25px; margin-bottom: 30px; border: 1px solid #d4af37;">
          <h3 style="margin-top: 0; color: #ffd700; font-size: 18px; text-transform: uppercase; letter-spacing: 2px;">Your Royal Privileges:</h3>
          <ul style="padding-left: 20px; font-size: 15px; color: #f4ecd8; line-height: 1.8;">
            <li style="margin-bottom: 10px;">Early access to our inaugural heritage collection.</li>
            <li style="margin-bottom: 10px;">Exclusive launch-day discounts and founding rates.</li>
            <li style="margin-bottom: 10px;">Behind-the-scenes stories of authentic generational recipes.</li>
          </ul>
        </div>

        ${inviteCode ? `
        <div style="text-align: center; background-color: #120000; border: 1px dashed #d4af37; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
          <p style="color: #d4af37; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">Your Founding Invite Link:</p>
          <p style="font-family: monospace; font-size: 15px; color: #ffd700; margin: 0 0 10px 0; word-break: break-all;">${inviteLink}</p>
          <p style="font-size: 12px; color: #f4ecd8; opacity: 0.8; margin: 0;">Invite 3 friends to unlock Priority Early Access privileges.</p>
        </div>
        ` : ''}

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #fdfbf7; opacity: 0.9;">
          We will notify you as soon as we're ready to serve our first batches. Stay tuned for a royal feast!
        </p>

        <div style="text-align: center; border-top: 1px solid #d4af37; padding-top: 30px; margin-top: 30px;">
          <p style="font-size: 14px; font-style: italic; color: #d4af37; margin-bottom: 5px;">~ The Taste of Authenticity ~</p>
          <p style="font-weight: bold; color: #ffd700; margin-top: 0; font-size: 18px; letter-spacing: 1px;">SwadDesh Heritage</p>
        </div>
      </div>
    </div>
  `;

  GmailApp.sendEmail(data.email, subject, "", {
    htmlBody: htmlBody,
    name: "SwadDesh Heritage"
  });
}

/**
 * ⚡ 1-Click Auto-Fill for Existing Rows:
 * Select "backfillMissingReferralCodes" in the top dropdown of Apps Script and click "Run".
 * It uses the EXACT SAME deterministic algorithm as the website so codes match 100%!
 */
function backfillMissingReferralCodes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    Logger.log("No data rows to update.");
    return;
  }
  
  const values = sheet.getRange(2, 1, lastRow - 1, 11).getValues();
  let count = 0;
  
  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    const email = (row[2] || '').toString().trim();
    if (!email) continue;
    
    // Check Column I (Referral Code)
    const exactCode = generateReferralCodeForEmail(email);
    sheet.getRange(i + 2, 9).setValue(exactCode);
    count++;
    
    // Check Column K (Milestone)
    let milestone = (row[10] || '').toString().trim();
    if (!milestone) {
      sheet.getRange(i + 2, 11).setValue('Early Access List');
    }
  }
  
  Logger.log("Successfully synced " + count + " rows with exact website matching referral codes.");
}
