import express from 'express';
import Announcement from '../models/Announcement.js';

const router = express.Router();

// GET all announcements
router.get('/', async (req, res) => {
  try {
    const { category, target_audience } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (target_audience) filter.target_audience = target_audience;
    const announcements = await Announcement.find(filter)
      .populate('author_id', 'name role')
      .sort({ published_at: -1 });
    res.json(announcements);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id).populate('author_id', 'name role');
    if (!ann) return res.status(404).json({ error: 'Announcement not found' });
    res.json(ann);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const ann = new Announcement(req.body);
    await ann.save();
    res.status(201).json(ann);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

// UPDATE
router.patch('/:id', async (req, res) => {
  try {
    const ann = await Announcement.findByIdAndUpdate(req.params.id, { ...req.body, updated_at: Date.now() }, { new: true, runValidators: true });
    if (!ann) return res.status(404).json({ error: 'Announcement not found' });
    res.json(ann);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const ann = await Announcement.findByIdAndDelete(req.params.id);
    if (!ann) return res.status(404).json({ error: 'Announcement not found' });
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

export default router;
