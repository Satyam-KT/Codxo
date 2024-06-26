import mongoose from 'mongoose';
import Certificate from '../certificateModel.js';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb+srv://skt1082:gFibN3TqhqnpzyqH@codxo.f4xb4vo.mongodb.net/?retryWrites=true&w=majority&appName=Codxo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports = async (req, res) => {
  await connectToDatabase();
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
};
