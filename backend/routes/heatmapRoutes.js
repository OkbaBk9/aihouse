import express from 'express';
import { getTrainingHeatmap, getDepartmentStats } from '../services/trainingHeatmapService.js';

const router = express.Router();

router.get('/', getTrainingHeatmap);
router.get('/department/:department', getDepartmentStats);

export default router;