import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Calendar,
  FolderOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeaderBanner } from '../../components/common/HeaderBanner';
import { ResourceCard } from '../../components/common/ResourceCard';

export const PastPapers = () => {
  const { resources, subjects, departments, degreePrograms, semesters } = useApp();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'All Papers';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamType, setSelectedExamType] = useState(initialType);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter only past papers
  const allPapers = useMemo(() => {
    return resources.filter(
      (r) => (r.category === 'Past Papers' || r.examType === 'Final Term' || r.examType === 'Midterm') && r.isPublished
    );
  }, [resources]);

  // Exam type category tabs (Matching screenshot 4)
  const examTabs = [
    { label: 'All Papers', value: 'All Papers', count: allPapers.length },
    { label: 'Midterm', value: 'Midterm', count: allPapers.filter((p) => p.examType === 'Midterm').length },
    { label: 'Final Term', value: 'Final Term', count: allPapers.filter((p) => p.examType === 'Final Term').length },
    { label: 'Quiz', value: 'Quiz', count: 12 },
    { label: 'Assignment', value: 'Assignment', count: 10 },
    { label: 'Practical', value: 'Practical', count: 6 }
  ];

  const academicYears = ['Spring 2024', 'Fall 2024', 'Spring 2023', 'Fall 2023', '2022-2023', '2021-2022'];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedExamType('All Papers');
    setSelectedDepartment('');
    setSelectedProgram('');
    setSelectedSubject('');
    setSelectedSemester('');
    setSelectedAcademicYear('');
    setCurrentPage(1);
  };

  const filteredPapers = useMemo(() => {
    return allPapers.filter((paper) => {
      // Exam tab
      if (selectedExamType !== 'All Papers') {
        if (paper.examType !== selectedExamType && paper.category !== selectedExamType) {
          return false;
        }
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = paper.title.toLowerCase().includes(q);
        const matchesSubject = paper.subject.toLowerCase().includes(q);
        const matchesYear = (paper.academicYear || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubject && !matchesYear) return false;
      }

      if (selectedDepartment && paper.department !== selectedDepartment) return false;
      if (selectedProgram && paper.degreeProgram !== selectedProgram) return false;
      if (selectedSubject && paper.subject !== selectedSubject) return false;
      if (selectedSemester && paper.semester !== selectedSemester) return false;
      if (selectedAcademicYear && paper.academicYear !== selectedAcademicYear) return false;

      return true;
    });
  }, [allPapers, selectedExamType, searchQuery, selectedDepartment, selectedProgram, selectedSubject, selectedSemester, selectedAcademicYear]);

  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage) || 1;
  const paginatedPapers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPapers.slice(start, start + itemsPerPage);
  }, [filteredPapers, currentPage]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner (Matching Screenshot 4) */}
      <HeaderBanner
        badge="Past Papers"
        title="Past Papers"
        highlightWord=""
        subtitle="Access previous examination papers and prepare better for your exams."
        breadcrumb={[{ label: 'Past Papers' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Exam Type Tabs (Matching Screenshot 4) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {examTabs.map((tab) => {
            const isSelected = selectedExamType === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => {
                  setSelectedExamType(tab.value);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs ${
                  isSelected
                    ? 'bg-[#14213D] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                  isSelected ? 'bg-[#F4A62A] text-[#0D1930]' : 'bg-slate-100 text-slate-500'
                }`}>
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Layout: Sidebar + Papers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-3xl p-5 border border-[#E7EAF0] shadow-sm space-y-4 sticky top-24">
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
                  placeholder="Search past papers..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            {/* Department */}
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

            {/* Degree Program */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Degree Program</label>
              <select
                value={selectedProgram}
                onChange={(e) => {
                  setSelectedProgram(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="">All Programs</option>
                {degreePrograms.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
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

            {/* Semester */}
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

            {/* Academic Year */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Academic Year</label>
              <select
                value={selectedAcademicYear}
                onChange={(e) => {
                  setSelectedAcademicYear(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="">All Years</option>
                {academicYears.map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>

            {/* Apply Filters */}
            <button
              onClick={() => setCurrentPage(1)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>

          {/* Past Papers Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E7EAF0]">
              <div className="text-xs sm:text-sm text-slate-600">
                Found <span className="font-bold text-[#14213D]">{filteredPapers.length}</span> past examination papers
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

            {filteredPapers.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-[#F4A62A] mx-auto flex items-center justify-center">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#14213D]">No past papers found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing the academic year or examination category filter.
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
                {paginatedPapers.map((paper) => (
                  <ResourceCard key={paper.id} resource={paper} viewMode={viewMode} />
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
