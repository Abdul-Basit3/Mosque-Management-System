import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data } = await api.get('/faqs');
      setFaqs(data.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      // Use sample data as fallback
      setFaqs([
        // Navigation & Website Usage
        {
          id: 1,
          category: 'Navigation & Website Usage',
          question: 'How do I navigate through the website?',
          answer: 'Use the navigation menu at the top of the page to access different sections: Home, Lectures, Courses, Projects, Activities, Leadership, FAQ, and About. On mobile devices, click the menu icon (☰) to view all navigation options.'
        },
        {
          id: 2,
          category: 'Navigation & Website Usage',
          question: 'How do I switch between light and dark mode?',
          answer: 'Click the sun/moon icon in the top navigation bar. The moon icon switches to dark mode, and the sun icon switches back to light mode. Your preference is saved automatically.'
        },
        {
          id: 3,
          category: 'Navigation & Website Usage',
          question: 'How do I search for lectures?',
          answer: 'Go to the Lectures page and use the search bar at the top. Type keywords related to the lecture title, speaker, or topic you are looking for.'
        },
        {
          id: 4,
          category: 'Navigation & Website Usage',
          question: 'How can I quickly return to the home page?',
          answer: 'Click the home icon (🏠) in the navigation bar, or click on the mosque logo and "Noorul Haq" text at the top left of any page.'
        },
        // Prayer Times
        {
          id: 5,
          category: 'Prayer Times',
          question: 'Where can I find today\'s prayer times?',
          answer: 'Prayer times are displayed on the Home page, showing all five daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) plus sunrise time for Accra, Ghana.'
        },
        {
          id: 6,
          category: 'Prayer Times',
          question: 'Are the prayer times accurate for my location?',
          answer: 'The prayer times are calculated for Accra, Ghana. If you are in a different location, times may vary slightly. Please consult local prayer time resources for precise timings.'
        },
        // Courses & Enrollment
        {
          id: 7,
          category: 'Courses & Enrollment',
          question: 'How do I enroll in a course?',
          answer: 'Visit the Courses page, browse available courses, and click the "Enroll Now" button on the course you wish to join. You may need to log in or register first.'
        },
        {
          id: 8,
          category: 'Courses & Enrollment',
          question: 'What courses are available?',
          answer: 'We offer various Islamic studies courses including Arabic Language, Tajweed, Islamic History, Fiqh, Hadith Studies, and Hisnul Muslim (daily supplications). Check the Courses page for full details.'
        },
        {
          id: 9,
          category: 'Courses & Enrollment',
          question: 'Are the courses free?',
          answer: 'Course fees vary by program. Some courses are offered free of charge while others may require a fee. Details are provided on each course page.'
        },
        {
          id: 10,
          category: 'Courses & Enrollment',
          question: 'How long do courses last?',
          answer: 'Course durations range from 6 to 16 weeks depending on the subject. Each course page displays the specific duration and schedule.'
        },
        // Activities & Events
        {
          id: 11,
          category: 'Activities & Events',
          question: 'How do I register for activities and events?',
          answer: 'Go to the Activities page, select the event you want to attend, and click the "Register Now" button. Fill out the registration form to confirm your participation.'
        },
        {
          id: 12,
          category: 'Activities & Events',
          question: 'What types of activities are organized?',
          answer: 'We organize various activities including sports events (football matches), educational programs (quiz competitions), seminars, workshops, and community gatherings.'
        },
        {
          id: 13,
          category: 'Activities & Events',
          question: 'Is there a limit on event participants?',
          answer: 'Yes, some events have maximum participant limits. Registration is on a first-come, first-served basis. Check the event details for capacity information.'
        },
        // Projects & Donations
        {
          id: 14,
          category: 'Projects & Donations',
          question: 'How can I donate to mosque projects?',
          answer: 'Visit the Projects page to view ongoing projects like Ramadan 2026 and Mosque Extension. Click the "Donate Now" button on any project to contribute.'
        },
        {
          id: 15,
          category: 'Projects & Donations',
          question: 'Are donations tax-deductible?',
          answer: 'Please contact our administration office for information about tax receipts and donation documentation. Email: treasurer@mosque.org'
        },
        {
          id: 16,
          category: 'Projects & Donations',
          question: 'Can I track project progress?',
          answer: 'Yes, each project page displays a progress bar showing the funding raised versus the goal, along with regular updates on project status.'
        },
        // Contact & Support
        {
          id: 17,
          category: 'Contact & Support',
          question: 'How do I contact the mosque administration?',
          answer: 'Visit the Leadership page to find contact information for all executives including email addresses and phone numbers. You can also check the About page for general contact details.'
        },
        {
          id: 18,
          category: 'Contact & Support',
          question: 'Who should I contact for religious guidance?',
          answer: 'For religious matters, please contact our Chief Imam or Deputy Imams. Their contact information is available on the Leadership page.'
        },
        {
          id: 19,
          category: 'Contact & Support',
          question: 'How can I get involved in organizing events?',
          answer: 'Contact our Organizer through the Leadership page. We welcome volunteers who want to help coordinate events, workshops, and community programs.'
        },
        // General Information
        {
          id: 20,
          category: 'General Information',
          question: 'What is the purpose of this website?',
          answer: 'This School Mosque Management System serves as a centralized platform for managing mosque activities, providing Islamic education, facilitating community engagement, and keeping members informed about events and programs.'
        },
        {
          id: 21,
          category: 'General Information',
          question: 'Do I need to create an account?',
          answer: 'You can browse most content without an account. However, to enroll in courses, register for events, or access the dashboard, you will need to create an account and log in.'
        },
        {
          id: 22,
          category: 'General Information',
          question: 'Is the website mobile-friendly?',
          answer: 'Yes, the website is fully responsive and optimized for mobile devices, tablets, and desktop computers. You can access all features from any device.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="section-title">Frequently Asked Questions</h1>

      {loading ? (
        <div className="text-center py-12 text-gray-700 dark:text-gray-300 text-lg font-semibold">Loading...</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
            <div key={category}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-islamic-green dark:text-emerald-300">{category}</h2>
              <div className="space-y-3">
                {categoryFAQs.map((faq) => (
                  <div key={faq.id} className="card hover:shadow-lg transition-all">
                    <button
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full flex justify-between items-center text-left group"
                    >
                      <h3 className="font-bold text-lg md:text-xl pr-4 text-gray-900 dark:text-white group-hover:text-islamic-green dark:group-hover:text-emerald-300 transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-islamic-green dark:bg-emerald-600 text-white group-hover:bg-emerald-700 dark:group-hover:bg-emerald-500 transition-all">
                        {openId === faq.id ? (
                          <FaMinus className="text-sm" />
                        ) : (
                          <FaPlus className="text-sm" />
                        )}
                      </div>
                    </button>
                    {openId === faq.id && (
                      <div className="mt-4 pt-4 border-t-2 border-emerald-100 dark:border-emerald-700">
                        <p className="card-text leading-relaxed text-base">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQ;
