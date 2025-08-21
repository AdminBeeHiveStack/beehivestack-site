import { MailService } from '@sendgrid/mail';

let mailService: MailService | null = null;

// Initialize SendGrid only if API key is available
if (process.env.SENDGRID_API_KEY) {
  mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("SendGrid email service initialized");
} else {
  console.warn("SENDGRID_API_KEY not found - email functionality will be disabled");
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, any>;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!mailService) {
    console.log(`Email would be sent to ${params.to}: ${params.subject} (SendGrid not configured)`);
    return false;
  }

  try {
    const emailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };

    if (params.templateId) {
      emailData.templateId = params.templateId;
      emailData.dynamicTemplateData = params.dynamicTemplateData || {};
    } else {
      emailData.text = params.text;
      emailData.html = params.html;
    }

    await mailService.send(emailData);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Email templates for BeeHiveStack
export const emailTemplates = {
  welcomeEmail: {
    subject: "Welcome to BeeHiveStack - Your Digital Product Platform",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to BeeHiveStack</title>
      <style>
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
          line-height: 1.6; 
          color: #0B0B0C; 
          margin: 0; 
          padding: 0; 
          background-color: #F7F7F8;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header { 
          background: linear-gradient(135deg, #FFC72C 0%, #FFD700 100%); 
          padding: 40px 20px; 
          text-align: center; 
        }
        .header h1 { 
          margin: 0; 
          color: #0B0B0C; 
          font-size: 28px; 
          font-weight: 700; 
        }
        .content { 
          padding: 40px 30px; 
        }
        .content h2 { 
          color: #0B0B0C; 
          font-size: 22px; 
          margin-bottom: 20px; 
        }
        .content p { 
          margin-bottom: 16px; 
          font-size: 16px; 
        }
        .highlight { 
          background: #FFC72C; 
          color: #0B0B0C; 
          padding: 2px 8px; 
          border-radius: 4px; 
          font-weight: 600; 
        }
        .footer { 
          background: #F7F7F8; 
          padding: 30px; 
          text-align: center; 
          font-size: 14px; 
          color: #1F2937; 
        }
        .footer a { 
          color: #0B0B0C; 
          text-decoration: none; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🐝 BeeHiveStack</h1>
        </div>
        <div class="content">
          <h2>Welcome to the Future of Digital Products!</h2>
          <p>Thank you for joining <span class="highlight">BeeHiveStack</span> - your trusted platform for launching digital products with confidence.</p>
          
          <p>You're now part of an exclusive community focused on:</p>
          <ul>
            <li><strong>Fast-Launch Solutions</strong> - Get your products to market quickly</li>
            <li><strong>Stripe-Ready Infrastructure</strong> - Payment processing made simple</li>
            <li><strong>Professional Compliance</strong> - Built for business legitimacy</li>
            <li><strong>U.S. Market Focus</strong> - Optimized for American customers</li>
          </ul>
          
          <p>We'll keep you updated on:</p>
          <ul>
            <li>New product launches and features</li>
            <li>Exclusive early access opportunities</li>
            <li>Best practices for digital product success</li>
            <li>Platform updates and improvements</li>
          </ul>
          
          <p>Stay tuned for exciting announcements coming soon!</p>
          
          <p>Best regards,<br>
          <strong>The BeeHiveStack Team</strong></p>
        </div>
        <div class="footer">
          <p>
            <a href="https://beehivestack.net">BeeHiveStack.net</a> | 
            Professional Digital Product Platform
          </p>
          <p>U.S. Customers Only | Built for Business Success</p>
        </div>
      </div>
    </body>
    </html>
    `,
    text: `Welcome to BeeHiveStack!

Thank you for joining BeeHiveStack - your trusted platform for launching digital products with confidence.

You're now part of an exclusive community focused on:
- Fast-Launch Solutions - Get your products to market quickly
- Stripe-Ready Infrastructure - Payment processing made simple  
- Professional Compliance - Built for business legitimacy
- U.S. Market Focus - Optimized for American customers

We'll keep you updated on new product launches, exclusive early access opportunities, best practices, and platform updates.

Stay tuned for exciting announcements coming soon!

Best regards,
The BeeHiveStack Team

BeeHiveStack.net | Professional Digital Product Platform
U.S. Customers Only | Built for Business Success`
  },

  adminNotification: {
    subject: "New BeeHiveStack Subscriber",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #0B0B0C; }
        .container { max-width: 500px; margin: 20px auto; padding: 30px; background: white; border-radius: 8px; border-left: 4px solid #FFC72C; }
        .header { color: #FFC72C; font-size: 18px; font-weight: 600; margin-bottom: 20px; }
        .info { background: #F7F7F8; padding: 15px; border-radius: 4px; margin: 15px 0; }
        .email { font-weight: 600; color: #0B0B0C; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">🐝 New BeeHiveStack Subscriber</div>
        <p>Someone just signed up for your email list!</p>
        <div class="info">
          <strong>Email:</strong> <span class="email">{{email}}</span><br>
          <strong>Tag:</strong> {{tag}}<br>
          <strong>Date:</strong> {{date}}<br>
          <strong>Time:</strong> {{time}}
        </div>
        <p>Total subscribers: <strong>{{totalCount}}</strong></p>
      </div>
    </body>
    </html>
    `,
    text: `New BeeHiveStack Subscriber

Someone just signed up for your email list!

Email: {{email}}
Tag: {{tag}}
Date: {{date}}
Time: {{time}}

Total subscribers: {{totalCount}}`
  }
};

// Send welcome email to new subscriber
export async function sendWelcomeEmail(email: string): Promise<boolean> {
  return await sendEmail({
    to: email,
    from: 'noreply@beehivestack.net', // Use noreply for better deliverability
    subject: emailTemplates.welcomeEmail.subject,
    html: emailTemplates.welcomeEmail.html,
    text: emailTemplates.welcomeEmail.text
  });
}

// Send admin notification
export async function sendAdminNotification(subscriberEmail: string, tag: string, totalCount: number): Promise<boolean> {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const time = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZoneName: 'short'
  });

  const htmlContent = emailTemplates.adminNotification.html
    .replace(/{{email}}/g, subscriberEmail)
    .replace(/{{tag}}/g, tag)
    .replace(/{{date}}/g, date)
    .replace(/{{time}}/g, time)
    .replace(/{{totalCount}}/g, totalCount.toString());

  const textContent = emailTemplates.adminNotification.text
    .replace(/{{email}}/g, subscriberEmail)
    .replace(/{{tag}}/g, tag)
    .replace(/{{date}}/g, date)
    .replace(/{{time}}/g, time)
    .replace(/{{totalCount}}/g, totalCount.toString());

  return await sendEmail({
    to: 'admin@beehivestack.net', // Update this to your actual admin email
    from: 'noreply@beehivestack.net',
    subject: emailTemplates.adminNotification.subject,
    html: htmlContent,
    text: textContent
  });
}

// Send newsletter to all subscribers
export async function sendNewsletter(
  subject: string, 
  htmlContent: string, 
  textContent: string,
  subscribers: Array<{ email: string }>
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  for (const subscriber of subscribers) {
    const sent = await sendEmail({
      to: subscriber.email,
      from: 'newsletter@beehivestack.net',
      subject,
      html: htmlContent,
      text: textContent
    });

    if (sent) {
      success++;
    } else {
      failed++;
    }

    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return { success, failed };
}