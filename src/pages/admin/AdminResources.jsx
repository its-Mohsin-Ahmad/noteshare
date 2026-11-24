import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Download,
  Copy,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminResources = ({ filterCategory = null, pageTitle = 'Manage All Resources' }) => {
  const {
    resources,
    deleteResource,
    bulkDeleteResources,
    bulkPublishResources,
    togglePublish,
    updateResource,
    addResource,
    recordDownload,
    setPreviewResource,
    subjects,
    departments,
    semesters,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(filterCategory || 'ALL');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Edit Modal State
  const [editingResource, setEditingResource] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSemester, setEditSemester] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Delete Confirm Modal State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      // Category filter
      if (filterCategory) {
        if (filterCategory === 'Notes' && res.category !== 'Notes') return false;
        if (filterCategory === 'Past Papers' && res.category !== 'Past Papers' && res.examType !== 'Final Term' && res.examType !== 'Midterm') return false;
      } else if (selectedCategory !== 'ALL') {
        if (res.category !== selectedCategory) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesSubj = res.subject.toLowerCase().includes(q);
        const matchesDept = (res.department || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubj && !matchesDept) return false;
      }

      if (selectedDepartment && res.department !== selectedDepartment) return false;
      if (selectedSemester && res.semester !== selectedSemester) return false;
      if (selectedStatus === 'published' && !res.isPublished) return false;
      if (selectedStatus === 'unpublished' && res.isPublished) return false;

      return true;
    });
  }, [resources, filterCategory, selectedCategory, searchQuery, selectedDepartment, selectedSemester, selectedStatus]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginated.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} resources?`)) {
      await bulkDeleteResources(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleOpenEdit = (res) => {
    setEditingResource(res);
    setEditTitle(res.title);
    setEditSubject(res.subject);
    setEditCategory(res.category);
    setEditSemester(res.semester);
    setEditDescription(res.description || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingResource) return;
    updateResource(editingResource.id, {
      title: editTitle,
      subject: editSubject,
      category: editCategory,
      semester: editSemester,
      description: editDescription
    });
    setEditingResource(null);
  };

  const handleDuplicate = (res) => {
    addResource({
      ...res,
      title: `${res.title} (Copy)`,
      downloads: 0
    });
    showToast('Resource duplicated as new draft/published entry.', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D]">{pageTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete database control: edit metadata, toggle publication status, or remove outdated documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/upload"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F4A62A] hover:bg-[#E0941F] text-[#0D1930] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Resource</span>
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-[#E7EAF0] shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, subject or department..."
              className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
            />
          </div>

          {/* Category */}
          {!filterCategory && (
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Notes">Lecture Notes</option>
              <option value="Past Papers">Past Papers</option>
              <option value="Assignments">Assignments</option>
              <option value="Slides">Slides</option>
            </select>
          )}

          {/* Department */}
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="published">Published Only</option>
            <option value="unpublished">Unpublished / Drafts</option>
          </select>
        </div>

        {/* Bulk Action Bar (When items selected) */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
            <span className="font-bold text-[#14213D]">
              {selectedIds.length} resources selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => bulkPublishResources(selectedIds, true)}
                className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700"
              >
                Publish Selected
              </button>
              <button
                onClick={() => bulkPublishResources(selectedIds, false)}
                className="px-3 py-1 rounded-lg bg-slate-600 text-white font-bold hover:bg-slate-700"
              >
                Unpublish
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={paginated.length > 0 && selectedIds.length === paginated.length}
                    className="rounded text-[#F4A62A] focus:ring-[#F4A62A]"
                  />
                </th>
                <th className="p-4">Resource Details</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Semester</th>
                <th className="p-4">Upload Date</th>
                <th className="p-4">Downloads</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-12 text-center text-slate-400">
                    No resources match the selected criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((res) => {
                  const isSelected = selectedIds.includes(res.id);
                  return (
                    <tr
                      key={res.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(res.id)}
                          className="rounded text-[#F4A62A] focus:ring-[#F4A62A]"
                        />
                      </td>

                      <td className="p-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#14213D] text-[#F4A62A] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                            {res.fileType || 'PDF'}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-[#14213D] truncate leading-tight">
                              {res.title}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {res.category} • {res.fileSize}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-slate-700">
                        {res.subject}
                      </td>

                      <td className="p-4 text-slate-600">
                        {res.semester}
                      </td>

                      <td className="p-4 text-slate-500 font-mono text-[11px]">
                        {res.uploadDate}
                      </td>

                      <td className="p-4 font-bold text-[#14213D]">
                        {res.downloads?.toLocaleString() || 0}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => togglePublish(res.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                            res.isPublished
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Click to toggle publish"
                        >
                          {res.isPublished ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{res.isPublished ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setPreviewResource(res)}
                            className="p-1.5 text-slate-500 hover:text-[#14213D] hover:bg-slate-100 rounded-lg"
                            title="Preview Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(res)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit Resource"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDuplicate(res)}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => recordDownload(res)}
                            className="p-1.5 text-slate-500 hover:text-[#F4A62A] hover:bg-amber-50 rounded-lg"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(res.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing {paginated.length} of {filteredResources.length} resources
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-[#14213D]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Resource Modal */}
      {editingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#14213D]">Edit Academic Resource</h3>
              <button onClick={() => setEditingResource(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Resource Title *</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                  >
                    <option value="Notes">Notes</option>
                    <option value="Past Papers">Past Papers</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Slides">Slides</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Semester</label>
                <select
                  value={editSemester}
                  onChange={(e) => setEditSemester(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none"
                >
                  {semesters.map((sem) => (
                    <option key={sem.id} value={sem.name}>{sem.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 focus:border-[#F4A62A] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingResource(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200"
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
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#14213D]">Confirm Deletion</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to permanently delete this resource? It will be removed from all student search results and indexed file storage.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 font-semibold text-xs text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteResource(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 font-bold text-xs text-white hover:bg-rose-700"
              >
                Delete Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
