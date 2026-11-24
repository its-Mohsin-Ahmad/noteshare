import React, { useState } from 'react';
import { UserCheck, Mail, Shield, Save, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminProfile = () => {
  const { user, setUser, showToast } = useApp();

  const [name, setName] = useState(user?.name || 'Dr. Shahzad Tariq');
  const [email, setEmail] = useState(user?.email || 'admin@noteshare.edu');
  const [title, setTitle] = useState(user?.title || 'Head Academic Administrator');
  const [department, setDepartment] = useState(user?.department || 'Academic Affairs');

  const handleSave = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      email,
      title,
      department
    }));
    showToast('Administrator profile updated.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
          <UserCheck className="w-8 h-8 text-[#F4A62A]" />
          <span>Administrator Profile</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your executive administrative credentials and repository permissions.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'}
            alt="Admin"
            className="w-20 h-20 rounded-full object-cover border-4 border-[#0D1930] shadow-lg"
          />
          <div>
            <h2 className="text-xl font-black text-[#14213D]">{name}</h2>
            <div className="text-xs text-[#F4A62A] font-bold mt-0.5">{title}</div>
            <div className="text-xs text-slate-400 mt-0.5">{department}</div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Administrative Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Designation</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Division</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
