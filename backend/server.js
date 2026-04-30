import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { MongoMemoryServer } from 'mongodb-memory-server';

import authRoutes from './routes/authRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import representativeRoutes from './routes/representativeRoutes.js';
import heatmapRoutes from './routes/heatmapRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

import Activity from './models/Activity.js';
import Representative from './models/Representative.js';
import User from './models/User.js';
import Department from './models/Department.js';
import Enrollment from './models/Enrollment.js';
import Announcement from './models/Announcement.js';
import Feedback from './models/Feedback.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes (7 collections)
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/representatives', representativeRoutes);
app.use('/api/heatmap', heatmapRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/feedbacks', feedbackRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    collections: ['users', 'activities', 'representatives', 'departments', 'enrollments', 'announcements', 'feedbacks']
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Auto-seed sample data (only when DB is empty)
// ─────────────────────────────────────────────────────────────────────────────
async function autoSeed() {
  const userCount = await User.countDocuments();
  if (userCount > 0) {
    console.log('📊 Database already has data, skipping seed.');
    return;
  }

  console.log('🌱 Empty database detected, inserting sample data...');

  // Hash password for all seed accounts (password: Test123!)
  const hashedPassword = await bcrypt.hash('Test123!', 10);

  // ── 1. USERS (12 users) ──────────────────────────────────────────────────
  const users = await User.insertMany([
    { email: 'admin@aihouse.dz',       password_hash: hashedPassword, name: 'Admin User',       role: 'admin',        department: 'administration', is_active: true },
    { email: 'organizer@aihouse.dz',   password_hash: hashedPassword, name: 'Nour El Imane',    role: 'organizer',    department: 'computer_science', is_active: true },
    { email: 'rep@aihouse.dz',         password_hash: hashedPassword, name: 'Dr. Brahim',       role: 'lecturer_rep', department: 'mathematics', is_active: true },
    { email: 'rectorate@univ.dz',      password_hash: hashedPassword, name: 'Rectorate Office', role: 'rectorate',    department: 'rectorate', is_active: true },
    { email: 'dept_cs@univ.dz',        password_hash: hashedPassword, name: 'Dr. Hakim',        role: 'dept_head',    department: 'computer_science', is_active: true },
    { email: 'prof.lagha@univ.dz',     password_hash: hashedPassword, name: 'Prof. M. Lagha',   role: 'lecturer_rep', department: 'computer_science', is_active: true },
    { email: 'student1@univ.dz',       password_hash: hashedPassword, name: 'Karim Bouzid',     role: 'student',      department: 'computer_science', is_active: true },
    { email: 'student2@univ.dz',       password_hash: hashedPassword, name: 'Amira Benali',     role: 'student',      department: 'mathematics', is_active: true },
    { email: 'student3@univ.dz',       password_hash: hashedPassword, name: 'Yassine Kaci',     role: 'student',      department: 'physics', is_active: true },
    { email: 'participant1@univ.dz',   password_hash: hashedPassword, name: 'Sara Medjdoub',    role: 'participant',  department: 'biology', is_active: true },
    { email: 'participant2@univ.dz',   password_hash: hashedPassword, name: 'Omar Rahmani',     role: 'participant',  department: 'electronics', is_active: true },
    { email: 'dept_math@univ.dz',      password_hash: hashedPassword, name: 'Prof. Zerrouki',   role: 'dept_head',    department: 'mathematics', is_active: true },
  ]);

  const admin     = users.find(u => u.role === 'admin');
  const organizer = users.find(u => u.role === 'organizer');
  const students  = users.filter(u => u.role === 'student');
  const participants = users.filter(u => u.role === 'participant');
  const reps      = users.filter(u => u.role === 'lecturer_rep');
  const deptHeads = users.filter(u => u.role === 'dept_head');

  // ── 2. DEPARTMENTS (7 departments) ───────────────────────────────────────
  const departments = await Department.insertMany([
    { name: 'computer_science', name_ar: 'علوم الحاسوب',    faculty: 'Sciences & Technology', head_id: deptHeads[0]._id, ai_readiness_score: 85, total_students: 420, total_staff: 32 },
    { name: 'mathematics',      name_ar: 'الرياضيات',       faculty: 'Sciences & Technology', head_id: deptHeads[1]._id, ai_readiness_score: 62, total_students: 280, total_staff: 22 },
    { name: 'physics',          name_ar: 'الفيزياء',        faculty: 'Sciences & Technology', head_id: null,             ai_readiness_score: 45, total_students: 310, total_staff: 25 },
    { name: 'biology',          name_ar: 'علم الأحياء',     faculty: 'Natural Sciences',      head_id: null,             ai_readiness_score: 30, total_students: 350, total_staff: 28 },
    { name: 'electronics',      name_ar: 'الإلكترونيك',     faculty: 'Sciences & Technology', head_id: null,             ai_readiness_score: 55, total_students: 200, total_staff: 18 },
    { name: 'architecture',     name_ar: 'الهندسة المعمارية', faculty: 'Architecture & Urbanism', head_id: null,          ai_readiness_score: 20, total_students: 180, total_staff: 15 },
    { name: 'medicine',         name_ar: 'الطب',            faculty: 'Medical Sciences',      head_id: null,             ai_readiness_score: 35, total_students: 500, total_staff: 45 },
  ]);

  // ── 3. ACTIVITIES (10 activities) ────────────────────────────────────────
  const activities = await Activity.insertMany([
    { title: 'AI Ethics Workshop',           description: 'Explore ethical implications of AI in education',          department: 'computer_science', status: 'approved', scheduled_date: new Date('2026-05-10'), location: 'Amphi A',      max_participants: 50,  organizer_id: organizer._id },
    { title: 'Generative AI Seminar',        description: 'Introduction to LLMs and prompt engineering',              department: 'mathematics',      status: 'proposed', scheduled_date: new Date('2026-06-15'), location: 'Salle 204',    max_participants: 30,  organizer_id: organizer._id },
    { title: 'Data Science Bootcamp',        description: 'Hands-on Python data analysis for beginners',              department: 'computer_science', status: 'approved', scheduled_date: new Date('2026-05-20'), location: 'Lab Info 3',   max_participants: 25,  organizer_id: organizer._id },
    { title: 'University 4.0 Week',          description: 'Week-long event showcasing AI student projects',           department: 'administration',   status: 'approved', scheduled_date: new Date('2026-04-16'), location: 'Grand Hall',   max_participants: 200, organizer_id: organizer._id },
    { title: 'NLP Workshop',                 description: 'Natural Language Processing with transformers',            department: 'computer_science', status: 'proposed', scheduled_date: new Date('2026-07-01'), location: 'Lab Info 1',   max_participants: 20,  organizer_id: organizer._id },
    { title: 'Computer Vision Introduction', description: 'Image classification with CNNs using PyTorch',             department: 'electronics',      status: 'past',     scheduled_date: new Date('2026-03-10'), location: 'Salle 102',    max_participants: 35,  organizer_id: organizer._id },
    { title: 'PyStep: Python Fundamentals',  description: 'Step-by-step Python programming for absolute beginners',   department: 'computer_science', status: 'approved', scheduled_date: new Date('2026-05-25'), location: 'Lab Info 2',   max_participants: 40,  organizer_id: organizer._id },
    { title: 'AI in Medicine Lecture',       description: 'How AI assists in medical imaging and diagnostics',        department: 'medicine',         status: 'proposed', scheduled_date: new Date('2026-08-05'), location: 'Medical Amphi', max_participants: 60, organizer_id: organizer._id },
    { title: 'Robotics & Automation',        description: 'Building autonomous robots with AI control systems',       department: 'electronics',      status: 'approved', scheduled_date: new Date('2026-06-20'), location: 'Robotics Lab', max_participants: 15,  organizer_id: organizer._id },
    { title: 'Statistical Learning Theory',  description: 'Mathematical foundations of machine learning algorithms',  department: 'mathematics',      status: 'past',     scheduled_date: new Date('2026-02-15'), location: 'Salle 301',    max_participants: 25,  organizer_id: organizer._id },
  ]);

  // ── 4. REPRESENTATIVES (5 representatives) ──────────────────────────────
  await Representative.insertMany([
    { user_id: reps[0]._id, department: 'mathematics',      specialization: 'Applied Mathematics',     ai_focus: 'data_science',      validation_status: 'validated',  validated_by: admin._id, validated_at: new Date() },
    { user_id: reps[1]._id, department: 'computer_science', specialization: 'Software Engineering',    ai_focus: 'machine_learning',  validation_status: 'pending' },
    { user_id: deptHeads[0]._id, department: 'computer_science', specialization: 'Artificial Intelligence', ai_focus: 'deep_learning', validation_status: 'validated', validated_by: admin._id, validated_at: new Date() },
    { user_id: deptHeads[1]._id, department: 'mathematics',      specialization: 'Statistics',              ai_focus: 'python',        validation_status: 'in_progress' },
    { user_id: participants[1]._id, department: 'electronics', specialization: 'Embedded Systems',       ai_focus: 'robotics',          validation_status: 'pending' },
  ]);

  // ── 5. ENROLLMENTS (15 enrollments) ──────────────────────────────────────
  const enrollmentData = [];
  // Each student/participant registers for several activities
  for (const student of [...students, ...participants]) {
    const numActivities = Math.floor(Math.random() * 3) + 2; // 2-4 activities each
    const shuffled = activities.sort(() => 0.5 - Math.random()).slice(0, numActivities);
    for (const activity of shuffled) {
      enrollmentData.push({
        user_id: student._id,
        activity_id: activity._id,
        status: ['registered', 'attended', 'completed'][Math.floor(Math.random() * 3)],
        attendance_confirmed: Math.random() > 0.3,
        certificate_issued: Math.random() > 0.6,
        feedback_submitted: Math.random() > 0.5,
      });
    }
  }
  await Enrollment.insertMany(enrollmentData);

  // ── 6. ANNOUNCEMENTS (8 announcements) ───────────────────────────────────
  await Announcement.insertMany([
    { title: 'AI House Launch Event',                    content: 'We are excited to announce the official launch of the AI House at University of Blida 1. All students and faculty are invited.',                     author_id: admin._id,     category: 'event',       priority: 'high',   target_audience: 'all' },
    { title: 'Workshop Registration Open',               content: 'Registration for the Spring 2026 AI workshops is now open. Visit the Training Hub to sign up.',                                                   author_id: organizer._id, category: 'workshop',    priority: 'high',   target_audience: 'students' },
    { title: 'Partnership with Google DeepMind',         content: 'The AI House has signed a memorandum of understanding with Google DeepMind for research collaboration.',                                          author_id: admin._id,     category: 'partnership', priority: 'high',   target_audience: 'all' },
    { title: 'PyStep Certificate Distribution',          content: 'Certificates for the PyStep Python workshop will be distributed next Monday at the administration office.',                                       author_id: organizer._id, category: 'achievement', priority: 'medium', target_audience: 'students' },
    { title: 'Faculty AI Training Program',              content: 'A new Train-the-Trainer program is available for faculty members. Contact the AI House coordinator for details.',                                  author_id: admin._id,     category: 'general',     priority: 'medium', target_audience: 'staff' },
    { title: 'Hackathon Results Announced',              content: 'Congratulations to Team ByteForce for winning the first AI House Hackathon! Results are posted on the notice board.',                              author_id: organizer._id, category: 'achievement', priority: 'medium', target_audience: 'all' },
    { title: 'Server Maintenance Notice',                content: 'The AI House platform will be under maintenance on Saturday from 2 AM to 6 AM. Some services may be temporarily unavailable.',                    author_id: admin._id,     category: 'urgent',      priority: 'high',   target_audience: 'all' },
    { title: 'Rectorate Approves AI Budget Expansion',   content: 'The university rectorate has approved an expanded budget for AI House activities in the 2026-2027 academic year.',                                 author_id: users.find(u => u.role === 'rectorate')._id, category: 'general', priority: 'medium', target_audience: 'rectorate' },
  ]);

  // ── 7. FEEDBACKS (10 feedbacks) ──────────────────────────────────────────
  const feedbackData = [];
  const pastActivities = activities.filter(a => a.status === 'past' || a.status === 'approved');
  const allStudents = [...students, ...participants];
  for (let i = 0; i < 10; i++) {
    const student = allStudents[i % allStudents.length];
    const activity = pastActivities[i % pastActivities.length];
    feedbackData.push({
      user_id: student._id,
      activity_id: activity._id,
      rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
      comment: ['Excellent workshop, learned a lot!', 'Very practical and well organized.', 'Good content but could be longer.', 'The instructor was very knowledgeable.', 'Would love a follow-up session.'][i % 5],
      difficulty_level: ['appropriate', 'challenging', 'appropriate', 'too_easy', 'challenging'][i % 5],
      would_recommend: i % 4 !== 0,
      suggestions: ['More hands-on exercises', 'Provide recorded sessions', 'Add a Q&A session at the end', '', 'Cover more advanced topics'][i % 5],
    });
  }
  await Feedback.insertMany(feedbackData);

  console.log('✅ Auto-seeded: 12 users, 7 departments, 10 activities, 5 representatives, ' + enrollmentData.length + ' enrollments, 8 announcements, 10 feedbacks');
}

// ─────────────────────────────────────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────────────────────────────────────
const startServer = async () => {
  let usingMemory = false;

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aihouse';
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
      console.log('📦 Connected to LOCAL MongoDB at', mongoUri);
      await autoSeed();
    }
  } catch {
    console.log('⚠️  No local MongoDB found. Starting an in-memory MongoDB...');
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    console.log('📦 Connected to IN-MEMORY MongoDB');
    usingMemory = true;
    await autoSeed();
  }

  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`🚀 AI House Backend running on http://localhost:${PORT}`);
    });
  }
};

startServer();

export default app;