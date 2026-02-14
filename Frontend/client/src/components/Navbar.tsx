import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { FaBars, FaTimes, FaMoon, FaSun, FaHome } from 'react-icons/fa';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/lectures', label: 'Lectures' },
    { path: '/courses', label: 'Courses' },
    { path: '/projects', label: 'Projects' },
    { path: '/activities', label: 'Activities' },
    { path: '/executives', label: 'Leadership' },
    { path: '/faq', label: 'FAQ' },
    { path: '/about', label: 'About' }
  ];

  return (
    <nav className="bg-white dark:bg-emerald-800 shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-emerald-100 dark:border-emerald-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            {/* UDS Logo */}
            <img 
              src="/images/udslogo.jpg" 
              alt="UDS Logo" 
              className="h-12 w-12 object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* GMSA Logo */}
            <img 
              src="/images/gmsalogo.jpg" 
              alt="GMSA Logo" 
              className="h-12 w-12 object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-xl font-bold text-islamic-green dark:text-emerald-400">Noorul Haq</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Home Icon */}
            <Link
              to="/"
              className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700 transition-colors group"
              aria-label="Go to home"
              title="Home"
            >
              <FaHome className="text-islamic-green dark:text-emerald-300 text-xl group-hover:scale-110 transition-transform" />
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700 transition-colors"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <FaMoon className="text-emerald-600 text-xl" />
              ) : (
                <FaSun className="text-emerald-300 text-xl" />
              )}
            </button>
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 dark:text-white hover:text-islamic-green dark:hover:text-emerald-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 dark:text-white hover:text-islamic-green dark:hover:text-emerald-300">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700 transition-colors"
              aria-label="Go to home"
            >
              <FaHome className="text-islamic-green dark:text-emerald-300 text-xl" />
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700 transition-colors"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <FaMoon className="text-emerald-600" />
              ) : (
                <FaSun className="text-emerald-300" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-gray-700 dark:text-white"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t dark:border-emerald-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 dark:text-white hover:text-islamic-green dark:hover:text-emerald-300"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 dark:text-white hover:text-islamic-green dark:hover:text-emerald-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="mt-2 btn-primary w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block mt-2 btn-primary text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
