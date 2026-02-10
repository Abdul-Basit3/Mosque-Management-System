import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';

const FAQsManagement = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      category: 'General',
      question: 'What are the mosque operating hours?',
      answer: 'The mosque is open from Fajr prayer (approximately 5:30 AM) until after Isha prayer (approximately 9:00 PM) daily. The exact times vary based on prayer schedules.',
      isActive: true,
      displayOrder: 1
    },
    {
      id: 2,
      category: 'Prayer',
      question: 'Are women allowed to pray in the mosque?',
      answer: 'Yes, we have a dedicated prayer area for women on the second floor. Women are welcome to attend all five daily prayers and Friday prayers.',
      isActive: true,
      displayOrder: 2
    },
    {
      id: 3,
      category: 'Donations',
      question: 'How can I donate to the mosque?',
      answer: 'You can donate online through our website, in person at the mosque office, or by mailing a check. We accept one-time and recurring donations. All donations are tax-deductible.',
      isActive: true,
      displayOrder: 3
    },
    {
      id: 4,
      category: 'Education',
      question: 'Do you offer Islamic classes for children?',
      answer: 'Yes, we offer weekend Islamic school for children ages 5-15, covering Quran, Arabic, Islamic studies, and character development. Classes run on Saturdays and Sundays.',
      isActive: true,
      displayOrder: 4
    },
    {
      id: 5,
      category: 'Events',
      question: 'How do I register for mosque events?',
      answer: 'You can register for events through our website under the Activities section, or by contacting the mosque office directly. Some events require advance registration due to limited capacity.',
      isActive: true,
      displayOrder: 5
    },
    {
      id: 6,
      category: 'General',
      question: 'Is parking available at the mosque?',
      answer: 'Yes, we have a parking lot with 50 spaces available for worshippers. Additional street parking is available on Friday afternoons.',
      isActive: true,
      displayOrder: 6
    },
    {
      id: 7,
      category: 'Services',
      question: 'Do you perform marriage ceremonies?',
      answer: 'Yes, our Imam performs Islamic marriage ceremonies (Nikah). Please contact the mosque office at least 2 weeks in advance to schedule a consultation.',
      isActive: false,
      displayOrder: 7
    },
    {
      id: 8,
      category: 'Ramadan',
      question: 'What special programs do you offer during Ramadan?',
      answer: 'During Ramadan, we offer daily Taraweeh prayers, community Iftar meals, Quran completion programs, and special lectures. We also organize charity drives and Zakat collection.',
      isActive: true,
      displayOrder: 8
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      General: 'bg-blue-100 text-blue-800',
      Prayer: 'bg-green-100 text-green-800',
      Donations: 'bg-purple-100 text-purple-800',
      Education: 'bg-orange-100 text-orange-800',
      Events: 'bg-pink-100 text-pink-800',
      Services: 'bg-teal-100 text-teal-800',
      Ramadan: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">FAQs Management</h2>
        <button className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Add FAQ
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <p className="text-sm opacity-90">Total FAQs</p>
          <p className="text-3xl font-bold">{faqs.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <p className="text-sm opacity-90">Active FAQs</p>
          <p className="text-3xl font-bold">{faqs.filter(f => f.isActive).length}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-sm opacity-90">Categories</p>
          <p className="text-3xl font-bold">{categories.length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="input-field flex-1"
          />
          <select className="input-field w-48">
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select className="input-field w-48">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* FAQs by Category */}
      {categories.map(category => (
        <div key={category} className="mb-6">
          <h3 className="text-2xl font-bold mb-4 text-islamic-green">{category}</h3>
          <div className="space-y-3">
            {faqs.filter(faq => faq.category === category).map((faq) => (
              <div key={faq.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(faq.category)}`}>
                            {faq.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            faq.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {faq.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                            Order: {faq.displayOrder}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {faq.question}
                        </h4>
                        {expandedId === faq.id && (
                          <p className="text-gray-600 mt-3 leading-relaxed">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                      <div className="text-islamic-green">
                        {expandedId === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </div>
                  </button>
                  <div className="flex gap-2 ml-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <FaEdit />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQsManagement;
