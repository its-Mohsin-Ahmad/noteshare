import React, { useState } from 'react';
import { Building2, Plus, Edit, Trash2, Users, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDepartments = () => {
  const { departments, addDepartment, updateDepartment, deleteDepartment, resources, students } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [head, setHead] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenCreate = () => {
    setEditingDept(null);
    setName('');
    setCode('');
    setHead('');
    setDescription('');
    setModalOpen(true);
  };

  const handleOpenEdit = (d) => {
    setEditingDept(d);
    setName(d.name);
    setCode(d.code);
    setHead(d.head || '');
    setDescription(d.description || '');
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !code) return;

    if (editingDept) {
      updateDepartment(editingDept.id, { name, code, head, description });
    } else {
      addDepartment({ name, code, head, description });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <Building2 className="w-8 h-8 text-[#F4A62A]" />
            <span>Manage Academic Departments</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure faculties, department heads, and academic division parameters.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const deptResources = resources.filter((r) => r.department === dept.name).length;
          const deptStudents = students.filter((s) => s.department === dept.name).length;

          return (
            <div
              key={dept.id}
              className="bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#14213D] text-[#F4A62A] flex items-center justify-center font-black text-sm">
                    {dept.code}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(dept)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-50"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete department "${dept.name}"?`)) {
                          deleteDepartment(dept.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#14213D] mt-3 group-hover:text-[#F4A62A] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {dept.description || 'Academic faculty department'}
                </p>
                <div className="text-xs font-semibold text-slate-600 mt-2">
                  Head: <span className="text-[#14213D]">{dept.head || 'Department Chair'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#F4A62A]" />
                  {deptResources} Resources
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#14213D]" />
                  {deptStudents} Students
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#14213D]">
                {editingDept ? 'Edit Department' : 'Add New Department'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Electrical Engineering"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department Code *</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. EE"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Head of Department</label>
                <input
                  type="text"
                  value={head}
                  onChange={(e) => setHead(e.target.value)}
                  placeholder="e.g. Dr. Mansoor Ahmed"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
