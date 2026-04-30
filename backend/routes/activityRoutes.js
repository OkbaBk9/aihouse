import express from 'express';
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityById
} from '../controllers/activityController.js';

const router = express.Router();

router.get('/', getActivities);
router.get('/:id', getActivityById);
router.post('/', createActivity);
router.patch('/:id', updateActivity);
router.delete('/:id', deleteActivity);

export default router;