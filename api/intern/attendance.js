import { connectToDatabase } from '../utils/connectToDatabase.js';
import Intern from '../../models/internModel.js'; // Adjust path if necessary

export default async function handler(req, res) {
  await connectToDatabase();

  const { internId, date } = req.body;

  try {
    const intern = await Intern.findOne({ internId });
    if (intern) {
      const attendanceEntry = intern.attendance.find(a => new Date(a.date).toDateString() === new Date(date).toDateString());
      if (attendanceEntry) {
        res.status(400).json({ message: 'Attendance already marked for today' });
      } else {
        intern.attendance.push({ date: new Date(date), marked: true });
        await intern.save();
        res.status(200).json({ message: 'Attendance marked successfully' });
      }
    } else {
      res.status(404).json({ message: 'Intern not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance', error });
  }
}
