import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Printer,
  Flag,
  FileText,
  User,
  Calendar,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PDFPreviewModal = () => {
  const { previewResource, setPreviewResource, recordDownload, toggleFavorite, isFavorite } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copied, setCopied] = useState(false);

  if (!previewResource) return null;

  const totalPages = previewResource.pagesCount || 12;
  const favorited = isFavorite(previewResource.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/resource/${previewResource.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    recordDownload(previewResource);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0D1930] text-white border-b border-[#1F3558]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-[#14213D] text-[#F4A62A]">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h2 className="text-sm sm:text-base font-bold truncate leading-tight">
                {previewResource.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span>{previewResource.subject}</span>
                <span>•</span>
                <span>{previewResource.semester}</span>
                <span>•</span>
                <span className="text-[#F4A62A] font-semibold">{previewResource.fileSize}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(previewResource.id)}
              className={`p-2 rounded-lg transition-colors ${
                favorited ? 'bg-rose-500/20 text-rose-400' : 'text-slate-300 hover:bg-white/10'
              }`}
              title={favorited ? 'Remove favorite' : 'Add to favorite'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors relative"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] font-bold text-xs rounded-lg transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={() => setPreviewResource(null)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 rounded hover:bg-slate-200 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 rounded hover:bg-slate-200 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
              className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] font-semibold">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded hover:bg-slate-200 text-slate-600 hidden sm:block"
              title="Print Preview"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewer Document Canvas */}
        <div className="flex-1 bg-slate-200/80 p-4 sm:p-8 overflow-auto flex items-center justify-center">
          <div
            className="bg-white rounded-lg shadow-xl border border-slate-300 p-8 sm:p-12 w-full max-w-2xl min-h-[550px] flex flex-col justify-between transition-all"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Header of Simulated Document */}
            <div>
              <div className="border-b-2 border-[#14213D] pb-4 mb-6 flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-[#F4A62A] uppercase">
                    NOTEshare Academic Document Repository
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-[#14213D] mt-1">
                    {previewResource.title}
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Department of {previewResource.department} • {previewResource.degreeProgram || 'Undergraduate'}
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#0D1930] text-white text-[11px] font-bold">
                  {previewResource.subjectCode || 'ACAD-2024'}
                </div>
              </div>

              {/* Document Meta Table */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-6">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Subject</span>
                  <span className="font-semibold text-slate-800">{previewResource.subject}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Semester</span>
                  <span className="font-semibold text-slate-800">{previewResource.semester}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                  <span className="font-semibold text-slate-800">{previewResource.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic Year</span>
                  <span className="font-semibold text-slate-800">{previewResource.academicYear || '2024-2025'}</span>
                </div>
              </div>

              {/* Simulated Document Content */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-[#14213D] text-sm mb-1">
                    Section {currentPage}.0 – Core Academic Overview & Notes
                  </h3>
                  <p className="text-slate-600">
                    {previewResource.description}
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold">Exam / Lecture Highlight:</span> Review definitions, theoretical models, and practical application exercises outlined in this module.
                </div>

                <div className="space-y-2 pt-2">
                  <div className="h-2.5 bg-slate-200 rounded w-11/12"></div>
                  <div className="h-2.5 bg-slate-200 rounded w-full"></div>
                  <div className="h-2.5 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-2.5 bg-slate-200 rounded w-5/6"></div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Author: {previewResource.uploader?.name || 'Academic Faculty'}</span>
                  <span>Verified by NOTEshare Quality Assurance</span>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
              <span>NOTEshare University Platform</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {previewResource.uploader?.name || 'Faculty TA'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {previewResource.uploadDate || '2026-11-20'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white font-bold rounded-xl transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
