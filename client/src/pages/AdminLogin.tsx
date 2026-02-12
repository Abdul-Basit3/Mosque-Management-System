import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import api from '../api/axios';
import { FaMosque, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Check if user has admin or staff role
      if (data.data.user.role !== 'admin' && data.data.user.role !== 'staff') {
        setError('Access denied. Admin or Staff credentials required.');
        setLoading(false);
        return;
      }

      // Store credentials in Redux and localStorage
      dispatch(setCredentials(data.data));
      
      // Use the redirectUrl from backend response for role-based navigation
      const redirectUrl = data.data.redirectUrl || '/dashboard';
      navigate(redirectUrl);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/masjid.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-islamic-navy/95 via-islamic-green/90 to-islamic-teal/95"></div>
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section with Logos */}
          <div className="bg-gradient-to-r from-islamic-green to-islamic-teal p-8 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              {/* UDS Logo */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg p-2">
                <img 
                  src="/images/udslogo.jpg" 
                  alt="UDS Logo" 
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <FaMosque className="text-islamic-green text-3xl hidden" />
              </div>

              {/* GMSA Logo */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg p-2">
                <img 
                  src="/images/gmsalogo.jpg" 
                  alt="GMSA Logo" 
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <FaMosque className="text-islamic-green text-3xl hidden" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-white/90 text-sm">School Mosque Management System</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Sign In to Dashboard
            </h2>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-start">
                <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green focus:border-islamic-green outline-none transition-all bg-white text-gray-900 font-medium placeholder:text-gray-500"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green focus:border-islamic-green outline-none transition-all bg-white text-gray-900 font-medium placeholder:text-gray-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-islamic-green transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-islamic-green border-gray-300 rounded focus:ring-islamic-green cursor-pointer"
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-sm text-islamic-green hover:text-emerald-700 font-bold transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-islamic-green to-islamic-teal text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
              <Link 
                to="/" 
                className="text-sm text-gray-600 hover:text-islamic-green transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t">
            <p className="text-xs text-gray-500">
              Protected area. Authorized personnel only.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-white text-sm drop-shadow-lg">
            Need help? Contact{' '}
            <a href="mailto:support@mosque.com" className="font-semibold hover:underline">
              support@mosque.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
