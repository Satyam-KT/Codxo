import { connectToDatabase } from '../utils/connectToDatabase.js';
import Intern from '../../models/internModel.js'; // Adjust path if necessary
import { getSheetsData } from '../../sheets.js';
import { sendEmail } from '../utils/sendEmail.js';

export default async function handler(req, res) {
  await connectToDatabase();

  try {
    const sheetData = await getSheetsData();
    const lastEntry = sheetData[sheetData.length - 1];
    const [name, email, whatsappNumber, startDate] = lastEntry;

    const internId = `INTERN-${Date.now().toString(36)}`;
    const intern = new Intern({ internId, name, startDate, email, whatsappNumber, attendance: [], tasks: [] });
    await intern.save();

    sendEmail(email, internId, whatsappNumber);
    res.status(201).send('Intern profile created and email sent.');
  } catch (error) {
    res.status(500).send('Error creating intern profile');
  }
}
