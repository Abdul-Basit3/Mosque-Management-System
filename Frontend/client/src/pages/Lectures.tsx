import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaPlay, FaEye, FaSearch } from 'react-icons/fa';

interface Lecture {
  id: number;
  title: string;
  description: string;
  speaker: string;
  topic: string;
  videoType: string;
  videoUrl: string;
  thumbnail?: string;
  views: number;
}

const Lectures = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [allLectures, setAllLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLectures();
  }, []);

  // Filter lectures when search changes
  useEffect(() => {
    if (search.trim() === '') {
      setLectures(allLectures);
    } else {
      const filtered = allLectures.filter(lecture =>
        lecture.title.toLowerCase().includes(search.toLowerCase()) ||
        lecture.speaker.toLowerCase().includes(search.toLowerCase()) ||
        lecture.topic.toLowerCase().includes(search.toLowerCase()) ||
        lecture.description.toLowerCase().includes(search.toLowerCase())
      );
      setLectures(filtered);
    }
  }, [search, allLectures]);

  const fetchLectures = async () => {
    try {
      const { data } = await api.get(`/lectures?search=${search}`);
      setLectures(data.data);
      setAllLectures(data.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      // Use sample data as fallback
      const sampleLectures = [
        {
          id: 1,
          title: 'The Importance of Prayer in Islam',
          description: 'Understanding the significance and benefits of the five daily prayers',
          speaker: 'Sheikh Abdullah Rahman',
          topic: 'Worship & Spirituality',
          videoType: 'youtube',
          videoUrl: 'https://youtube.com/watch?v=sample1',
          thumbnail: '/images/salah.jpg',
          views: 1250
        },
        {
          id: 2,
          title: 'Ramadan: A Month of Blessings',
          description: 'Exploring the spiritual dimensions of fasting and Ramadan',
          speaker: 'Dr. Fatima Hassan',
          topic: 'Fasting & Ramadan',
          videoType: 'youtube',
          videoUrl: 'https://youtube.com/watch?v=sample2',
          thumbnail: '/images/ramadan.jpg',
          views: 2100
        },
        {
          id: 3,
          title: 'Understanding the Quran',
          description: 'An introduction to Quranic studies and interpretation',
          speaker: 'Imam Muhammad Ali',
          topic: 'Quran Studies',
          videoType: 'youtube',
          videoUrl: 'https://youtube.com/watch?v=sample3',
          thumbnail: '/images/lectures.jpg',
          views: 1800
        },
        {
          id: 4,
          title: 'The Life of Prophet Muhammad (PBUH)',
          description: 'Lessons from the Seerah of the Prophet',
          speaker: 'Sheikh Abdullah Rahman',
          topic: 'Seerah',
          videoType: 'youtube',
          videoUrl: 'https://youtube.com/watch?v=sample4',
          thumbnail: '/images/seera.jpg',
          views: 3200
        },
        {
          id: 5,
          title: 'Islamic Ethics and Morality',
          description: 'Building good character according to Islamic teachings',
          speaker: 'Dr. Aisha Ibrahim',
          topic: 'Ethics & Character',
          videoType: 'youtube',
          videoUrl: 'https://youtube.com/watch?v=sample5',
          thumbnail: '/images/lecture2.jpg',
          views: 950
        }
      ];
      setLectures(sampleLectures);
      setAllLectures(sampleLectures);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title">Islamic Lectures</h1>

      {/* Enhanced Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-400 text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search by title, speaker, topic, or description..."
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
            Found {lectures.length} lecture{lectures.length !== 1 ? 's' : ''} matching "{search}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-700 dark:text-gray-300 text-lg font-semibold">Loading...</div>
      ) : lectures.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400 text-lg font-semibold">No lectures found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="card hover:shadow-lg transition-shadow">
              <div className="relative mb-4">
                <img
                  src={lecture.thumbnail || '/images/lectures.jpg'}
                  alt={lecture.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg hover:bg-opacity-50 transition-all cursor-pointer">
                  <FaPlay className="text-white text-4xl drop-shadow-lg" />
                </div>
              </div>
              <h3 className="card-title">{lecture.title}</h3>
              <p className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Speaker: <span className="text-islamic-green dark:text-emerald-300">{lecture.speaker}</span>
              </p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 bg-emerald-50 dark:bg-emerald-900/50 px-3 py-1 rounded-full inline-block">
                {lecture.topic}
              </p>
              <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm font-semibold mt-4">
                <FaEye className="mr-2 text-islamic-green dark:text-emerald-400" />
                <span>{lecture.views} views</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lectures;
