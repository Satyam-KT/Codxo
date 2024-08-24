import { connectToDatabase } from '../utils/connectToDatabase.js';
import Intern from '../../models/internModel.js'; // Adjust path if necessary
import { sendEmail } from '../utils/sendEmail.js';

export default async function handler(req, res) {
  // Connect to the database
  await connectToDatabase();

  try {
    // Ensure the request method is POST
    if (req.method === 'POST') {
      // Extract data from request body
      const { name, email, whatsappNumber, startDate } = req.body;

      // Generate a unique intern ID
      const internId = `INTERN-${Date.now().toString(36)}`;

      // Create a new intern record
      const intern = new Intern({
        internId,
        name,
        startDate,
        email,
        whatsappNumber,
        attendance: [],
        tasks: []
      });

      // Save the intern to the database
      await intern.save();

      // Send an email with intern details
      sendEmail(email, internId, whatsappNumber);

      // Send a success response
      res.status(201).send('Intern profile created and email sent.');
    } else {
      // Handle unsupported request methods
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error creating intern profile:', error);
    res.status(500).send('Error creating intern profile');
  }
}
