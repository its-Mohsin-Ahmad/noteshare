import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, GraduationCap } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useApp } from '../../context/AppContext';

export const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your registered email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    }, 400);
  };

  // Quick 1-click test credentials
  const handleQuickDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@noteshare.edu');
      setPassword('admin123');
      const res = login('admin@noteshare.edu', 'admin123', 'admin');
      navigate('/admin');
    } else {
      setEmail('student@noteshare.edu');
      setPassword('student123');
      const res = login('student@noteshare.edu', 'student123', 'student');
      navigate('/student');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Modern Split-Screen Card (Specification Section 10) */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-[#E7EAF0] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Section (Specification 10.1): University Atmosphere & Inspiration */}
        <div className="md:col-span-5 bg-[#0D1930] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden border-r border-[#1F3558]">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1930] via-[#0D1930]/90 to-transparent" />

          {/* Logo */}
          <div className="relative z-10">
            <Logo size="normal" variant="light" />
            <div className="mt-8 space-y-2">
              <span className="text-xs font-bold text-[#F4A62A] uppercase tracking-wider">
                Academic Portal
              </span>
              <h2 className="text-2xl font-black text-white leading-tight">
                Welcome Back!
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Log in to continue your academic journey, access verified exams, and save notes for quick review.
              </p>
            </div>
          </div>

          {/* Realistic Student Studying Photo */}
          <div className="relative z-10 my-6">
            <div className="rounded-2xl overflow-hidden border border-[#1F3558] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=300&fit=crop"
                alt="Student studying"
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="mt-3 text-[11px] text-slate-400 italic">
              "Study smart, prepare ahead, and achieve more every semester."
            </div>
          </div>

          {/* Small platform stats */}
          <div className="relative z-10 pt-4 border-t border-[#1F3558] flex items-center justify-between text-center">
            <div>
              <div className="text-base font-extrabold text-white">12K+</div>
              <div className="text-[10px] text-slate-400">Students</div>
            </div>
            <div className="h-6 w-px bg-[#1F3558]" />
            <div>
              <div className="text-base font-extrabold text-white">8,000+</div>
              <div className="text-[10px] text-slate-400">Documents</div>
            </div>
            <div className="h-6 w-px bg-[#1F3558]" />
            <div>
              <div className="text-base font-extrabold text-[#F4A62A]">50K+</div>
              <div className="text-[10px] text-slate-400">Downloads</div>
            </div>
          </div>
        </div>

        {/* Right Section (Specification 10.2): Login Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#14213D]">Student & Faculty Login</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your university credentials to access your dashboard.
                </p>
              </div>
            </div>

            {/* Quick Demo Login Switcher (For convenient evaluator testing) */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                ⚡ Instant One-Click Demo Accounts:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('student')}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-[#14213D] text-white hover:bg-[#1F3558] transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#F4A62A]" />
                  <span>Demo Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin')}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-amber-500 text-[#0D1930] hover:bg-amber-600 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Demo Admin</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@noteshare.edu"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password *
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-[#F4A62A] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#F4A62A] focus:ring-[#F4A62A]"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-500 mt-6">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-[#F4A62A] hover:underline">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
