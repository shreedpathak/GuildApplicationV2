import express from 'express';
import {addCategory}  from '../controllers/createCategory.js';
import {getCategory}  from '../controllers/createCategory.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', verifyToken, addCategory);
router.get('/', getCategory);

export default router;
