import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: {
    type: String,
    enum: ['general', 'event', 'workshop', 'achievement', 'partnership', 'urgent'],
    default: 'general'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  target_audience: {
    type: String,
    enum: ['all', 'students', 'staff', 'organizers', 'rectorate'],
    default: 'all'
  },
  is_published: { type: Boolean, default: true },
  published_at: { type: Date, default: Date.now },
  expires_at: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

announcementSchema.index({ category: 1 });
announcementSchema.index({ published_at: -1 });

export default mongoose.model('Announcement', announcementSchema);
