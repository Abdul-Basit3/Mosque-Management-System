// Sample Data for Testing - MongoDB Seed Data
// Password for all users: password123 (will be hashed automatically by Mongoose middleware)

// Sample data to insert into MongoDB collections
const seedData = {
  // Users Collection
  users: [
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@mosque.com',
      password: 'password123', // Will be hashed by pre-save middleware
      role: 'admin'
    }
  ],

  // Prayer Times Collection
  prayerTimes: [
    {
      date: new Date(),
      fajr: '05:30',
      sunrise: '06:45',
      dhuhr: '12:30',
      asr: '15:45',
      maghrib: '18:15',
      isha: '19:30',
      location: 'New York, USA'
    }
  ],

  // Contents Collection
  contents: [
    {
      type: 'verse',
      title: 'Surah Al-Fatiha',
      arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
      reference: 'Quran 1:1',
      isActive: true
    },
    {
      type: 'dua',
      title: 'Morning Dua',
      arabicText: 'اللَّهُمَّ بِكَ أَصْبَحْنَا',
      translation: 'O Allah, by You we have reached the morning',
      reference: 'Authentic Hadith',
      isActive: true
    }
  ],

  // About Collection
  about: [
    {
      organizationName: 'Islamic Center',
      mission: 'To serve the Muslim community through worship, education, and social services',
      vision: 'To be a leading Islamic institution promoting peace, knowledge, and community welfare',
      address: '123 Main Street, City, State 12345',
      phone: '+1-234-567-8900',
      email: 'info@islamiccenter.org'
    }
  ],

  // FAQs Collection
  faqs: [
    {
      category: 'General',
      question: 'What are the mosque operating hours?',
      answer: 'The mosque is open from Fajr prayer until after Isha prayer daily.',
      isActive: true
    },
    {
      category: 'Donations',
      question: 'How can I donate to the mosque?',
      answer: 'You can donate online through our website or in person at the mosque office.',
      isActive: true
    }
  ]
};

// Export for use in seeding script
module.exports = seedData;

// Example usage in a seeding script:
/*
const mongoose = require('mongoose');
const { User, PrayerTime, Content, About, FAQ } = require('../server/src/models');
const seedData = require('./seed');

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mosque_db');
    
    // Clear existing data
    await User.deleteMany({});
    await PrayerTime.deleteMany({});
    await Content.deleteMany({});
    await About.deleteMany({});
    await FAQ.deleteMany({});
    
    // Insert seed data
    await User.insertMany(seedData.users);
    await PrayerTime.insertMany(seedData.prayerTimes);
    await Content.insertMany(seedData.contents);
    await About.insertMany(seedData.about);
    await FAQ.insertMany(seedData.faqs);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
*/
