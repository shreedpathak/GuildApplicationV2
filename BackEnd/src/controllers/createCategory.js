import Category from '../models/Category.js';

export const addCategory = async (req, res) => {
  try {
    const categories = req.body; // Assuming the categories are passed as an array

    const createdCategories = await Category.insertMany(categories); // Bulk insert

    res.status(201).json({
      message: 'Categories added successfully!',
      categories: createdCategories
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

