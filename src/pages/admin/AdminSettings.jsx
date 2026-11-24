import React, { useState } from 'react';
import { Settings, Save, Shield, Database, Globe, Sliders, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettings = () => {
  const { showToast } = useApp();

  const [platformName, setPlatformName] = useState('NOTEshare');
  const [platformTagline, setPlatformTagline] = useState('Everything You Need to Succeed in Your Studies.');
  const [supportEmail, setSupportEmail] = useState('support@noteshare.edu');
  const [autoApproveUploads, setAutoApproveUploads] = useState(false);
  const [allowPublicDownloads, setAllowPublicDownloads] = useState(true);
  const [maxUploadSizeMB, setMaxUploadSizeMB] = useState(25);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform settings saved successfully.', 'success');
  };

  const handleClearIndexedDB = () => {
    if (window.confirm('Clear all locally cached IndexedDB files and reset browser storage?')) {
      indexedDB.deleteDatabase('NOTEshare_DB');
      localStorage.clear();
      showToast('Browser storage cleared. Reloading...', 'info');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
          <Settings className="w-8 h-8 text-[#F4A62A]" />
          <span>Platform & Website Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure academic platform metadata, upload restrictions, and browser storage states.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm p-6 sm:p-10 space-y-8">
        <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
          {/* General Platform Information */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#14213D] uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#F4A62A]" />
              <span>Platform Branding & Contact</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Support Contact Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Platform Hero Tagline</label>
              <input
                type="text"
                value={platformTagline}
                onChange={(e) => setPlatformTagline(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>
          </div>

          {/* Academic Upload & Storage Rules */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-[#14213D] uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#F4A62A]" />
              <span>Document Submission Policies</span>
            </h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                <div>
                  <div className="font-bold text-[#14213D]">Require Admin Approval for Student Uploads</div>
                  <div className="text-[11px] text-slate-500">When enabled, student notes remain in review until an administrator approves them.</div>
                </div>
                <input
                  type="checkbox"
                  checked={!autoApproveUploads}
                  onChange={(e) => setAutoApproveUploads(!e.target.checked)}
                  className="w-4 h-4 rounded text-[#F4A62A] focus:ring-[#F4A62A]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                <div>
                  <div className="font-bold text-[#14213D]">Allow Guest Browsing and Instant Downloads</div>
                  <div className="text-[11px] text-slate-500">Allows non-registered student visitors to download past papers freely.</div>
                </div>
                <input
                  type="checkbox"
                  checked={allowPublicDownloads}
                  onChange={(e) => setAllowPublicDownloads(e.target.checked)}
                  className="w-4 h-4 rounded text-[#F4A62A] focus:ring-[#F4A62A]"
                />
              </label>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#14213D]">Maximum Upload File Size</div>
                  <div className="text-[11px] text-slate-500">IndexedDB local document limit per resource</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={maxUploadSizeMB}
                    onChange={(e) => setMaxUploadSizeMB(Number(e.target.value))}
                    className="w-16 p-1.5 text-xs text-center font-bold rounded-lg border border-slate-300"
                  />
                  <span className="font-bold text-xs text-slate-600">MB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>

        {/* Data Architecture Reset Zone */}
        <div className="pt-8 border-t border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-rose-700 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span>Frontend Database & Local Storage Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Resetting browser storage clears all local files from IndexedDB and restores the seed academic repository.
          </p>
          <button
            type="button"
            onClick={handleClearIndexedDB}
            className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            Reset All Local Data & Restore Seed State
          </button>
        </div>
      </div>
    </div>
  );
};
