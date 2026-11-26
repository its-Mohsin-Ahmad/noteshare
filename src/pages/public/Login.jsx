import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import loginBanner from '../../assets/login-banner.png';

export const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || 'Account not found. Please verify your email or click Signup.');
        return;
      }
      if (res.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (err) {
      setLoading(false);
      setError('Connection error. Please try again.');
    }
  };

  // Quick 1-click test credentials for convenient review
  const handleQuickDemo = async (role) => {
    setError('');
    setLoading(true);
    if (role === 'admin') {
      setEmail('admin@noteshare.edu');
      setPassword('admin123');
      const res = await login('admin@noteshare.edu', 'admin123', 'admin');
      setLoading(false);
      if (res.success) navigate('/admin');
    } else {
      setEmail('student@noteshare.edu');
      setPassword('password123');
      const res = await login('student@noteshare.edu', 'password123', 'student');
      setLoading(false);
      if (res.success) navigate('/student');
    }
  };

  return (
    <div className="min-h-[88vh] bg-[#F1F3F6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Outer Card */}
      <div className="max-w-[880px] w-full bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] border border-gray-100 p-4 sm:p-6 md:p-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        
        {/* Left Column: Orange Banner (Matches reference design) */}
        <div className="relative rounded-[28px] overflow-hidden bg-[#fe7b23] shadow-inner flex items-center justify-center h-full min-h-[380px] md:min-h-[500px]">
          <img
            src={loginBanner}
            alt="Simplify management with our dashboard"
            className="w-full h-full object-cover rounded-[28px]"
          />
        </div>

        {/* Right Column: Clean Login Form */}
        <div className="flex flex-col justify-center px-2 sm:px-4 md:px-6 py-2">
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#ff7b23] flex items-center justify-center text-white shadow-sm font-bold text-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              NOTEshare
            </span>
          </div>

          {/* Heading & Subtitle */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Please login to your account
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-[#f4f6fa] hover:bg-[#edf0f6] focus:bg-white rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 border border-transparent focus:border-[#ff7b23]/30 focus:outline-none focus:ring-4 focus:ring-[#ff7b23]/10 transition-all"
                required
              />
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#f4f6fa] hover:bg-[#edf0f6] focus:bg-white rounded-2xl pl-4 pr-11 py-3.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 border border-transparent focus:border-[#ff7b23]/30 focus:outline-none focus:ring-4 focus:ring-[#ff7b23]/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-right mt-1.5">
                <Link
                  to="/forgot-password"
                  className="text-[11px] sm:text-xs text-gray-400 hover:text-[#ff7b23] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-[#ff7b23] hover:bg-[#e86a14] active:scale-[0.99] text-white transition-all shadow-md shadow-[#ff7b23]/25 flex items-center justify-center cursor-pointer"
            >
              <span>{loading ? 'Logging in...' : 'Login'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/80" />
            </div>
            <span className="relative bg-white px-3 text-[11px] text-gray-400 font-medium">
              Or Login with
            </span>
          </div>

          {/* Social / Demo Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border border-gray-200/90 hover:border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-all cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border border-gray-200/90 hover:border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-all cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          {/* Quick Demo Hint */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-gray-400">
            <span>Demo Quick Access:</span>
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="text-[#ff7b23] hover:underline font-medium cursor-pointer"
            >
              Student
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="text-[#ff7b23] hover:underline font-medium cursor-pointer"
            >
              Admin
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center text-xs text-gray-400 mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-[#ff7b23] hover:underline">
              Signup
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};
