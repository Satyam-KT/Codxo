import nodemailer from 'nodemailer';

export const sendEmail = (email, internId, whatsappNumber) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Ensure the service is 'gmail'
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log the error
    } else {
      console.log('Email sent:', info.response); // Log the successful response
    }
  });
};
