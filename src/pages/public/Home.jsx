import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  BookOpen,
  FileText,
  FileCheck,
  TrendingUp,
  Download,
  Users,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResourceCard } from '../../components/common/ResourceCard';
import { SubjectCard } from '../../components/common/SubjectCard';

export const Home = () => {
  const { resources, subjects, departments, semesters, recordDownload, setPreviewResource } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    const catParam = activeCategory !== 'All' ? `&category=${encodeURIComponent(activeCategory)}` : '';
    navigate(`/explore?search=${encodeURIComponent(searchQuery)}${catParam}`);
  };

  // Recent notes (first 4 published notes)
  const recentNotes = resources
    .filter((r) => r.category === 'Notes' && r.isPublished)
    .slice(0, 4);

  // Latest past papers (first 4 published papers)
  const latestPapers = resources
    .filter((r) => (r.category === 'Past Papers' || r.examType === 'Final Term' || r.examType === 'Midterm') && r.isPublished)
    .slice(0, 4);

  // Most downloaded resources
  const popularResources = [...resources]
    .filter((r) => r.isPublished)
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 3);

  // Popular subjects
  const popularSubjects = subjects.slice(0, 6);

  const searchCategories = ['All', 'Notes', 'Past Papers', 'Subjects', 'Departments'];

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION (Matching Screenshot 3) */}
      <section className="relative bg-[#0D1930] text-white overflow-hidden pt-12 pb-24 md:pb-28 border-b border-[#1F3558]">
        {/* Academic campus background with subtle transparency */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1930] via-[#0D1930]/95 to-[#14213D]/90" />

        {/* Decorative blur lights */}
        <div className="absolute top-10 right-1/3 w-80 h-80 bg-[#F4A62A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#1F3558]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F3558]/80 border border-[#F4A62A]/40 text-xs font-semibold text-[#F4A62A] shadow-inner">
                <BookOpen className="w-3.5 h-3.5 text-[#F4A62A]" />
                <span>A Notes and Past Papers Sharing Portal</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Everything You Need to{' '}
                <span className="text-[#F4A62A] relative inline-block">
                  Succeed
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#F4A62A]/60"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>{' '}
                in Your Studies.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
                Explore organized university notes, past examination papers, lecture materials, and academic resources in one place.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/explore"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] shadow-lg shadow-[#F4A62A]/20 transition-all hover:scale-[1.02]"
                >
                  <Search className="w-4 h-4" />
                  <span>Explore Resources</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#14213D] hover:bg-[#1F3558] border border-slate-700 hover:border-[#F4A62A] transition-all"
                >
                  <GraduationCap className="w-4 h-4 text-[#F4A62A]" />
                  <span>Create Free Account</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#F4A62A]" />
                  Verified Past Papers
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#F4A62A]" />
                  Faculty Handouts
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#F4A62A]" />
                  100% Free for Students
                </span>
              </div>
            </div>

            {/* Right Visual Image (Matching screenshot with student & graduation doodles) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Handwritten decorative text */}
                <div className="absolute -top-6 -right-2 md:right-4 z-20 flex flex-col items-end">
                  <span className="text-[#F4A62A] font-script text-2xl md:text-3xl font-bold rotate-[4deg] drop-shadow">
                    Study Smart
                  </span>
                  <span className="text-white font-script text-xl md:text-2xl font-bold rotate-[4deg] -mt-1 drop-shadow">
                    Achieve More
                  </span>
                </div>

                {/* Graduation cap icon doodle */}
                <div className="absolute top-8 left-0 z-20 bg-[#14213D]/90 p-3 rounded-2xl border border-[#F4A62A]/50 shadow-xl backdrop-blur-sm -rotate-6">
                  <GraduationCap className="w-8 h-8 text-[#F4A62A]" />
                </div>

                {/* Main Hero Student Image */}
                <div className="relative w-72 sm:w-80 md:w-96 h-[380px] sm:h-[430px] rounded-3xl overflow-hidden border-4 border-[#1F3558] shadow-2xl bg-[#14213D]">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
                    alt="University Student"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1930] via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating Resource Stats pill */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 z-20 bg-white text-[#14213D] p-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F4A62A]">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500">Total Downloads</div>
                    <div className="text-base font-extrabold text-[#14213D]">50,000+ Files</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING GLOBAL SEARCH COMPONENT (Matching Screenshot 3) */}
      <section className="-mt-16 sm:-mt-20 relative z-30 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 sm:p-6">
          <form onSubmit={handleGlobalSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for notes, past papers, subjects or study materials..."
                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#F4A62A] focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Categories Pills underneath Search */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 mr-1">Categories:</span>
            {searchCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#F4A62A] text-[#0D1930] shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY SEMESTER & POPULAR SUBJECTS (Screenshot 3 Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Browse by Semester */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#14213D] flex items-center gap-2">
                <span className="w-2 h-5 bg-[#F4A62A] rounded-full inline-block" />
                Browse by Semester
              </h2>
              <Link to="/explore" className="text-xs font-semibold text-[#F4A62A] hover:underline flex items-center gap-1">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {semesters.slice(0, 6).map((sem) => (
                <Link
                  key={sem.id}
                  to={`/explore?semester=${encodeURIComponent(sem.name)}`}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#F4A62A] hover:bg-amber-50/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-[#F4A62A]" />
                    <span className="text-xs font-bold text-[#14213D]">{sem.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Subjects */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#14213D] flex items-center gap-2">
                <span className="w-2 h-5 bg-[#F4A62A] rounded-full inline-block" />
                Popular Subjects
              </h2>
              <Link to="/subjects" className="text-xs font-semibold text-[#F4A62A] hover:underline flex items-center gap-1">
                <span>All Subjects</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {popularSubjects.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/explore?subject=${encodeURIComponent(sub.name)}`}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#F4A62A] hover:bg-amber-50/40 transition-all flex items-center justify-between group truncate"
                >
                  <span className="text-xs font-bold text-[#14213D] truncate group-hover:text-[#F4A62A]">
                    {sub.name}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 flex-shrink-0 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECENTLY UPLOADED NOTES & LATEST PAST PAPERS (Side by side matching Screenshot 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Recently Uploaded Notes (col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#14213D]" />
                <h2 className="text-lg font-bold text-[#14213D]">Recently Uploaded Notes</h2>
              </div>
              <Link to="/notes" className="text-xs font-semibold text-[#F4A62A] hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#F4A62A] transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  onClick={() => setPreviewResource(note)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-black text-xs flex-shrink-0">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#14213D] truncate group-hover:text-[#F4A62A] transition-colors">
                        {note.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {note.subject} • {note.semester}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold text-slate-700 flex items-center gap-1 justify-end">
                      <Download className="w-3 h-3 text-[#F4A62A]" />
                      {(note.downloads / 1000).toFixed(1)}k
                    </div>
                    <div className="text-[10px] text-slate-400">{note.uploadRelative}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Past Papers (col-span-4) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#F4A62A]" />
                <h2 className="text-lg font-bold text-[#14213D]">Latest Past Papers</h2>
              </div>
              <Link to="/past-papers" className="text-xs font-semibold text-[#F4A62A] hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {latestPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#F4A62A] transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  onClick={() => setPreviewResource(paper)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-black text-xs flex-shrink-0">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#14213D] truncate group-hover:text-[#F4A62A] transition-colors">
                        {paper.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {paper.subject} • {paper.academicYear}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold text-slate-700 flex items-center gap-1 justify-end">
                      <Download className="w-3 h-3 text-[#F4A62A]" />
                      {(paper.downloads / 1000).toFixed(1)}k
                    </div>
                    <div className="text-[10px] text-slate-400">{paper.uploadRelative}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Statistics Card (col-span-3 - Matching Dark Navy Card in Screenshot 3) */}
          <div className="lg:col-span-3 bg-[#0D1930] rounded-3xl p-6 text-white border border-[#1F3558] shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[320px]">
            {/* Watermark graduation cap */}
            <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
              <GraduationCap className="w-48 h-48 text-white" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#14213D] text-[#F4A62A] border border-[#1F3558]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">12K+</div>
                  <div className="text-xs text-slate-300">Registered Students</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#14213D] text-[#F4A62A] border border-[#1F3558]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">8K+</div>
                  <div className="text-xs text-slate-300">Notes & Papers</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#14213D] text-[#F4A62A] border border-[#1F3558]">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">50K+</div>
                  <div className="text-xs text-slate-300">Total Downloads</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#1F3558] mt-6">
              <Link
                to="/register"
                className="block text-center w-full py-2.5 rounded-xl bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] font-bold text-xs transition-colors"
              >
                Join Platform Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MOST DOWNLOADED MATERIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-tight">
              Most Downloaded Resources
            </h2>
            <p className="text-xs sm:text-sm text-[#788397] mt-1">
              Top rated examination papers and lecture notes downloaded by high-performing students.
            </p>
          </div>
          <Link
            to="/explore?sort=downloads"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#14213D] hover:text-[#F4A62A] transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularResources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </section>

      {/* HOW NOTESHARE WORKS */}
      <section className="bg-slate-100 py-16 border-y border-[#E7EAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#F4A62A] uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl font-extrabold text-[#14213D] tracking-tight mt-1">
              How NOTEshare Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Three simple steps to access any past paper or lecture material for your university program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative group hover:border-[#F4A62A] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F4A62A] border border-amber-200 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-base font-bold text-[#14213D] mb-2">Find Your Subject</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by department, degree program, or semester to find lecture notes, syllabus materials, and course handouts.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative group hover:border-[#F4A62A] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-base font-bold text-[#14213D] mb-2">Preview & Verify</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect document details, contents, examination year, and peer ratings inside our browser PDF previewer before downloading.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative group hover:border-[#F4A62A] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-base font-bold text-[#14213D] mb-2">Download & Succeed</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Save directly to your computer or your personalized NOTEshare student favorites to study offline anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#F4A62A] uppercase tracking-wider">Student Feedback</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-tight mt-1">
            Loved by University Students
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "Finding previous final term papers for Data Structures used to take days of asking seniors. On NOTEshare I found 5 verified years of papers in 30 seconds."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                alt="Student"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-[#14213D]">Ahmad Raza</div>
                <div className="text-[10px] text-slate-500">BS Computer Science (Semester 4)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "The lecture notes are so clean and well categorized. I downloaded Calculus handouts before my midterms and improved my GPA significantly!"
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="Student"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-[#14213D]">Sara Khan</div>
                <div className="text-[10px] text-slate-500">BS Software Engineering (Semester 2)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              "As a student representative, submitting our class notes to NOTEshare has helped hundreds of classmates keep up with difficult courses."
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="Student"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-[#14213D]">Ali Ahmed</div>
                <div className="text-[10px] text-slate-500">BS Information Technology (Semester 5)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0D1930] to-[#14213D] rounded-3xl p-8 sm:p-12 text-white border border-[#1F3558] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F3558] text-[#F4A62A] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Your University Academic Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Ace Your Next Examination?
            </h2>
            <p className="text-sm text-slate-300">
              Create your student profile today to save favorite papers, track your downloads, and receive instant exam datesheet notifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              to="/register"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] shadow-lg shadow-[#F4A62A]/20 transition-all hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              to="/explore"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#14213D] hover:bg-[#1F3558] text-white border border-slate-700 transition-all"
            >
              Browse Materials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
