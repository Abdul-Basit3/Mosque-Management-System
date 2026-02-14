import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';

interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  location: string;
  startDate: string;
  maxParticipants?: number;
  registeredCount: number;
  image?: string;
}

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  // Filter activities when search changes
  useEffect(() => {
    if (search.trim() === '') {
      setActivities(allActivities);
    } else {
      const filtered = allActivities.filter(activity =>
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.type.toLowerCase().includes(search.toLowerCase()) ||
        activity.location.toLowerCase().includes(search.toLowerCase()) ||
        activity.description.toLowerCase().includes(search.toLowerCase())
      );
      setActivities(filtered);
    }
  }, [search, allActivities]);

  const fetchActivities = async () => {
    try {
      const { data } = await api.get('/activities?upcoming=true');
      setActivities(data.data);
      setAllActivities(data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      // Use sample data as fallback
      const sampleActivities = [
        {
          id: 1,
          title: 'Football Match',
          description: 'Inter-community football tournament promoting unity, sportsmanship, and healthy competition among youth members.',
          type: 'Sports',
          location: 'Community Sports Ground',
          startDate: '2026-03-15T15:00:00',
          maxParticipants: 50,
          registeredCount: 32,
          image: '/images/football.jpg'
        },
        {
          id: 2,
          title: 'Islamic Quiz Competition',
          description: 'Test your knowledge of Islam, Quran, Hadith, and Islamic history in this exciting quiz competition with prizes.',
          type: 'Educational',
          location: 'Mosque Main Hall',
          startDate: '2026-03-22T14:00:00',
          maxParticipants: 40,
          registeredCount: 28,
          image: '/images/quiz.jpg'
        },
        {
          id: 3,
          title: 'Islamic Seminar',
          description: 'Join us for an enlightening seminar on contemporary Islamic issues with renowned scholars and community leaders.',
          type: 'Seminar',
          location: 'Conference Hall',
          startDate: '2026-04-05T09:00:00',
          maxParticipants: 100,
          registeredCount: 65,
          image: '/images/seminar.jpg'
        }
      ];
      setActivities(sampleActivities);
      setAllActivities(sampleActivities);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (activityId: number) => {
    try {
      await api.post(`/activities/${activityId}/register`);
      alert('Successfully registered!');
      fetchActivities();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title">Upcoming Activities</h1>

      {/* Enhanced Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-400 text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search by title, type, location, or description..."
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
            Found {activities.length} activit{activities.length !== 1 ? 'ies' : 'y'} matching "{search}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-700 dark:text-gray-300 text-lg font-semibold">Loading...</div>
      ) : (
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {activity.image && (
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full md:w-64 h-48 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <span className="badge bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 mb-3">
                    {activity.type}
                  </span>
                  <h3 className="card-title">{activity.title}</h3>
                  <p className="card-text mb-4">{activity.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-200">
                      <FaCalendar className="mr-3 text-islamic-green dark:text-emerald-400 text-lg" />
                      <span>{format(new Date(activity.startDate), 'PPP')}</span>
                    </div>
                    <div className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-200">
                      <FaMapMarkerAlt className="mr-3 text-islamic-green dark:text-emerald-400 text-lg" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-200">
                      <FaUsers className="mr-3 text-islamic-green dark:text-emerald-400 text-lg" />
                      <span>
                        {activity.registeredCount}
                        {activity.maxParticipants && ` / ${activity.maxParticipants}`} registered
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(activity.id)}
                    className="btn-primary"
                    disabled={activity.maxParticipants ? activity.registeredCount >= activity.maxParticipants : false}
                  >
                    {activity.maxParticipants && activity.registeredCount >= activity.maxParticipants
                      ? 'Full'
                      : 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities;
