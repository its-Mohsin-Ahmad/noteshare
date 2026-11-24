import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  Printer,
  Sparkles,
  TrendingUp,
  FileText,
  Users
} from 'lucide-react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const AdminAnalytics = () => {
  const { resources, subjects, departments, students, showToast } = useApp();
  const [timeRange, setTimeRange] = useState('session');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Chart data: Monthly Downloads & Uploads
  const trendData = [
    { month: 'Jun', uploads: 20, downloads: 4100 },
    { month: 'Jul', uploads: 32, downloads: 6800 },
    { month: 'Aug', uploads: 44, downloads: 9200 },
    { month: 'Sep', uploads: 66, downloads: 14500 },
    { month: 'Oct', uploads: 76, downloads: 18900 },
    { month: 'Nov', uploads: resources.length, downloads: 26400 }
  ];

  // Subject engagement ranking
  const subjectRankings = subjects.slice(0, 7).map((s) => ({
    name: s.code,
    fullName: s.name,
    notes: s.notesCount || 10,
    papers: s.papersCount || 8
  }));

  const handleExportCSV = () => {
    const headers = 'Resource Title,Subject,Category,Department,Semester,Downloads,UploadDate\n';
    const rows = resources
      .map(
        (r) =>
          `"${r.title}","${r.subject}","${r.category}","${r.department}","${r.semester}",${r.downloads || 0},"${r.uploadDate}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noteshare_academic_analytics_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Analytics summary exported to CSV.', 'success');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14213D] flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-[#F4A62A]" />
            <span>Academic Analytics & Reports</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data insights on curriculum coverage, exam resource downloads, and departmental engagement.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#14213D] hover:bg-[#F4A62A] hover:text-[#0D1930] text-white text-xs font-bold transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#F4A62A]" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-[#E7EAF0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
          <span>Reporting Period:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
          >
            <option value="session">Current Academic Session 2024–2026</option>
            <option value="fall24">Fall 2024 Examination Cycle</option>
            <option value="spring24">Spring 2024 Semester</option>
            <option value="annual">Full Academic Year</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Faculty Filter:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="p-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
          >
            <option value="ALL">All University Faculties</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* High-level Summary Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E7EAF0] shadow-sm">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Catalog Density</div>
          <div className="text-2xl font-black text-[#14213D] mt-1">{resources.length} Docs</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Across 8 semesters</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7EAF0] shadow-sm">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Download Velocity</div>
          <div className="text-2xl font-black text-[#14213D] mt-1">26,400+</div>
          <div className="text-[10px] text-blue-600 font-bold mt-0.5">Avg 4.8 files / student</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7EAF0] shadow-sm">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Curriculum Breadth</div>
          <div className="text-2xl font-black text-[#14213D] mt-1">{subjects.length} Courses</div>
          <div className="text-[10px] text-purple-600 font-bold mt-0.5">100% syllabus verified</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E7EAF0] shadow-sm">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Student Reach</div>
          <div className="text-2xl font-black text-[#14213D] mt-1">{students.length} Accounts</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Active engagement</div>
        </div>
      </div>

      {/* Recharts Chart 1: Platform Growth & Downloads Over Time */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7EAF0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#14213D]">
              Platform Growth: Monthly Resource Influx vs Downloads
            </h2>
            <p className="text-xs text-slate-500">Track how new notes and past papers accelerate exam preparation</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F4A62A" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F4A62A" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14213D" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#14213D" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1930', borderColor: '#1F3558', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="downloads" name="Monthly Student Downloads" stroke="#F4A62A" fillOpacity={1} fill="url(#colorDl)" />
              <Area type="monotone" dataKey="uploads" name="Documents Uploaded" stroke="#14213D" fillOpacity={1} fill="url(#colorUp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recharts Chart 2: Subject Load Analysis */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7EAF0] shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#14213D]">
            Subject Resource Volume: Lecture Notes vs Exam Papers
          </h2>
          <p className="text-xs text-slate-500">Breakdown of available materials across high-enrollment subjects</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectRankings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1930', borderColor: '#1F3558', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="notes" name="Notes Available" fill="#14213D" radius={[6, 6, 0, 0]} />
              <Bar dataKey="papers" name="Past Papers" fill="#F4A62A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
