import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Activity from './models/Activity.js';
import Representative from './models/Representative.js';
import User from './models/User.js';

dotenv.config();

// ─────────────────────────────────────────────────────────────────────────────
// Sample Data
// ─────────────────────────────────────────────────────────────────────────────

const sampleUsers = [
  { email: 'admin@aihouse.dz',       password_hash: 'hashed_pw_1', name: 'Admin User',       role: 'admin',        department: 'administration', is_active: true },
  { email: 'organizer@aihouse.dz',   password_hash: 'hashed_pw_2', name: 'Nour El Imane',    role: 'organizer',    department: 'computer_science', is_active: true },
  { email: 'rep@aihouse.dz',         password_hash: 'hashed_pw_3', name: 'Dr. Brahim',       role: 'lecturer_rep', department: 'mathematics', is_active: true },
  { email: 'rectorate@univ.dz',      password_hash: 'hashed_pw_4', name: 'Rectorate Office', role: 'rectorate',    department: 'rectorate', is_active: true },
  { email: 'dept_cs@univ.dz',        password_hash: 'hashed_pw_5', name: 'Dr. Hakim',        role: 'dept_head',    department: 'computer_science', is_active: true },
  { email: 'prof.lagha@univ.dz',     password_hash: 'hashed_pw_6', name: 'Prof. M. Lagha',   role: 'lecturer_rep', department: 'computer_science', is_active: true },
];

const sampleActivities = [
  { title: 'AI Ethics Workshop',           description: 'Explore ethical implications of AI in education',     department: 'computer_science', status: 'approved', scheduled_date: new Date('2026-05-10'), location: 'Amphi A', max_participants: 50 },
  { title: 'Generative AI Seminar',        description: 'Introduction to LLMs and prompt engineering',         department: 'mathematics',      status: 'proposed', scheduled_date: new Date('2026-06-15'), location: 'Salle 204', max_participants: 30 },
  { title: 'Data Science Bootcamp',        description: 'Hands-on Python data analysis for beginners',         department: 'computer_science', status: 'approved', scheduled_date: new Date('2026-05-20'), location: 'Lab Info 3', max_participants: 25 },
  { title: 'University 4.0 Week',          description: 'Week-long event showcasing AI projects',              department: 'administration',   status: 'approved', scheduled_date: new Date('2026-04-16'), location: 'Grand Hall', max_participants: 200 },
  { title: 'NLP Workshop',                 description: 'Natural Language Processing with transformers',       department: 'computer_science', status: 'proposed', scheduled_date: new Date('2026-07-01'), location: 'Lab Info 1', max_participants: 20 },
  { title: 'Computer Vision Introduction', description: 'Image classification with CNNs using PyTorch',        department: 'electronics',      status: 'past',     scheduled_date: new Date('2026-03-10'), location: 'Salle 102', max_participants: 35 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Seed Function
// ─────────────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    // Try local MongoDB first
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aihouse';
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
      console.log('📦 Connected to LOCAL MongoDB');
    } catch {
      console.log('⚠️  No local MongoDB. Using in-memory MongoDB for seeding...');
      const mongod = await MongoMemoryServer.create();
      await mongoose.connect(mongod.getUri());
      console.log('📦 Connected to IN-MEMORY MongoDB');
    }

    // Clear existing data
    await User.deleteMany({});
    await Activity.deleteMany({});
    await Representative.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert users
    const users = await User.insertMany(sampleUsers);
    console.log(`👤 Inserted ${users.length} users`);

    // Insert activities (link organizer)
    const organizer = users.find(u => u.role === 'organizer');
    const activitiesWithOrganizer = sampleActivities.map(a => ({ ...a, organizer_id: organizer._id }));
    const activities = await Activity.insertMany(activitiesWithOrganizer);
    console.log(`📋 Inserted ${activities.length} activities`);

    // Insert representatives (link user)
    const repUser = users.find(u => u.email === 'rep@aihouse.dz');
    const profUser = users.find(u => u.email === 'prof.lagha@univ.dz');
    const adminUser = users.find(u => u.role === 'admin');
    
    const sampleReps = [
      { user_id: repUser._id, department: 'mathematics', specialization: 'Applied Mathematics', ai_focus: 'data_science', validation_status: 'validated', validated_by: adminUser._id, validated_at: new Date() },
      { user_id: profUser._id, department: 'computer_science', specialization: 'Software Engineering', ai_focus: 'machine_learning', validation_status: 'pending' },
    ];
    const reps = await Representative.insertMany(sampleReps);
    console.log(`🎓 Inserted ${reps.length} representatives`);

    console.log('');
    console.log('✅ Seeding completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   Users:           ${users.length}`);
    console.log(`   Activities:      ${activities.length}`);
    console.log(`   Representatives: ${reps.length}`);

  } catch (error) {
    console.error('❌ Seed failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
