import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, LogIn, UserPlus, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(quickQuery.trim())}`);
      setSearchOpen(false);
      setQuickQuery('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore Resources' },
    { to: '/notes', label: 'Notes' },
    { to: '/past-papers', label: 'Past Papers' },
    { to: '/subjects', label: 'Subjects' },
    { to: '/about', label: 'About' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0D1930] border-b border-[#1F3558] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Logo size="normal" variant="light" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative py-1 transition-colors hover:text-[#F4A62A] ${
                      isActive ? 'text-[#F4A62A] font-semibold' : 'text-slate-200'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4A62A] rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Global Search Icon Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-[#14213D] rounded-xl transition-colors"
                title="Search resources"
              >
                <Search className="w-5 h-5" />
              </button>

              {user ? (
                /* Authenticated State */
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/student'}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#14213D] border border-[#1F3558] hover:border-[#F4A62A] text-xs font-semibold text-slate-200 hover:text-white transition-all"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#F4A62A]" />
                      <span>{user.role === 'admin' ? 'Admin Dashboard' : 'Student Portal'}</span>
                    </Link>

                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1.5 p-1 rounded-full border border-slate-700 hover:border-[#F4A62A] transition-colors"
                    >
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl py-2 border border-slate-200 text-slate-800 z-50 animate-fadeIn">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <div className="text-xs font-bold text-[#14213D] truncate">{user.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-[#F4A62A] border border-amber-200">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        to={user.role === 'admin' ? '/admin' : '/student'}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-[#14213D]"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#F4A62A]" />
                        <span>Dashboard Overview</span>
                      </Link>

                      <Link
                        to={user.role === 'admin' ? '/admin/profile' : '/student/profile'}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-slate-50 text-[#14213D]"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Profile</span>
                      </Link>

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Unauthenticated Buttons */
                <div className="flex items-center gap-2.5">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-xs font-semibold text-white bg-transparent hover:bg-white/10 border border-slate-600 rounded-xl transition-all"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0D1930] bg-[#F4A62A] hover:bg-[#E0941F] rounded-xl transition-all shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-300 hover:text-white"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-xl"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Popdown Bar */}
        {searchOpen && (
          <div className="bg-[#14213D] border-t border-[#1F3558] px-4 py-3 animate-fadeIn">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Search for notes, past papers, subjects or departments..."
                  autoFocus
                  className="w-full pl-10 pr-24 py-2 text-xs sm:text-sm bg-[#0D1930] border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#F4A62A]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-1 bg-[#F4A62A] text-[#0D1930] font-bold text-xs rounded-lg hover:bg-[#E0941F]"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D1930] border-t border-[#1F3558] px-4 pt-2 pb-6 space-y-1 animate-fadeIn">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#14213D] text-[#F4A62A]' : 'text-slate-200 hover:bg-[#14213D]/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-slate-800 space-y-2">
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/student'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#14213D] text-[#F4A62A] font-semibold text-xs"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to {user.role === 'admin' ? 'Admin Dashboard' : 'Student Portal'}</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-950/20 text-xs font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-[#F4A62A] text-[#0D1930] text-xs font-bold"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
