import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Files,
  FileText,
  FileCheck,
  UploadCloud,
  BookOpen,
  Building2,
  GraduationCap,
  CalendarDays,
  Users,
  Inbox,
  Megaphone,
  Bell,
  BarChart3,
  Settings,
  UserCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Search,
  ShieldAlert
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { PDFPreviewModal } from '../common/PDFPreviewModal';
import { Toast } from '../common/Toast';
import { useApp } from '../../context/AppContext';

export const AdminLayout = () => {
  const { user, logout, submissions, notifications } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  const navigate = useNavigate();

  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'Pending Review').length;
  const adminNotifs = notifications.filter((n) => n.target === 'admin');
  const unreadCount = adminNotifs.filter((n) => !n.read).length;

  const adminNav = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/resources', label: 'Manage Resources', icon: Files },
    { to: '/admin/notes', label: 'Manage Notes', icon: FileText },
    { to: '/admin/past-papers', label: 'Manage Past Papers', icon: FileCheck },
    { to: '/admin/upload', label: 'Upload Resource', icon: UploadCloud, highlight: true },
    { to: '/admin/subjects', label: 'Manage Subjects', icon: BookOpen },
    { to: '/admin/departments', label: 'Manage Departments', icon: Building2 },
    { to: '/admin/programs', label: 'Manage Programs', icon: GraduationCap },
    { to: '/admin/semesters', label: 'Manage Semesters', icon: CalendarDays },
    { to: '/admin/students', label: 'Student Management', icon: Users },
    {
      to: '/admin/submissions',
      label: 'Student Submissions',
      icon: Inbox,
      badge: pendingSubmissionsCount > 0 ? pendingSubmissionsCount : null
    },
    { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
    { to: '/admin/notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { to: '/admin/analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { to: '/admin/settings', label: 'Website Settings', icon: Settings },
    { to: '/admin/profile', label: 'Admin Profile', icon: UserCheck }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#091224] text-slate-300 flex flex-col justify-between border-r border-[#1F3558] transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Header */}
          <div className="h-18 px-5 flex items-center justify-between border-b border-[#1F3558] flex-shrink-0">
            <div className="flex items-center gap-2">
              <Logo size="normal" variant="light" />
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-red-600 text-white">
                ADMIN
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Identity Card */}
          <div className="px-5 py-3 bg-[#0D1930] border-b border-[#1F3558] flex items-center gap-3 flex-shrink-0">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
              alt="Admin"
              className="w-9 h-9 rounded-full object-cover border border-[#F4A62A]"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] text-[#F4A62A] font-semibold uppercase tracking-wider">Super Admin</div>
            </div>
          </div>

          {/* Navigation Links Scrollable */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 text-xs">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management Console
            </div>

            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-[#F4A62A] text-[#0D1930] font-bold shadow-md shadow-[#F4A62A]/20'
                        : item.highlight
                        ? 'bg-[#14213D] text-[#F4A62A] hover:bg-[#1F3558] font-semibold'
                        : 'text-slate-300 hover:bg-[#14213D] hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-[#0D1930]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Bottom Controls */}
          <div className="p-3 border-t border-[#1F3558] space-y-1 bg-[#060D1A] flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#14213D] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Portal</span>
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/20 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 h-18 bg-white border-b border-[#E7EAF0] px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:block">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#14213D]">
                NOTEshare Academic Controller
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/upload"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0D1930] bg-[#F4A62A] hover:bg-[#E0941F] transition-colors shadow-xs"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </Link>

            <Link
              to="/admin/notifications"
              className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
              )}
            </Link>

            <Link
              to="/admin/profile"
              className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-[#F4A62A] transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                alt="Admin"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-bold text-[#14213D] hidden md:inline">
                {user?.name || 'Administrator'}
              </span>
            </Link>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <PDFPreviewModal />
      <Toast />
    </div>
  );
};
