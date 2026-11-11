
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function emailTemplate(title, content) {
  return `
    <div style="background:#f8f3ed;padding:30px;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;">
        <div style="background:#76232d;padding:28px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">Royal Heights</h1>
          <p style="margin:8px 0 0;">Higher Secondary School, Zirapur</p>
        </div>
        <div style="padding:30px;color:#342126;line-height:1.7;">
          <h2 style="color:#76232d;">${title}</h2>
          ${content}
          <p style="margin-top:28px;">
            Regards,<br/>
            <strong>Royal Heights Administration</strong><br/>
            Royal Heights Higher Secondary School
          </p>
        </div>
        <div style="background:#f8f3ed;padding:16px;text-align:center;color:#777;font-size:12px;">
          This is an automated email from Royal Heights Higher Secondary School.
          Please do not reply directly to this message.
        </div>
      </div>
    </div>
  `;
}

// 1. Application received email
async function sendApplicationReceived({
  email,
  name,
  jobTitle,
  applicationId,
}) {
  const safeName = escapeHtml(name);
  const safeJob = escapeHtml(jobTitle);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Application Received – ${jobTitle} | Royal Heights School`,
    html: emailTemplate(
      "Thank You for Your Application!",
      `
        <p>Dear ${safeName},</p>
        <p>
          Thank you for your interest in joining
          <strong>Royal Heights Higher Secondary School, Zirapur.</strong>
        </p>
        <p>
          We confirm that we have received your application for
          <strong>${safeJob}</strong>.
        </p>
        <p>
          Our recruitment team will carefully review your application
          and contact you regarding the next steps.
        </p>
        <p><strong>Application Reference:</strong> RH-${applicationId}</p>
      `
    ),
  });
}

// 2. Application status changed email
async function sendApplicationStatusEmail({
  email,
  name,
  jobTitle,
  status,
  applicationId,
}) {
  const safeName = escapeHtml(name);
  const safeJob = escapeHtml(jobTitle);

  const messages = {
    shortlisted: {
      subject: "Congratulations! Your Application Has Been Shortlisted",
      title: "You Have Been Shortlisted!",
      content: `
        <p>Dear ${safeName},</p>
        <p>
          Your application for <strong>${safeJob}</strong> at
          Royal Heights Higher Secondary School has been shortlisted.
        </p>
        <p>Our recruitment team will contact you regarding the next stage.</p>
        <p>Congratulations, and thank you for your interest!</p>
      `,
    },

    rejected: {
      subject: "Update Regarding Your Job Application",
      title: "Application Status Update",
      content: `
        <p>Dear ${safeName},</p>
        <p>
          Thank you for applying for <strong>${safeJob}</strong>
          at Royal Heights Higher Secondary School.
        </p>
        <p>
          After reviewing your application, we regret to inform you
          that we will not be progressing with it at this time.
        </p>
        <p>We wish you every success in your career.</p>
      `,
    },

    hired: {
      subject: "Congratulations! You Have Been Selected",
      title: "Congratulations on Your Selection!",
      content: `
        <p>Dear ${safeName},</p>
        <p>
          You have been selected for the position of
          <strong>${safeJob}</strong> at Royal Heights Higher Secondary School.
        </p>
        <p>
          Our team will contact you regarding the offer,
          documentation and joining formalities.
        </p>
      `,
    },

    pending: {
      subject: "Your Application Is Under Review",
      title: "Application Under Review",
      content: `
        <p>Dear ${safeName},</p>
        <p>
          Your application for <strong>${safeJob}</strong>
          is currently under review by our recruitment team.
        </p>
        <p>We will contact you when there is a further update.</p>
      `,
    },
  };

  const notification = messages[status];

  if (!notification) {
    throw new Error("Unsupported application status.");
  }

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: notification.subject,
    html: emailTemplate(
      notification.title,
      `
        ${notification.content}
        <p><strong>Application Reference:</strong> RH-${applicationId}</p>
      `
    ),
  });
}

// 3. Staff invitation email
async function sendStaffInvitationEmail({
  email,
  name,
  invitationToken,
}) {
  if (!process.env.FRONTEND_ORIGIN) {
    throw new Error("FRONTEND_ORIGIN is not configured.");
  }

  const invitationUrl = new URL(
    "/admin/accept-invitation",
    process.env.FRONTEND_ORIGIN
  );

  invitationUrl.searchParams.set("token", invitationToken);

  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(invitationUrl.toString());

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "You Are Invited to Royal Heights Staff Portal",
    html: emailTemplate(
      "Welcome to Royal Heights!",
      `
        <p>Dear ${safeName},</p>

        <p>
          The Owner of Royal Heights Higher Secondary School
          has invited you to join the school's administration portal.
        </p>

        <p>
          To activate your staff account and create your password,
          click the secure invitation link below:
        </p>

        <p style="text-align:center;margin:30px 0;">
          <a
            href="${safeUrl}"
            style="
              display:inline-block;
              background:#76232d;
              color:#ffffff;
              padding:13px 24px;
              border-radius:6px;
              text-decoration:none;
              font-weight:bold;
            "
          >
            Accept Invitation
          </a>
        </p>

        <p>
          This invitation link expires after 24 hours and can only
          be used once.
        </p>

        <p>
          If you were not expecting this invitation, you can ignore
          this email.
        </p>
      `
    ),
  });
}

module.exports = {
  transporter,
  sendApplicationReceived,
  sendApplicationStatusEmail,
  sendStaffInvitationEmail,
};
