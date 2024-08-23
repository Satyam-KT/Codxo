import { connectToDatabase } from '../utils/connectToDatabase.js';
import Intern from '../../models/internModel.js'; // Adjust path if necessary

export default async function handler(req, res) {
  await connectToDatabase();

  const { internId } = req.query;

  try {
    const intern = await Intern.findOne({ internId });
    if (intern) {
      res.status(200).json(intern);
    } else {
      res.status(404).json({ message: 'Intern not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching intern data', error });
  }
}
