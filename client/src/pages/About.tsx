import { useEffect, useState } from 'react';
import api from '../api/axios';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

interface AboutInfo {
  organizationName: string;
  history?: string;
  mission?: string;
  vision?: string;
  values?: string;
  address?: string;
  phone?: string;
  email?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
}

const About = () => {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data } = await api.get('/about');
      setAbout(data.data);
    } catch (error) {
      console.error('Error fetching about info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-700 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        {about?.organizationName || 'About Us'}
      </h1>

      {/* System Software Description - Always Show */}
      <section className="card mb-6 bg-gradient-to-br from-islamic-green/5 to-islamic-teal/5 dark:from-islamic-green/10 dark:to-islamic-teal/10 border-2 border-islamic-green/20">
        <h2 className="text-2xl font-bold mb-4 text-islamic-green dark:text-emerald-400">About This System</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The <strong>School Mosque Management System</strong> is a comprehensive digital platform designed to streamline and enhance the management of mosque and school activities. Built with modern web technologies including React, TypeScript, Node.js, Express, and PostgreSQL, this system provides a centralized hub for spiritual resources, educational programs, and community engagement.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Key features include real-time prayer times for Ghana, rotating Islamic quotations, lecture management, online course enrollment, community project tracking, event registration, and administrative dashboards. The platform supports role-based access control for administrators, staff, students, and public users, ensuring secure and efficient operations.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          With its responsive design, dark mode support, and user-friendly interface, the system serves as a bridge between traditional Islamic values and modern technology, making it easier for the community to stay connected, informed, and engaged in their spiritual journey.
        </p>
      </section>

      {about?.history && (
        <section className="card mb-6">
          <h2 className="text-2xl font-bold mb-4 text-islamic-green dark:text-emerald-400">Our History</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{about.history}</p>
        </section>
      )}

      {about?.mission && (
        <section className="card mb-6">
          <h2 className="text-2xl font-bold mb-4 text-islamic-green dark:text-emerald-400">Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{about.mission}</p>
        </section>
      )}

      {about?.vision && (
        <section className="card mb-6">
          <h2 className="text-2xl font-bold mb-4 text-islamic-green dark:text-emerald-400">Vision</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{about.vision}</p>
        </section>
      )}

      {about?.values && (
        <section className="card mb-6">
          <h2 className="text-2xl font-bold mb-4 text-islamic-green dark:text-emerald-400">Our Values</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{about.values}</p>
        </section>
      )}

      {(about?.address || about?.phone || about?.email) && (
        <section className="card mb-6">
          <h2 className="text-2xl font-bold mb-4 text-islamic-green dark:text-emerald-400">Contact Us</h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            {about.address && <p><strong>Address:</strong> {about.address}</p>}
            {about.phone && <p><strong>Phone:</strong> {about.phone}</p>}
            {about.email && <p><strong>Email:</strong> {about.email}</p>}
          </div>
        </section>
      )}

      {(about?.facebookUrl || about?.twitterUrl || about?.instagramUrl || about?.youtubeUrl || about?.tiktokUrl) && (
        <section className="card">
          <h2 className="text-2xl font-bold mb-4 text-islamic-green dark:text-emerald-400">Follow Us</h2>
          <div className="flex space-x-6">
            {about.facebookUrl && (
              <a href={about.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">
                <FaFacebook />
              </a>
            )}
            {about.twitterUrl && (
              <a href={about.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-3xl text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-400">
                <FaTwitter />
              </a>
            )}
            {about.instagramUrl && (
              <a href={about.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-3xl text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-500">
                <FaInstagram />
              </a>
            )}
            {about.youtubeUrl && (
              <a href={about.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-3xl text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">
                <FaYoutube />
              </a>
            )}
            {about.tiktokUrl && (
              <a href={about.tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-3xl text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-300">
                <FaTiktok />
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
