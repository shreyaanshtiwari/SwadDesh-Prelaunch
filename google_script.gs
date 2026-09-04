/**
 * Google Apps Script to handle Waitlist Form Submissions & Lookups
 * Saves data to Google Sheets with 12 Standard Columns:
 * Col 1  (A): Timestamp (Formatted Indian Standard Time: DD/MM/YYYY HH:MM:SS AM/PM)
 * Col 2  (B): Name
 * Col 3  (C): Email
 * Col 4  (D): Phone
 * Col 5  (E): State
 * Col 6  (F): Interests
 * Col 7  (G): Email Status
 * Col 8  (H): Comments
 * Col 9  (I): Referral Code
 * Col 10 (J): Referred By
 * Col 11 (K): Total Invites
 * Col 12 (L): Milestone
 */

// Helper to format timestamps cleanly into Indian Standard Time (IST)
function formatTimestampIST(dateInput) {
  try {
    if (!dateInput) {
      return Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy hh:mm:ss a");
    }
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      return Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy hh:mm:ss a");
    }
    return Utilities.formatDate(d, "Asia/Kolkata", "dd/MM/yyyy hh:mm:ss a");
  } catch (e) {
    return Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy hh:mm:ss a");
  }
}

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

function getMilestoneTitle(count) {
  if (count >= 25) return "Founder's Box";
  if (count >= 10) return "Founding Member Benefits";
  if (count >= 3) return "Priority Early Access";
  return "Early Access List";
}

/**
 * Standard 12-Column Layout:
 * Col 1  (A): Timestamp
 * Col 2  (B): Name
 * Col 3  (C): Email
 * Col 4  (D): Phone
 * Col 5  (E): State
 * Col 6  (F): Interests
 * Col 7  (G): Email Status
 * Col 8  (H): Comments
 * Col 9  (I): Referral Code
 * Col 10 (J): Referred By
 * Col 11 (K): Total Invites
 * Col 12 (L): Milestone
 */
function getColumnMap(sheet) {
  return {
    timestamp: 0,
    name: 1,
    email: 2,
    phone: 3,
    state: 4,
    interests: 5,
    emailStatus: 6,
    comments: 7,
    referralCode: 8,
    referredBy: 9,
    totalInvites: 10,
    milestone: 11
  };
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

    const numCols = Math.max(waitlistSheet.getLastColumn(), 12);
    const data = waitlistSheet.getRange(2, 1, lastRow - 1, numCols).getValues();

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowEmail = (row[2] || '').toString().toLowerCase().trim();
      const rowCode = (row[8] || '').toString().toUpperCase().trim();

      if ((emailToFind && rowEmail === emailToFind) || (codeToFind && (rowCode === codeToFind || generateReferralCodeForEmail(rowEmail) === codeToFind))) {
        let refCode = rowCode || generateReferralCodeForEmail(rowEmail);
        waitlistSheet.getRange(i + 2, 9).setValue(refCode);

        // Count active referrals in Google Sheet
        let activeReferrals = 0;
        for (let j = 0; j < data.length; j++) {
          if (j === i) continue;
          const otherRefBy = (data[j][9] || '').toString().toUpperCase().trim();
          if (otherRefBy && (otherRefBy === refCode || otherRefBy.startsWith(refCode) || refCode.startsWith(otherRefBy))) {
            activeReferrals++;
          }
        }

        const milestone = getMilestoneTitle(activeReferrals);
        waitlistSheet.getRange(i + 2, 11).setValue(activeReferrals);
        waitlistSheet.getRange(i + 2, 12).setValue(milestone);

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
            'total_invites': activeReferrals,
            'current_milestone': milestone,
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
        const numCols = Math.max(waitlistSheet.getLastColumn(), 12);
        const rows = waitlistSheet.getRange(2, 1, lastRow - 1, numCols).getValues();
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const rowEmail = (row[2] || '').toString().toLowerCase().trim();
          const rowCode = (row[8] || '').toString().toUpperCase().trim();

          if ((emailToFind && rowEmail === emailToFind) || (codeToFind && (rowCode === codeToFind || generateReferralCodeForEmail(rowEmail) === codeToFind))) {
            let refCode = rowCode || generateReferralCodeForEmail(rowEmail);
            waitlistSheet.getRange(i + 2, 9).setValue(refCode);

            // Count active referrals in Google Sheet
            let activeReferrals = 0;
            for (let j = 0; j < rows.length; j++) {
              if (j === i) continue;
              const otherRefBy = (rows[j][9] || '').toString().toUpperCase().trim();
              if (otherRefBy && (otherRefBy === refCode || otherRefBy.startsWith(refCode) || refCode.startsWith(otherRefBy))) {
                activeReferrals++;
              }
            }

            const milestone = getMilestoneTitle(activeReferrals);
            waitlistSheet.getRange(i + 2, 11).setValue(activeReferrals);
            waitlistSheet.getRange(i + 2, 12).setValue(milestone);

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
                'total_invites': activeReferrals,
                'current_milestone': milestone,
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
    let cleanReferredBy = (data.referred_by || '').toString().trim().toUpperCase();

    // Prevent fake self-referral
    if (cleanReferredBy === finalReferralCode) {
      cleanReferredBy = '';
    }

    if (lastRow > 1) {
      const numCols = Math.max(waitlistSheet.getLastColumn(), 12);
      const rows = waitlistSheet.getRange(2, 1, lastRow - 1, numCols).getValues();
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
        let referredBy = (row[9] || '').toString().trim() || cleanReferredBy;
        
        // Count active referrals
        let activeReferrals = 0;
        for (let j = 0; j < rows.length; j++) {
          if (j === emailMatchIndex) continue;
          const otherRefBy = (rows[j][9] || '').toString().toUpperCase().trim();
          if (otherRefBy && (otherRefBy === refCode || otherRefBy.startsWith(refCode) || refCode.startsWith(otherRefBy))) {
            activeReferrals++;
          }
        }
        let milestone = getMilestoneTitle(activeReferrals);

        waitlistSheet.getRange(emailMatchIndex + 2, 9).setValue(refCode);
        if (referredBy) waitlistSheet.getRange(emailMatchIndex + 2, 10).setValue(referredBy);
        waitlistSheet.getRange(emailMatchIndex + 2, 11).setValue(activeReferrals);
        waitlistSheet.getRange(emailMatchIndex + 2, 12).setValue(milestone);

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
            'successful_referrals': activeReferrals,
            'total_invites': activeReferrals,
            'current_milestone': milestone,
            'created_at': row[0] || new Date().toISOString()
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    const timestampIST = formatTimestampIST(data.timestamp);

    // 1. Append to Primary Waitlist Sheet (12 Columns Standard)
    // 1:Timestamp, 2:Name, 3:Email, 4:Phone, 5:State, 6:Interests, 7:Email Status, 8:Comments, 9:Referral Code, 10:Referred By, 11:Total Invites, 12:Milestone
    waitlistSheet.appendRow([
      timestampIST,
      data.name,
      data.email,
      data.phone,
      data.state || '',
      data.interests || '',
      "Sent", // Email Status
      data.comments || '', // Comments
      finalReferralCode, // Referral Code
      cleanReferredBy, // Referred By
      0, // Total Invites
      'Early Access List' // Milestone
    ]);

    // 2. Automatically update Referrer's Total Invites & Milestone in Google Sheet
    if (cleanReferredBy && lastRow > 1) {
      const updatedLastRow = waitlistSheet.getLastRow();
      const allRows = waitlistSheet.getRange(2, 1, updatedLastRow - 1, 12).getValues();

      for (let r = 0; r < allRows.length; r++) {
        const rowCode = (allRows[r][8] || '').toString().trim().toUpperCase();
        if (rowCode && (cleanReferredBy === rowCode || cleanReferredBy.startsWith(rowCode) || rowCode.startsWith(cleanReferredBy))) {
          let count = 0;
          for (let k = 0; k < allRows.length; k++) {
            const refBy = (allRows[k][9] || '').toString().trim().toUpperCase();
            if (refBy && (refBy === rowCode || refBy.startsWith(rowCode) || rowCode.startsWith(refBy))) {
              count++;
            }
          }

          waitlistSheet.getRange(r + 2, 11).setValue(count);
          waitlistSheet.getRange(r + 2, 12).setValue(getMilestoneTitle(count));
        }
      }
    }

    // 3. Append review if present
    if (reviewsSheet && data.comments && data.comments.trim()) {
      reviewsSheet.appendRow([
        timestampIST,
        data.name,
        data.email,
        data.comments,
        'Pending'
      ]);
    }

    // 4. Send Confirmation Email
    try {
      sendConfirmationEmail(data, finalReferralCode);
    } catch (mailError) {
      Logger.log("Mail error: " + mailError.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Successfully registered on waitlist',
      'member': {
        'name': data.name,
        'email': emailToFind,
        'phone': (data.phone || '').toString(),
        'state': data.state || '',
        'interests': data.interests || '',
        'comments': data.comments || '',
        'referral_code': finalReferralCode,
        'referred_by': cleanReferredBy,
        'successful_referrals': 0,
        'total_invites': 0,
        'current_milestone': 'Early Access List',
        'created_at': timestampIST
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(data, inviteCode) {
  const subject = "SwadDesh - Your Royal Early Access Invitation";
  const logoUrl = "https://raw.githubusercontent.com/shreyaanshtiwari/SwaadDesh-Prelaunch/main/public/images/logo.png";
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
 * 🛠️ 1-CLICK COMPLETE REPAIR & DATA REORGANIZATION:
 * Select "fixAndReorganizeSheetData" in Apps Script dropdown and click "Run".
 * It will automatically remove Number Verification, format clean Indian Date & Time,
 * restore Comments to Comments column, Referral Code, Referred By, Total Invites, and Milestones!
 */
function fixAndReorganizeSheetData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow <= 1) {
    Logger.log("No data to fix.");
    return;
  }

  // Read all existing raw data rows
  const rawData = sheet.getRange(2, 1, lastRow - 1, Math.max(lastCol, 13)).getValues();
  const cleanRows = [];

  // Pass 1: Parse and restore each field cleanly
  for (let i = 0; i < rawData.length; i++) {
    const r = rawData[i];
    const timestamp = formatTimestampIST(r[0]);
    const name = r[1] || 'Founding Member';
    const email = (r[2] || '').toString().trim();
    const phone = (r[3] || '').toString().trim();
    const state = r[4] || '';
    const interests = r[5] || '';
    const emailStatus = (r[6] || '').toString().trim() || 'Sent';

    // Figure out comments
    let comment = '';
    const col7 = (r[7] || '').toString().trim();
    const col8 = (r[8] || '').toString().trim();
    if (col7 && !col7.toLowerCase().includes('verified') && !col7.startsWith('SD-')) {
      comment = col7;
    } else if (col8 && !col8.startsWith('SD-') && !col8.toLowerCase().includes('verified')) {
      comment = col8;
    }

    // Referral Code
    let refCode = '';
    const col8Text = (r[8] || '').toString().trim();
    const col9Text = (r[9] || '').toString().trim();
    if (col8Text.startsWith('SD-')) {
      refCode = col8Text;
    } else if (col9Text.startsWith('SD-')) {
      refCode = col9Text;
    } else if (email) {
      refCode = generateReferralCodeForEmail(email);
    }

    // Referred By
    let referredBy = '';
    const col10Text = (r[10] || '').toString().trim();
    const col9Ref = (r[9] || '').toString().trim();
    if (col9Ref && !col9Ref.startsWith('SD-') && !col9Ref.includes('Early Access') && !col9Ref.includes('Milestone')) {
      referredBy = col9Ref;
    } else if (col10Text && !col10Text.includes('Early Access') && !col10Text.includes('Milestone') && !col10Text.includes('Founding')) {
      referredBy = col10Text;
    }

    cleanRows.push({
      timestamp,
      name,
      email,
      phone,
      state,
      interests,
      emailStatus,
      comment,
      refCode,
      referredBy
    });
  }

  // Pass 2: Calculate live Total Invites and Milestone
  const outputData = [];
  for (let i = 0; i < cleanRows.length; i++) {
    const item = cleanRows[i];
    
    let invites = 0;
    if (item.refCode) {
      for (let j = 0; j < cleanRows.length; j++) {
        if (j === i) continue;
        if (cleanRows[j].referredBy && cleanRows[j].referredBy.toUpperCase() === item.refCode.toUpperCase()) {
          invites++;
        }
      }
    }

    const milestone = getMilestoneTitle(invites);

    outputData.push([
      item.timestamp,   // Col 1 (A)
      item.name,        // Col 2 (B)
      item.email,       // Col 3 (C)
      item.phone,       // Col 4 (D)
      item.state,       // Col 5 (E)
      item.interests,   // Col 6 (F)
      item.emailStatus, // Col 7 (G)
      item.comment,     // Col 8 (H)
      item.refCode,     // Col 9 (I)
      item.referredBy,  // Col 10 (J)
      invites,          // Col 11 (K)
      milestone         // Col 12 (L)
    ]);
  }

  // Clear existing content beyond Row 1 and write clean output
  const headers = [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'State',
    'Interests',
    'Email Status',
    'Comments',
    'Referral Code',
    'Referred By',
    'Total Invites',
    'Milestone'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#800020'); // Royal Burgundy
  headerRange.setFontColor('#ffd700'); // Gold
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  if (lastCol > headers.length) {
    sheet.getRange(1, headers.length + 1, lastRow, lastCol - headers.length).clearContent().clearFormat();
  }

  sheet.getRange(2, 1, outputData.length, headers.length).setValues(outputData);

  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }

  Logger.log("🎉 Successfully organized all rows into 12 clean columns with Indian Date & Time format!");
}

/**
 * ⚡ 1-Click Header Setup
 */
function setupSheetHeaders() {
  fixAndReorganizeSheetData();
}

/**
 * ⚡ 1-Click Auto-Fill
 */
function backfillMissingReferralCodes() {
  fixAndReorganizeSheetData();
}
