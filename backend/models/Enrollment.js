import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  status: {
    type: String,
    enum: ['registered', 'attended', 'completed', 'cancelled'],
    default: 'registered'
  },
  registration_date: { type: Date, default: Date.now },
  attendance_confirmed: { type: Boolean, default: false },
  certificate_issued: { type: Boolean, default: false },
  feedback_submitted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

enrollmentSchema.index({ user_id: 1, activity_id: 1 }, { unique: true });
enrollmentSchema.index({ activity_id: 1 });

export default mongoose.model('Enrollment', enrollmentSchema);
