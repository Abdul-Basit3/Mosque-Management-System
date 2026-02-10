import { FaPlus, FaEdit, FaTrash, FaEye, FaVideo, FaYoutube } from 'react-icons/fa';

const LecturesManagement = () => {
  const lectures = [
    {
      id: 1,
      title: 'The Virtues of Ramadan',
      speaker: 'Sheikh Ahmad Hassan',
      topic: 'Ramadan',
      videoType: 'youtube',
      views: 1250,
      duration: '45:30',
      isPublished: true,
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Understanding Tawheed',
      speaker: 'Dr. Fatima Ali',
      topic: 'Aqeedah',
      videoType: 'upload',
      views: 890,
      duration: '32:15',
      isPublished: true,
      uploadDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'The Life of Prophet Muhammad (PBUH)',
      speaker: 'Sheikh Omar Khan',
      topic: 'Seerah',
      videoType: 'youtube',
      views: 2340,
      duration: '1:15:20',
      isPublished: true,
      uploadDate: '2024-01-25'
    },
    {
      id: 4,
      title: 'Purification of the Heart',
      speaker: 'Sheikh Ahmad Hassan',
      topic: 'Spirituality',
      videoType: 'vimeo',
      views: 567,
      duration: '28:45',
      isPublished: false,
      uploadDate: '2024-02-01'
    },
    {
      id: 5,
      title: 'Islamic Finance Basics',
      speaker: 'Dr. Yusuf Ibrahim',
      topic: 'Finance',
      videoType: 'upload',
      views: 423,
      duration: '38:10',
      isPublished: true,
      uploadDate: '2024-02-05'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Lectures Management</h2>
        <button className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Upload Lecture
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90">Total Lectures</p>
          <p className="text-3xl font-bold">{lectures.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm opacity-90">Published</p>
          <p className="text-3xl font-bold">{lectures.filter(l => l.isPublished).length}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm opacity-90">Total Views</p>
          <p className="text-3xl font-bold">{lectures.reduce((sum, l) => sum + l.views, 0).toLocaleString()}</p>
        </div>
        <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <p className="text-sm opacity-90">Avg. Views</p>
          <p className="text-3xl font-bold">{Math.round(lectures.reduce((sum, l) => sum + l.views, 0) / lectures.length)}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search lectures..."
            className="input-field flex-1"
          />
          <select className="input-field w-48">
            <option value="">All Topics</option>
            <option value="ramadan">Ramadan</option>
            <option value="aqeedah">Aqeedah</option>
            <option value="seerah">Seerah</option>
          </select>
          <select className="input-field w-48">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Lectures List */}
      <div className="space-y-4">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              <div className="w-48 h-32 bg-gradient-to-br from-islamic-green to-islamic-teal rounded-lg flex items-center justify-center text-white flex-shrink-0">
                <FaVideo className="text-5xl" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{lecture.title}</h3>
                    <p className="text-gray-600">Speaker: {lecture.speaker}</p>
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
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                    {lecture.topic}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    lecture.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lecture.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    {lecture.videoType === 'youtube' && <FaYoutube className="mr-1 text-red-600" />}
                    {lecture.videoType}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <FaEye className="mr-1" /> {lecture.views.toLocaleString()} views
                  </span>
                  <span>⏱️ {lecture.duration}</span>
                  <span>📅 {lecture.uploadDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesManagement;
