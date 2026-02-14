import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FaHome, FaBook, FaVideo, FaProjectDiagram, FaCalendar, FaUsers, FaQuestion, FaInfoCircle, FaClock, FaChevronLeft, FaChevronRight, FaUserShield, FaChartLine, FaCog } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ContentManagement from './dashboard/ContentManagement';
import PrayerTimesManagement from './dashboard/PrayerTimesManagement';
import LecturesManagement from './dashboard/LecturesManagement';
import CoursesManagement from './dashboard/CoursesManagement';
import ProjectsManagement from './dashboard/ProjectsManagement';
import ActivitiesManagement from './dashboard/ActivitiesManagement';
import ExecutivesManagement from './dashboard/ExecutivesManagement';
import FAQsManagement from './dashboard/FAQsManagement';
import AboutManagement from './dashboard/AboutManagement';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff' || isAdmin;

  const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: FaHome, show: true },
    { path: '/dashboard/content', label: 'Content', icon: FaBook, show: isStaff },
    { path: '/dashboard/prayer-times', label: 'Prayer Times', icon: FaClock, show: isStaff },
    { path: '/dashboard/lectures', label: 'Lectures', icon: FaVideo, show: isStaff },
    { path: '/dashboard/courses', label: 'Courses', icon: FaBook, show: isStaff },
    { path: '/dashboard/projects', label: 'Projects', icon: FaProjectDiagram, show: isStaff },
    { path: '/dashboard/activities', label: 'Activities', icon: FaCalendar, show: isStaff },
    { path: '/dashboard/executives', label: 'Executives', icon: FaUsers, show: isAdmin },
    { path: '/dashboard/faqs', label: 'FAQs', icon: FaQuestion, show: isStaff },
    { path: '/dashboard/about', label: 'About', icon: FaInfoCircle, show: isAdmin }
  ];

  // Filter visible menu items
  const visibleMenuItems = menuItems.filter(item => item.show);

  // Update current index when location changes
  useEffect(() => {
    const index = visibleMenuItems.findIndex(item => item.path === location.pathname);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [location.pathname, visibleMenuItems]);

  // Navigate to previous page
  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevItem = visibleMenuItems[currentIndex - 1];
      navigate(prevItem.path);
    }
  };

  // Navigate to next page
  const goToNext = () => {
    if (currentIndex < visibleMenuItems.length - 1) {
      const nextItem = visibleMenuItems[currentIndex + 1];
      navigate(nextItem.path);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, visibleMenuItems]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-emerald-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-emerald-800 shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-emerald-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-islamic-green to-emerald-600 rounded-full flex items-center justify-center">
              <FaUserShield className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-islamic-green dark:text-emerald-300">Dashboard</h2>
              <p className="text-xs text-gray-500 dark:text-gray-300">Admin Panel</p>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/50 rounded-lg p-3">
            <p className="text-sm font-bold text-gray-800 dark:text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <span className="inline-block mt-2 px-3 py-1 bg-islamic-green dark:bg-emerald-600 text-white text-xs font-bold rounded-full uppercase">
              {user?.role}
            </span>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all font-semibold ${
                      isActive
                        ? 'bg-islamic-green dark:bg-emerald-600 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-700'
                    }`}
                  >
                    <Icon className="mr-3 text-lg" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Keyboard Shortcuts Info */}
        <div className="p-4 border-t border-gray-200 dark:border-emerald-700 mt-auto">
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 font-bold">Keyboard Shortcuts:</p>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-emerald-900 rounded text-xs font-bold">Alt</kbd>
              <span className="mx-1">+</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-emerald-900 rounded text-xs font-bold">←</kbd>
              <span className="ml-2">Previous</span>
            </div>
            <div className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-emerald-900 rounded text-xs font-bold">Alt</kbd>
              <span className="mx-1">+</span>
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-emerald-900 rounded text-xs font-bold">→</kbd>
              <span className="ml-2">Next</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Navigation Header with Arrows */}
        <div className="bg-white dark:bg-emerald-800 shadow-sm border-b border-gray-200 dark:border-emerald-700 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-bold ${
                currentIndex === 0
                  ? 'bg-gray-100 dark:bg-emerald-900 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-islamic-green dark:bg-emerald-600 text-white hover:bg-emerald-700 dark:hover:bg-emerald-500 hover:shadow-md'
              }`}
              title="Previous Section (Alt + ←)"
            >
              <FaChevronLeft />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Current Page Indicator */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                {visibleMenuItems[currentIndex]?.label}
              </h3>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-300">
                {currentIndex + 1} of {visibleMenuItems.length}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={currentIndex === visibleMenuItems.length - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-bold ${
                currentIndex === visibleMenuItems.length - 1
                  ? 'bg-gray-100 dark:bg-emerald-900 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-islamic-green dark:bg-emerald-600 text-white hover:bg-emerald-700 dark:hover:bg-emerald-500 hover:shadow-md'
              }`}
              title="Next Section (Alt + →)"
            >
              <span className="hidden sm:inline">Next</span>
              <FaChevronRight />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-200 dark:bg-emerald-900">
            <div
              className="h-full bg-islamic-green dark:bg-emerald-500 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / visibleMenuItems.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8 bg-gray-50 dark:bg-emerald-900">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="prayer-times" element={<PrayerTimesManagement />} />
            <Route path="lectures" element={<LecturesManagement />} />
            <Route path="courses" element={<CoursesManagement />} />
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="activities" element={<ActivitiesManagement />} />
            <Route path="executives" element={<ExecutivesManagement />} />
            <Route path="faqs" element={<FAQsManagement />} />
            <Route path="about" element={<AboutManagement />} />
          </Routes>
        </div>

        {/* Bottom Navigation (Mobile Friendly) */}
        <div className="bg-white dark:bg-emerald-800 border-t border-gray-200 dark:border-emerald-700 p-4 md:hidden">
          <div className="flex justify-between items-center">
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold ${
                currentIndex === 0
                  ? 'bg-gray-100 dark:bg-emerald-900 text-gray-400'
                  : 'bg-islamic-green dark:bg-emerald-600 text-white'
              }`}
            >
              <FaChevronLeft />
              <span>Prev</span>
            </button>

            <span className="text-sm font-bold text-gray-600 dark:text-gray-200">
              {currentIndex + 1} / {visibleMenuItems.length}
            </span>

            <button
              onClick={goToNext}
              disabled={currentIndex === visibleMenuItems.length - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold ${
                currentIndex === visibleMenuItems.length - 1
                  ? 'bg-gray-100 dark:bg-emerald-900 text-gray-400'
                  : 'bg-islamic-green dark:bg-emerald-600 text-white'
              }`}
            >
              <span>Next</span>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardOverview = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const stats = [
    { label: 'Total Users', value: '1,234', color: 'from-blue-500 to-blue-600', icon: '👥', change: '+12%' },
    { label: 'Active Courses', value: '24', color: 'from-green-500 to-green-600', icon: '📚', change: '+5%' },
    { label: 'Upcoming Events', value: '8', color: 'from-purple-500 to-purple-600', icon: '📅', change: '+2' },
    { label: 'Total Lectures', value: '156', color: 'from-orange-500 to-orange-600', icon: '🎥', change: '+18%' },
  ];

  const recentActivities = [
    { action: 'New user registered', user: 'Ahmad Hassan', time: '5 minutes ago', icon: '👤', color: 'bg-blue-100 dark:bg-blue-900' },
    { action: 'Course enrollment', user: 'Fatima Ali', time: '15 minutes ago', icon: '📖', color: 'bg-green-100 dark:bg-green-900' },
    { action: 'Event registration', user: 'Omar Khan', time: '1 hour ago', icon: '🎫', color: 'bg-purple-100 dark:bg-purple-900' },
    { action: 'Donation received', user: 'Anonymous', time: '2 hours ago', icon: '💰', color: 'bg-yellow-100 dark:bg-yellow-900' },
    { action: 'New lecture uploaded', user: 'Sheikh Muhammad', time: '3 hours ago', icon: '🎬', color: 'bg-pink-100 dark:bg-pink-900' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-semibold">
          Here's what's happening with your mosque management system today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`card bg-gradient-to-br ${stat.color} text-white hover:shadow-xl transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold mb-2 opacity-90">{stat.label}</h3>
                <p className="text-4xl font-bold mb-1">{stat.value}</p>
                <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-6xl opacity-30">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activities */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activities</h2>
            <FaChartLine className="text-islamic-green dark:text-emerald-400 text-xl" />
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`flex items-start p-4 ${activity.color} rounded-lg hover:shadow-md transition-all cursor-pointer`}>
                <span className="text-3xl mr-4">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 dark:text-white">{activity.action}</p>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{activity.user}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
            <FaCog className="text-islamic-green dark:text-emerald-400 text-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-primary text-center flex flex-col items-center justify-center py-6 hover:scale-105 transition-transform">
              <span className="text-3xl mb-2">📝</span>
              <span className="font-bold">Add Content</span>
            </button>
            <button className="btn-primary text-center flex flex-col items-center justify-center py-6 hover:scale-105 transition-transform">
              <span className="text-3xl mb-2">🕌</span>
              <span className="font-bold">Prayer Times</span>
            </button>
            <button className="btn-primary text-center flex flex-col items-center justify-center py-6 hover:scale-105 transition-transform">
              <span className="text-3xl mb-2">📚</span>
              <span className="font-bold">Create Course</span>
            </button>
            <button className="btn-primary text-center flex flex-col items-center justify-center py-6 hover:scale-105 transition-transform">
              <span className="text-3xl mb-2">📅</span>
              <span className="font-bold">Schedule Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-5 bg-green-50 dark:bg-green-900/30 rounded-lg border-2 border-green-200 dark:border-green-700">
            <span className="font-bold text-gray-800 dark:text-white">Database</span>
            <span className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full shadow-sm">Online</span>
          </div>
          <div className="flex items-center justify-between p-5 bg-green-50 dark:bg-green-900/30 rounded-lg border-2 border-green-200 dark:border-green-700">
            <span className="font-bold text-gray-800 dark:text-white">API Server</span>
            <span className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full shadow-sm">Running</span>
          </div>
          <div className="flex items-center justify-between p-5 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border-2 border-yellow-200 dark:border-yellow-700">
            <span className="font-bold text-gray-800 dark:text-white">Backup</span>
            <span className="px-4 py-2 bg-yellow-500 text-white text-sm font-bold rounded-full shadow-sm">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
