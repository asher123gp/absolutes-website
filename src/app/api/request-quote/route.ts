import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Only instantiate Resend if the key is available, preventing crash at build time
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Honeypot check (simple bot prevention)
    if (body.website_url) {
      return NextResponse.json({ success: true }); // pretend it worked
    }

    const requiredFields = ['fullName', 'companyName', 'businessEmail', 'country', 'product', 'quantityRequired', 'application', 'deliveryLocation'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const {
      fullName,
      companyName,
      businessEmail,
      phone,
      country,
      product,
      extractType,
      quantityRequired,
      annualRequirement,
      application,
      deliveryLocation,
      specifications,
      message
    } = body;

    const email1 = process.env.CONTACT_EMAIL_1;
    const email2 = process.env.CONTACT_EMAIL_2;
    const fromEmail = process.env.FROM_EMAIL || 'website@absolutes.co.in';

    if (!email1 || !email2 || !resend) {
      console.error('Server configuration error: Missing emails or Resend API key');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #1a1a1a; margin-bottom: 5px;">ABSOLUTES</h2>
        <p style="color: #666; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 0; margin-bottom: 30px;">Dynamic Flavor Extracts</p>
        
        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">NEW QUOTE REQUEST — ${product}</h3>
        
        <h4 style="margin-top: 25px; color: #666; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">CONTACT INFORMATION</h4>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Business Email:</strong> ${businessEmail}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Country:</strong> ${country}</p>
        
        <h4 style="margin-top: 25px; color: #666; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">REQUIREMENT</h4>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Extract Type:</strong> ${extractType || 'Not specified'}</p>
        <p><strong>Quantity Required:</strong> ${quantityRequired}</p>
        <p><strong>Estimated Annual Requirement:</strong> ${annualRequirement || 'Not specified'}</p>
        <p><strong>Application:</strong> ${application}</p>
        
        <h4 style="margin-top: 25px; color: #666; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">DELIVERY</h4>
        <p><strong>Delivery Location:</strong> ${deliveryLocation}</p>
        
        <h4 style="margin-top: 25px; color: #666; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">ADDITIONAL INFORMATION</h4>
        <p><strong>Specifications / Requirements:</strong><br/>${specifications ? specifications.replace(/\n/g, '<br/>') : 'None specified.'}</p>
        <p><strong>Message:</strong><br/>${message ? message.replace(/\n/g, '<br/>') : 'No additional message.'}</p>
        
        <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #999;">
          Submitted: ${new Date().toUTCString()}
        </div>
      </div>
    `;

    const subject = `New Quote Request — ${product || 'Website'}`;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email1, email2],
      replyTo: businessEmail,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error(`[Safe Resend Log] Failed to send email. Status: ${error.name}, Message: ${error.message}`);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
