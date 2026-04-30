import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// GET all feedbacks (optionally filter by activity)
router.get('/', async (req, res) => {
  try {
    const { activity_id } = req.query;
    const filter = {};
    if (activity_id) filter.activity_id = activity_id;
    const feedbacks = await Feedback.find(filter)
      .populate('user_id', 'name email')
      .populate('activity_id', 'title')
      .sort({ created_at: -1 });
    res.json(feedbacks);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const fb = await Feedback.findById(req.params.id)
      .populate('user_id', 'name').populate('activity_id', 'title');
    if (!fb) return res.status(404).json({ error: 'Feedback not found' });
    res.json(fb);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const fb = new Feedback(req.body);
    await fb.save();
    res.status(201).json(fb);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

// UPDATE
router.patch('/:id', async (req, res) => {
  try {
    const fb = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!fb) return res.status(404).json({ error: 'Feedback not found' });
    res.json(fb);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const fb = await Feedback.findByIdAndDelete(req.params.id);
    if (!fb) return res.status(404).json({ error: 'Feedback not found' });
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

export default router;
