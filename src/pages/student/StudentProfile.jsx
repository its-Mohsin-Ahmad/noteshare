import React, { useState } from 'react';
import { User, Mail, Building, GraduationCap, Calendar, Save, CheckCircle, Camera } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentProfile = () => {
  const { user, setUser, updateStudent, departments, degreePrograms, semesters, showToast } = useApp();

  const [name, setName] = useState(user?.name || 'Muhammad Bilal');
  const [email, setEmail] = useState(user?.email || 'student@noteshare.edu');
  const [regNo, setRegNo] = useState(user?.regNo || 'FA22-BCS-089');
  const [department, setDepartment] = useState(user?.department || 'Computer Science');
  const [degreeProgram, setDegreeProgram] = useState(user?.degreeProgram || 'BS Computer Science');
  const [semester, setSemester] = useState(user?.semester || 'Semester 4');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop');

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop'
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name,
      email,
      regNo,
      department,
      degreeProgram,
      semester,
      avatar
    };
    setUser(updated);
    if (user?.id) {
      updateStudent(user.id, updated);
    }
    showToast('Your academic profile has been updated.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
          <User className="w-7 h-7 text-[#F4A62A]" />
          <span>My Academic Profile</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Keep your enrolled degree program and current semester up to date for personalized recommendations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm p-6 sm:p-10 space-y-8">
        {/* Avatar Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#14213D] shadow-lg"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="text-lg font-black text-[#14213D]">{name}</div>
            <div className="text-xs text-[#F4A62A] font-semibold">{regNo}</div>
            <div className="text-xs text-slate-500">
              {degreeProgram} • {semester}
            </div>

            {/* Avatar picker */}
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 mr-1">Choose:</span>
              {sampleAvatars.map((av, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatar(av)}
                  className={`rounded-full p-0.5 transition-all ${
                    avatar === av ? 'ring-2 ring-[#F4A62A] scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={av} alt="sample" className="w-7 h-7 rounded-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Registration Number *</label>
              <input
                type="text"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Department *</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Degree Program *</label>
              <select
                value={degreeProgram}
                onChange={(e) => setDegreeProgram(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              >
                {degreePrograms.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Semester *</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              >
                {semesters.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
