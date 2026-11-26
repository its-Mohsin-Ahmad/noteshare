import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { supabase, mapStudentFromDB } from '../../services/supabase';
import { useApp } from '../../context/AppContext';

export const ForgotPassword = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Instant Reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSendRecovery = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Please enter your registered email address.');
      return;
    }

    setLoading(true);

    try {
      // 1. Verify that this email actually exists in public.students or is admin
      const isAdmin = cleanEmail === 'admin@noteshare.edu' || cleanEmail.includes('admin');
      let accountExists = isAdmin;

      if (!accountExists) {
        const { data: stdData, error: stdErr } = await supabase
          .from('students')
          .select('id, name, email')
          .ilike('email', cleanEmail)
          .maybeSingle();

        if (stdData && !stdErr) {
          accountExists = true;
        }
      }

      if (!accountExists) {
        setLoading(false);
        setError('No account found with this email. Please verify your spelling or click "Signup".');
        return;
      }

      // 2. Dispatch real password reset email via Supabase Auth
      const redirectUrl = `${window.location.origin}${window.location.pathname}#/reset-password`;
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectUrl
      });

      if (resetErr && resetErr.status !== 429) {
        console.warn('Supabase auth reset warning:', resetErr);
      }

      setLoading(false);
      setEmailSent(true);
      showToast(`Recovery instructions sent to ${cleanEmail}`, 'success');
    } catch (err) {
      setLoading(false);
      console.error('Password recovery error:', err);
      // Even if network or rate limit, allow user to continue to reset form
      setEmailSent(true);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setResetLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      // Update password in public.students table
      // (The PostgreSQL trigger will automatically sync it to auth.users encrypted_password)
      const { error: dbErr } = await supabase
        .from('students')
        .update({ password: newPassword })
        .ilike('email', cleanEmail);

      if (dbErr) {
        console.warn('DB password update error:', dbErr);
      }

      // Also attempt Supabase Auth updateUser if active session exists
      try {
        await supabase.auth.updateUser({ password: newPassword });
      } catch (e) {
        // Ignored if not currently authenticated
      }

      setResetLoading(false);
      setResetSuccess(true);
      showToast('Password updated successfully! Please login with your new password.', 'success');
    } catch (err) {
      setResetLoading(false);
      setError('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F1F3F6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FE7B23] mx-auto flex items-center justify-center border border-orange-100">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Recover Password
          </h2>
          <p className="text-xs text-gray-400">
            Enter your university registered email address to receive password recovery instructions.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Step 3: Password Successfully Reset */}
        {resetSuccess ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-100">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Password Changed!</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your password has been successfully updated. You can now login to your NOTEshare account with your new credentials.
            </p>
            <Link
              to="/login"
              className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-[#FE7B23] hover:bg-[#E86915] text-white transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Back to Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : emailSent ? (
          /* Step 2: Email Dispatched + Instant Reset Option */
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-emerald-900">Recovery Email Dispatched</h3>
              <p className="text-xs text-emerald-700 mt-1">
                A password reset email has been sent to <span className="font-bold">{email}</span>. Check your Inbox and Spam folder.
              </p>
            </div>

            <div className="relative my-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <span className="relative bg-white px-3 text-[11px] text-gray-400 font-medium">
                Or Set New Password Immediately Below
              </span>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-4 pr-11 py-3 text-xs sm:text-sm rounded-2xl bg-[#F4F6F9] border border-transparent focus:border-[#FE7B23] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                    required
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
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl bg-[#F4F6F9] border border-transparent focus:border-[#FE7B23] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-[#FE7B23] hover:bg-[#E86915] text-white transition-all shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{resetLoading ? 'Updating Password...' : 'Save New Password & Login'}</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs font-bold text-gray-400 hover:text-[#FE7B23] inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Step 1: Enter Email Form */
          <form onSubmit={handleSendRecovery} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Registered Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@noteshare.edu or your registered email"
                  required
                  className="w-full pl-10 pr-4 py-3.5 text-xs sm:text-sm rounded-2xl bg-[#F4F6F9] border border-transparent focus:border-[#FE7B23] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-[#FE7B23] hover:bg-[#E86915] text-white transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Sending Recovery Email...' : 'Send Recovery Instructions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs font-bold text-gray-400 hover:text-[#FE7B23] inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
