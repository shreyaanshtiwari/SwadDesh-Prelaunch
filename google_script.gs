/**
 * Google Apps Script to handle Waitlist Form Submissions
 * Saves data to Google Sheets and sends a premium confirmation email.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const waitlistSheet = ss.getActiveSheet(); // Primary storage
    const reviewsSheet = ss.getSheetByName('reviews') || ss.getSheetByName('Reviews'); // Specific reviews table
    
    // Check if email already exists in the primary sheet (Now in Column 3 / C)
    const emailToFind = data.email.toLowerCase().trim();
    const emails = waitlistSheet.getRange(2, 3, waitlistSheet.getLastRow() > 1 ? waitlistSheet.getLastRow() - 1 : 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
        if (emails[i][0].toString().toLowerCase().trim() === emailToFind) {
            return ContentService.createTextOutput(JSON.stringify({
                'status': 'error',
                'message': 'Email already exists'
            })).setMimeType(ContentService.MimeType.JSON);
        }
    }

    const timestamp = data.timestamp || new Date().toISOString();

    // 1. Append to Primary Waitlist Sheet (Reordered: Timestamp first, Email Status added)
    waitlistSheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.state,
      data.interests,
      "Sent", // Email Status
      data.comments || ''
    ]);

    // 2. Append to Reviews Table (Reordered: Timestamp first)
    if (data.comments && data.comments.trim() && reviewsSheet) {
        reviewsSheet.appendRow([
            timestamp,
            data.name,
            data.comments.trim(),
            data.email
        ]);
    }

    // Send Confirmation Email
    sendConfirmationEmail(data);

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
  // Pure ASCII subject to avoid encoding issues (like question marks) in some email clients
  const subject = "Welcome to the Royal SwaadDesh Waitlist";
  const logoUrl = "https://swaddesh.in/Logo.png";
  
  // HTML Email Body - Premium Dark Royal Theme
  const htmlBody = `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; border: 2px solid #d4af37; background-color: #1a0101; color: #fdfbf7; overflow: hidden; border-radius: 8px;">
      <div style="text-align: center; padding: 40px 20px; border-bottom: 1px solid #d4af37;">
        <img src="${logoUrl}" alt="SwaadDesh Logo" style="width: 180px; display: block; margin: 0 auto;">
        <div style="height: 1px; width: 60px; background-color: #d4af37; margin: 20px auto 0 auto;"></div>
      </div>
      
      <div style="padding: 40px;">
        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px; color: #ffd700;">Pranam <strong>${data.name}</strong>,</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #fdfbf7; opacity: 0.9;">
          Thank you for joining the exclusive SwaadDesh waitlist. We are thrilled to have you with us on this journey to rediscover the authentic, royal heritage flavors of Bharat.
        </p>
        
        <div style="background-color: #2b0202; border-radius: 12px; padding: 25px; margin-bottom: 30px; border: 1px solid #d4af37;">
          <h3 style="margin-top: 0; color: #ffd700; font-size: 18px; text-transform: uppercase; letter-spacing: 2px;">Your Royal Privileges:</h3>
          <ul style="padding-left: 20px; font-size: 15px; color: #f4ecd8; line-height: 1.8;">
            <li style="margin-bottom: 10px;">Early access to our inaugural heritage collection.</li>
            <li style="margin-bottom: 10px;">Exclusive launch-day discounts and offers.</li>
            <li style="margin-bottom: 10px;">Behind-the-scenes stories of our authentic recipes.</li>
          </ul>
        </div>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #fdfbf7; opacity: 0.9;">
          We will notify you as soon as we're ready to serve our first batches. Stay tuned for a royal feast!
        </p>

        <div style="text-align: center; border-top: 1px solid #d4af37; padding-top: 30px; margin-top: 30px;">
          <p style="font-size: 14px; font-style: italic; color: #d4af37; margin-bottom: 5px;">~ The Taste of Authenticity ~</p>
          <p style="font-weight: bold; color: #ffd700; margin-top: 0; font-size: 18px; letter-spacing: 1px;">SwaadDesh Heritage</p>
        </div>
      </div>
    </div>
  `;

  // Fix: Use GmailApp.sendEmail to ensure the sender's profile photo is visible in the inbox.
  // This requires the script to be deployed with "Execute as: Me" permissions.
  GmailApp.sendEmail(data.email, subject, "", {
    htmlBody: htmlBody,
    name: "SwaadDesh Heritage"
  });
}
