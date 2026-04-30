import express from 'express';
import Department from '../models/Department.js';

const router = express.Router();

// GET all departments
router.get('/', async (req, res) => {
  try {
    const { faculty } = req.query;
    const filter = {};
    if (faculty) filter.faculty = faculty;
    const departments = await Department.find(filter).populate('head_id', 'name email').sort({ name: 1 });
    res.json(departments);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// GET one
router.get('/:id', async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id).populate('head_id', 'name email');
    if (!dept) return res.status(404).json({ error: 'Department not found' });
    res.json(dept);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.status(201).json(dept);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

// UPDATE
router.patch('/:id', async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, { ...req.body, updated_at: Date.now() }, { new: true, runValidators: true });
    if (!dept) return res.status(404).json({ error: 'Department not found' });
    res.json(dept);
  } catch (error) { res.status(400).json({ error: error.message }); }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ error: 'Department not found' });
    res.json({ message: 'Department deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

export default router;
