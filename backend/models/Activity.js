import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['proposed', 'approved', 'past', 'cancelled'],
    default: 'proposed'
  },
  scheduled_date: { type: Date, required: true },
  location: { type: String },
  resources: [{ type: String }],
  max_participants: { type: Number, default: 30 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

activitySchema.index({ department: 1, scheduled_date: 1 });
activitySchema.index({ status: 1 });

export default mongoose.model('Activity', activitySchema);