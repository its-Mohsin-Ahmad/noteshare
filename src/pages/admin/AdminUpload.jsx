import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  FolderOpen,
  Info,
  Calendar,
  Layers,
  Save
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminUpload = () => {
  const { addResource, subjects, departments, degreePrograms, semesters, showToast } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Notes');
  const [department, setDepartment] = useState('Computer Science');
  const [degreeProgram, setDegreeProgram] = useState('BS Computer Science');
  const [subject, setSubject] = useState(subjects[0]?.name || 'Computer Science');
  const [subjectCode, setSubjectCode] = useState('CS-101');
  const [semester, setSemester] = useState('Semester 1');
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [examType, setExamType] = useState('Final Term');
  const [tagsInput, setTagsInput] = useState('Data Structures, Syllabus');
  const [isPublished, setIsPublished] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleSubjectChange = (e) => {
    const sName = e.target.value;
    setSubject(sName);
    const matched = subjects.find((s) => s.name === sName);
    if (matched) {
      setSubjectCode(matched.code);
      if (matched.department) setDepartment(matched.department);
      if (matched.semester) setSemester(matched.semester);
    }
  };

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

  const handleSubmit = async (publishDirectly = true) => {
    if (!title.trim() || !subject) {
      showToast('Please provide a title and select a subject.', 'error');
      return;
    }

    setUploading(true);
    setUploadProgress(20);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const timer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(async () => {
      clearInterval(timer);
      setUploadProgress(100);

      await addResource(
        {
          title,
          description,
          category,
          department,
          degreeProgram,
          subject,
          subjectCode,
          semester,
          academicYear,
          examType: category === 'Past Papers' ? examType : 'General Notes',
          tags,
          isPublished: publishDirectly
        },
        selectedFile
      );

      setUploading(false);
      navigate('/admin/resources');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <UploadCloud className="w-8 h-8 text-[#F4A62A]" />
            <span>Upload University Academic Document</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Store documents locally into IndexedDB with automated cataloging across departments and semester syllabi.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm p-6 sm:p-10 space-y-6">
        {/* Upload Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
            dragOver
              ? 'border-[#F4A62A] bg-amber-50/50'
              : 'border-slate-300 hover:border-[#F4A62A] bg-slate-50'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 mx-auto flex items-center justify-center text-[#14213D] mb-3">
            <UploadCloud className="w-8 h-8 text-[#F4A62A]" />
          </div>

          {selectedFile ? (
            <div className="space-y-2">
              <div className="font-black text-sm text-[#14213D]">{selectedFile.name}</div>
              <div className="text-xs text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Document'}
              </div>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-xs font-bold text-rose-600 hover:underline pt-1"
              >
                Change Selected File
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#14213D]">
                Drag and drop your academic document here
              </h3>
              <p className="text-xs text-slate-500">
                Supports PDF, DOCX, PPTX files. Files are directly stored inside browser IndexedDB storage.
              </p>
              <label className="inline-block mt-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#14213D] text-white hover:bg-[#F4A62A] hover:text-[#0D1930] cursor-pointer transition-colors shadow-sm">
                <span>Browse Files on Computer</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Progress Bar when uploading */}
        {uploading && (
          <div className="space-y-1.5 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Storing document into IndexedDB & compiling metadata...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F4A62A] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Form Fields */}
        <div className="space-y-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Resource Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Computer Science Final Term Solved Paper 2024"
              required
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description / Syllabus Scope</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the modules covered, questions included, or specific exam date..."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              >
                <option value="Notes">Lecture Notes</option>
                <option value="Past Papers">Past Papers</option>
                <option value="Assignments">Assignment</option>
                <option value="Practical Materials">Practical Manual</option>
                <option value="Slides">Lecture Slides</option>
                <option value="Handouts">Study Handout</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
              <select
                value={subject}
                onChange={handleSubjectChange}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.name}>{s.name} ({s.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code</label>
              <input
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Degree Program</label>
              <select
                value={degreeProgram}
                onChange={(e) => setDegreeProgram(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              >
                {degreePrograms.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              >
                {semesters.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year / Session</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="Spring 2024 / Fall 2024"
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Search Tags (Comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Data Structures, Trees, Midterm"
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/resources')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={uploading}
              onClick={() => handleSubmit(false)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              disabled={uploading}
              onClick={() => handleSubmit(true)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-all shadow-md"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Publish Resource Live</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
