-- Sample Data for Testing
-- Password for all users: password123 (hashed with bcrypt)

-- Insert Admin User
INSERT INTO users (first_name, last_name, email, password, role) VALUES
('Admin', 'User', 'admin@mosque.com', '$2a$10$YourHashedPasswordHere', 'admin');

-- Insert Sample Prayer Times
INSERT INTO prayer_times (date, fajr, sunrise, dhuhr, asr, maghrib, isha, location) VALUES
(CURRENT_DATE, '05:30', '06:45', '12:30', '15:45', '18:15', '19:30', 'New York, USA');

-- Insert Sample Content
INSERT INTO contents (type, title, arabic_text, translation, reference, is_active) VALUES
('verse', 'Surah Al-Fatiha', 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'In the name of Allah, the Most Gracious, the Most Merciful', 'Quran 1:1', TRUE),
('dua', 'Morning Dua', 'اللَّهُمَّ بِكَ أَصْبَحْنَا', 'O Allah, by You we have reached the morning', 'Authentic Hadith', TRUE);

-- Insert Sample About Information
INSERT INTO about (organization_name, mission, vision, address, phone, email) VALUES
('Islamic Center', 
 'To serve the Muslim community through worship, education, and social services',
 'To be a leading Islamic institution promoting peace, knowledge, and community welfare',
 '123 Main Street, City, State 12345',
 '+1-234-567-8900',
 'info@islamiccenter.org');

-- Insert Sample FAQs
INSERT INTO faqs (category, question, answer, is_active) VALUES
('General', 'What are the mosque operating hours?', 'The mosque is open from Fajr prayer until after Isha prayer daily.', TRUE),
('Donations', 'How can I donate to the mosque?', 'You can donate online through our website or in person at the mosque office.', TRUE);
