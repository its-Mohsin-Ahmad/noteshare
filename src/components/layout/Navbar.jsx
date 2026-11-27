import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, UserPlus, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -28,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

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
      <header
        ref={headerRef}
        className="sticky top-0 z-40 w-full bg-[#F7F1ED]/85 backdrop-blur-md border-b border-[#E5DDD5]/80 text-[#14213D] transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo size="normal" variant="dark" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative py-1 transition-colors hover:text-[#F59E0B] ${
                      isActive ? 'text-[#F59E0B] font-bold' : 'text-[#14213D]/75'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F59E0B] rounded-full" />
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
                className="p-2 text-slate-600 hover:text-[#14213D] hover:bg-[#F2F1EC] rounded-xl transition-colors"
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
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F8F7F3] border border-[#E8E6DF] hover:border-[#F59E0B] text-xs font-semibold text-[#14213D] transition-all shadow-xs"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{user.role === 'admin' ? 'Admin Dashboard' : 'Student Portal'}</span>
                    </Link>

                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1.5 p-1 rounded-full border border-[#E8E6DF] hover:border-[#F59E0B] transition-colors"
                    >
                      <img
                        src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500 mr-1" />
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 border border-[#E8E6DF] text-slate-800 z-50 animate-fadeIn">
                      <div className="px-4 py-2 border-b border-[#E8E6DF]">
                        <div className="text-xs font-bold text-[#14213D] truncate">{user.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FFF0D6] text-[#D97706] border border-[#F59E0B]/30">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        to={user.role === 'admin' ? '/admin' : '/student'}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F8F7F3] text-[#14213D]"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#F59E0B]" />
                        <span>Dashboard Overview</span>
                      </Link>

                      <Link
                        to={user.role === 'admin' ? '/admin/profile' : '/student/profile'}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-[#F8F7F3] text-[#14213D]"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Profile</span>
                      </Link>

                      <div className="border-t border-[#E8E6DF] mt-1 pt-1">
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
                    className="px-4 py-2 text-xs font-semibold text-[#14213D] bg-white hover:bg-[#F2F1EC] border border-[#E8E6DF] hover:border-[#F59E0B] rounded-xl transition-all shadow-xs"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#F59E0B] hover:bg-[#D97706] rounded-xl transition-all shadow-sm shadow-[#F59E0B]/20"
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
                className="p-2 text-slate-600 hover:text-[#14213D]"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-[#14213D] rounded-xl"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Popdown Bar */}
        {searchOpen && (
          <div className="bg-[#F8F7F3] border-t border-[#E8E6DF] px-4 py-3 animate-fadeIn">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Search for notes, past papers, subjects or departments..."
                  autoFocus
                  className="w-full pl-10 pr-24 py-2 text-xs sm:text-sm bg-white border border-[#E8E6DF] rounded-xl text-[#14213D] placeholder-slate-400 focus:outline-none focus:border-[#F59E0B]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-3 py-1 bg-[#F59E0B] text-white font-bold text-xs rounded-lg hover:bg-[#D97706]"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E8E6DF] px-4 pt-2 pb-6 space-y-1 animate-fadeIn shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#FFF0D6] text-[#D97706] font-bold' : 'text-[#14213D] hover:bg-[#F8F7F3]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-[#E8E6DF] flex flex-col gap-2">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 bg-[#F8F7F3] rounded-xl border border-[#E8E6DF]">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#14213D] truncate">{user.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/student'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2.5 text-center text-xs font-bold text-white bg-[#F59E0B] rounded-xl"
                  >
                    Go to {user.role === 'admin' ? 'Admin Dashboard' : 'Student Portal'}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full py-2 text-center text-xs font-bold text-rose-600 bg-rose-50 rounded-xl"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-xs font-bold text-[#14213D] bg-[#F8F7F3] border border-[#E8E6DF] rounded-xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-xs font-bold text-white bg-[#F59E0B] rounded-xl"
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
