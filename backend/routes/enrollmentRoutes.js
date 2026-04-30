import express from 'express';
import Enrollment from '../models/Enrollment.js';

const router = express.Router();

// GET all enrollments (optionally filter by activity or user)
router.get('/', async (req, res) => {
  try {
    const { activity_id, user_id } = req.query;
    const filter = {};
    if (activity_id) filter.activity_id = activity_id;
    if (user_id) filter.user_id = user_id;
    const enrollments = await Enrollment.find(filter)
      .populate('user_id', 'name email role')
      .populate('activity_id', 'title scheduled_date location')
      .sort({ registration_date: -1 });
    res.json(enrollments);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('user_id', 'name email').populate('activity_id', 'title');
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
    res.json(enrollment);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// CREATE (register for an activity)
router.post('/', async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

// UPDATE (mark attendance, certificate, etc.)
router.patch('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
    res.json(enrollment);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

// DELETE (cancel enrollment)
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
    res.json({ message: 'Enrollment cancelled successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

export default router;
