const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_FROM =
  process.env.EMAIL_FROM || "Royal Heights <onboarding@resend.dev>";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

function emailTemplate(content) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body style="margin:0;padding:0;background:#f7f3ed;font-family:Arial,sans-serif;color:#302421;">
        <div style="max-width:600px;margin:30px auto;padding:20px;">
          <div style="background:#76232d;padding:25px;text-align:center;border-radius:12px 12px 0 0;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;">
              ROYAL HEIGHTS
            </h1>
            <p style="margin:8px 0 0;color:#f2dfc0;font-size:13px;">
              Higher Secondary School
            </p>
          </div>

          <div style="background:#ffffff;padding:30px;border:1px solid #eadfd6;">
            ${content}
          </div>

          <div style="background:#f0e8df;padding:20px;text-align:center;border-radius:0 0 12px 12px;">
            <p style="margin:0;color:#76232d;font-weight:bold;">
              Royal Heights Higher Secondary School
            </p>
            <p style="margin:8px 0;color:#76645d;font-size:12px;">
              Zirapur, Madhya Pradesh
            </p>
            <p style="margin:0;color:#76645d;font-size:12px;">
              This is an automated email. Please do not reply directly.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

async function sendEmail({ to, subject, html }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing in server environment.");
  }

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [to],
    subject,
    html,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error(error.message || "Email could not be sent.");
  }

  return data;
}

// --------------------------------------------------
// APPLICATION RECEIVED EMAIL
// --------------------------------------------------

async function sendApplicationReceived({
  email,
  name,
  jobTitle,
  applicationId,
}) {
  const safeName = escapeHtml(name);
  const safeJobTitle = escapeHtml(jobTitle);
  const reference = escapeHtml(`RH-${applicationId}`);

  const html = emailTemplate(`
    <h2 style="color:#76232d;">Application Received!</h2>

    <p>Hello ${safeName},</p>

    <p>
      Thank you for applying to Royal Heights Higher Secondary School.
      We have successfully received your job application.
    </p>

    <div style="background:#f8f4ef;padding:18px;border-radius:8px;margin:20px 0;">
      <p><strong>Position:</strong> ${safeJobTitle}</p>
      <p><strong>Application Reference:</strong> ${reference}</p>
      <p><strong>Status:</strong> Received</p>
    </div>

    <p>
      Our team will review your application and contact you if your
      profile matches our requirements.
    </p>

    <p>Thank you for your interest in joining our school.</p>

    <p>Regards,<br/><strong>Royal Heights Team</strong></p>
  `);

  return sendEmail({
    to: email,
    subject: "Application Received - Royal Heights",
    html,
  });
}

// --------------------------------------------------
// APPLICATION STATUS EMAIL
// --------------------------------------------------

async function sendApplicationStatusEmail({
  email,
  name,
  jobTitle,
  status,
  applicationId,
}) {
  const safeName = escapeHtml(name);
  const safeJobTitle = escapeHtml(jobTitle);
  const safeStatus = escapeHtml(status);
  const reference = escapeHtml(`RH-${applicationId}`);

  const statusMessages = {
    shortlisted:
      "Congratulations! Your application has been shortlisted. Our team will contact you regarding the next steps.",
    rejected:
      "Thank you for your interest. Unfortunately, your application has not been selected for this position at this time.",
    hired:
      "Congratulations! You have been selected for the position. Our team will contact you with further details.",
    pending:
      "Your application is currently under review. We will update you when there is a change in its status.",
  };

  const message =
    statusMessages[String(status).toLowerCase()] ||
    "Your application status has been updated. Please contact the school for further information.";

  const html = emailTemplate(`
    <h2 style="color:#76232d;">Application Status Update</h2>

    <p>Hello ${safeName},</p>

    <p>
      The status of your job application at Royal Heights
      Higher Secondary School has been updated.
    </p>

    <div style="background:#f8f4ef;padding:18px;border-radius:8px;margin:20px 0;">
      <p><strong>Position:</strong> ${safeJobTitle}</p>
      <p><strong>Reference:</strong> ${reference}</p>
      <p><strong>New Status:</strong> ${safeStatus}</p>
    </div>

    <p>${escapeHtml(message)}</p>

    <p>Regards,<br/><strong>Royal Heights Team</strong></p>
  `);

  return sendEmail({
    to: email,
    subject: `Application Status Update - ${status}`,
    html,
  });
}

// --------------------------------------------------
// STAFF INVITATION EMAIL
// --------------------------------------------------

async function sendStaffInvitationEmail({
  email,
  name,
  invitationToken,
}) {
  const frontendOrigin = process.env.FRONTEND_ORIGIN;

  if (!frontendOrigin) {
    throw new Error("FRONTEND_ORIGIN is missing in server environment.");
  }

  const invitationUrl = new URL(
    "/admin/accept-invitation",
    frontendOrigin
  );

  invitationUrl.searchParams.set("token", invitationToken);

  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(invitationUrl.toString());

  const html = emailTemplate(`
    <h2 style="color:#76232d;">Staff Invitation</h2>

    <p>Hello ${safeName},</p>

    <p>
      You have been invited to join the Royal Heights Higher Secondary
      School administration team.
    </p>

    <p>
      Click the button below to accept your invitation and set up
      your staff account.
    </p>

    <div style="text-align:center;margin:30px 0;">
      <a
        href="${safeUrl}"
        style="display:inline-block;background:#76232d;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;"
      >
        Accept Invitation
      </a>
    </div>

    <p style="font-size:13px;color:#76645d;">
      This invitation link is valid for 24 hours and can only be used once.
    </p>

    <p style="font-size:12px;color:#76645d;">
      If the button does not work, copy and paste this link into your browser:
      <br/>
      ${safeUrl}
    </p>

    <p>Regards,<br/><strong>Royal Heights Team</strong></p>
  `);

  return sendEmail({
    to: email,
    subject: "Staff Invitation - Royal Heights",
    html,
  });
}

module.exports = {
  // Resend uses HTTPS API instead of an SMTP transporter.
  // Kept for compatibility with existing imports.
  transporter: null,

  sendApplicationReceived,
  sendApplicationStatusEmail,
  sendStaffInvitationEmail,
};