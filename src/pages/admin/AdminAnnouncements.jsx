import React, { useState } from 'react';
import { Megaphone, Plus, Edit, Trash2, Calendar, Pin, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminAnnouncements = () => {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, departments } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnc, setEditingAnc] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Examination');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 10));
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [targetDept, setTargetDept] = useState('All Departments');
  const [pinned, setPinned] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenCreate = () => {
    setEditingAnc(null);
    setTitle('');
    setDescription('');
    setCategory('Examination');
    setPublishDate(new Date().toISOString().slice(0, 10));
    setExpiryDate('2026-12-31');
    setTargetDept('All Departments');
    setPinned(false);
    setIsPublished(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (anc) => {
    setEditingAnc(anc);
    setTitle(anc.title);
    setDescription(anc.description);
    setCategory(anc.category);
    setPublishDate(anc.publishDate);
    setExpiryDate(anc.expiryDate);
    setTargetDept(anc.targetDepartment || 'All Departments');
    setPinned(Boolean(anc.pinned));
    setIsPublished(anc.isPublished !== undefined ? anc.isPublished : true);
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title) return;

    if (editingAnc) {
      updateAnnouncement(editingAnc.id, {
        title,
        description,
        category,
        publishDate,
        expiryDate,
        targetDepartment: targetDept,
        pinned,
        isPublished
      });
    } else {
      addAnnouncement({
        title,
        description,
        category,
        publishDate,
        expiryDate,
        targetDepartment: targetDept,
        pinned,
        isPublished
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <Megaphone className="w-8 h-8 text-[#F4A62A]" />
            <span>Manage Campus Announcements</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Broadcast examination datesheets, library updates, and important administrative notices to students.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((anc) => (
          <div
            key={anc.id}
            className={`bg-white rounded-3xl p-6 border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
              anc.pinned ? 'border-[#F4A62A] ring-2 ring-amber-50' : 'border-[#E7EAF0]'
            }`}
          >
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                {anc.pinned && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <Pin className="w-3 h-3 fill-amber-700 text-amber-700" />
                    PINNED
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                  {anc.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {anc.publishDate}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  anc.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {anc.isPublished ? 'Live' : 'Draft'}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#14213D]">{anc.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">{anc.description}</p>
              <div className="text-[11px] text-slate-400">Target: {anc.targetDepartment || 'All Departments'} • Author: {anc.author || 'Academic Admin'}</div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => handleOpenEdit(anc)}
                className="p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete announcement "${anc.title}"?`)) {
                    deleteAnnouncement(anc.id);
                  }
                }}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#14213D]">
                {editingAnc ? 'Edit Announcement' : 'Post Campus Announcement'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Announcement Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Midterm Examination Datesheet Announced"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Description *</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail instructions for students..."
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    <option value="Examination">Examination</option>
                    <option value="Academic">Academic Notice</option>
                    <option value="Important Notice">Important Notice</option>
                    <option value="General">General News</option>
                    <option value="Platform Update">Platform Update</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Department</label>
                  <select
                    value={targetDept}
                    onChange={(e) => setTargetDept(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    <option value="All Departments">All Departments</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={pinned}
                    onChange={(e) => setPinned(e.target.checked)}
                    className="rounded text-[#F4A62A] focus:ring-[#F4A62A]"
                  />
                  <span>Pin to top of feed</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded text-[#F4A62A] focus:ring-[#F4A62A]"
                  />
                  <span>Publish live immediately</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#14213D] text-white font-bold hover:bg-[#F4A62A] hover:text-[#0D1930]"
                >
                  Save Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
