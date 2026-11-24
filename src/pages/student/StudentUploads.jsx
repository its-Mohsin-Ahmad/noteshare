import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  Send,
  Eye,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentUploads = () => {
  const { user, submissions, submitResource, deleteSubmission, subjects, departments, semesters } = useApp();

  // Modal / Form state
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Notes');
  const [subject, setSubject] = useState(subjects[0]?.name || 'Computer Science');
  const [department, setDepartment] = useState(user?.department || 'Computer Science');
  const [semester, setSemester] = useState(user?.semester || 'Semester 1');
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Filter submissions by current student email or show all student submissions
  const studentSubmissions = submissions.filter(
    (s) => !user?.email || s.studentEmail.toLowerCase() === user.email.toLowerCase() || s.studentName === user?.name
  );

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !subject) return;

    setLoading(true);
    await submitResource(
      {
        title,
        description,
        category,
        subject,
        department,
        semester,
        academicYear
      },
      selectedFile
    );

    setLoading(false);
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    setFormOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <UploadCloud className="w-7 h-7 text-[#F4A62A]" />
            <span>My Submitted Resources</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Contribute high quality lecture notes or solved past papers. Submissions are verified by administrators before public listing.
          </p>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-all shadow-md self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Submit New Material</span>
        </button>
      </div>

      {/* Submission Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-[#0D1930] text-white flex items-center justify-between border-b border-[#1F3558]">
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                <UploadCloud className="w-5 h-5 text-[#F4A62A]" />
                <span>Submit Academic Material for Verification</span>
              </div>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-[#F4A62A] flex-shrink-0 mt-0.5" />
                <span>
                  Admin Review Process: Your document will be securely stored in browser IndexedDB and reviewed in the Admin Dashboard before appearing publicly.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Object Oriented Programming Solved Midterm 2024"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description / Key Topics</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the concepts, exam term, or lecture contents included..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Resource Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    <option value="Notes">Lecture Notes</option>
                    <option value="Past Papers">Past Exam Paper</option>
                    <option value="Assignments">Assignment Solution</option>
                    <option value="Practical Materials">Lab Manual / Practical</option>
                    <option value="Slides">Presentation Slides</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>{s.name} ({s.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    {semesters.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    placeholder="2024-2025"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Drag and Drop File Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Document (PDF, DOC, PPT)
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                    dragOver
                      ? 'border-[#F4A62A] bg-amber-50/50'
                      : 'border-slate-300 hover:border-[#F4A62A] bg-slate-50'
                  }`}
                >
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  {selectedFile ? (
                    <div className="space-y-1">
                      <div className="font-bold text-[#14213D] text-xs truncate max-w-sm mx-auto">
                        {selectedFile.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for submission
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-700">
                        Drag and drop your file here, or{' '}
                        <label className="text-[#F4A62A] font-bold cursor-pointer hover:underline">
                          browse computer
                          <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-[10px] text-slate-400">PDF, DOC, PPT up to 25MB supported</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Saving to Database...' : 'Submit Resource'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submissions List Table */}
      {studentSubmissions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <UploadCloud className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-[#14213D]">No materials submitted yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Help your university peers by sharing verified lecture notes and past exams. You'll receive credit on every approved resource.
          </p>
          <button
            onClick={() => setFormOpen(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F4A62A] text-[#0D1930]"
          >
            Submit First Resource
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7EAF0] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Your Submission Archive</span>
            <span>Total: {studentSubmissions.length}</span>
          </div>

          <div className="divide-y divide-slate-100">
            {studentSubmissions.map((sub) => {
              const isPending = sub.status === 'Pending Review';
              const isApproved = sub.status === 'Approved';
              const isRejected = sub.status === 'Rejected';

              return (
                <div
                  key={sub.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#14213D] text-[#F4A62A] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#14213D] truncate">{sub.title}</div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                        <span className="font-semibold text-blue-600">{sub.subject}</span>
                        <span>•</span>
                        <span>{sub.category}</span>
                        <span>•</span>
                        <span>{sub.semester}</span>
                        <span>•</span>
                        <span>{sub.submittedAt}</span>
                      </div>
                      {sub.remarks && (
                        <div className="text-[11px] text-slate-500 mt-1 italic">
                          Admin note: {sub.remarks}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Status badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        isPending
                          ? 'bg-amber-100 text-amber-800'
                          : isApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isPending && <Clock className="w-3.5 h-3.5" />}
                      {isApproved && <CheckCircle className="w-3.5 h-3.5" />}
                      {isRejected && <XCircle className="w-3.5 h-3.5" />}
                      <span>{sub.status}</span>
                    </span>

                    <button
                      onClick={() => deleteSubmission(sub.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Delete submission"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
