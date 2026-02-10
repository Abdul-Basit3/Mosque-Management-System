import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaEnvelope, FaPhone, FaSearch } from 'react-icons/fa';

interface Executive {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department?: string;
  bio?: string;
  photo?: string;
  email?: string;
  phone?: string;
}

const Executives = () => {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [allExecutives, setAllExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchExecutives();
  }, []);

  // Filter executives when search changes
  useEffect(() => {
    if (search.trim() === '') {
      setExecutives(allExecutives);
    } else {
      const filtered = allExecutives.filter(executive =>
        executive.firstName.toLowerCase().includes(search.toLowerCase()) ||
        executive.lastName.toLowerCase().includes(search.toLowerCase()) ||
        executive.role.toLowerCase().includes(search.toLowerCase()) ||
        (executive.department && executive.department.toLowerCase().includes(search.toLowerCase()))
      );
      setExecutives(filtered);
    }
  }, [search, allExecutives]);

  const fetchExecutives = async () => {
    try {
      const { data } = await api.get('/executives');
      setExecutives(data.data);
      setAllExecutives(data.data);
    } catch (error) {
      console.error('Error fetching executives:', error);
      // Use sample data as fallback
      const sampleExecutives = [
        {
          id: 1,
          firstName: 'Abdul',
          lastName: 'Karim',
          role: 'President',
          department: 'Executive Board',
          bio: 'Leading the organization with vision and dedication to serve the Muslim community and promote Islamic values.',
          photo: '/images/president.jpg',
          email: 'president@mosque.org',
          phone: '+233 24 123 4567'
        },
        {
          id: 2,
          firstName: 'Sheikh Ibrahim',
          lastName: 'Hassan',
          role: 'Chief Imam',
          department: 'Religious Affairs',
          bio: 'Spiritual leader guiding the community in matters of faith, leading prayers, and providing Islamic education and counseling.',
          photo: '/images/imam1.jpg',
          email: 'chiefimam@mosque.org',
          phone: '+233 24 234 5678'
        },
        {
          id: 3,
          firstName: 'Ustadh Yusuf',
          lastName: 'Ahmed',
          role: 'First Deputy Imam',
          department: 'Religious Affairs',
          bio: 'Assisting the Chief Imam in religious duties, conducting prayers, and teaching Islamic studies to the community.',
          photo: '/images/imam2.jpg',
          email: 'deputyimam1@mosque.org',
          phone: '+233 24 345 6789'
        },
        {
          id: 4,
          firstName: 'Sheikh Mahmoud',
          lastName: 'Ali',
          role: 'Second Deputy Imam',
          department: 'Religious Affairs',
          bio: 'Supporting religious activities, leading prayers, and providing spiritual guidance to community members.',
          photo: '/images/imam3.jpg',
          email: 'deputyimam2@mosque.org',
          phone: '+233 24 456 7890'
        },
        {
          id: 5,
          firstName: 'Bilal',
          lastName: 'Muhammad',
          role: 'Muazin',
          department: 'Religious Affairs',
          bio: 'Responsible for calling the Adhan (call to prayer) five times daily and ensuring prayer times are observed.',
          photo: '/images/muazin.jpg',
          email: 'muazin@mosque.org',
          phone: '+233 24 567 8901'
        },
        {
          id: 6,
          firstName: 'Amina',
          lastName: 'Khalid',
          role: 'Secretary',
          department: 'Administration',
          bio: 'Managing organizational records, correspondence, meeting minutes, and administrative documentation.',
          photo: '/images/secretary.jpg',
          email: 'secretary@mosque.org',
          phone: '+233 24 678 9012'
        },
        {
          id: 7,
          firstName: 'Omar',
          lastName: 'Suleiman',
          role: 'Organizer',
          department: 'Events & Programs',
          bio: 'Organizing events, workshops, meetings, and coordinating community programs and activities.',
          photo: '/images/organizer.jpg',
          email: 'organizer@mosque.org',
          phone: '+233 24 789 0123'
        },
        {
          id: 8,
          firstName: 'Fatima',
          lastName: 'Zahra',
          role: 'WOCOM',
          department: 'Women Affairs',
          bio: 'Responsible for taking care of Muslim ladies, organizing women programs, and managing refreshments.',
          photo: '/images/wocom.jpg',
          email: 'wocom@mosque.org',
          phone: '+233 24 890 1234'
        },
        {
          id: 9,
          firstName: 'Hassan',
          lastName: 'Abdullah',
          role: 'Treasurer',
          department: 'Finance',
          bio: 'Responsible for organization finances, budgets, financial records, and ensuring transparent fund management.',
          photo: '/images/treaturer.jpg',
          email: 'treasurer@mosque.org',
          phone: '+233 24 901 2345'
        },
        {
          id: 10,
          firstName: 'Aisha',
          lastName: 'Ibrahim',
          role: 'Public Relations Officer (P.R.O)',
          department: 'Communications',
          bio: 'Responsible for addressing the public, managing press releases, and maintaining community relations.',
          photo: '/images/pro.jpg',
          email: 'pro@mosque.org',
          phone: '+233 24 012 3456'
        }
      ];
      setExecutives(sampleExecutives);
      setAllExecutives(sampleExecutives);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title">Our Leadership</h1>

      {/* Enhanced Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-400 text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search by name, role, or department..."
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
            Found {executives.length} leader{executives.length !== 1 ? 's' : ''} matching "{search}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-700 dark:text-gray-300 text-lg font-semibold">Loading...</div>
      ) : executives.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400 text-lg font-semibold">No leaders found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executives.map((executive) => (
            <div key={executive.id} className="card text-center hover:shadow-lg transition-shadow">
              <img
                src={executive.photo || '/placeholder-avatar.jpg'}
                alt={`${executive.firstName} ${executive.lastName}`}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-100 dark:border-emerald-700"
              />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {executive.firstName} {executive.lastName}
              </h3>
              <p className="card-subtitle mb-2">{executive.role}</p>
              {executive.department && (
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3 bg-emerald-50 dark:bg-emerald-900/50 px-3 py-1 rounded-full inline-block">
                  {executive.department}
                </p>
              )}
              {executive.bio && (
                <p className="card-text text-sm mb-4 leading-relaxed">{executive.bio}</p>
              )}
              <div className="space-y-2 pt-4 border-t-2 border-emerald-100 dark:border-emerald-700">
                {executive.email && (
                  <div className="flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaEnvelope className="mr-2 text-islamic-green dark:text-emerald-400" />
                    <a href={`mailto:${executive.email}`} className="hover:text-islamic-green dark:hover:text-emerald-300 transition-colors">
                      {executive.email}
                    </a>
                  </div>
                )}
                {executive.phone && (
                  <div className="flex items-center justify-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FaPhone className="mr-2 text-islamic-green dark:text-emerald-400" />
                    <a href={`tel:${executive.phone}`} className="hover:text-islamic-green dark:hover:text-emerald-300 transition-colors">
                      {executive.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Executives;
