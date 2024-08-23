import { connectToDatabase } from '../utils/connectToDatabase.js';
import Intern from '../../models/internModel.js'; // Adjust path if necessary

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    const interns = await Intern.find();
    res.status(200).json(interns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error });
  }
}
