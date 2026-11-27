import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowUp,
  Globe,
  Mail,
  BookOpen,
  Share2
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { user } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#14213D] text-slate-300 border-t border-[#23395B] pt-16 pb-8 overflow-hidden">
      {/* Subtle orange decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute top-8 left-[15%] w-1.5 h-1.5 rounded-full bg-[#F59E0B] opacity-40 blur-[0.5px] animate-pulse" />
        <div className="absolute top-1/2 right-[20%] w-2 h-2 rounded-full bg-[#F59E0B] opacity-35 blur-[1px] animate-float-slow" />
        <div className="absolute bottom-10 left-[35%] w-1.5 h-1.5 rounded-full bg-[#F59E0B] opacity-50 blur-[0.5px]" />
        <div className="absolute top-12 right-[8%] w-2.5 h-2.5 rounded-full bg-[#F59E0B] opacity-30 blur-[1px] animate-float-reverse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#23395B]">
          {/* Column 1 – Brand */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="normal" variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              NOTEshare is a complete university academic resource platform helping students discover organized notes, past papers, assignments, and lecture slides in one place.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#F59E0B] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified University Resource Repository</span>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <Link
                to="/explore"
                aria-label="Academic Library"
                className="w-9 h-9 rounded-xl bg-[#23395B]/70 hover:bg-[#F59E0B] text-slate-300 hover:text-[#14213D] flex items-center justify-center transition-colors"
              >
                <BookOpen className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                aria-label="Platform Overview"
                className="w-9 h-9 rounded-xl bg-[#23395B]/70 hover:bg-[#F59E0B] text-slate-300 hover:text-[#14213D] flex items-center justify-center transition-colors"
              >
                <Globe className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                aria-label="Contact Administration"
                className="w-9 h-9 rounded-xl bg-[#23395B]/70 hover:bg-[#F59E0B] text-slate-300 hover:text-[#14213D] flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
              <Link
                to="/subjects"
                aria-label="Share Knowledge"
                className="w-9 h-9 rounded-xl bg-[#23395B]/70 hover:bg-[#F59E0B] text-slate-300 hover:text-[#14213D] flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2 – Explore */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/notes" className="hover:text-[#F59E0B] transition-colors">Notes</Link>
              </li>
              <li>
                <Link to="/past-papers" className="hover:text-[#F59E0B] transition-colors">Past Papers</Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-[#F59E0B] transition-colors">Subjects</Link>
              </li>
              <li>
                <Link to="/explore?category=Departments" className="hover:text-[#F59E0B] transition-colors">Departments</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#F59E0B] transition-colors">Resources</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 – Platform */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#F59E0B] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F59E0B] transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#F59E0B] transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#F59E0B] transition-colors">Create Account</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 – Account */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/login" className="hover:text-[#F59E0B] transition-colors">Login</Link>
              </li>
              <li>
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/student'}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={user?.role === 'admin' ? '/admin/profile' : '/student/profile'}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} NOTEshare Academic Platform. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="hover:text-[#F59E0B] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#F59E0B] transition-colors">Terms & Conditions</Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23395B] hover:bg-[#F59E0B] text-white hover:text-[#14213D] font-bold transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
