-- School Mosque Management System Database Schema
-- PostgreSQL Database

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'public' CHECK (role IN ('admin', 'staff', 'student', 'public')),
    avatar VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prayer Times Table
CREATE TABLE prayer_times (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    fajr TIME NOT NULL,
    sunrise TIME NOT NULL,
    dhuhr TIME NOT NULL,
    asr TIME NOT NULL,
    maghrib TIME NOT NULL,
    isha TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contents Table (Duas, Verses, Hadiths)
CREATE TABLE contents (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('dua', 'verse', 'hadith')),
    title VARCHAR(255) NOT NULL,
    arabic_text TEXT NOT NULL,
    transliteration TEXT,
    translation TEXT NOT NULL,
    reference VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lectures Table
CREATE TABLE lectures (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    speaker VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    video_type VARCHAR(20) NOT NULL CHECK (video_type IN ('upload', 'youtube', 'vimeo')),
    video_url VARCHAR(500) NOT NULL,
    thumbnail VARCHAR(500),
    duration INTEGER,
    views INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    thumbnail VARCHAR(500),
    syllabus TEXT,
    max_students INTEGER,
    enrollment_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments Table
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- Projects Table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('building', 'charity', 'education', 'community', 'other')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('planning', 'ongoing', 'completed', 'paused')),
    funding_goal DECIMAL(10, 2),
    funding_raised DECIMAL(10, 2) DEFAULT 0,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    images TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donations Table
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    donor_name VARCHAR(255),
    donor_email VARCHAR(255),
    message TEXT,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('card', 'bank', 'cash', 'other')),
    transaction_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities Table
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('seminar', 'competition', 'youth_program', 'community', 'other')),
    location VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    max_participants INTEGER,
    registered_count INTEGER DEFAULT 0,
    requires_approval BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registrations Table
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_id INTEGER NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'attended', 'cancelled')),
    notes TEXT,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, activity_id)
);

-- Executives Table
CREATE TABLE executives (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    bio TEXT,
    photo VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(20),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQs Table
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- About Table
CREATE TABLE about (
    id SERIAL PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    history TEXT,
    mission TEXT,
    vision TEXT,
    values TEXT,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    facebook_url VARCHAR(500),
    twitter_url VARCHAR(500),
    instagram_url VARCHAR(500),
    youtube_url VARCHAR(500),
    tiktok_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_prayer_times_date ON prayer_times(date);
CREATE INDEX idx_contents_type ON contents(type);
CREATE INDEX idx_lectures_published ON lectures(is_published);
CREATE INDEX idx_courses_active ON courses(is_active);
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_activities_start_date ON activities(start_date);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_activity ON registrations(activity_id);
CREATE INDEX idx_faqs_category ON faqs(category);
