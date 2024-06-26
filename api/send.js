import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message, 'g-recaptcha-response': recaptchaResponse } = req.body;

  if (!name || !email || !subject || !message || !recaptchaResponse) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Verify reCAPTCHA
  const recaptchaSecret = '6LdOiQEqAAAAAJCjEuCUUHsSsZ3zzSyseomELeR_';
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`;

  try {
    const recaptchaRes = await fetch(recaptchaVerifyUrl, {
      method: 'POST',
    });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying reCAPTCHA.', error: error.message });
  }

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'hr.codxo@gmail.com',
      pass: 'hetxsmewsnouyaam'
    }
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'cofounder.codxo@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error sending message', error: error.message });
  }
}
