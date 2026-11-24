import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Search, Code, CheckCircle, Calculator, Atom, Laptop, Database, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSubjects = () => {
  const { subjects, addSubject, updateSubject, deleteSubject, departments, degreePrograms, semesters } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [degreeProgram, setDegreeProgram] = useState('BS Computer Science');
  const [semester, setSemester] = useState('Semester 1');
  const [type, setType] = useState('Core');
  const [icon, setIcon] = useState('Code');
  const [description, setDescription] = useState('');

  const filteredSubjects = subjects.filter((s) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.department.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenCreate = () => {
    setEditingSubject(null);
    setName('');
    setCode('');
    setDepartment(departments[0]?.name || 'Computer Science');
    setDegreeProgram(degreePrograms[0]?.name || 'BS Computer Science');
    setSemester('Semester 1');
    setType('Core');
    setIcon('Code');
    setDescription('');
    setModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingSubject(s);
    setName(s.name);
    setCode(s.code);
    setDepartment(s.department);
    setDegreeProgram(s.degreeProgram);
    setSemester(s.semester);
    setType(s.type);
    setIcon(s.icon || 'Code');
    setDescription(s.description || '');
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !code) return;

    if (editingSubject) {
      updateSubject(editingSubject.id, {
        name,
        code,
        department,
        degreeProgram,
        semester,
        type,
        icon,
        description
      });
    } else {
      addSubject({
        name,
        code,
        department,
        degreeProgram,
        semester,
        type,
        icon,
        description
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-[#F4A62A]" />
            <span>Manage Academic Subjects</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, or configure course curriculum subjects, codes, and assigned faculties.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Subject</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7EAF0] shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects by name, code or department..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
          />
        </div>
        <div className="text-xs font-bold text-slate-600 hidden sm:block">
          Total Subjects: {subjects.length}
        </div>
      </div>

      {/* Subject Table */}
      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Subject Name</th>
                <th className="p-4">Course Code</th>
                <th className="p-4">Department</th>
                <th className="p-4">Semester</th>
                <th className="p-4">Type</th>
                <th className="p-4">Notes Count</th>
                <th className="p-4">Papers Count</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubjects.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-[#14213D]">{s.name}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{s.description}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-[#14213D]">
                    {s.code}
                  </td>
                  <td className="p-4 text-slate-600">
                    {s.department}
                  </td>
                  <td className="p-4 text-slate-600">
                    {s.semester}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.type === 'Core' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                    }`}>
                      {s.type}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-700">
                    {s.notesCount || 0}
                  </td>
                  <td className="p-4 font-bold text-[#F4A62A]">
                    {s.papersCount || 0}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete subject "${s.name}"?`)) {
                            deleteSubject(s.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#14213D]">
                {editingSubject ? 'Edit Subject' : 'Create New Academic Subject'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Operating Systems"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Code *</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. OS-101"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    {semesters.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree Program</label>
                  <select
                    value={degreeProgram}
                    onChange={(e) => setDegreeProgram(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    {degreePrograms.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    <option value="Core">Core Curriculum</option>
                    <option value="Elective">Elective Course</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of topics and course objectives..."
                  className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none resize-none"
                />
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
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
