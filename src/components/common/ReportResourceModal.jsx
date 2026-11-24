import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportResourceModal = ({ isOpen, onClose, resourceId, resourceTitle }) => {
  const { reportResource } = useApp();
  const [reason, setReason] = useState('Incorrect document');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    reportResource(resourceId, reason, details);
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 bg-rose-50 border-b border-rose-100">
          <div className="flex items-center gap-2 text-rose-700 font-bold">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Report Resource</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Resource Under Review
            </label>
            <div className="text-sm font-bold text-[#14213D] truncate bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {resourceTitle || 'Academic Resource'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Reason for Report *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-2.5 focus:border-[#F4A62A] focus:outline-none"
            >
              <option value="Incorrect document">Incorrect document / misleading title</option>
              <option value="Duplicate document">Duplicate of an existing resource</option>
              <option value="Wrong subject">Categorized under wrong subject or department</option>
              <option value="Broken file">Broken file or corrupted download</option>
              <option value="Inappropriate content">Inappropriate / plagiarized content</option>
              <option value="Outdated syllabus">Outdated academic syllabus</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Additional Details (Optional)
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Explain the issue for the administrator review..."
              className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-2.5 focus:border-[#F4A62A] focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
