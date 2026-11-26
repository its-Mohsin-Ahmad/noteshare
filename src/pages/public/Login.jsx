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

          {/* Quick Demo Test Buttons */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-400">
              ⚡ 1-Click Demo:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="px-3 py-1.5 rounded-xl bg-orange-50 text-[#ff7b23] hover:bg-orange-100 text-xs font-bold transition-all cursor-pointer"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Admin Demo
              </button>
            </div>
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
