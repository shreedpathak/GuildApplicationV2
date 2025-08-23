import express from 'express';

import authRoutes from './authRoutes.js';
import helperRoutes from './helperRoutes.js';
import neederRoutes from './neederRoutes.js';
import areaRoutes from './areaRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import skillRoutes from './skillRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/helpers', helperRoutes);
router.use('/needers', neederRoutes);
router.use('/api', areaRoutes);
router.use('/category', categoryRoutes);
router.use('/skill', skillRoutes);

export default router;
