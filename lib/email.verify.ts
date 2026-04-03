export function verifyEmailTemplate(link: string, name: string) {
  return `
    <div style="font-family: Arial, sans-serif">
      <h2>Hello ${name},</h2>
      <p>Please verify your email by clicking below:</p>
      <a href="${link}" 
         style="padding:10px 16px;background:#4f46e5;color:white;text-decoration:none">
        Verify Email
      </a>
      <p>This link expires in 15 minutes.</p>
    </div>
  `;
}
