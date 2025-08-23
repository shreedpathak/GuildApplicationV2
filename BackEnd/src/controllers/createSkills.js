import Skill from '../models/Skill.js';

export const addSkill = async (req, res) => {
  try {
    const { name, category, categoryName } = req.body;
    const skill = new Skill({ name, category, categoryName });
    await skill.save();

    res.status(201).json({ message: 'Skill added', skill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSkill = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
