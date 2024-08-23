import { connectToDatabase } from '../utils/connectToDatabase.js';
import Intern from '../../models/internModel.js'; // Adjust path if necessary

export default async function handler(req, res) {
  await connectToDatabase();

  const { internId, date, description } = req.body;

  try {
    const intern = await Intern.findOne({ internId });
    if (intern) {
      intern.tasks.push({ date: new Date(date), description });
      await intern.save();
      res.status(200).json({ message: 'Task submitted successfully' });
    } else {
      res.status(404).json({ message: 'Intern not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error submitting task', error });
  }
}
