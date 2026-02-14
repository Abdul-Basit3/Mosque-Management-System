import { useState, useEffect } from 'react';
import { FaClock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import api from '../../api/axios';

interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  location: string;
  date: string;
}

interface TimeInput {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
}

const PrayerTimesManagement = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTimes, setEditedTimes] = useState<Record<string, TimeInput>>({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  // Convert 12-hour time string to TimeInput object
  const parseTime = (timeStr: string): TimeInput => {
    // Handle formats like "05:30 AM" or "05:30"
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (match) {
      const hour = match[1];
      const minute = match[2];
      const period = match[3]?.toUpperCase() as 'AM' | 'PM' || 'AM';
      return { hour, minute, period };
    }
    return { hour: '12', minute: '00', period: 'AM' };
  };

  // Convert TimeInput to 24-hour format for backend
  const convertTo24Hour = (time: TimeInput): string => {
    let hour = parseInt(time.hour);
    
    if (time.period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (time.period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    return `${hour.toString().padStart(2, '0')}:${time.minute}`;
  };

  const fetchPrayerTimes = async () => {
    try {
      const { data } = await api.get('/prayer-times/today');
      console.log('Fetched prayer times:', data.data);
      setPrayerTimes(data.data);
      setLocation(data.data.location);
      
      // Initialize edited times
      const times: Record<string, TimeInput> = {};
      ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
        times[prayer] = parseTime(data.data[prayer]);
      });
      setEditedTimes(times);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setMessage({ type: 'error', text: 'Failed to load prayer times' });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Re-initialize edited times from current prayer times
    if (prayerTimes) {
      const times: Record<string, TimeInput> = {};
      ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
        times[prayer] = parseTime(prayerTimes[prayer as keyof PrayerTimesData] as string);
      });
      setEditedTimes(times);
      setLocation(prayerTimes.location);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (prayerTimes) {
      setLocation(prayerTimes.location);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Convert all times to 24-hour format
      const payload = {
        date: today,
        fajr: convertTo24Hour(editedTimes.fajr),
        sunrise: convertTo24Hour(editedTimes.sunrise),
        dhuhr: convertTo24Hour(editedTimes.dhuhr),
        asr: convertTo24Hour(editedTimes.asr),
        maghrib: convertTo24Hour(editedTimes.maghrib),
        isha: convertTo24Hour(editedTimes.isha),
        location: location
      };

      console.log('Sending update:', payload);

      const { data } = await api.put('/prayer-times', payload);
      
      console.log('Update response:', data);

      setPrayerTimes(data.data);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Prayer times updated successfully! Changes will appear on the home page.' });
      
      // Refresh the data to ensure we have the latest
      setTimeout(() => {
        fetchPrayerTimes();
        setMessage(null);
      }, 2000);
    } catch (error: any) {
      console.error('Error updating prayer times:', error);
      console.error('Error response:', error.response?.data);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update prayer times. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (prayer: string, field: 'hour' | 'minute' | 'period', value: string) => {
    setEditedTimes(prev => ({
      ...prev,
      [prayer]: {
        ...prev[prayer],
        [field]: value
      }
    }));
  };

  if (!prayerTimes) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prayer times...</p>
        </div>
      </div>
    );
  }

  const prayerTimesArray = [
    { name: 'Fajr', key: 'fajr', time: prayerTimes.fajr, icon: '🌅' },
    { name: 'Sunrise', key: 'sunrise', time: prayerTimes.sunrise, icon: '☀️' },
    { name: 'Dhuhr', key: 'dhuhr', time: prayerTimes.dhuhr, icon: '🌞' },
    { name: 'Asr', key: 'asr', time: prayerTimes.asr, icon: '🌤️' },
    { name: 'Maghrib', key: 'maghrib', time: prayerTimes.maghrib, icon: '🌆' },
    { name: 'Isha', key: 'isha', time: prayerTimes.isha, icon: '🌙' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Prayer Times Management</h2>
      </div>

      {/* Success/Error Messages */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg animate-fade-in ${
          message.type === 'success' 
            ? 'bg-green-50 border-l-4 border-green-500 text-green-700' 
            : 'bg-red-50 border-l-4 border-red-500 text-red-700'
        }`}>
          <p className="font-semibold">{message.text}</p>
        </div>
      )}

      {/* Current Prayer Times */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Prayer Times</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">📍 {prayerTimes.location}</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center shadow-md"
                  disabled={loading}
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-islamic-green text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center shadow-md"
                  disabled={loading}
                >
                  <FaSave className="mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button 
                onClick={handleEdit}
                className="btn-primary flex items-center shadow-md"
              >
                <FaEdit className="mr-2" /> Edit Times
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {prayerTimesArray.map((prayer) => (
            <div key={prayer.key} className="bg-gradient-to-br from-islamic-green to-islamic-teal text-white p-5 rounded-xl shadow-lg">
              <div className="text-4xl mb-3 text-center">{prayer.icon}</div>
              <p className="font-bold text-lg text-center mb-3">{prayer.name}</p>
              
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    <select
                      value={editedTimes[prayer.key]?.hour || '12'}
                      onChange={(e) => handleTimeChange(prayer.key, 'hour', e.target.value)}
                      className="flex-1 px-2 py-2 text-gray-900 rounded font-bold text-center bg-white"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                        <option key={h} value={h.toString().padStart(2, '0')}>
                          {h.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <span className="text-white text-2xl font-bold flex items-center">:</span>
                    <select
                      value={editedTimes[prayer.key]?.minute || '00'}
                      onChange={(e) => handleTimeChange(prayer.key, 'minute', e.target.value)}
                      className="flex-1 px-2 py-2 text-gray-900 rounded font-bold text-center bg-white"
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map(m => (
                        <option key={m} value={m.toString().padStart(2, '0')}>
                          {m.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <select
                    value={editedTimes[prayer.key]?.period || 'AM'}
                    onChange={(e) => handleTimeChange(prayer.key, 'period', e.target.value)}
                    className="w-full px-2 py-2 text-gray-900 rounded font-bold text-center bg-white"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              ) : (
                <p className="text-2xl font-bold text-center mt-2">{prayer.time}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Location Settings */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Location Settings</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Mosque Location
            </label>
            {isEditing ? (
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
                placeholder="e.g., Accra, Ghana"
              />
            ) : (
              <input 
                type="text" 
                value={prayerTimes.location} 
                className="input-field bg-gray-100 dark:bg-gray-700" 
                disabled
              />
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500">
        <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-300 flex items-center">
          <FaClock className="mr-2" />
          How to Update Prayer Times
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Click the <strong>"Edit Times"</strong> button above</li>
          <li>Use the dropdowns to select <strong>Hour</strong>, <strong>Minute</strong>, and <strong>AM/PM</strong> for each prayer</li>
          <li>Update the mosque location if needed</li>
          <li>Click <strong>"Save Changes"</strong> to apply</li>
          <li>Changes will appear immediately on the home page with AM/PM formatting</li>
        </ol>
        <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>💡 Tip:</strong> The system automatically converts your input to the correct format. 
            For example, if you select 1:30 PM, it will be stored and displayed correctly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesManagement;
