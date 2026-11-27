import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  FileCheck,
  FolderOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeaderBanner } from '../../components/common/HeaderBanner';
import { ResourceCard } from '../../components/common/ResourceCard';

export const ExploreResources = () => {
  const { resources, subjects, departments, semesters } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Params initialized
  const queryParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'All Resources';
  const subjectParam = searchParams.get('subject') || '';
  const departmentParam = searchParams.get('department') || '';
  const semesterParam = searchParams.get('semester') || '';
  const sortParam = searchParams.get('sort') || 'newest';

  // State
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSubject, setSelectedSubject] = useState(subjectParam);
  const [selectedDepartment, setSelectedDepartment] = useState(departmentParam);
  const [selectedSemester, setSelectedSemester] = useState(semesterParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync state if query params change
  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
    if (categoryParam) setSelectedCategory(categoryParam);
    if (subjectParam) setSelectedSubject(subjectParam);
    if (departmentParam) setSelectedDepartment(departmentParam);
    if (semesterParam) setSelectedSemester(semesterParam);
  }, [queryParam, categoryParam, subjectParam, departmentParam, semesterParam]);

  const categoryTabs = [
    { label: 'All Resources', value: 'All Resources' },
    { label: 'Notes', value: 'Notes' },
    { label: 'Past Papers', value: 'Past Papers' },
    { label: 'Assignments', value: 'Assignments' },
    { label: 'Slides', value: 'Slides' },
    { label: 'Others', value: 'Others' }
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Resources');
    setSelectedSubject('');
    setSelectedDepartment('');
    setSelectedSemester('');
    setSelectedSort('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      if (!res.isPublished) return false;

      // Category filter
      if (selectedCategory !== 'All Resources') {
        if (selectedCategory === 'Past Papers') {
          const isPaper = res.category === 'Past Papers' || res.examType === 'Final Term' || res.examType === 'Midterm';
          if (!isPaper) return false;
        } else if (selectedCategory === 'Others') {
          if (['Notes', 'Past Papers', 'Assignments', 'Slides'].includes(res.category)) return false;
        } else if (res.category !== selectedCategory) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesSubject = res.subject.toLowerCase().includes(q);
        const matchesDesc = (res.description || '').toLowerCase().includes(q);
        const matchesDept = (res.department || '').toLowerCase().includes(q);
        const matchesTags = (res.tags || []).some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubject && !matchesDesc && !matchesDept && !matchesTags) {
          return false;
        }
      }

      // Subject Filter
      if (selectedSubject && res.subject !== selectedSubject) {
        return false;
      }

      // Department Filter
      if (selectedDepartment && res.department !== selectedDepartment) {
        return false;
      }

      // Semester Filter
      if (selectedSemester && res.semester !== selectedSemester) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'newest') {
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      }
      if (selectedSort === 'oldest') {
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      }
      if (selectedSort === 'downloads') {
        return (b.downloads || 0) - (a.downloads || 0);
      }
      if (selectedSort === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [resources, selectedCategory, searchQuery, selectedSubject, selectedDepartment, selectedSemester, selectedSort]);

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage) || 1;
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, currentPage]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner (Screenshot 5) */}
      <HeaderBanner
        badge="Academic Archive"
        title="Explore Resources"
        highlightWord="Resources"
        subtitle="Find organized notes, past papers and study materials for your exams."
        breadcrumb={[{ label: 'Explore Resources' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Category Tabs (Matching screenshot 5) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((tab) => {
            const count = resources.filter((r) => {
              if (tab.value === 'All Resources') return r.isPublished;
              if (tab.value === 'Past Papers') return (r.category === 'Past Papers' || r.examType === 'Final Term' || r.examType === 'Midterm') && r.isPublished;
              return r.category === tab.value && r.isPublished;
            }).length;

            const isSelected = selectedCategory === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => {
                  setSelectedCategory(tab.value);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs ${
                  isSelected
                    ? 'bg-[#F4A62A] text-[#0D1930] shadow-md shadow-[#F4A62A]/20'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                  isSelected ? 'bg-[#0D1930] text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Section: Sidebar Filters + Resource Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Filter Sidebar */}
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

            {/* Search Input */}
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
                  placeholder="Search resources..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
                />
              </div>
            </div>

            {/* Resource Type Radio */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700">Resource Type</label>
              <div className="space-y-1.5 text-xs">
                {['All Resources', 'Notes', 'Past Papers'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-[#14213D]">
                    <input
                      type="radio"
                      name="resourceType"
                      checked={selectedCategory === type}
                      onChange={() => {
                        setSelectedCategory(type);
                        setCurrentPage(1);
                      }}
                      className="text-[#F4A62A] focus:ring-[#F4A62A]"
                    />
                    <span>{type === 'All Resources' ? 'All Types' : type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subject Select */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
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
                  <option key={s.id} value={s.name}>{s.name} ({s.code})</option>
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

            {/* Sort By Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Sort By</label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="downloads">Most Downloaded</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={() => setCurrentPage(1)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>

          {/* Right Resource Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header info & view toggle */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E7EAF0]">
              <div className="text-xs sm:text-sm text-slate-600">
                Showing <span className="font-bold text-[#14213D]">{paginatedResources.length}</span> of{' '}
                <span className="font-bold text-[#14213D]">{filteredResources.length}</span> materials
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl border transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#14213D] text-white border-[#14213D]'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                  title="Grid View"
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
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Empty state */}
            {filteredResources.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-[#F4A62A] mx-auto flex items-center justify-center">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#14213D]">No resources found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't find any documents matching your active filters. Try searching with different terms or resetting filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-[#14213D] text-white text-xs font-bold hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Resource Cards (Grid / List) */
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-4'
                }
              >
                {paginatedResources.map((res) => (
                  <ResourceCard key={res.id} resource={res} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
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
