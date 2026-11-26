import React, { useState, useRef } from 'react';
import { User, Mail, Building, GraduationCap, Calendar, Save, CheckCircle, Camera, Upload, Trash2, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { uploadFileToStorage } from '../../services/supabase';

export const StudentProfile = () => {
  const { user, setUser, updateStudent, departments, degreePrograms, semesters, showToast } = useApp();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || 'Muhammad Bilal');
  const [email, setEmail] = useState(user?.email || 'student@noteshare.edu');
  const [regNo, setRegNo] = useState(user?.regNo || 'FA22-BCS-089');
  const [department, setDepartment] = useState(user?.department || 'Computer Science');
  const [degreeProgram, setDegreeProgram] = useState(user?.degreeProgram || 'BS Computer Science');
  const [semester, setSemester] = useState(user?.semester || 'Semester 4');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop');

  const [newPhotoFile, setNewPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image file size must be less than 5MB.', 'error');
      return;
    }

    setNewPhotoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };

  const handleRemovePhoto = () => {
    setNewPhotoFile(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    const initialAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=14213D&color=F4A62A&bold=true`;
    setAvatar(initialAvatar);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    let finalAvatarUrl = avatar;

    // Upload custom photo to Supabase Storage if student selected a new image
    if (newPhotoFile) {
      try {
        const uploadedUrl = await uploadFileToStorage(newPhotoFile, 'avatars');
        if (uploadedUrl) {
          finalAvatarUrl = uploadedUrl;
          setAvatar(uploadedUrl);
        }
      } catch (err) {
        console.warn('Error uploading profile picture:', err);
      }
    }

    const updated = {
      ...user,
      name,
      email,
      regNo,
      department,
      degreeProgram,
      semester,
      avatar: finalAvatarUrl
    };

    setUser(updated);
    if (user?.id) {
      await updateStudent(user.id, updated);
    }

    setSaving(false);
    showToast('Your academic profile and photo have been updated successfully!', 'success');
  };

  const currentDisplayPhoto = photoPreview || avatar;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
          <User className="w-7 h-7 text-[#F4A62A]" />
          <span>My Academic Profile</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update your student portrait, enrolled degree program, and semester.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm p-6 sm:p-10 space-y-8">
        {/* Avatar Header & Photo Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#14213D] shadow-xl bg-slate-100 flex items-center justify-center">
              <img
                src={currentDisplayPhoto}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 p-2.5 rounded-full bg-[#14213D] text-[#F4A62A] hover:bg-[#F4A62A] hover:text-[#0D1930] shadow-md transition-all cursor-pointer"
              title="Upload new picture"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="text-xl font-black text-[#14213D]">{name}</div>
            <div className="text-xs text-[#F4A62A] font-bold">{regNo}</div>
            <div className="text-xs text-slate-500">
              {degreeProgram} • {semester}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handlePhotoSelect}
              className="hidden"
            />

            {/* Photo Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Picture</span>
              </button>

              {newPhotoFile && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
            {newPhotoFile && (
              <p className="text-[11px] text-emerald-600 font-semibold pt-1">
                ✓ Ready to save: {newPhotoFile.name} ({(newPhotoFile.size / 1024).toFixed(0)} KB)
              </p>
            )}
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
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md cursor-pointer disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
