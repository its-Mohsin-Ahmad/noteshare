import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  Eye,
  Heart,
  Share2,
  Calendar,
  User,
  HardDrive,
  CheckCircle,
  Flag,
  ArrowLeft,
  Star,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResourceCard } from '../../components/common/ResourceCard';
import { ReportResourceModal } from '../../components/common/ReportResourceModal';

export const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    resources,
    recordDownload,
    toggleFavorite,
    isFavorite,
    setPreviewResource,
    user,
    showToast
  } = useApp();

  const [reportOpen, setReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // New review form
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      name: 'Hamza Farooq',
      rating: 5,
      date: '3 days ago',
      comment: 'Extremely helpful lecture notes! The tree traversal diagrams and time complexity tables saved me before my midterms.'
    },
    {
      id: 'rev-2',
      name: 'Ayesha Siddiqua',
      rating: 5,
      date: '1 week ago',
      comment: 'Accurate and well formatted according to our university exam syllabus. Highly recommended.'
    }
  ]);

  const resource = resources.find((r) => r.id === id) || resources[0];
  const favorited = isFavorite(resource.id);

  // Related resources from same subject
  const relatedResources = resources
    .filter((r) => r.subject === resource.subject && r.id !== resource.id && r.isPublished)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    showToast('Resource link copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      name: user?.name || 'Anonymous Student',
      rating: userRating,
      date: 'Just now',
      comment: userComment
    };

    setReviews([newRev, ...reviews]);
    setUserComment('');
    showToast('Your review has been posted!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#14213D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resources</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(resource.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              favorited
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-50'
            }`}
            title="Favorite"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setReportOpen(true)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Report issue"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Resource Overview & Preview */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7EAF0] shadow-sm space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                {resource.subject}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                {resource.semester}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#F4A62A] border border-amber-200">
                {resource.category}
              </span>
              {resource.academicYear && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700">
                  {resource.academicYear}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#14213D] leading-tight">
              {resource.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {resource.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {(resource.tags || []).map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={() => recordDownload(resource)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Now ({resource.fileSize})</span>
              </button>

              <button
                onClick={() => setPreviewResource(resource)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-[#14213D] transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Open Interactive PDF Preview</span>
              </button>
            </div>
          </div>

          {/* Interactive Document Preview Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7EAF0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#14213D] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F4A62A]" />
                <span>Document Abstract & Contents</span>
              </h3>
              <button
                onClick={() => setPreviewResource(resource)}
                className="text-xs font-bold text-[#F4A62A] hover:underline"
              >
                Full Screen View
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3 font-mono text-xs text-slate-700">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Preview Snapshot
              </div>
              <div className="text-sm font-sans font-bold text-[#14213D]">
                Course Code: {resource.subjectCode || 'CS-101'} — {resource.subject}
              </div>
              <p className="font-sans text-slate-600 text-xs leading-relaxed">
                {resource.description} Included in this document are step-by-step mathematical derivations, algorithmic complexities, and practical questions mapped to university examination criteria.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-sans text-slate-500">
                <span>Estimated reading time: ~25 mins</span>
                <span>Document pages: {resource.pagesCount || 15} Pages</span>
              </div>
            </div>
          </div>

          {/* Student Reviews & Feedback */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7EAF0] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#14213D]" />
                <h3 className="text-lg font-bold text-[#14213D]">Student Feedback & Ratings</h3>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#14213D]">
                <Star className="w-4 h-4 fill-[#F4A62A] text-[#F4A62A]" />
                <span>{resource.rating || 4.9}</span>
                <span className="text-xs text-slate-400 font-normal">({reviews.length} reviews)</span>
              </div>
            </div>

            {/* Leave a review form */}
            <form onSubmit={handleAddReview} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Leave Your Academic Review:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= userRating
                            ? 'fill-[#F4A62A] text-[#F4A62A]'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={2}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Share how this resource helped your studies..."
                className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:bg-white focus:border-[#F4A62A] focus:outline-none resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Rating</span>
                </button>
              </div>
            </form>

            {/* Review List */}
            <div className="space-y-3 divide-y divide-slate-100">
              {reviews.map((rev) => (
                <div key={rev.id} className="pt-3 first:pt-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-[#14213D]">{rev.name}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <div className="flex items-center">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#F4A62A] text-[#F4A62A]" />
                        ))}
                      </div>
                      <span>•</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Metadata Sidebar & Related Resources */}
        <div className="lg:col-span-4 space-y-6">
          {/* Metadata Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#14213D] uppercase tracking-wider pb-2 border-b border-slate-100">
              Resource Information
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">File Type</span>
                <span className="font-bold text-[#14213D]">{resource.fileType || 'PDF'}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">File Size</span>
                <span className="font-bold text-[#14213D]">{resource.fileSize}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Pages Count</span>
                <span className="font-bold text-[#14213D]">{resource.pagesCount || 15} Pages</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Department</span>
                <span className="font-bold text-[#14213D] truncate max-w-[150px]">{resource.department}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Semester</span>
                <span className="font-bold text-[#14213D]">{resource.semester}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Academic Year</span>
                <span className="font-bold text-[#14213D]">{resource.academicYear || '2024-2025'}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Total Downloads</span>
                <span className="font-bold text-[#F4A62A]">{resource.downloads?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Uploaded On</span>
                <span className="font-bold text-[#14213D]">{resource.uploadDate}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Contributed By</span>
                <span className="font-bold text-[#14213D]">{resource.uploader?.name || 'Academic Faculty'}</span>
              </div>
            </div>

            {/* Academic Quality Seal */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Verified academic content matching university guidelines.</span>
            </div>
          </div>

          {/* Related Materials */}
          {relatedResources.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#14213D] uppercase tracking-wider pb-2 border-b border-slate-100">
                Related {resource.subject} Resources
              </h3>
              <div className="space-y-3">
                {relatedResources.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/resource/${rel.id}`}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#F4A62A] transition-all block group"
                  >
                    <div className="text-xs font-bold text-[#14213D] group-hover:text-[#F4A62A] transition-colors line-clamp-1">
                      {rel.title}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                      <span>{rel.semester}</span>
                      <span className="font-semibold text-slate-700">{rel.fileSize}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      <ReportResourceModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        resourceId={resource.id}
        resourceTitle={resource.title}
      />
    </div>
  );
};
