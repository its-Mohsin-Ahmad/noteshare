import React, { useState } from 'react';
import { Megaphone, Calendar, Pin, Search, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAnnouncements = () => {
  const { announcements } = useApp();
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const published = announcements.filter((a) => a.isPublished);

  const filtered = published.filter((a) => {
    if (filterCategory !== 'ALL' && a.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-[#F4A62A]" />
            <span>Official University Announcements</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Exam schedules, datesheets, repository updates, and academic notifications from the university board.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7EAF0] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Examination', 'Academic', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-[#14213D] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((anc) => (
          <div
            key={anc.id}
            className={`bg-white rounded-3xl p-6 border transition-all shadow-sm space-y-3 ${
              anc.pinned ? 'border-[#F4A62A] ring-2 ring-amber-50' : 'border-[#E7EAF0]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {anc.pinned && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <Pin className="w-3 h-3 fill-amber-700 text-amber-700" />
                    PINNED NOTICE
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                  {anc.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {anc.publishDate}
                </span>
              </div>

              <div className="text-[11px] font-semibold text-slate-500">
                Issued By: {anc.author || 'Academic Council'}
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              {anc.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {anc.description}
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
              <span>Target: {anc.targetDepartment || 'All Departments'}</span>
              <span>Valid Until: {anc.expiryDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
