import express from 'express';
import {addRequests}  from '../controllers/handleRequests.js';
import {getRequests}  from '../controllers/handleRequests.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/createRequest', addRequests);
router.get('/', getRequests);

export default router;
