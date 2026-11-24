import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Ban,
  UserCheck,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminStudents = () => {
  const { students, updateStudent, toggleStudentStatus, deleteStudent, departments, semesters, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // View / Edit modal state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRegNo, setEditRegNo] = useState('');
  const [editDept, setEditDept] = useState('');
  const [editSemester, setEditSemester] = useState('');

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesReg = (s.regNo || '').toLowerCase().includes(q);
        const matchesEmail = s.email.toLowerCase().includes(q);
        if (!matchesName && !matchesReg && !matchesEmail) return false;
      }
      if (selectedDept && s.department !== selectedDept) return false;
      if (selectedStatus !== 'ALL' && s.status !== selectedStatus) return false;
      return true;
    });
  }, [students, searchQuery, selectedDept, selectedStatus]);

  const handleExportCSV = () => {
    const headers = 'ID,Name,RegNo,Email,Department,Program,Semester,Status,JoinDate\n';
    const rows = filteredStudents
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.regNo}","${s.email}","${s.department}","${s.degreeProgram}","${s.semester}","${s.status}","${s.joinDate}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noteshare_students_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Student records exported to CSV successfully.', 'success');
  };

  const handleOpenEdit = (s) => {
    setSelectedStudent(s);
    setIsEditing(true);
    setEditName(s.name);
    setEditEmail(s.email);
    setEditRegNo(s.regNo);
    setEditDept(s.department);
    setEditSemester(s.semester);
  };

  const handleOpenView = (s) => {
    setSelectedStudent(s);
    setIsEditing(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    updateStudent(selectedStudent.id, {
      name: editName,
      email: editEmail,
      regNo: editRegNo,
      department: editDept,
      semester: editSemester
    });
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <Users className="w-8 h-8 text-[#F4A62A]" />
            <span>Student User Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage student registrations, academic profile authorizations, and account status.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#14213D] text-white hover:bg-[#1F3558] transition-colors shadow-sm self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#F4A62A]" />
          <span>Export Student CSV</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-[#E7EAF0] shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, Reg No. or email..."
            className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="Active">Active Only</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Student</th>
                <th className="p-4">Reg Number</th>
                <th className="p-4">Department & Program</th>
                <th className="p-4">Semester</th>
                <th className="p-4">Registered Date</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => {
                const isActive = s.status === 'Active';
                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                          alt={s.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-[#14213D]">{s.name}</div>
                          <div className="text-[11px] text-slate-400">{s.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-bold text-slate-700">
                      {s.regNo || 'FA22-BCS-089'}
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{s.department}</div>
                      <div className="text-[11px] text-slate-400">{s.degreeProgram}</div>
                    </td>

                    <td className="p-4 text-slate-600 font-semibold">
                      {s.semester}
                    </td>

                    <td className="p-4 font-mono text-slate-500 text-[11px]">
                      {s.joinDate || '2024-09-15'}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => toggleStudentStatus(s.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-800'
                            : 'bg-rose-100 text-rose-800 hover:bg-emerald-100 hover:text-emerald-800'
                        }`}
                        title="Click to toggle status"
                      >
                        {isActive ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                        <span>{s.status}</span>
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenView(s)}
                          className="p-1.5 text-slate-500 hover:text-[#14213D] hover:bg-slate-100 rounded-lg"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete record for student ${s.name}?`)) {
                              deleteStudent(s.id);
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View / Edit Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#14213D]">
                {isEditing ? 'Edit Student Details' : 'Student Academic Profile'}
              </h3>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400">✕</button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reg Number *</label>
                    <input
                      type="text"
                      value={editRegNo}
                      onChange={(e) => setEditRegNo(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Department</label>
                    <select
                      value={editDept}
                      onChange={(e) => setEditDept(e.target.value)}
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
                      value={editSemester}
                      onChange={(e) => setEditSemester(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                    >
                      {semesters.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#14213D] text-white font-bold hover:bg-[#F4A62A] hover:text-[#0D1930]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#F4A62A]"
                  />
                  <div>
                    <h4 className="text-base font-black text-[#14213D]">{selectedStudent.name}</h4>
                    <div className="font-mono text-slate-500 font-bold">{selectedStudent.regNo}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{selectedStudent.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Department</span>
                    <span className="font-bold text-slate-800">{selectedStudent.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Semester</span>
                    <span className="font-bold text-slate-800">{selectedStudent.semester}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Status</span>
                    <span className="font-bold text-emerald-600">{selectedStudent.status}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Joined On</span>
                    <span className="font-bold text-slate-800">{selectedStudent.joinDate || '2024-09-15'}</span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 rounded-xl bg-[#14213D] text-white font-bold hover:bg-[#F4A62A] hover:text-[#0D1930]"
                  >
                    Edit Record
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
