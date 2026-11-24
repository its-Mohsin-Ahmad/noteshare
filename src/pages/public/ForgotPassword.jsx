import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, KeyRound } from 'lucide-react';
import { Logo } from '../../components/common/Logo';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-[#E7EAF0] p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo size="normal" variant="dark" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F4A62A] mx-auto flex items-center justify-center border border-amber-200">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#14213D]">
            Recover Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter your university registered email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#14213D]">Instructions Sent</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We have sent password recovery instructions to <span className="font-bold text-[#14213D]">{email}</span>. Please check your student inbox or junk folder.
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-left">
              <span className="font-bold">Demo Notice:</span> In this frontend implementation, you can always sign in directly using the 1-Click Demo Accounts on the login page!
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@noteshare.edu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Send Recovery Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs font-bold text-slate-500 hover:text-[#14213D] inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
