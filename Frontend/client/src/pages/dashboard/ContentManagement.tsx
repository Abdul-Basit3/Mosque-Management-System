import { FaPlus, FaEdit, FaTrash, FaQuran, FaPray } from 'react-icons/fa';

const ContentManagement = () => {
  const contents = [
    {
      id: 1,
      type: 'verse',
      title: 'Surah Al-Fatiha (1:1)',
      arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
      isActive: true
    },
    {
      id: 2,
      type: 'dua',
      title: 'Morning Dua',
      arabicText: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا',
      translation: 'O Allah, by You we have reached the morning and by You we have reached the evening',
      isActive: true
    },
    {
      id: 3,
      type: 'verse',
      title: 'Ayat al-Kursi (2:255)',
      arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
      translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence',
      isActive: true
    },
    {
      id: 4,
      type: 'dua',
      title: 'Before Eating',
      arabicText: 'بِسْمِ اللَّهِ',
      translation: 'In the name of Allah',
      isActive: true
    },
    {
      id: 5,
      type: 'hadith',
      title: 'The Best of People',
      arabicText: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
      translation: 'The best of people are those who are most beneficial to people',
      isActive: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'verse': return <FaQuran className="text-islamic-green" />;
      case 'dua': return <FaPray className="text-islamic-teal" />;
      default: return <FaQuran className="text-islamic-navy" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      verse: 'bg-green-100 text-green-800',
      dua: 'bg-blue-100 text-blue-800',
      hadith: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Content Management</h2>
        <button className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Add New Content
        </button>
      </div>

      <div className="card mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search content..."
            className="input-field flex-1"
          />
          <select className="input-field w-48">
            <option value="">All Types</option>
            <option value="verse">Verses</option>
            <option value="dua">Duas</option>
            <option value="hadith">Hadiths</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {contents.map((content) => (
          <div key={content.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">
                {getTypeIcon(content.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{content.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(content.type)}`}>
                    {content.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${content.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {content.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-2xl font-arabic text-right mb-2 text-islamic-green">
                  {content.arabicText}
                </p>
                <p className="text-gray-700">{content.translation}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FaEdit />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
