import { FaClock, FaEdit, FaCalendar } from 'react-icons/fa';

const PrayerTimesManagement = () => {
  const prayerTimes = {
    date: '2024-02-09',
    location: 'New York, USA',
    times: [
      { name: 'Fajr', time: '05:30 AM', icon: '🌅' },
      { name: 'Sunrise', time: '06:45 AM', icon: '☀️' },
      { name: 'Dhuhr', time: '12:30 PM', icon: '🌞' },
      { name: 'Asr', time: '03:45 PM', icon: '🌤️' },
      { name: 'Maghrib', time: '06:15 PM', icon: '🌆' },
      { name: 'Isha', time: '07:30 PM', icon: '🌙' }
    ]
  };

  const upcomingDates = [
    { date: '2024-02-10', day: 'Saturday', status: 'Scheduled' },
    { date: '2024-02-11', day: 'Sunday', status: 'Scheduled' },
    { date: '2024-02-12', day: 'Monday', status: 'Not Set' },
    { date: '2024-02-13', day: 'Tuesday', status: 'Not Set' },
    { date: '2024-02-14', day: 'Wednesday', status: 'Not Set' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Prayer Times Management</h2>
        <button className="btn-primary flex items-center">
          <FaCalendar className="mr-2" /> Bulk Import
        </button>
      </div>

      {/* Current Prayer Times */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold">Today's Prayer Times</h3>
            <p className="text-gray-600">{prayerTimes.date} - {prayerTimes.location}</p>
          </div>
          <button className="btn-primary flex items-center">
            <FaEdit className="mr-2" /> Edit
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {prayerTimes.times.map((prayer, index) => (
            <div key={index} className="bg-gradient-to-br from-islamic-green to-islamic-teal text-white p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">{prayer.icon}</div>
              <p className="font-semibold text-lg">{prayer.name}</p>
              <p className="text-2xl font-bold mt-2">{prayer.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location Settings */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Location Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">City</label>
            <input type="text" value="New York" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Latitude</label>
            <input type="text" value="40.7128" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Longitude</label>
            <input type="text" value="-74.0060" className="input-field" />
          </div>
        </div>
        <button className="btn-primary mt-4">Update Location</button>
      </div>

      {/* Upcoming Dates */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Upcoming Dates</h3>
        <div className="space-y-2">
          {upcomingDates.map((date, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <FaClock className="text-islamic-green text-xl" />
                <div>
                  <p className="font-semibold">{date.date}</p>
                  <p className="text-sm text-gray-600">{date.day}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  date.status === 'Scheduled' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {date.status}
                </span>
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesManagement;
