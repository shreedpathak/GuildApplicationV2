import User from '../models/User.js';

export const addUserSkill = async (req, res) => {
    try {
      const { skillId, skillName } = req.body;
  
      const userId = req.user?._id; // 🔍 Ensure req.user is populated
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User not found in request' });
      }
  
      // ✅ Validate skillId exists in Skill collection
      const existingSkill = await Skill.findById(skillId);
      if (!existingSkill) {
        return res.status(404).json({ error: 'Skill not found' });
      }
  
      // ✅ Find the profile of the current user
      const profile = await Profile.findOne({ user: userId });
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // ✅ Avoid duplicate skills
      const skillExists = profile.skills.some(
        (s) => s.skill.toString() === skillId.toString()
      );
      if (skillExists) {
        return res.status(400).json({ error: 'Skill already added to profile' });
      }
  
      // ✅ Add skill to profile's skills array
      profile.skills.push({ skill: skillId, skillName }); // make sure your Profile schema supports this structure
      await profile.save();
  
      res.status(201).json({
        message: 'Skill added to profile',
        skills: profile.skills,
      });
  
    } catch (err) {
      console.error('Add Skill Error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// Get all helpers
export const getAllHelpers = async (req, res) => {
  try {
    const helpers = await User.find({ role: 'helper' });
    res.json(helpers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
  