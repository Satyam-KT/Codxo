import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  domain: { type: String, required: true },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
