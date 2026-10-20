export const signUP_Temp = (name, link) => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Activate your account</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Body -->
          <tr>
            <td style="padding:28px 24px 18px 24px;font-family:Arial,Helvetica,sans-serif;color:#111;">
              <h1 style="margin:0 0 12px 0;font-size:20px;font-weight:700;">Hello ${name}</h1>
              <p style="margin:0 0 16px 0;line-height:1.5;color:#555;font-size:15px;">
                Thanks for registering. Please click the button below to activate your account.
              </p>

              <a href="${link}"
                 style="display:inline-block;padding:10px 16px;background:#0066ff;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">
                Activate your account
              </a>

              <p style="margin:24px 0 0 0;font-size:13px;color:#888;">
                If the button doesn't work, copy this link into your browser:<br>
                <a href="${link}" style="color:#0066ff;word-break:break-all;">${link}</a>
              </p>

              <p style="margin:18px 0 0 0;font-size:13px;color:#888;">
                If you didn't create this account, you can ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 24px;background:#fafafa;border-top:1px solid #eee;color:#888;font-size:12px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
              © ${new Date().getFullYear()} All rights reserved
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};