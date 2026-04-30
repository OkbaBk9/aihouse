import express from 'express';
import {
  getRepresentatives,
  createRepresentative,
  validateRepresentative,
  updateRepresentative,
  getRepresentativeById
} from '../controllers/representativeController.js';

const router = express.Router();

router.get('/', getRepresentatives);
router.get('/:id', getRepresentativeById);
router.post('/', createRepresentative);
router.patch('/:id', updateRepresentative);
router.patch('/:id/validate', validateRepresentative);

export default router;