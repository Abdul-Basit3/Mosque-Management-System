import { FaPlus, FaEdit, FaTrash, FaDonate } from 'react-icons/fa';

const ProjectsManagement = () => {
  const projects = [
    {
      id: 1,
      title: 'New Mosque Building',
      category: 'Building',
      status: 'Ongoing',
      fundingGoal: 500000,
      fundingRaised: 325000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Construction of new prayer hall and community center'
    },
    {
      id: 2,
      title: 'Orphan Support Program',
      category: 'Charity',
      status: 'Ongoing',
      fundingGoal: 50000,
      fundingRaised: 42500,
      startDate: '2024-02-01',
      endDate: '2024-06-30',
      description: 'Monthly support for 100 orphans including education and healthcare'
    },
    {
      id: 3,
      title: 'Islamic School Expansion',
      category: 'Education',
      status: 'Planning',
      fundingGoal: 200000,
      fundingRaised: 45000,
      startDate: '2024-06-01',
      endDate: '2025-01-31',
      description: 'Adding 5 new classrooms and a library'
    },
    {
      id: 4,
      title: 'Community Food Bank',
      category: 'Community',
      status: 'Ongoing',
      fundingGoal: 30000,
      fundingRaised: 28750,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      description: 'Monthly food distribution for needy families'
    },
    {
      id: 5,
      title: 'Youth Center Renovation',
      category: 'Building',
      status: 'Completed',
      fundingGoal: 75000,
      fundingRaised: 75000,
      startDate: '2023-09-01',
      endDate: '2024-01-31',
      description: 'Complete renovation of youth activities center'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Building: 'bg-blue-100 text-blue-800',
      Charity: 'bg-green-100 text-green-800',
      Education: 'bg-purple-100 text-purple-800',
      Community: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Planning: 'bg-yellow-100 text-yellow-800',
      Ongoing: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Paused: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Projects Management</h2>
        <button className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Create Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90">Total Projects</p>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm opacity-90">Total Goal</p>
          <p className="text-3xl font-bold">${(projects.reduce((sum, p) => sum + p.fundingGoal, 0) / 1000).toFixed(0)}K</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm opacity-90">Total Raised</p>
          <p className="text-3xl font-bold">${(projects.reduce((sum, p) => sum + p.fundingRaised, 0) / 1000).toFixed(0)}K</p>
        </div>
        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <p className="text-sm opacity-90">Completion</p>
          <p className="text-3xl font-bold">
            {Math.round((projects.reduce((sum, p) => sum + p.fundingRaised, 0) / projects.reduce((sum, p) => sum + p.fundingGoal, 0)) * 100)}%
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="input-field flex-1"
          />
          <select className="input-field w-48">
            <option value="">All Categories</option>
            <option value="building">Building</option>
            <option value="charity">Charity</option>
            <option value="education">Education</option>
            <option value="community">Community</option>
          </select>
          <select className="input-field w-48">
            <option value="">All Status</option>
            <option value="planning">Planning</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Start Date</p>
                <p className="font-semibold">{project.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">End Date</p>
                <p className="font-semibold">{project.endDate}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-islamic-green">
                  ${project.fundingRaised.toLocaleString()} raised
                </span>
                <span className="text-gray-600">
                  Goal: ${project.fundingGoal.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-islamic-green to-islamic-teal h-4 rounded-full transition-all flex items-center justify-end pr-2"
                  style={{ width: `${Math.min((project.fundingRaised / project.fundingGoal) * 100, 100)}%` }}
                >
                  <span className="text-xs text-white font-semibold">
                    {Math.round((project.fundingRaised / project.fundingGoal) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-primary flex-1 flex items-center justify-center">
                <FaDonate className="mr-2" /> View Donations
              </button>
              <button className="btn-secondary flex-1">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManagement;
