import Requests from '../models/Requests.js';

// ✅ Create a new request
export const addRequests = async (req, res) => {
  try {
    const { title, description, category, location, priority, budget, requester } = req.body;

    // Validation
    if (!title || !description || !category || !location || !priority || !budget || !requester) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new request
    const createdRequest = await Requests.create({
      title,
      description,
      category,
      location,
      priority,
      budget,
      requester
    });

    res.status(201).json({
      message: 'Request created successfully!',
      request: createdRequest
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all requests
export const getRequests = async (req, res) => {
  try {
    const requests = await Requests.find(); // Fetch all requests
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
