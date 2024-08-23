import { connectToDatabase } from '../utils/connectToDatabase.js';
import Intern from '../../models/internModel.js'; // Adjust path if necessary

export default async function handler(req, res) {
  await connectToDatabase();

  const { internId, whatsappNumber } = req.body;

  try {
    const intern = await Intern.findOne({ internId, whatsappNumber });
    if (intern) {
      res.status(200).json({ message: 'Login successful', internId });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
}
