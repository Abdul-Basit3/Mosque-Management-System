import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import api from '../api/axios';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      
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

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth implementation
    alert('Google login will be implemented with OAuth 2.0');
    // In production, this would redirect to Google OAuth endpoint
    // window.location.href = '/api/auth/google';
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage('');
    setError('');

    try {
      await api.post('/auth/forgot-password', { email: resetEmail });
      setResetMessage('Password reset link has been sent to your email!');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail('');
        setResetMessage('');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full card">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {showForgotPassword ? 'Reset Password' : 'Login'}
        </h2>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 p-4 rounded-lg mb-4 font-semibold border-2 border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {resetMessage && (
          <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 p-4 rounded-lg mb-4 font-semibold border-2 border-green-200 dark:border-green-800">
            {resetMessage}
          </div>
        )}

        {showForgotPassword ? (
          // Forgot Password Form
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-gray-700 dark:text-gray-200 mb-4 text-center font-medium">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">Email Address</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="input-field"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setResetEmail('');
                setError('');
                setResetMessage('');
              }}
              className="btn-secondary w-full"
            >
              Back to Login
            </button>
          </form>
        ) : (
          // Login Form
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-white">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-islamic-green dark:hover:text-emerald-400"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-islamic-green border-gray-300 rounded focus:ring-islamic-green"
                  />
                  <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-bold text-islamic-green dark:text-emerald-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200 dark:border-emerald-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-emerald-800 text-gray-600 dark:text-gray-300 font-semibold">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 dark:border-emerald-600 rounded-lg font-bold text-gray-700 dark:text-white bg-white dark:bg-emerald-700 hover:bg-gray-50 dark:hover:bg-emerald-600 transition-all shadow-sm hover:shadow-md"
            >
              <FaGoogle className="text-xl text-red-500" />
              <span>Login with Google</span>
            </button>

            <p className="text-center mt-6 text-gray-700 dark:text-gray-200 font-semibold">
              Don't have an account?{' '}
              <Link to="/register" className="text-islamic-green dark:text-emerald-400 font-bold hover:underline">
                Register
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
