import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-islamic-navy dark:bg-slate-900 text-white mt-16 transition-colors duration-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Noorul Haq</h3>
            <p className="text-gray-300">
              Connecting our community through faith, education, and service.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/lectures" className="text-gray-300 hover:text-white">Lectures</Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-white">Courses</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-white">Projects</Link></li>
              <li><Link to="/activities" className="text-gray-300 hover:text-white">Activities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link to="/executives" className="text-gray-300 hover:text-white">Leadership</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-islamic-gold transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-islamic-gold transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-islamic-gold transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-islamic-gold transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="text-2xl hover:text-islamic-gold transition-colors">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Mosque Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
