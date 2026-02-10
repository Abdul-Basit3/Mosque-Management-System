import { FaPlus, FaEdit, FaTrash, FaUsers, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const ActivitiesManagement = () => {
  const activities = [
    {
      id: 1,
      title: 'Youth Islamic Conference 2024',
      type: 'Seminar',
      location: 'Main Hall',
      startDate: '2024-03-15',
      startTime: '09:00 AM',
      maxParticipants: 200,
      registered: 156,
      requiresApproval: false,
      isActive: true
    },
    {
      id: 2,
      title: 'Quran Recitation Competition',
      type: 'Competition',
      location: 'Prayer Hall',
      startDate: '2024-03-22',
      startTime: '02:00 PM',
      maxParticipants: 50,
      registered: 42,
      requiresApproval: true,
      isActive: true
    },
    {
      id: 3,
      title: 'Community Iftar Gathering',
      type: 'Community',
      location: 'Community Center',
      startDate: '2024-03-28',
      startTime: '06:30 PM',
      maxParticipants: 300,
      registered: 245,
      requiresApproval: false,
      isActive: true
    },
    {
      id: 4,
      title: 'Youth Sports Day',
      type: 'Youth Program',
      location: 'Sports Complex',
      startDate: '2024-04-05',
      startTime: '10:00 AM',
      maxParticipants: 100,
      registered: 78,
      requiresApproval: false,
      isActive: true
    },
    {
      id: 5,
      title: 'Islamic Art Workshop',
      type: 'Other',
      location: 'Art Studio',
      startDate: '2024-04-12',
      startTime: '03:00 PM',
      maxParticipants: 30,
      registered: 28,
      requiresApproval: true,
      isActive: false
    }
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      Seminar: 'bg-blue-100 text-blue-800',
      Competition: 'bg-purple-100 text-purple-800',
      'Youth Program': 'bg-green-100 text-green-800',
      Community: 'bg-orange-100 text-orange-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors];
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Activities Management</h2>
        <button className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Create Activity
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90">Total Activities</p>
          <p className="text-3xl font-bold">{activities.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm opacity-90">Active</p>
          <p className="text-3xl font-bold">{activities.filter(a => a.isActive).length}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm opacity-90">Total Registrations</p>
          <p className="text-3xl font-bold">{activities.reduce((sum, a) => sum + a.registered, 0)}</p>
        </div>
        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <p className="text-sm opacity-90">Avg. Attendance</p>
          <p className="text-3xl font-bold">
            {Math.round((activities.reduce((sum, a) => sum + a.registered, 0) / activities.reduce((sum, a) => sum + a.maxParticipants, 0)) * 100)}%
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search activities..."
            className="input-field flex-1"
          />
          <select className="input-field w-48">
            <option value="">All Types</option>
            <option value="seminar">Seminar</option>
            <option value="competition">Competition</option>
            <option value="youth">Youth Program</option>
            <option value="community">Community</option>
          </select>
          <select className="input-field w-48">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-islamic-green to-islamic-teal rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <div className="text-center">
                  <p className="text-2xl font-bold">{new Date(activity.startDate).getDate()}</p>
                  <p className="text-xs">{new Date(activity.startDate).toLocaleString('default', { month: 'short' })}</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{activity.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(activity.type)}`}>
                        {activity.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {activity.requiresApproval && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          Requires Approval
                        </span>
                      )}
                    </div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendar className="mr-2 text-islamic-green" />
                    <span>{activity.startDate} at {activity.startTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-islamic-green" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="mr-2 text-islamic-green" />
                    <span>{activity.registered} / {activity.maxParticipants} registered</span>
                  </div>
                </div>

                {/* Registration Progress */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Registration Progress</span>
                    <span>{Math.round((activity.registered / activity.maxParticipants) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        activity.registered >= activity.maxParticipants 
                          ? 'bg-red-500' 
                          : 'bg-islamic-green'
                      }`}
                      style={{ width: `${Math.min((activity.registered / activity.maxParticipants) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="btn-primary flex-1">View Registrations</button>
              <button className="btn-secondary flex-1">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesManagement;
