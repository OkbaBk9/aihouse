import mongoose from 'mongoose';

const representativeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true },
  specialization: { type: String, required: true },
  ai_focus: { 
    type: String, 
    enum: ['python', 'data_science', 'machine_learning', 'deep_learning', 'nlp', 'computer_vision', 'robotics'],
    required: true 
  },
  validation_status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'validated', 'not_validated'],
    default: 'pending'
  },
  validated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  validated_at: { type: Date },
  mentored_faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

representativeSchema.index({ department: 1 });
representativeSchema.index({ ai_focus: 1 });

export default mongoose.model('Representative', representativeSchema);