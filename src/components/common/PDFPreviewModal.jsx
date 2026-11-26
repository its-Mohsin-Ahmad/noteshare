import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Printer,
  FileText,
  User,
  Calendar,
  Heart,
  ExternalLink,
  Eye,
  BookOpen,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getFileFromDB } from '../../services/indexedDb';

export const PDFPreviewModal = () => {
  const { previewResource, setPreviewResource, recordDownload, toggleFavorite, isFavorite } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copied, setCopied] = useState(false);
  const [docBlobUrl, setDocBlobUrl] = useState(null);
  const [loadingDoc, setLoadingDoc] = useState(true);
  const [viewMode, setViewMode] = useState('document'); // 'document' | 'summary'

  const favorited = previewResource ? isFavorite(previewResource.id) : false;

  useEffect(() => {
    let active = true;
    let createdUrl = null;

    const loadDocument = async () => {
      if (!previewResource) return;
      setLoadingDoc(true);
      setDocBlobUrl(null);
      setViewMode('document');

      // 1. Check if resource has a public Supabase Storage URL
      if (previewResource.fileUrl && typeof previewResource.fileUrl === 'string' && previewResource.fileUrl.startsWith('http')) {
        if (active) {
          setDocBlobUrl(previewResource.fileUrl);
          setLoadingDoc(false);
        }
        return;
      }

      // 2. Check browser IndexedDB for physical uploaded file
      try {
        const stored = await getFileFromDB(previewResource.id);
        if (stored && stored.data) {
          const blob = stored.data instanceof Blob 
            ? stored.data 
            : new Blob([stored.data], { type: stored.type || 'application/pdf' });
          createdUrl = URL.createObjectURL(blob);
          if (active) {
            setDocBlobUrl(createdUrl);
            setLoadingDoc(false);
          }
          return;
        }
      } catch (err) {
        console.warn('Could not read from IndexedDB:', err);
      }

      // 3. Fallback: No physical file exists for this mock/seed record
      if (active) {
        setLoadingDoc(false);
        setViewMode('summary');
      }
    };

    loadDocument();

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [previewResource]);

  if (!previewResource) return null;

  const totalPages = previewResource.pagesCount || 12;
  const fileType = (previewResource.fileType || 'PDF').toUpperCase();
  const isImage = ['PNG', 'JPG', 'JPEG', 'WEBP', 'GIF'].includes(fileType) || 
    (docBlobUrl && typeof docBlobUrl === 'string' && docBlobUrl.match(/\.(png|jpe?g|webp|gif)(\?.*)?$/i));

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + window.location.pathname + `#/explore?id=${previewResource.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    recordDownload(previewResource);
  };

  const handleOpenExternal = () => {
    if (docBlobUrl) {
      window.open(docBlobUrl, '_blank', 'noopener,noreferrer');
    } else {
      recordDownload(previewResource);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-6xl h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0D1930] text-white border-b border-[#1F3558] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-[#14213D] text-[#F4A62A] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h2 className="text-sm sm:text-base font-bold truncate leading-tight">
                {previewResource.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mt-0.5">
                <span className="font-semibold text-slate-200">{previewResource.subject}</span>
                <span>•</span>
                <span>{previewResource.semester}</span>
                <span>•</span>
                <span className="text-[#F4A62A] font-semibold">{previewResource.fileSize || '2.1 MB'}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#14213D] text-[#F4A62A] border border-[#1F3558]">
                  {fileType}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => toggleFavorite(previewResource.id)}
              className={`p-2 rounded-xl transition-colors ${
                favorited ? 'bg-rose-500/20 text-rose-400' : 'text-slate-300 hover:bg-white/10'
              }`}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-400' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative"
              title="Copy share link"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow z-10 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>

            {docBlobUrl && (
              <button
                onClick={handleOpenExternal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-colors"
                title="Open document in new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Full Tab</span>
              </button>
            )}

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] font-bold text-xs rounded-xl transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={() => setPreviewResource(null)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors ml-1 cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Mode & Toolbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-700 shrink-0">
          <div className="flex items-center gap-2">
            {docBlobUrl ? (
              <div className="flex items-center bg-slate-200 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setViewMode('document')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    viewMode === 'document' ? 'bg-white text-[#14213D] shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-[#F4A62A]" />
                  <span>Real Document</span>
                </button>
                <button
                  onClick={() => setViewMode('summary')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    viewMode === 'summary' ? 'bg-white text-[#14213D] shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Syllabus Summary</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <BookOpen className="w-4 h-4 text-[#F4A62A]" />
                <span>Academic Overview & Syllabus Synopsis</span>
              </div>
            )}
          </div>

          {/* Zoom controls for images or summary view */}
          {(isImage || viewMode === 'summary') && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] font-semibold w-10 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.print()}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hidden sm:block"
                title="Print Document"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Viewer Document Canvas */}
        <div className="flex-1 bg-slate-200/70 overflow-hidden relative flex flex-col">
          {loadingDoc ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#F4A62A] animate-spin" />
              <p className="text-xs font-semibold text-slate-600">Loading document from repository...</p>
            </div>
          ) : viewMode === 'document' && docBlobUrl ? (
            /* REAL DOCUMENT RENDERING (PDF iframe or Image) */
            isImage ? (
              <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
                <img
                  src={docBlobUrl}
                  alt={previewResource.title}
                  className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-transform"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
                />
              </div>
            ) : (
              <iframe
                src={docBlobUrl}
                title={previewResource.title}
                className="w-full h-full border-0 bg-white"
              />
            )
          ) : (
            /* ACADEMIC SUMMARY OVERVIEW (When no uploaded physical PDF exists or summary mode toggled) */
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center">
              <div
                className="bg-white rounded-2xl shadow-xl border border-slate-300 p-6 sm:p-10 w-full max-w-2xl min-h-[500px] flex flex-col justify-between transition-all"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                <div>
                  {!docBlobUrl && (
                    <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#F4A62A] shrink-0" />
                      <span>
                        <strong>Sample Catalog Resource:</strong> This initial seed document displays the academic syllabus synopsis. Uploaded materials with physical PDF/DOC files render directly in the embedded viewer above.
                      </span>
                    </div>
                  )}

                  <div className="border-b-2 border-[#14213D] pb-4 mb-6 flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-[#F4A62A] uppercase">
                        NOTEshare Academic Repository
                      </div>
                      <h1 className="text-xl sm:text-2xl font-black text-[#14213D] mt-1">
                        {previewResource.title}
                      </h1>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        Department of {previewResource.department} • {previewResource.degreeProgram || 'Undergraduate Degree'}
                      </p>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-[#0D1930] text-[#F4A62A] text-[11px] font-bold">
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
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Session</span>
                      <span className="font-semibold text-slate-800">{previewResource.academicYear || '2024-2025'}</span>
                    </div>
                  </div>

                  {/* Content Overview */}
                  <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <div>
                      <h3 className="font-bold text-[#14213D] text-sm mb-1">
                        Curriculum Syllabus & Subject Notes
                      </h3>
                      <p className="text-slate-600">
                        {previewResource.description || 'Verified university study material covering lecture concepts, examination questions, and solved problem sets.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-[#14213D] block">Academic Scope & Instructions:</span>
                      <p>
                        Review core definitions, practical code examples, and theoretical foundations. Material approved for semester preparation and final evaluations.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Uploader: {previewResource.uploader?.name || 'Academic Administrator'}</span>
                      <span>Verified by NOTEshare Quality Assurance</span>
                    </div>
                  </div>
                </div>

                {/* Document Footer */}
                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                  <span>NOTEshare University Platform</span>
                  <span>Pages: {totalPages} Estimated</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {previewResource.uploader?.name || 'Administrator'}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {previewResource.uploadDate || '2026-11-26'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white font-bold rounded-xl transition-all shadow-sm cursor-pointer"
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
