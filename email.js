const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// API endpoint to handle form submission
app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;
  
    if (!name || !email || !subject || !message) {
      return res.status(400).send('All fields are required.');
    }

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Change to your email provider
    auth: {
      user: 'hr.codxo@gmail.com',
      pass: 'hetxsmewsnouyaam'
    }
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'cofounder.codxo@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending message.');
    } else {
      return res.status(200).send('Message sent successfully!');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
