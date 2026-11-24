import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  Star,
  BookOpen,
  FolderOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeaderBanner } from '../../components/common/HeaderBanner';
import { SubjectCard } from '../../components/common/SubjectCard';

export const Subjects = () => {
  const { subjects, departments, degreePrograms, semesters } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [subjectType, setSubjectType] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('');
    setSelectedProgram('');
    setSelectedSemester('');
    setSubjectType('All');
  };

  const filteredSubjects = useMemo(() => {
    return subjects.filter((sub) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = sub.name.toLowerCase().includes(q);
        const matchesCode = sub.code.toLowerCase().includes(q);
        const matchesDept = (sub.department || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesDept) return false;
      }

      if (selectedDepartment && sub.department !== selectedDepartment) return false;
      if (selectedProgram && sub.degreeProgram !== selectedProgram) return false;
      if (selectedSemester && sub.semester !== selectedSemester) return false;

      if (subjectType !== 'All') {
        if (sub.type !== subjectType) return false;
      }

      return true;
    });
  }, [subjects, searchQuery, selectedDepartment, selectedProgram, selectedSemester, subjectType]);

  const coreCount = subjects.filter((s) => s.type === 'Core').length;
  const electiveCount = subjects.filter((s) => s.type === 'Elective').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner (Screenshot 1) */}
      <HeaderBanner
        badge="Subjects"
        title="Browse by Subjects"
        highlightWord="Subjects"
        subtitle="Find notes, past papers and study materials for your favorite subjects."
        breadcrumb={[{ label: 'Subjects' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Filter Sidebar (Screenshot 1) */}
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

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Degree Program */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Degree Program</label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="">All Programs</option>
                {degreePrograms.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Semester</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="">All Semesters</option>
                {semesters.map((sem) => (
                  <option key={sem.id} value={sem.name}>{sem.name}</option>
                ))}
              </select>
            </div>

            {/* Subject Type Radio Options (Screenshot 1) */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700">Subject Type</label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer text-slate-600 hover:text-[#14213D]">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="subjType"
                      checked={subjectType === 'All'}
                      onChange={() => setSubjectType('All')}
                      className="text-[#F4A62A] focus:ring-[#F4A62A]"
                    />
                    <span>All Subjects</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{subjects.length}</span>
                </label>

                <label className="flex items-center justify-between cursor-pointer text-slate-600 hover:text-[#14213D]">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="subjType"
                      checked={subjectType === 'Core'}
                      onChange={() => setSubjectType('Core')}
                      className="text-[#F4A62A] focus:ring-[#F4A62A]"
                    />
                    <span>Core Subjects</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{coreCount}</span>
                </label>

                <label className="flex items-center justify-between cursor-pointer text-slate-600 hover:text-[#14213D]">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="subjType"
                      checked={subjectType === 'Elective'}
                      onChange={() => setSubjectType('Elective')}
                      className="text-[#F4A62A] focus:ring-[#F4A62A]"
                    />
                    <span>Elective Subjects</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{electiveCount}</span>
                </label>
              </div>
            </div>

            {/* Total Subjects Badge Card (Matching Screenshot 1) */}
            <div className="bg-[#0D1930] text-white rounded-2xl p-4 border border-[#1F3558] relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-xs text-[#F4A62A] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#F4A62A]" />
                <span>Total Subjects</span>
              </div>
              <div className="text-3xl font-black text-white mt-1">
                {subjects.length}
              </div>
              <div className="absolute -bottom-2 -right-2 text-[#1F3558] opacity-60 pointer-events-none">
                <BookOpen className="w-16 h-16" />
              </div>
            </div>
          </div>

          {/* Right Subject Directory */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Search bar with Grid/List switcher */}
            <div className="bg-white rounded-2xl border border-[#E7EAF0] p-3 sm:p-4 flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for subjects or course codes..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#F4A62A] focus:outline-none"
                />
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

            {/* Subject Cards */}
            {filteredSubjects.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-[#F4A62A] mx-auto flex items-center justify-center">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#14213D]">No subjects found</h3>
                <p className="text-xs text-slate-500">
                  Try adjusting the department or semester filter.
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
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'
                    : 'space-y-4'
                }
              >
                {filteredSubjects.map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
