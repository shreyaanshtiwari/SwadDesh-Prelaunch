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

/**
 * Maps each Indian State / Union Territory to its authentic regional greeting.
 * e.g. Rajasthan -> 'Khamma Ghani', Punjab -> 'Sat Shri Akaal', Tamil Nadu -> 'Vanakkam'
 */
function getRegionalGreeting(state) {
  if (!state) return "Pranam";
  
  const cleanState = state.toString().trim().toLowerCase();

  const greetingMap = {
    'rajasthan': 'Khamma Ghani',
    'punjab': 'Sat Shri Akaal',
    'chandigarh': 'Sat Shri Akaal',
    'haryana': 'Ram Ram',
    'gujarat': 'Kem Cho',
    'dadra and nagar haveli and daman and diu': 'Kem Cho',
    'maharashtra': 'Namaskar',
    'goa': 'Namaskar',
    'west bengal': 'Nomoshkar',
    'bengal': 'Nomoshkar',
    'assam': 'Nomoskar',
    'odisha': 'Namaskar',
    'orissa': 'Namaskar',
    'tamil nadu': 'Vanakkam',
    'tamilnadu': 'Vanakkam',
    'puducherry': 'Vanakkam',
    'pondicherry': 'Vanakkam',
    'kerala': 'Namaskaram',
    'andhra pradesh': 'Namaskaram',
    'andhra': 'Namaskaram',
    'telangana': 'Namaskaram',
    'karnataka': 'Namaskara',
    'bihar': 'Pranam',
    'uttar pradesh': 'Pranam',
    'up': 'Pranam',
    'madhya pradesh': 'Pranam',
    'mp': 'Pranam',
    'uttarakhand': 'Pranam',
    'himachal pradesh': 'Pranam',
    'himachal': 'Pranam',
    'chhattisgarh': 'Jai Johar',
    'jharkhand': 'Johar',
    'jammu and kashmir': 'Adaab',
    'jammu & kashmir': 'Adaab',
    'kashmir': 'Adaab',
    'ladakh': 'Julley',
    'sikkim': 'Tashi Delek',
    'arunachal pradesh': 'Tashi Delek',
    'arunachal': 'Tashi Delek',
    'manipur': 'Khurumjari',
    'meghalaya': 'Khublei',
    'mizoram': 'Chibai',
    'nagaland': 'Namaste',
    'tripura': 'Khulumkha',
    'delhi': 'Namaste',
    'new delhi': 'Namaste',
    'andaman and nicobar islands': 'Namaste',
    'andaman': 'Namaste',
    'lakshadweep': 'Namaskaram'
  };

  // 1. Direct exact match
  if (greetingMap[cleanState]) {
    return greetingMap[cleanState];
  }

  // 2. Substring matching for variations
  for (const key in greetingMap) {
    if (cleanState.indexOf(key) !== -1 || key.indexOf(cleanState) !== -1) {
      return greetingMap[key];
    }
  }

  // 3. Elegant default fallback
  return 'Pranam';
}

// High-Performance Embedded SwadDesh Royal Logo (Optimized Base64 Blob - 0ms Latency)
const SWADDESH_LOGO_BASE64 = "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";

function sendConfirmationEmail(data, inviteCode) {
  const greeting = getRegionalGreeting(data ? data.state : '');
  const subject = "SwadDesh - Your Royal Early Access Invitation";
  const inviteLink = inviteCode ? `https://swaddesh.in/?ref=${inviteCode}` : 'https://swaddesh.in';
  
  // Production CDN & GitHub Fallback URLs
  const productionLogoUrl = "https://www.swaddesh.in/images/logo.png";
  const rawGitHubLogoUrl = "https://raw.githubusercontent.com/shreyaanshtiwari/SwaadDesh-Prelaunch/main/public/images/logo.png";

  let inlineImages = {};
  let logoSrc = productionLogoUrl;

  // 1. Embed logo directly as an inline image (CID) from zero-latency local Base64
  // Guaranteed: No UrlFetchApp permissions required, no network latency, displays immediately in Gmail/Apple Mail/Outlook!
  try {
    const logoBlob = Utilities.newBlob(Utilities.base64Decode(SWADDESH_LOGO_BASE64), "image/png", "swaddeshLogo.png");
    if (logoBlob) {
      inlineImages["swaddeshLogo"] = logoBlob;
      logoSrc = "cid:swaddeshLogo";
    }
  } catch (e) {
    Logger.log("Inline logo embed notice: " + e.toString());
    // Safe network fallback if Base64 decode somehow fails
    try {
      const resp = UrlFetchApp.fetch(productionLogoUrl, { muteHttpExceptions: true });
      if (resp.getResponseCode() === 200) {
        inlineImages["swaddeshLogo"] = resp.getBlob().setName("swaddeshLogo.png");
        logoSrc = "cid:swaddeshLogo";
      }
    } catch (netErr) {
      Logger.log("Logo network fetch notice: " + netErr.toString());
    }
  }

  // Email-Safe Table Layout (Preserves dark royal background across Gmail Mobile, Desktop, Apple Mail & Outlook)
  const htmlBody = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#120000" style="width: 100%; margin: 0; padding: 25px 0; background-color: #120000; font-family: 'Georgia', serif;">
      <tr>
        <td align="center" style="padding: 10px;">
          <!-- Main Royal Card Container -->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a0101" style="max-width: 600px; width: 100%; margin: 0 auto; border: 2px solid #d4af37; background-color: #1a0101; color: #fdfbf7; border-radius: 8px; overflow: hidden;">
            
            <!-- Logo Header (Rich Heritage Background + Gold Divider) -->
            <tr>
              <td align="center" bgcolor="#1a0101" style="text-align: center; padding: 35px 20px 25px 20px; border-bottom: 1px solid #d4af37; background-color: #1a0101;">
                <img src="${logoSrc}" width="180" height="115" alt="SwadDesh Logo" border="0" style="width: 180px; max-width: 100%; height: auto; display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none;" />
                <table role="presentation" width="60" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 20px auto 0 auto;">
                  <tr><td height="1" bgcolor="#d4af37" style="background-color: #d4af37; font-size: 1px; line-height: 1px;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>
            
            <!-- Email Body Content -->
            <tr>
              <td style="padding: 40px 30px; font-family: 'Georgia', serif; color: #fdfbf7;">
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; color: #ffd700;">${greeting} <strong>${data.name}</strong>,</p>
                
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #fdfbf7; opacity: 0.9;">
                  Thank you for joining the exclusive SwadDesh waitlist. We are thrilled to have you with us on this journey to rediscover the authentic, royal heritage flavors of Bharat.
                </p>
                
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#2b0202" style="background-color: #2b0202; border-radius: 12px; border: 1px solid #d4af37; margin-bottom: 30px;">
                  <tr>
                    <td style="padding: 25px;">
                      <h3 style="margin-top: 0; margin-bottom: 15px; color: #ffd700; font-size: 18px; text-transform: uppercase; letter-spacing: 2px;">Your Royal Privileges:</h3>
                      <ul style="padding-left: 20px; margin: 0; font-size: 15px; color: #f4ecd8; line-height: 1.8;">
                        <li style="margin-bottom: 10px;">Early access to our inaugural heritage collection.</li>
                        <li style="margin-bottom: 10px;">Exclusive launch-day discounts and founding rates.</li>
                        <li style="margin-bottom: 10px;">Behind-the-scenes stories of authentic generational recipes.</li>
                      </ul>
                    </td>
                  </tr>
                </table>

                ${inviteCode ? `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#120000" style="background-color: #120000; border: 1px dashed #d4af37; border-radius: 10px; margin-bottom: 30px;">
                  <tr>
                    <td align="center" style="padding: 20px; text-align: center;">
                      <p style="color: #d4af37; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">Your Founding Invite Link:</p>
                      <p style="font-family: monospace; font-size: 15px; color: #ffd700; margin: 0 0 10px 0; word-break: break-all;">${inviteLink}</p>
                      <p style="font-size: 12px; color: #f4ecd8; opacity: 0.8; margin: 0;">Invite 3 friends to unlock Priority Early Access privileges.</p>
                    </td>
                  </tr>
                </table>
                ` : ''}

                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #fdfbf7; opacity: 0.9;">
                  We will notify you as soon as we're ready to serve our first batches. Stay tuned for a royal feast!
                </p>

                <!-- Footer Divider & Sign-off -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid #d4af37; margin-top: 30px;">
                  <tr>
                    <td align="center" style="padding-top: 30px; text-align: center;">
                      <p style="font-size: 14px; font-style: italic; color: #d4af37; margin-bottom: 5px;">~ The Taste of Authenticity ~</p>
                      <p style="font-weight: bold; color: #ffd700; margin-top: 0; font-size: 18px; letter-spacing: 1px;">SwadDesh Heritage</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  `;

  const emailOptions = {
    htmlBody: htmlBody,
    name: "SwadDesh Heritage"
  };

  if (inlineImages["swaddeshLogo"]) {
    emailOptions.inlineImages = inlineImages;
  }

  GmailApp.sendEmail(data.email, subject, "", emailOptions);
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

/**
 * ⚡ Test Function: Preview Regional Greeting Email
 * Select "testRegionalGreetingEmail" in Apps Script dropdown and click "Run".
 * It will send a preview email to your Gmail address with a state-specific greeting (e.g. Rajasthan -> Khamma Ghani).
 */
function testRegionalGreetingEmail() {
  const myEmail = Session.getActiveUser().getEmail();
  const sampleData = {
    name: "Royal Guest",
    email: myEmail,
    state: "Rajasthan"
  };
  Logger.log("Testing greeting for state: " + sampleData.state + " -> " + getRegionalGreeting(sampleData.state));
  sendConfirmationEmail(sampleData, "SD-ROYAL7");
  Logger.log("Test email sent to " + myEmail + " with greeting: " + getRegionalGreeting(sampleData.state));
}

