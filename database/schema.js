// School Mosque Management System Database Schema
// MongoDB Database - Collection Schemas

// Users Collection
{
  _id: ObjectId,
  firstName: String, // required, maxlength: 100
  lastName: String, // required, maxlength: 100
  email: String, // required, unique, lowercase
  password: String, // required, hashed
  phone: String, // maxlength: 20
  role: String, // enum: ['admin', 'staff', 'student', 'public'], default: 'public'
  avatar: String,
  isActive: Boolean, // default: true
  createdAt: Date, // auto-generated
  updatedAt: Date // auto-generated
}

// PrayerTimes Collection
{
  _id: ObjectId,
  date: Date, // required, unique
  fajr: String, // required
  sunrise: String, // required
  dhuhr: String, // required
  asr: String, // required
  maghrib: String, // required
  isha: String, // required
  location: String, // required, maxlength: 255
  latitude: Number,
  longitude: Number,
  createdAt: Date,
  updatedAt: Date
}

// Contents Collection (Duas, Verses, Hadiths)
{
  _id: ObjectId,
  type: String, // required, enum: ['dua', 'verse', 'hadith']
  title: String, // required, maxlength: 255
  arabicText: String, // required
  transliteration: String,
  translation: String, // required
  reference: String, // maxlength: 255
  isActive: Boolean, // default: true
  displayOrder: Number, // default: 0
  createdAt: Date,
  updatedAt: Date
}

// Lectures Collection
{
  _id: ObjectId,
  title: String, // required, maxlength: 255
  description: String, // required
  speaker: String, // required, maxlength: 255
  topic: String, // required, maxlength: 255
  videoType: String, // required, enum: ['upload', 'youtube', 'vimeo']
  videoUrl: String, // required, maxlength: 500
  thumbnail: String, // maxlength: 500
  duration: Number,
  views: Number, // default: 0
  isPublished: Boolean, // default: false
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}

// Courses Collection
{
  _id: ObjectId,
  title: String, // required, maxlength: 255
  description: String, // required
  instructor: String, // required, maxlength: 255
  duration: String, // required, maxlength: 100
  level: String, // required, enum: ['beginner', 'intermediate', 'advanced']
  thumbnail: String, // maxlength: 500
  syllabus: String,
  maxStudents: Number,
  enrollmentCount: Number, // default: 0
  isActive: Boolean, // default: true
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}

// Enrollments Collection
{
  _id: ObjectId,
  userId: ObjectId, // required, ref: 'User'
  courseId: ObjectId, // required, ref: 'Course'
  status: String, // enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending'
  progress: Number, // default: 0, min: 0, max: 100
  enrolledAt: Date, // default: Date.now
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}

// Projects Collection
{
  _id: ObjectId,
  title: String, // required, maxlength: 255
  description: String, // required
  category: String, // required, enum: ['building', 'charity', 'education', 'community', 'other']
  status: String, // required, enum: ['planning', 'ongoing', 'completed', 'paused']
  fundingGoal: Number,
  fundingRaised: Number, // default: 0
  startDate: Date,
  endDate: Date,
  images: [String], // array of image URLs
  isActive: Boolean, // default: true
  createdAt: Date,
  updatedAt: Date
}

// Donations Collection
{
  _id: ObjectId,
  userId: ObjectId, // ref: 'User'
  projectId: ObjectId, // ref: 'Project'
  amount: Number, // required
  donorName: String, // maxlength: 255
  donorEmail: String, // maxlength: 255
  message: String,
  paymentMethod: String, // required, enum: ['card', 'bank', 'cash', 'other']
  transactionId: String, // maxlength: 255
  status: String, // enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending'
  isAnonymous: Boolean, // default: false
  createdAt: Date,
  updatedAt: Date
}

// Activities Collection
{
  _id: ObjectId,
  title: String, // required, maxlength: 255
  description: String, // required
  type: String, // required, enum: ['seminar', 'competition', 'youth_program', 'community', 'other']
  location: String, // required, maxlength: 255
  startDate: Date, // required
  endDate: Date,
  maxParticipants: Number,
  registeredCount: Number, // default: 0
  requiresApproval: Boolean, // default: false
  isActive: Boolean, // default: true
  image: String, // maxlength: 500
  createdAt: Date,
  updatedAt: Date
}

// Registrations Collection
{
  _id: ObjectId,
  userId: ObjectId, // required, ref: 'User'
  activityId: ObjectId, // required, ref: 'Activity'
  status: String, // enum: ['pending', 'approved', 'rejected', 'attended', 'cancelled'], default: 'pending'
  notes: String,
  registeredAt: Date, // default: Date.now
  createdAt: Date,
  updatedAt: Date
}

// Executives Collection
{
  _id: ObjectId,
  firstName: String, // required, maxlength: 100
  lastName: String, // required, maxlength: 100
  role: String, // required, maxlength: 255
  department: String, // maxlength: 255
  bio: String,
  photo: String, // maxlength: 500
  email: String, // maxlength: 255
  phone: String, // maxlength: 20
  displayOrder: Number, // default: 0
  isActive: Boolean, // default: true
  createdAt: Date,
  updatedAt: Date
}

// FAQs Collection
{
  _id: ObjectId,
  category: String, // required, maxlength: 100
  question: String, // required
  answer: String, // required
  displayOrder: Number, // default: 0
  isActive: Boolean, // default: true
  createdAt: Date,
  updatedAt: Date
}

// About Collection
{
  _id: ObjectId,
  organizationName: String, // required, maxlength: 255
  history: String,
  mission: String,
  vision: String,
  values: String,
  address: String,
  phone: String, // maxlength: 20
  email: String, // maxlength: 255
  facebookUrl: String, // maxlength: 500
  twitterUrl: String, // maxlength: 500
  instagramUrl: String, // maxlength: 500
  youtubeUrl: String, // maxlength: 500
  tiktokUrl: String, // maxlength: 500
  createdAt: Date,
  updatedAt: Date
}

// MongoDB Indexes for better performance
// db.users.createIndex({ email: 1 }, { unique: true })
// db.users.createIndex({ role: 1 })
// db.prayertimes.createIndex({ date: 1 }, { unique: true })
// db.contents.createIndex({ type: 1 })
// db.lectures.createIndex({ isPublished: 1 })
// db.courses.createIndex({ isActive: 1 })
// db.enrollments.createIndex({ userId: 1 })
// db.enrollments.createIndex({ courseId: 1 })
// db.projects.createIndex({ status: 1 })
// db.activities.createIndex({ startDate: 1 })
// db.registrations.createIndex({ userId: 1 })
// db.registrations.createIndex({ activityId: 1 })
// db.faqs.createIndex({ category: 1 })
