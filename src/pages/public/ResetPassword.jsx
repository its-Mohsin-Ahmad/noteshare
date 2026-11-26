import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useApp } from '../../context/AppContext';

export const ResetPassword = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    try {
      // 1. Update password using Supabase Auth session from the reset link
      const { data, error: authErr } = await supabase.auth.updateUser({
        password: password
      });

      if (authErr) {
        console.warn('Supabase Auth updateUser error:', authErr);
      }

      // 2. Also update student record in public.students if user email is known
      const userEmail = data?.user?.email;
      if (userEmail) {
        await supabase
          .from('students')
          .update({ password: password })
          .ilike('email', userEmail);
      }

      setLoading(false);
      setSuccess(true);
      showToast('Your password has been successfully updated!', 'success');
    } catch (err) {
      setLoading(false);
      console.error('Password reset error:', err);
      setError('Failed to update password. Your recovery link may have expired.');
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F1F3F6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FE7B23] mx-auto flex items-center justify-center border border-orange-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Reset Password
          </h2>
          <p className="text-xs text-gray-400">
            Create a new strong password for your NOTEshare account.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-100">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Password Reset Completed</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your password has been changed. You can now login with your new credentials.
            </p>
            <Link
              to="/login"
              className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-[#FE7B23] hover:bg-[#E86915] text-white transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Go to Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  className="w-full pl-4 pr-11 py-3.5 text-xs sm:text-sm rounded-2xl bg-[#F4F6F9] border border-transparent focus:border-[#FE7B23] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Confirm New Password *
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                className="w-full px-4 py-3.5 text-xs sm:text-sm rounded-2xl bg-[#F4F6F9] border border-transparent focus:border-[#FE7B23] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-[#FE7B23] hover:bg-[#E86915] text-white transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Updating Password...' : 'Save Password'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs font-bold text-gray-400 hover:text-[#FE7B23] inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
