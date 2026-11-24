import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  FileText,
  FileCheck,
  BookOpen,
  Download,
  Heart,
  UploadCloud,
  Bell,
  Megaphone,
  User,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { PDFPreviewModal } from '../common/PDFPreviewModal';
import { Toast } from '../common/Toast';
import { useApp } from '../../context/AppContext';

export const StudentLayout = () => {
  const { user, logout, notifications, markAsRead } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const studentNotifs = notifications.filter((n) => n.target === 'student');
  const unreadCount = studentNotifs.filter((n) => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      navigate(`/explore?search=${encodeURIComponent(headerSearch.trim())}`);
    }
  };

  const navItems = [
    { to: '/student', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/student/explore', label: 'Explore Resources', icon: Compass },
    { to: '/student/notes', label: 'My Notes', icon: FileText },
    { to: '/student/past-papers', label: 'Past Papers', icon: FileCheck },
    { to: '/student/subjects', label: 'Subjects', icon: BookOpen },
    { to: '/student/downloads', label: 'My Downloads', icon: Download },
    { to: '/student/favorites', label: 'My Favorites', icon: Heart },
    { to: '/student/uploads', label: 'My Uploads', icon: UploadCloud },
    { to: '/student/notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { to: '/student/announcements', label: 'Announcements', icon: Megaphone },
    { to: '/student/profile', label: 'My Profile', icon: User },
    { to: '/student/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0D1930] text-slate-300 flex flex-col justify-between border-r border-[#1F3558] transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Logo & Close */}
          <div className="h-18 px-6 flex items-center justify-between border-b border-[#1F3558] flex-shrink-0">
            <Logo size="normal" variant="light" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Status Badge */}
          <div className="px-5 py-3 bg-[#14213D] border-b border-[#1F3558] flex items-center gap-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop'}
              alt={user?.name || 'Student'}
              className="w-9 h-9 rounded-full object-cover border border-[#F4A62A]"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Student Portal'}</div>
              <div className="text-[11px] text-[#F4A62A] truncate font-medium">{user?.regNo || 'Undergraduate'}</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Academic Hub
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#F4A62A] text-[#0D1930] shadow-md shadow-[#F4A62A]/20 font-bold'
                        : 'text-slate-300 hover:bg-[#14213D] hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-[#1F3558] space-y-1.5 flex-shrink-0 bg-[#091224]">
            <Link
              to="/"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-[#14213D] transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Public Website</span>
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="flex items-center gap-2 w-full px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/20 rounded-xl transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-18 bg-white border-b border-[#E7EAF0] px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick search input */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-72 lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Search notes, subjects or past papers..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F4A62A] focus:outline-none transition-all"
              />
            </form>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/uploads"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0D1930] bg-[#F4A62A] hover:bg-[#E0941F] transition-colors shadow-xs"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Submit Resource</span>
            </Link>

            {/* Notifications Button & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#14213D]">Notifications</span>
                    <Link
                      to="/student/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-[11px] text-[#F4A62A] font-semibold hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {studentNotifs.slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3 text-xs hover:bg-slate-50 cursor-pointer ${
                          !n.read ? 'bg-amber-50/50' : ''
                        }`}
                      >
                        <div className="font-semibold text-slate-800">{n.title}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">{n.message}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <Link
              to="/student/profile"
              className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-[#F4A62A] transition-colors"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop'}
                alt={user?.name || 'Student'}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-bold text-[#14213D] hidden md:inline truncate max-w-[120px]">
                {user?.name || 'Student'}
              </span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <PDFPreviewModal />
      <Toast />
    </div>
  );
};
