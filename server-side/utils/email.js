import nodemailer from "nodemailer";

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send appointment confirmation email
export const sendAppointmentConfirmation = async (
  appointment,
  customer,
  agent,
  property
) => {
  const mailOptions = {
    from: `"RealConnect" <${process.env.EMAIL_USER}>`,
    to: customer.email,
    subject: `Appointment Confirmed - ${property.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Appointment Confirmed! 🎉</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-bottom: 10px;">Appointment Details</h3>
          <p><strong>Property:</strong> ${property.title}</p>
          <p><strong>Date:</strong> ${new Date(
            appointment.appointmentDate
          ).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
          <p><strong>Mode:</strong> ${appointment.meetingMode}</p>
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin-bottom: 10px;">Agent Information</h3>
          <p><strong>Name:</strong> ${agent.name}</p>
          <p><strong>Phone:</strong> ${agent.phone}</p>
          <p><strong>Email:</strong> ${agent.email}</p>
        </div>

        <div style="margin: 20px 0;">
          <p><strong>Location:</strong> ${property.location.address}, ${
      property.location.city
    }</p>
          <p><strong>Property Price:</strong> ₹${property.price.toLocaleString()}</p>
        </div>

        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;">
            <strong>Note:</strong> Please arrive 5 minutes before your scheduled time. 
            Contact your agent if you need to reschedule.
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #64748b; font-size: 14px;">
            Thank you for choosing RealConnect!<br>
            We look forward to helping you find your dream property.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error);
    throw error;
  }
};

// Send appointment reminder email
export const sendAppointmentReminder = async (
  appointment,
  customer,
  agent,
  property
) => {
  const mailOptions = {
    from: `"RealConnect" <${process.env.EMAIL_USER}>`,
    to: customer.email,
    subject: `Reminder: Property Viewing Tomorrow - ${property.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Appointment Reminder ⏰</h2>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #92400e; margin-bottom: 10px;">Don't Forget Your Appointment!</h3>
          <p><strong>Property:</strong> ${property.title}</p>
          <p><strong>Date:</strong> ${new Date(
            appointment.appointmentDate
          ).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
          <p><strong>Mode:</strong> ${appointment.meetingMode}</p>
        </div>

        <div style="margin: 20px 0;">
          <p><strong>Agent:</strong> ${agent.name} (${agent.phone})</p>
          <p><strong>Location:</strong> ${property.location.address}, ${
      property.location.city
    }</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #64748b; font-size: 14px;">
            See you tomorrow! If you need to reschedule, please contact your agent.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending appointment reminder email:", error);
  }
};

// Send contact inquiry notification to agent
export const sendInquiryNotification = async (
  inquiry,
  customer,
  agent,
  property
) => {
  const mailOptions = {
    from: `"RealConnect" <${process.env.EMAIL_USER}>`,
    to: agent.email,
    subject: `New Inquiry for ${property.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Property Inquiry! 📩</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin-bottom: 10px;">Customer Details</h3>
          <p><strong>Name:</strong> ${customer.name}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Phone:</strong> ${customer.phone}</p>
          <p><strong>Inquiry Type:</strong> ${inquiry.inquiryType}</p>
          ${
            inquiry.message
              ? `<p><strong>Message:</strong> ${inquiry.message}</p>`
              : ""
          }
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin-bottom: 10px;">Property Details</h3>
          <p><strong>Title:</strong> ${property.title}</p>
          <p><strong>Price:</strong> ₹${property.price.toLocaleString()}</p>
          <p><strong>Location:</strong> ${property.location.address}, ${
      property.location.city
    }</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #64748b; font-size: 14px;">
            Please respond to this inquiry within 24 hours for best results.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending inquiry notification email:", error);
  }
};

// Test email configuration
export const testEmail = async () => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email from Real Estate App",
      text: "This is a test email from your real estate application backend.",
    };

    await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending test email:", error);
    return false;
  }
};

// Send Password Reset Email
export const sendPasswordResetEmail = async (user, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || `"Makaan4U" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Makaan4U - Password Reset Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 10px; border: 1px solid #e2e8f0;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Makaan4U</h1>
        </div>
        
        <h2 style="color: #1e293b; font-size: 20px; margin-bottom: 15px;">Password Reset Request</h2>
        
        <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
          Hello ${user.name},<br><br>
          We received a request to reset your password. Enter the following 6-digit code to continue:
        </p>

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="background-color: #f1f5f9; border: 2px dashed #94a3b8; color: #1e293b; padding: 15px; border-radius: 8px; font-weight: 700; font-size: 32px; letter-spacing: 4px; display: inline-block;">
            ${otp}
          </div>
        </div>

        <p style="color: #64748b; font-size: 14px; margin-bottom: 25px; text-align: center;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #94a3b8; font-size: 13px; margin: 0;">
            This code will expire in 10 minutes.<br>
            © ${new Date().getFullYear()} Makaan4U. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
