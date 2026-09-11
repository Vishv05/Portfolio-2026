/**
 * Portfolio Backend & Live Metrics for Vishv Bhavsar
 * 1. Counts Real Global Views & Real Contact Form Inquiries
 * 2. Sends confirmation email to visitors who submit the Contact Us form
 * 3. Directs "Visit Portfolio" button to the new Portfolio 2026:
 *    https://vishv05.github.io/Portfolio-2026/
 */

// 1. GET: Returns real views and real submissions
function doGet(e) {
  try {
    var action = e && e.parameter ? e.parameter.action : "";
    var props = PropertiesService.getScriptProperties();

    // Retrieve existing counts (defaults to 1 if first time)
    var views = parseInt(props.getProperty("portfolio_views") || "1", 10);
    var submissions = parseInt(props.getProperty("portfolio_submissions") || "4", 10);

    // If it's a new visitor session, increment real views count
    if (action === "visit") {
      views += 1;
      props.setProperty("portfolio_views", views.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      views: views,
      submissions: submissions
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      views: 1,
      submissions: 4
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 2. POST: Increments submissions count and sends confirmation email
function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : "";
    var data = {};

    try {
      data = JSON.parse(contents);
    } catch (jsonErr) {
      data = e.parameter || {};
    }

    var senderName = data.name ? data.name.trim() : "there";
    var senderEmail = data.email ? data.email.trim() : "";
    var subject = data.subject ? data.subject.trim() : "Portfolio Inquiry";
    var userMessage = data.message ? data.message.trim() : "";
    // Redirects to new Portfolio 2026
    var portfolioUrl = data.portfolioUrl ? data.portfolioUrl.trim() : "https://vishv05.github.io/Portfolio-2026/";

    // Increment real submissions count in Google Cloud storage
    var props = PropertiesService.getScriptProperties();
    var submissions = parseInt(props.getProperty("portfolio_submissions") || "4", 10) + 1;
    props.setProperty("portfolio_submissions", submissions.toString());

    // Send the auto-reply email if an email was provided
    if (senderEmail) {
      var emailSubject = "Thank you for reaching out, " + senderName + "! - Vishv Bhavsar";

      var plainTextMessage = "Hi " + senderName + ",\n\n"
        + "Thank you for reaching out through my portfolio website!\n\n"
        + "I have received your message regarding '" + subject + "' and will get back to you as soon as possible (usually within 24 hours).\n\n"
        + "Here is a copy of what you sent:\n"
        + "----------------------------------------\n"
        + "Subject: " + subject + "\n"
        + "Message:\n" + userMessage + "\n"
        + "----------------------------------------\n\n"
        + "Best regards,\n"
        + "Vishv Bhavsar\n"
        + "MSc IT Student & Technology Professional\n"
        + "Portfolio: " + portfolioUrl + "\n"
        + "LinkedIn: https://linkedin.com/in/vishv-bhavsar-b1507b290";

      var htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
          <div style="border-bottom: 2px solid #6366f1; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #0f172a; font-size: 22px;">Vishv Bhavsar</h2>
            <p style="margin: 4px 0 0 0; color: #6366f1; font-size: 14px; font-weight: 600;">Data Analytics • Software Development • UI/UX Design</p>
          </div>

          <p style="font-size: 15px; line-height: 1.6; color: #334155;">
            Hi <strong>${senderName}</strong>,
          </p>

          <p style="font-size: 15px; line-height: 1.6; color: #334155;">
            Thank you for reaching out through my portfolio! I have received your message regarding <strong>"${subject}"</strong> and will get back to you as soon as possible (typically within 24 hours).
          </p>

          <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">A copy of your message:</p>
            <p style="margin: 0; font-size: 14px; color: #1e293b; white-space: pre-wrap; line-height: 1.5;">${userMessage}</p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            In the meantime, feel free to explore my work or connect with me directly:
          </p>

          <div style="margin: 20px 0;">
            <a href="${portfolioUrl}" style="display: inline-block; padding: 10px 18px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 600; margin-right: 10px;">Visit Portfolio</a>
            <a href="https://linkedin.com/in/vishv-bhavsar-b1507b290" style="display: inline-block; padding: 10px 18px; background-color: #0a66c2; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 600;">Connect on LinkedIn</a>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />

          <div style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
            <p style="margin: 0;">This is an automated confirmation from Vishv Bhavsar's portfolio.</p>
            <p style="margin: 4px 0 0 0;">GLS University • M.Sc. IT | Ahmedabad, Gujarat, India</p>
          </div>
        </div>
      `;

      GmailApp.sendEmail(senderEmail, emailSubject, plainTextMessage, {
        htmlBody: htmlBody,
        name: "Vishv Bhavsar (Portfolio)"
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success",
      submissions: submissions
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional helper to manually calibrate or set counts
function setRealSubmissions() {
  PropertiesService.getScriptProperties().setProperty("portfolio_submissions", "4");
  Logger.log("Submissions count set to 4");
}
