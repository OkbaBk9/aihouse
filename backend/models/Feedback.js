import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 500 },
  difficulty_level: {
    type: String,
    enum: ['too_easy', 'appropriate', 'challenging', 'too_hard'],
    default: 'appropriate'
  },
  would_recommend: { type: Boolean, default: true },
  suggestions: { type: String, maxlength: 300 },
  created_at: { type: Date, default: Date.now }
});

feedbackSchema.index({ activity_id: 1 });
feedbackSchema.index({ user_id: 1, activity_id: 1 }, { unique: true });

export default mongoose.model('Feedback', feedbackSchema);
