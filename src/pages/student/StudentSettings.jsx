import React, { useState } from 'react';
import { Settings, Lock, Bell, Moon, Sun, Shield, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentSettings = () => {
  const { showToast } = useApp();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Notification preferences
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [examNotifs, setExamNotifs] = useState(true);
  const [submissionUpdates, setSubmissionUpdates] = useState(true);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmNewPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    showToast('Your security password has been changed successfully.', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    showToast('Student preferences saved.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
          <Settings className="w-7 h-7 text-[#F4A62A]" />
          <span>Student Settings & Preferences</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage password security, email alerts, and portal configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Password Security Form */}
        <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-sm font-bold text-[#14213D]">
            <Lock className="w-4 h-4 text-[#F4A62A]" />
            <span>Change Security Password</span>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Password *</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password *</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors shadow-sm"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Notifications & Preferences */}
        <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-sm font-bold text-[#14213D]">
            <Bell className="w-4 h-4 text-[#F4A62A]" />
            <span>Notification & Alert Preferences</span>
          </div>

          <form onSubmit={handleSavePreferences} className="space-y-4 max-w-lg text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-[#14213D]">Examination Alerts</div>
                <div className="text-[11px] text-slate-500">Get notified when new midterm and final date sheets are released.</div>
              </div>
              <input
                type="checkbox"
                checked={examNotifs}
                onChange={(e) => setExamNotifs(e.target.checked)}
                className="w-4 h-4 rounded text-[#F4A62A] focus:ring-[#F4A62A]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-[#14213D]">Submission Updates</div>
                <div className="text-[11px] text-slate-500">Alerts when your uploaded notes are approved or reviewed by admin.</div>
              </div>
              <input
                type="checkbox"
                checked={submissionUpdates}
                onChange={(e) => setSubmissionUpdates(e.target.checked)}
                className="w-4 h-4 rounded text-[#F4A62A] focus:ring-[#F4A62A]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="font-bold text-[#14213D]">Weekly Resource Digest</div>
                <div className="text-[11px] text-slate-500">Weekly email with top downloaded notes for your enrolled semester.</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#F4A62A] focus:ring-[#F4A62A]"
              />
            </label>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors shadow-sm"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
