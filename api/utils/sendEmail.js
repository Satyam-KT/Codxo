import nodemailer from 'nodemailer';

export const sendEmail = (email, internId, whatsappNumber) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'cofounder.codxo@gmail.com',
      pass: 'skzzkbpjraxqnuwz',
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
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
