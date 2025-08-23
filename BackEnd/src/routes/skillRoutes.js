import express from 'express';
import { addSkill } from '../controllers/createSkills.js';
import { getSkill } from '../controllers/createSkills.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', addSkill);
router.get('/list', getSkill);

export default router;
