import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hidden Admin Access Component
 * This component is intentionally not linked anywhere in the public UI
 * Access URL directly: /admin-access-portal
 * 
 * Security Note: In production, implement additional security measures:
 * - IP whitelisting
 * - Two-factor authentication
 * - Rate limiting
 * - Audit logging
 */

const AdminAccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to admin login after 2 seconds
    const timer = setTimeout(() => {
      navigate('/admin/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-navy via-islamic-green to-islamic-teal">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-block p-6 bg-white/10 rounded-full backdrop-blur-sm">
            <svg className="w-20 h-20 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Secure Access Portal</h1>
        <p className="text-white/80 text-lg mb-8">Redirecting to admin authentication...</p>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;
