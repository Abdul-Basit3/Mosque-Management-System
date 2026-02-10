import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaDonate, FaSearch } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  fundingGoal?: number;
  fundingRaised: number;
  images?: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects when search changes
  useEffect(() => {
    if (search.trim() === '') {
      setProjects(allProjects);
    } else {
      const filtered = allProjects.filter(project =>
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.category.toLowerCase().includes(search.toLowerCase()) ||
        project.status.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
      );
      setProjects(filtered);
    }
  }, [search, allProjects]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data);
      setAllProjects(data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Use sample data as fallback
      const sampleProjects = [
        {
          id: 1,
          title: 'Ramadan 2026',
          description: 'Special Ramadan programs including daily Iftar, Taraweeh prayers, Quran completion, and community gatherings throughout the blessed month.',
          category: 'Community Event',
          status: 'Planning',
          fundingGoal: 15000,
          fundingRaised: 8500,
          images: ['/images/ramadan.jpg']
        },
        {
          id: 2,
          title: 'Mosque (Masjid) Extension',
          description: 'Expanding our mosque facilities to accommodate the growing community with additional prayer space, classrooms, and community hall.',
          category: 'Infrastructure',
          status: 'In Progress',
          fundingGoal: 250000,
          fundingRaised: 125000,
          images: ['/images/extend.jpg']
        }
      ];
      setProjects(sampleProjects);
      setAllProjects(sampleProjects);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (raised: number, goal?: number) => {
    if (!goal) return 0;
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title">Community Projects</h1>

      {/* Enhanced Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-400 text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search by title, category, status, or description..."
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
            Found {projects.length} project{projects.length !== 1 ? 's' : ''} matching "{search}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-700 dark:text-gray-300 text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card hover:shadow-lg transition-shadow">
              {project.images && project.images.length > 0 && (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex items-center gap-2 mb-4">
                <span className="badge bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {project.category}
                </span>
                <span className="badge bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {project.status}
                </span>
              </div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-text mb-4">{project.description}</p>
              
              {project.fundingGoal && (
                <div className="mb-4">
                  <div className="flex justify-between text-base font-bold mb-2">
                    <span className="text-islamic-green dark:text-emerald-300">
                      ${project.fundingRaised.toLocaleString()} raised
                    </span>
                    <span className="text-gray-700 dark:text-gray-200">
                      Goal: ${project.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-islamic-green dark:bg-emerald-500 h-4 rounded-full transition-all shadow-sm"
                      style={{ width: `${getProgressPercentage(project.fundingRaised, project.fundingGoal)}%` }}
                    />
                  </div>
                  <p className="text-center text-sm font-bold text-gray-700 dark:text-gray-200 mt-2">
                    {getProgressPercentage(project.fundingRaised, project.fundingGoal).toFixed(0)}% Complete
                  </p>
                </div>
              )}

              <button className="btn-primary w-full flex items-center justify-center">
                <FaDonate className="mr-2" />
                Donate Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
