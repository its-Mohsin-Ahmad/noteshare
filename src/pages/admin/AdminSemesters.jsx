import React, { useState } from 'react';
import { CalendarDays, Plus, Trash2, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSemesters = () => {
  const { semesters, addSemester, deleteSemester, subjects, resources } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [term, setTerm] = useState('Fall/Spring');

  const handleSave = (e) => {
    e.preventDefault();
    if (!name) return;
    addSemester({ name, label: label || name, term });
    setName('');
    setLabel('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <CalendarDays className="w-8 h-8 text-[#F4A62A]" />
            <span>Manage Academic Semesters</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Organize terms 1 through 8 and view affiliated course load distribution.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Semester</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {semesters.map((sem) => {
          const semSubjects = subjects.filter((s) => s.semester === sem.name).length;
          const semResources = resources.filter((r) => r.semester === sem.name).length;

          return (
            <div
              key={sem.id}
              className="bg-white rounded-3xl p-5 border border-[#E7EAF0] shadow-sm flex flex-col justify-between space-y-3 hover:border-[#F4A62A] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-[#F4A62A] border border-amber-200">
                  {sem.term}
                </span>
                {semesters.length > 8 && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${sem.name}?`)) deleteSemester(sem.id);
                    }}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-lg font-black text-[#14213D]">{sem.name}</h3>
                <div className="text-xs text-slate-500 mt-0.5">{sem.label}</div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>{semSubjects} Subjects</span>
                <span className="text-[#14213D]">{semResources} Files</span>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#14213D]">Add Academic Semester</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Semester Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Semester 9"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Display Label</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. 9th Semester (Masters)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Term Mode</label>
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                >
                  <option value="Fall/Spring">Fall / Spring</option>
                  <option value="Summer Term">Summer Term</option>
                  <option value="Annual System">Annual System</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#14213D] text-white font-bold hover:bg-[#F4A62A] hover:text-[#0D1930]"
                >
                  Save Semester
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
