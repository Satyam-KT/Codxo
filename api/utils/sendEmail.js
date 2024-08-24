import nodemailer from 'nodemailer';

export const sendEmail = async (email, internId, whatsappNumber) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cofounder.codxo@gmail.com',
      pass: 'skzzkbpjraxqnuwz', // Use an App password if 2-Step Verification is enabled
    },
  });

  const mailOptions = {
    from: 'cofounder.codxo@gmail.com',
    to: email,
    subject: 'Your Internship Credentials',
    text: `Your Intern ID: ${internId}\nYour Password is your WhatsApp number.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
