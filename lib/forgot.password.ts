export function forgotPasswordTemplate(link: string, name: string) {
  return `
    <div style="font-family: Arial, sans-serif">
      <h2>Hello ${name},</h2>
      <p>We received a request to reset your account password.</p>
      <p>Click the button below to create a new password:</p>

      <a href="${link}"
         style="padding:10px 16px;background:#dc2626;color:white;text-decoration:none">
        Reset Password
      </a>

      <p>This link will expire in 15 minutes for security reasons.</p>

      <p>If you did not request a password reset, please ignore this email. 
      Your account will remain secure.</p>

      <p style="margin-top:20px;font-size:12px;color:#555">
        If the button does not work, copy and paste this link into your browser:
        <br />
        ${link}
      </p>
    </div>
  `;
}
