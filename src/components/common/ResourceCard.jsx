import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Download,
  Eye,
  Heart,
  Calendar,
  User,
  HardDrive,
  Code,
  Calculator,
  Atom,
  Laptop,
  Database,
  Cpu,
  Share2,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Helper to choose appropriate subject icon
const getSubjectIcon = (subject = '', iconName = '') => {
  const s = subject.toLowerCase();
  if (iconName === 'Calculator' || s.includes('math') || s.includes('calculus')) {
    return <Calculator className="w-8 h-8 text-white/90" />;
  }
  if (iconName === 'Atom' || s.includes('phy')) {
    return <Atom className="w-8 h-8 text-white/90" />;
  }
  if (iconName === 'Laptop' || s.includes('software')) {
    return <Laptop className="w-8 h-8 text-white/90" />;
  }
  if (iconName === 'Database' || s.includes('data') || s.includes('db')) {
    return <Database className="w-8 h-8 text-white/90" />;
  }
  if (iconName === 'Cpu' || s.includes('system') || s.includes('os')) {
    return <Cpu className="w-8 h-8 text-white/90" />;
  }
  if (iconName === 'Share2' || s.includes('discrete') || s.includes('network')) {
    return <Share2 className="w-8 h-8 text-white/90" />;
  }
  return <Code className="w-8 h-8 text-white/90" />;
};

export const ResourceCard = ({ resource, viewMode = 'grid' }) => {
  const { toggleFavorite, isFavorite, recordDownload, setPreviewResource, recordView } = useApp();
  const favorited = isFavorite(resource.id);

  const isPastPaper = resource.category === 'Past Papers' || resource.examType === 'Final Term' || resource.examType === 'Midterm';

  const handleOpenPreview = () => {
    recordView(resource.id);
    setPreviewResource(resource);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    recordDownload(resource);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(resource.id);
  };

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-[#E7EAF0] p-4 sm:p-5 hover:shadow-lg hover:border-[#F4A62A]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Thumbnail */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#14213D] flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#1F3558]">
            {isPastPaper ? (
              <div className="text-center p-1">
                <FileText className="w-7 h-7 text-[#F4A62A] mx-auto" />
                <span className="text-[9px] font-bold text-white uppercase tracking-wider block mt-0.5">EXAM</span>
              </div>
            ) : (
              <div>{getSubjectIcon(resource.subject)}</div>
            )}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#F4A62A]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                {resource.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                {resource.semester}
              </span>
              {resource.examType && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
                  {resource.examType}
                </span>
              )}
            </div>

            <Link
              to={`/resource/${resource.id}`}
              onClick={() => recordView(resource.id)}
              className="text-base sm:text-lg font-bold text-[#14213D] group-hover:text-[#F4A62A] transition-colors line-clamp-1"
            >
              {resource.title}
            </Link>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#788397] mt-1.5">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {resource.uploader?.name || 'Academic Faculty'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {resource.uploadRelative || resource.academicYear || 'Recent'}
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5" />
                {resource.fileSize}
              </span>
              <span className="flex items-center gap-1 font-medium text-[#14213D]">
                <Download className="w-3.5 h-3.5 text-[#F4A62A]" />
                {resource.downloads?.toLocaleString()} downloads
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <button
            onClick={handleFavoriteClick}
            className={`p-2.5 rounded-xl border transition-all ${
              favorited
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'border-[#E7EAF0] text-[#788397] hover:bg-slate-50 hover:text-rose-500'
            }`}
            title={favorited ? 'Remove favorite' : 'Save favorite'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={handleOpenPreview}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#14213D] bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    );
  }

  // Grid View Layout (Matching Reference Images 2 & 4 exactly)
  return (
    <div className="bg-white rounded-2xl border border-[#E7EAF0] overflow-hidden hover:shadow-xl hover:border-[#F4A62A]/50 transition-all duration-300 flex flex-col group">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 flex-1">
        {/* Left Thumbnail Illustration */}
        {isPastPaper ? (
          /* Past Paper Document Mockup Style (Image 4) */
          <div className="relative w-full sm:w-32 h-36 sm:h-auto rounded-xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 p-2 flex flex-col justify-between flex-shrink-0 shadow-inner group-hover:scale-[1.02] transition-transform">
            <div className="border border-slate-200 rounded-lg p-2 bg-white flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>UNIVERSITY</span>
                  <span>PAPER</span>
                </div>
                <div className="text-[11px] font-black text-[#14213D] leading-tight mt-1 text-center">
                  {resource.examType || 'Final Term'}
                  <div className="text-[9px] font-normal text-slate-500">Exam Paper</div>
                </div>
              </div>
              <div className="space-y-1 my-1">
                <div className="h-1 bg-slate-200 rounded w-full" />
                <div className="h-1 bg-slate-100 rounded w-4/5" />
                <div className="h-1 bg-slate-100 rounded w-3/4" />
              </div>
            </div>

            {/* Red PDF Tag */}
            <div className="absolute -bottom-1 -right-1 bg-red-600 text-white font-black text-[9px] px-2 py-0.5 rounded shadow">
              PDF
            </div>
          </div>
        ) : (
          /* Lecture Notes Dark Navy Illustration with Orange Corner Accent (Image 2) */
          <div className="relative w-full sm:w-32 h-36 sm:h-auto rounded-xl bg-[#14213D] border border-[#1F3558] p-3 flex flex-col justify-between flex-shrink-0 overflow-hidden shadow-md group-hover:scale-[1.02] transition-transform">
            <div className="text-white text-xs font-bold tracking-tight line-clamp-2">
              {resource.subject}
            </div>
            
            <div className="my-auto flex items-center justify-center py-2">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
                {getSubjectIcon(resource.subject)}
              </div>
            </div>

            {/* Bottom-right orange triangle accent matching UI screenshot */}
            <div
              className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#F4A62A]"
              style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
            />
          </div>
        )}

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Top row: Badges & Favorite Heart */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700">
                  {resource.subject}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                  {resource.semester}
                </span>
                {isPastPaper && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 text-purple-700">
                    {resource.academicYear || resource.examType}
                  </span>
                )}
              </div>

              <button
                onClick={handleFavoriteClick}
                className={`p-1.5 rounded-lg border transition-all ${
                  favorited
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200'
                }`}
                title={favorited ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Title */}
            <Link
              to={`/resource/${resource.id}`}
              onClick={() => recordView(resource.id)}
              className="text-base font-bold text-[#14213D] group-hover:text-[#F4A62A] transition-colors line-clamp-1 block"
            >
              {resource.title}
            </Link>

            {/* Description */}
            <p className="text-xs text-[#788397] mt-1 line-clamp-2 leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-[11px] text-[#788397]">
              <span className="flex items-center gap-1 truncate">
                <User className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span className="truncate">{resource.uploader?.name ? `By ${resource.uploader.name}` : resource.department}</span>
              </span>
              <span className="flex items-center gap-1 truncate justify-end">
                <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span>{resource.uploadRelative || resource.academicYear || 'Recent'}</span>
              </span>
              <span className="flex items-center gap-1 truncate">
                <HardDrive className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span>{resource.fileSize}</span>
              </span>
              <span className="flex items-center gap-1 truncate justify-end font-semibold text-[#14213D]">
                <Download className="w-3 h-3 text-[#F4A62A] flex-shrink-0" />
                <span>{resource.downloads ? `${(resource.downloads / 1000).toFixed(1)}K` : '0'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button Actions matching Reference: [View Details] & [Download] */}
      <div className="px-4 pb-4 pt-1 flex items-center gap-2">
        <button
          onClick={handleOpenPreview}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-[#14213D] bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>View Details</span>
        </button>

        <button
          onClick={handleDownload}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white transition-all shadow-sm ${
            isPastPaper
              ? 'bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930]'
              : 'bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930]'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};
