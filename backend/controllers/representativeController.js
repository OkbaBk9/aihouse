import Representative from '../models/Representative.js';

// GET all representatives (with optional filters)
export const getRepresentatives = async (req, res) => {
  try {
    const { department, ai_focus, validation_status } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (ai_focus) filter.ai_focus = ai_focus;
    if (validation_status) filter.validation_status = validation_status;

    const representatives = await Representative.find(filter)
      .populate('user_id', 'name email')
      .sort({ department: 1 });
    res.json(representatives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET one representative by ID
export const getRepresentativeById = async (req, res) => {
  try {
    const rep = await Representative.findById(req.params.id).populate('user_id', 'name email');
    if (!rep) return res.status(404).json({ error: 'Representative not found' });
    res.json(rep);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new representative
export const createRepresentative = async (req, res) => {
  try {
    const rep = new Representative(req.body);
    await rep.save();
    res.status(201).json(rep);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE a representative
export const updateRepresentative = async (req, res) => {
  try {
    const rep = await Representative.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true, runValidators: true }
    ).populate('user_id', 'name email');
    if (!rep) return res.status(404).json({ error: 'Representative not found' });
    res.json(rep);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// VALIDATE a representative (special action)
export const validateRepresentative = async (req, res) => {
  try {
    const { validated_by } = req.body;
    const rep = await Representative.findByIdAndUpdate(
      req.params.id,
      {
        validation_status: 'validated',
        validated_by,
        validated_at: Date.now(),
        updated_at: Date.now()
      },
      { new: true, runValidators: true }
    ).populate('user_id', 'name email');
    if (!rep) return res.status(404).json({ error: 'Representative not found' });
    res.json(rep);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};