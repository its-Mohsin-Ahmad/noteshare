import React, { useState } from 'react';
import {
  Inbox,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  FileText,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSubmissions = () => {
  const { submissions, approveSubmission, rejectSubmission, deleteSubmission } = useApp();

  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedSub, setSelectedSub] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [subToReject, setSubToReject] = useState(null);

  const filtered = submissions.filter((s) => {
    if (activeTab === 'Pending') return s.status === 'Pending Review';
    if (activeTab === 'Approved') return s.status === 'Approved';
    if (activeTab === 'Rejected') return s.status === 'Rejected';
    return true;
  });

  const handleOpenReject = (sub) => {
    setSubToReject(sub);
    setRejectReason('Does not meet syllabus guidelines / duplicate content.');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (subToReject) {
      rejectSubmission(subToReject.id, rejectReason);
      setRejectModalOpen(false);
      setSubToReject(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <Inbox className="w-8 h-8 text-[#F4A62A]" />
            <span>Student Submission Review</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review peer-contributed notes and past papers. Approved resources automatically publish to student library.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7EAF0] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          {['ALL', 'Pending', 'Approved', 'Rejected'].map((tab) => {
            const count = submissions.filter((s) => {
              if (tab === 'ALL') return true;
              if (tab === 'Pending') return s.status === 'Pending Review';
              if (tab === 'Approved') return s.status === 'Approved';
              if (tab === 'Rejected') return s.status === 'Rejected';
              return true;
            }).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#14213D] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{tab === 'Pending' ? 'Pending Review' : tab}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab ? 'bg-[#F4A62A] text-[#0D1930]' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Submission Details</th>
                <th className="p-4">Submitted By</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-400">
                    No submissions in this category.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => {
                  const isPending = sub.status === 'Pending Review';
                  const isApproved = sub.status === 'Approved';
                  const isRejected = sub.status === 'Rejected';

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-[#14213D] truncate">{sub.title}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {sub.description}
                        </div>
                        {sub.remarks && (
                          <div className="text-[10px] text-slate-400 italic mt-0.5">Note: {sub.remarks}</div>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-slate-800">{sub.studentName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{sub.studentRegNo}</div>
                      </td>

                      <td className="p-4 font-semibold text-slate-700">
                        {sub.subject}
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-[#F4A62A] border border-amber-200">
                          {sub.category}
                        </span>
                      </td>

                      <td className="p-4 font-mono text-slate-500 text-[11px]">
                        {sub.submittedAt}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isPending
                              ? 'bg-amber-100 text-amber-800'
                              : isApproved
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isPending && <Clock className="w-3 h-3" />}
                          {isApproved && <CheckCircle className="w-3 h-3" />}
                          {isRejected && <XCircle className="w-3 h-3" />}
                          <span>{sub.status}</span>
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isPending && (
                            <>
                              <button
                                onClick={() => approveSubmission(sub.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] shadow-xs"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleOpenReject(sub)}
                                className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-[11px] shadow-xs"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete submission "${sub.title}"?`)) {
                                deleteSubmission(sub.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Reason Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-rose-700">Reject Submission</h3>
              <button onClick={() => setRejectModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <div className="text-xs text-slate-600">
              Provide feedback for <span className="font-bold text-[#14213D]">{subToReject?.studentName}</span>:
            </div>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none resize-none"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
