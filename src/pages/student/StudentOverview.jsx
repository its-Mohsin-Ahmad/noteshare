import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  FileCheck,
  Download,
  Heart,
  Clock,
  Sparkles,
  ArrowRight,
  Calendar,
  AlertCircle,
  Megaphone,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResourceCard } from '../../components/common/ResourceCard';

export const StudentOverview = () => {
  const {
    user,
    resources,
    downloads,
    favorites,
    recentlyViewed,
    announcements,
    setPreviewResource,
    recordDownload
  } = useApp();

  const studentName = user?.name || 'Muhammad Bilal';
  const studentDept = user?.department || 'Computer Science';
  const studentSem = user?.semester || 'Semester 4';

  // Dynamic statistics
  const totalNotes = resources.filter((r) => r.category === 'Notes' && r.isPublished).length;
  const totalPapers = resources.filter((r) => (r.category === 'Past Papers' || r.examType === 'Final Term' || r.examType === 'Midterm') && r.isPublished).length;
  const totalDownloads = downloads.length;
  const totalFavorites = favorites.length;

  // Recently Viewed Resources
  const viewedResources = resources
    .filter((r) => recentlyViewed.includes(r.id) && r.isPublished)
    .slice(0, 3);

  // Recommended Study Resources (Matching student's department or semester)
  const recommendedResources = resources
    .filter((r) => (r.department === studentDept || r.semester === studentSem) && r.isPublished)
    .slice(0, 3);

  // Latest past papers
  const latestPapers = resources
    .filter((r) => (r.category === 'Past Papers' || r.examType === 'Final Term' || r.examType === 'Midterm') && r.isPublished)
    .slice(0, 3);

  // Active announcements
  const activeAnnouncements = announcements
    .filter((a) => a.isPublished)
    .slice(0, 2);

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner (Specification 13) */}
      <div className="bg-gradient-to-r from-[#0D1930] via-[#14213D] to-[#1F3558] rounded-3xl p-6 sm:p-8 text-white border border-[#1F3558] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F3558] text-[#F4A62A] text-xs font-bold border border-[#F4A62A]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Session 2024–2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            Welcome back, {studentName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Continue exploring your academic resources and prepare for your next examination in {studentDept} ({studentSem}).
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/student/explore"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-all shadow-md hover:scale-105"
          >
            <span>Explore All Materials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/student/uploads"
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs bg-[#14213D] hover:bg-[#1F3558] text-white border border-slate-700 transition-all"
          >
            <span>Submit Resource</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Statistics Cards (Specification 13) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-[#E7EAF0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Available Notes</div>
            <div className="text-2xl font-black text-[#14213D] mt-1">{totalNotes}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Verified syllabus</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#14213D] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7EAF0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Past Papers</div>
            <div className="text-2xl font-black text-[#14213D] mt-1">{totalPapers}</div>
            <div className="text-[11px] text-[#F4A62A] font-semibold mt-0.5">Midterm & Finals</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F4A62A] flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7EAF0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">My Downloads</div>
            <div className="text-2xl font-black text-[#14213D] mt-1">{totalDownloads}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Stored in history</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Download className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7EAF0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Saved Resources</div>
            <div className="text-2xl font-black text-[#14213D] mt-1">{totalFavorites}</div>
            <div className="text-[11px] text-rose-500 font-semibold mt-0.5">Quick bookmarks</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Announcements Alert Banner */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2.5">
            <Megaphone className="w-5 h-5 text-[#F4A62A] flex-shrink-0" />
            <div>
              <span className="font-bold">{activeAnnouncements[0].title}</span>
              <p className="text-amber-800 text-[11px] mt-0.5 line-clamp-1">{activeAnnouncements[0].description}</p>
            </div>
          </div>
          <Link
            to="/student/announcements"
            className="font-bold text-[#0D1930] hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span>Read Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Recommended Study Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#14213D] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F4A62A]" />
              <span>Recommended for {studentDept}</span>
            </h2>
            <p className="text-xs text-slate-500">Based on your program and current semester enrollment.</p>
          </div>
          <Link to="/student/explore" className="text-xs font-bold text-[#F4A62A] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedResources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </div>

      {/* Side-by-Side: Recently Viewed & Latest Past Papers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recently Viewed */}
        <div className="bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-[#14213D] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F4A62A]" />
              <span>Recently Viewed Materials</span>
            </h3>
            <Link to="/student/downloads" className="text-xs font-semibold text-[#F4A62A] hover:underline">
              Downloads History
            </Link>
          </div>

          <div className="space-y-3">
            {viewedResources.map((res) => (
              <div
                key={res.id}
                onClick={() => setPreviewResource(res)}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#F4A62A] transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#14213D] group-hover:text-[#F4A62A] transition-colors truncate">
                    {res.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {res.subject} • {res.fileSize}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      recordDownload(res);
                    }}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors"
                    title="Download file"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Examination & Latest Papers */}
        <div className="bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-[#14213D] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F4A62A]" />
              <span>Upcoming Exam Schedule</span>
            </h3>
            <Link to="/past-papers" className="text-xs font-semibold text-[#F4A62A] hover:underline">
              Exam Archives
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#14213D]">Midterm Examinations</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#14213D] text-[#F4A62A]">DEC 2026</span>
            </div>
            <p className="text-xs text-slate-600">
              Official university date sheet has been uploaded. Prepare with previous solved midterms in Mathematics and Data Structures.
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="text-xs font-bold text-slate-700">Recommended Exam Practice:</div>
            {latestPapers.map((paper) => (
              <div
                key={paper.id}
                onClick={() => setPreviewResource(paper)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#F4A62A] flex items-center justify-between text-xs cursor-pointer group"
              >
                <span className="font-semibold text-[#14213D] group-hover:text-[#F4A62A] truncate">
                  {paper.title}
                </span>
                <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">{paper.academicYear}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
