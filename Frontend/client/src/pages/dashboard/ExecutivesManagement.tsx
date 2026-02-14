import { FaPlus, FaEdit, FaTrash, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

const ExecutivesManagement = () => {
  const executives = [
    {
      id: 1,
      firstName: 'Ahmad',
      lastName: 'Hassan',
      role: 'Imam',
      department: 'Religious Affairs',
      email: 'ahmad.hassan@mosque.com',
      phone: '+1 (555) 123-4567',
      bio: 'Experienced Islamic scholar with 15 years of service. Specializes in Quranic studies and Islamic jurisprudence.',
      isActive: true,
      displayOrder: 1
    },
    {
      id: 2,
      firstName: 'Fatima',
      lastName: 'Ali',
      role: 'Director of Education',
      department: 'Education',
      email: 'fatima.ali@mosque.com',
      phone: '+1 (555) 234-5678',
      bio: 'PhD in Islamic Studies. Oversees all educational programs and curriculum development.',
      isActive: true,
      displayOrder: 2
    },
    {
      id: 3,
      firstName: 'Omar',
      lastName: 'Khan',
      role: 'Community Outreach Coordinator',
      department: 'Community Services',
      email: 'omar.khan@mosque.com',
      phone: '+1 (555) 345-6789',
      bio: 'Dedicated to building bridges with the local community and organizing interfaith dialogues.',
      isActive: true,
      displayOrder: 3
    },
    {
      id: 4,
      firstName: 'Aisha',
      lastName: 'Ibrahim',
      role: 'Youth Program Director',
      department: 'Youth Services',
      email: 'aisha.ibrahim@mosque.com',
      phone: '+1 (555) 456-7890',
      bio: 'Passionate about youth development and Islamic education for the next generation.',
      isActive: true,
      displayOrder: 4
    },
    {
      id: 5,
      firstName: 'Yusuf',
      lastName: 'Ahmed',
      role: 'Finance Manager',
      department: 'Administration',
      email: 'yusuf.ahmed@mosque.com',
      phone: '+1 (555) 567-8901',
      bio: 'CPA with expertise in non-profit financial management and Islamic finance principles.',
      isActive: true,
      displayOrder: 5
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Leadership Management</h2>
        <button className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Add Executive
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90">Total Executives</p>
          <p className="text-3xl font-bold">{executives.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm opacity-90">Active Members</p>
          <p className="text-3xl font-bold">{executives.filter(e => e.isActive).length}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm opacity-90">Departments</p>
          <p className="text-3xl font-bold">{new Set(executives.map(e => e.department)).size}</p>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <input
          type="text"
          placeholder="Search executives..."
          className="input-field"
        />
      </div>

      {/* Executives List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {executives.map((executive) => (
          <div key={executive.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-islamic-green to-islamic-teal rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FaUser className="text-4xl" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">
                      {executive.firstName} {executive.lastName}
                    </h3>
                    <p className="text-islamic-green font-semibold">{executive.role}</p>
                    <p className="text-sm text-gray-600">{executive.department}</p>
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

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {executive.bio}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaEnvelope className="mr-2 text-islamic-green" />
                    <a href={`mailto:${executive.email}`} className="hover:text-islamic-green">
                      {executive.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaPhone className="mr-2 text-islamic-green" />
                    <a href={`tel:${executive.phone}`} className="hover:text-islamic-green">
                      {executive.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    executive.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {executive.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    Order: {executive.displayOrder}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutivesManagement;
