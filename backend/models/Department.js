import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  name_ar: { type: String, required: true },
  faculty: { type: String, required: true },
  head_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ai_readiness_score: { type: Number, min: 0, max: 100, default: 0 },
  total_students: { type: Number, default: 0 },
  total_staff: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

departmentSchema.index({ faculty: 1 });

export default mongoose.model('Department', departmentSchema);
