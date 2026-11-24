import React, { useState } from 'react';
import { Download, Search, Calendar, HardDrive, FileText, ArrowRight, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentDownloads = () => {
  const { downloads, resources, recordDownload, setPreviewResource } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredDownloads = downloads.filter((dl) => {
    if (categoryFilter !== 'ALL' && dl.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return dl.title.toLowerCase().includes(q) || dl.subject.toLowerCase().includes(q);
    }
    return true;
  });

  const handleDownloadAgain = (dl) => {
    const matched = resources.find((r) => r.id === dl.resourceId) || dl;
    recordDownload(matched);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D]">
            My Download History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access and re-download all documents you previously saved on this computer.
          </p>
        </div>
        <div className="text-xs font-bold text-[#14213D] bg-white px-3.5 py-2 rounded-xl border border-slate-200">
          Total Downloads: {downloads.length}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7EAF0] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search downloads..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'Notes', 'Past Papers', 'Assignments'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#14213D] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Downloads Table / Cards */}
      {filteredDownloads.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <Download className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#14213D]">No downloads recorded</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't downloaded any notes or past papers yet. Browse the resource library to start saving files.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7EAF0] overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {filteredDownloads.map((dl) => (
              <div
                key={dl.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F4A62A] border border-amber-200 flex items-center justify-center font-black text-xs flex-shrink-0">
                    {dl.fileType || 'PDF'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#14213D] truncate">{dl.title}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-blue-600 font-semibold">{dl.subject}</span>
                      <span>•</span>
                      <span>{dl.category}</span>
                      <span>•</span>
                      <span>{new Date(dl.downloadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      const matched = resources.find((r) => r.id === dl.resourceId);
                      if (matched) setPreviewResource(matched);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadAgain(dl)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Again</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
