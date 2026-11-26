import React, { useState, useRef } from 'react';
import { UserCheck, Mail, Shield, Save, CheckCircle, Camera, Upload, Trash2, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { uploadFileToStorage } from '../../services/supabase';

export const AdminProfile = () => {
  const { user, setUser, showToast } = useApp();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || 'Dr. Shahzad Tariq');
  const [email, setEmail] = useState(user?.email || 'admin@noteshare.edu');
  const [title, setTitle] = useState(user?.title || 'Head Academic Administrator');
  const [department, setDepartment] = useState(user?.department || 'Academic Affairs');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop');

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
    const initialAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D1930&color=F4A62A&bold=true`;
    setAvatar(initialAvatar);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    let finalAvatarUrl = avatar;

    if (newPhotoFile) {
      try {
        const uploadedUrl = await uploadFileToStorage(newPhotoFile, 'avatars');
        if (uploadedUrl) {
          finalAvatarUrl = uploadedUrl;
          setAvatar(uploadedUrl);
        }
      } catch (err) {
        console.warn('Error uploading admin picture:', err);
      }
    }

    const updatedAdmin = {
      ...user,
      name,
      email,
      title,
      department,
      avatar: finalAvatarUrl
    };

    setUser(updatedAdmin);
    setSaving(false);
    showToast('Administrator profile and photo updated successfully.', 'success');
  };

  const currentDisplayPhoto = photoPreview || avatar;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
          <UserCheck className="w-8 h-8 text-[#F4A62A]" />
          <span>Administrator Profile</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your executive administrative credentials and repository profile photo.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm p-6 sm:p-10 space-y-8">
        {/* Admin Header with Photo Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#0D1930] shadow-xl bg-slate-100 flex items-center justify-center">
              <img
                src={currentDisplayPhoto}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 rounded-full bg-[#14213D] text-[#F4A62A] hover:bg-[#F4A62A] hover:text-[#0D1930] shadow-md transition-all cursor-pointer"
              title="Upload new photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h2 className="text-xl font-black text-[#14213D]">{name}</h2>
            <div className="text-xs text-[#F4A62A] font-bold">{title}</div>
            <div className="text-xs text-slate-400">{department}</div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handlePhotoSelect}
              className="hidden"
            />

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Change Photo</span>
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
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md cursor-pointer disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
