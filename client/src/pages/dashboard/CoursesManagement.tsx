import { FaPlus, FaEdit, FaTrash, FaUsers, FaBook, FaClock } from 'react-icons/fa';

const CoursesManagement = () => {
  const courses = [
    {
      id: 1,
      title: 'Introduction to Tajweed',
      instructor: 'Sheikh Muhammad Ali',
      level: 'Beginner',
      duration: '8 weeks',
      enrolled: 45,
      maxStudents: 50,
      startDate: '2024-03-01',
      isActive: true
    },
    {
      id: 2,
      title: 'Advanced Arabic Grammar',
      instructor: 'Dr. Fatima Hassan',
      level: 'Advanced',
      duration: '12 weeks',
      enrolled: 28,
      maxStudents: 30,
      startDate: '2024-03-15',
      isActive: true
    },
    {
      id: 3,
      title: 'Islamic History: The Golden Age',
      instructor: 'Prof. Omar Khan',
      level: 'Intermediate',
      duration: '10 weeks',
      enrolled: 67,
      maxStudents: 100,
      startDate: '2024-02-20',
      isActive: true
    },
    {
      id: 4,
      title: 'Fiqh Essentials',
      instructor: 'Sheikh Ahmad Ibrahim',
      level: 'Beginner',
      duration: '6 weeks',
      enrolled: 89,
      maxStudents: 100,
      startDate: '2024-02-15',
      isActive: true
    },
    {
      id: 5,
      title: 'Quranic Tafseer',
      instructor: 'Sheikh Yusuf Ali',
      level: 'Intermediate',
      duration: '16 weeks',
      enrolled: 34,
      maxStudents: 40,
      startDate: '2024-04-01',
      isActive: false
    }
  ];

  const getLevelColor = (level: string) => {
    const colors = {
      Beginner: 'bg-green-100 text-green-800',
      Intermediate: 'bg-yellow-100 text-yellow-800',
      Advanced: 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors];
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Courses Management</h2>
        <button className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90">Total Courses</p>
          <p className="text-3xl font-bold">{courses.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm opacity-90">Active Courses</p>
          <p className="text-3xl font-bold">{courses.filter(c => c.isActive).length}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm opacity-90">Total Students</p>
          <p className="text-3xl font-bold">{courses.reduce((sum, c) => sum + c.enrolled, 0)}</p>
        </div>
        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <p className="text-sm opacity-90">Avg. Enrollment</p>
          <p className="text-3xl font-bold">{Math.round(courses.reduce((sum, c) => sum + c.enrolled, 0) / courses.length)}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="input-field flex-1"
          />
          <select className="input-field w-48">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select className="input-field w-48">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-3">
                  <FaBook className="inline mr-1" /> {course.instructor}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <FaEdit />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                {course.level}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                course.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {course.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaClock className="mr-2 text-islamic-green" />
                <span>Duration: {course.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaUsers className="mr-2 text-islamic-green" />
                <span>Enrolled: {course.enrolled} / {course.maxStudents}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📅</span>
                <span>Starts: {course.startDate}</span>
              </div>
            </div>

            {/* Enrollment Progress */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Enrollment</span>
                <span>{Math.round((course.enrolled / course.maxStudents) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-islamic-green h-2 rounded-full transition-all"
                  style={{ width: `${(course.enrolled / course.maxStudents) * 100}%` }}
                />
              </div>
            </div>

            <button className="btn-primary w-full mt-4">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesManagement;
