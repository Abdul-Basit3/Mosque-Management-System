import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaBook, FaClock, FaUsers, FaSearch } from 'react-icons/fa';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  thumbnail?: string;
  enrollmentCount: number;
  maxStudents?: number;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses when search changes
  useEffect(() => {
    if (search.trim() === '') {
      setCourses(allCourses);
    } else {
      const filtered = allCourses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase()) ||
        course.level.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      );
      setCourses(filtered);
    }
  }, [search, allCourses]);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      setCourses(data.data);
      setAllCourses(data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Use sample data as fallback
      const sampleCourses = [
        {
          id: 1,
          title: 'Arabic Language for Beginners',
          description: 'Learn to read and write Arabic, the language of the Quran',
          instructor: 'Ustadh Yusuf Ahmed',
          duration: '12 weeks',
          level: 'Beginner',
          thumbnail: '/images/arabic.jpg',
          enrollmentCount: 45,
          maxStudents: 50
        },
        {
          id: 2,
          title: 'Tajweed and Quran Recitation',
          description: 'Master the rules of Tajweed for beautiful Quran recitation',
          instructor: 'Qari Ibrahim Hassan',
          duration: '8 weeks',
          level: 'Intermediate',
          thumbnail: '/images/tajweed.jpg',
          enrollmentCount: 32,
          maxStudents: 40
        },
        {
          id: 3,
          title: 'Islamic History and Civilization',
          description: 'Explore the rich history of Islamic civilization and its contributions',
          instructor: 'Dr. Amina Khalid',
          duration: '10 weeks',
          level: 'All Levels',
          thumbnail: '/images/seera.jpg',
          enrollmentCount: 28,
          maxStudents: 35
        },
        {
          id: 4,
          title: 'Fiqh: Islamic Jurisprudence',
          description: 'Understanding Islamic law and its practical applications',
          instructor: 'Sheikh Abdullah Rahman',
          duration: '16 weeks',
          level: 'Advanced',
          thumbnail: '/images/fiqh.jpg',
          enrollmentCount: 18,
          maxStudents: 25
        },
        {
          id: 5,
          title: 'Hadith Studies',
          description: 'Study the sayings and traditions of Prophet Muhammad (PBUH)',
          instructor: 'Dr. Fatima Hassan',
          duration: '14 weeks',
          level: 'Intermediate',
          thumbnail: '/images/hadith.jpg',
          enrollmentCount: 22,
          maxStudents: 30
        },
        {
          id: 6,
          title: 'Hisnul Muslim',
          description: 'Learn daily supplications and remembrance from the Fortress of the Muslim',
          instructor: 'Sheikh Mahmoud Ali',
          duration: '6 weeks',
          level: 'Beginner',
          thumbnail: '/images/dua.jpg',
          enrollmentCount: 38,
          maxStudents: 45
        }
      ];
      setCourses(sampleCourses);
      setAllCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: number) => {
    try {
      await api.post(`/courses/${courseId}/enroll`);
      alert('Successfully enrolled!');
      fetchCourses();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Enrollment failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title">Islamic Studies Courses</h1>

      {/* Enhanced Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-400 text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search by title, instructor, level, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-emerald-200 dark:border-emerald-600 bg-white dark:bg-emerald-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none transition-all placeholder:text-gray-500 dark:placeholder:text-emerald-200 font-medium shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 dark:text-gray-400 hover:text-islamic-green dark:hover:text-emerald-300 font-bold"
            >
              ✕
            </button>
          )}
        </div>
        {search && (
          <p className="mt-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
            Found {courses.length} course{courses.length !== 1 ? 's' : ''} matching "{search}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-700 dark:text-gray-300 text-lg font-semibold">Loading...</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400 text-lg font-semibold">No courses available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow">
              <img
                src={course.thumbnail || '/images/mosque.jpg'}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <span className="badge bg-islamic-green dark:bg-emerald-600 text-white">
                {course.level}
              </span>
              <h3 className="card-title mt-3">{course.title}</h3>
              <p className="card-text mb-4 line-clamp-2">{course.description}</p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-200">
                  <FaBook className="mr-3 text-islamic-green dark:text-emerald-400 text-lg" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-200">
                  <FaClock className="mr-3 text-islamic-green dark:text-emerald-400 text-lg" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-200">
                  <FaUsers className="mr-3 text-islamic-green dark:text-emerald-400 text-lg" />
                  <span>{course.enrollmentCount} enrolled</span>
                </div>
              </div>
              <button
                onClick={() => handleEnroll(course.id)}
                className="btn-primary w-full"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
