import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  name: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'organizer', 'lecturer_rep', 'rectorate', 'dept_head', 'participant', 'student'],
    required: true 
  },
  department: { type: String },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

userSchema.index({ role: 1 });
userSchema.index({ department: 1 });

export default mongoose.model('User', userSchema);