import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FolderOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeaderBanner } from '../../components/common/HeaderBanner';
import { ResourceCard } from '../../components/common/ResourceCard';

export const Notes = () => {
  const { resources, subjects, departments, semesters } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter only notes
  const allNotes = useMemo(() => {
    return resources.filter((r) => r.category === 'Notes' && r.isPublished);
  }, [resources]);

  // Quick subject pills for top bar (Matching screenshot 2)
  const quickSubjects = [
    { name: 'All Notes', count: allNotes.length },
    { name: 'Computer Science', count: allNotes.filter((n) => n.subject === 'Computer Science').length },
    { name: 'Mathematics', count: allNotes.filter((n) => n.subject === 'Mathematics').length },
    { name: 'Physics', count: allNotes.filter((n) => n.subject === 'Physics').length },
    { name: 'Software Engineering', count: allNotes.filter((n) => n.subject === 'Software Engineering').length }
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setSelectedDepartment('');
    setSelectedSemester('');
    setSelectedFileType('ALL');
    setCurrentPage(1);
  };

  const filteredNotes = useMemo(() => {
    return allNotes.filter((note) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = note.title.toLowerCase().includes(q);
        const matchesSubject = note.subject.toLowerCase().includes(q);
        const matchesDesc = (note.description || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubject && !matchesDesc) return false;
      }

      if (selectedSubject && note.subject !== selectedSubject) {
        return false;
      }

      if (selectedDepartment && note.department !== selectedDepartment) {
        return false;
      }

      if (selectedSemester && note.semester !== selectedSemester) {
        return false;
      }

      if (selectedFileType !== 'ALL' && note.fileType !== selectedFileType) {
        return false;
      }

      return true;
    });
  }, [allNotes, searchQuery, selectedSubject, selectedDepartment, selectedSemester, selectedFileType]);

  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage) || 1;
  const paginatedNotes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNotes.slice(start, start + itemsPerPage);
  }, [filteredNotes, currentPage]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner (Matching Screenshot 2) */}
      <HeaderBanner
        badge="University Notes"
        title="Notes"
        highlightWord=""
        subtitle="Access organized and high-quality lecture notes for all subjects."
        breadcrumb={[{ label: 'Notes' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Quick Subject Category Pills (Screenshot 2) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {quickSubjects.map((item) => {
            const isSelected =
              item.name === 'All Notes'
                ? selectedSubject === ''
                : selectedSubject === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setSelectedSubject(item.name === 'All Notes' ? '' : item.name);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs ${
                  isSelected
                    ? 'bg-[#14213D] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{item.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                  isSelected ? 'bg-[#F4A62A] text-[#0D1930]' : 'bg-slate-100 text-slate-500'
                }`}>
                  ({item.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Layout: Left Filter Sidebar + Right Notes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-5 border border-[#E7EAF0] shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm font-bold text-[#14213D]">
                <Filter className="w-4 h-4 text-[#F4A62A]" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-[#F4A62A] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>

            {/* Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search notes..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            {/* Subject Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Department Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Semester Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Semester</label>
              <select
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="">All Semesters</option>
                {semesters.map((sem) => (
                  <option key={sem.id} value={sem.name}>{sem.name}</option>
                ))}
              </select>
            </div>

            {/* File Type Checkboxes (Screenshot 2) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700">File Type</label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer text-slate-600 hover:text-[#14213D]">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fileType"
                      checked={selectedFileType === 'ALL'}
                      onChange={() => setSelectedFileType('ALL')}
                      className="text-[#F4A62A] focus:ring-[#F4A62A]"
                    />
                    <span>All Formats</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{allNotes.length}</span>
                </label>

                <label className="flex items-center justify-between cursor-pointer text-slate-600 hover:text-[#14213D]">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fileType"
                      checked={selectedFileType === 'PDF'}
                      onChange={() => setSelectedFileType('PDF')}
                      className="text-[#F4A62A] focus:ring-[#F4A62A]"
                    />
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 bg-red-600 text-white font-black text-[8px] rounded flex items-center justify-center">P</span>
                      PDF Document
                    </span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">124</span>
                </label>

                <label className="flex items-center justify-between cursor-pointer text-slate-600 hover:text-[#14213D]">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fileType"
                      checked={selectedFileType === 'DOC'}
                      onChange={() => setSelectedFileType('DOC')}
                      className="text-[#F4A62A] focus:ring-[#F4A62A]"
                    />
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 bg-blue-600 text-white font-black text-[8px] rounded flex items-center justify-center">W</span>
                      Word Document
                    </span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">32</span>
                </label>

                <label className="flex items-center justify-between cursor-pointer text-slate-600 hover:text-[#14213D]">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fileType"
                      checked={selectedFileType === 'PPT'}
                      onChange={() => setSelectedFileType('PPT')}
                      className="text-[#F4A62A] focus:ring-[#F4A62A]"
                    />
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 bg-orange-600 text-white font-black text-[8px] rounded flex items-center justify-center">P</span>
                      Presentation Slides
                    </span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">18</span>
                </label>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setCurrentPage(1)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>

          {/* Notes Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E7EAF0]">
              <div className="text-xs sm:text-sm text-slate-600">
                Found <span className="font-bold text-[#14213D]">{filteredNotes.length}</span> verified lecture notes
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl border transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#14213D] text-white border-[#14213D]'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl border transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#14213D] text-white border-[#14213D]'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-[#F4A62A] mx-auto flex items-center justify-center">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#14213D]">No lecture notes found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search criteria or explore all subjects.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-[#14213D] text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-4'
                }
              >
                {paginatedNotes.map((note) => (
                  <ResourceCard key={note.id} resource={note} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#14213D] text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
