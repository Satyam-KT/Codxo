// server.js
const express = require('express');
const mongoose = require('mongoose');
const Certificate = require('./certificateModel');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://skt1082:gFibN3TqhqnpzyqH@codxo.f4xb4vo.mongodb.net/?retryWrites=true&w=majority&appName=Codxo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.static('public'));

app.post('/verify', async (req, res) => {
  const { certificateNumber } = req.body;
  try {
    const certificate = await Certificate.findOne({ certificateNumber });
    if (certificate) {
      res.status(200).json({ name: certificate.name, domain: certificate.domain });
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
