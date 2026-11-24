import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer = () => {
  return (
    <footer className="bg-[#0D1930] text-slate-300 border-t border-[#1F3558] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1F3558]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="normal" variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              NOTEshare is the complete university academic resource management platform empowering students and educators with organized lecture notes, past examination papers, handouts, and study guides.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#F4A62A] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Academic Institution Repository</span>
            </div>
            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-white">Study Smart, Achieve More.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-[#F4A62A] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#F4A62A] transition-colors">Explore Resources</Link>
              </li>
              <li>
                <Link to="/notes" className="hover:text-[#F4A62A] transition-colors">Lecture Notes</Link>
              </li>
              <li>
                <Link to="/past-papers" className="hover:text-[#F4A62A] transition-colors">Past Papers</Link>
              </li>
              <li>
                <Link to="/subjects" className="hover:text-[#F4A62A] transition-colors">Browse Subjects</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F4A62A] transition-colors">About NOTEshare</Link>
              </li>
            </ul>
          </div>

          {/* Academic Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Curriculum
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/explore?subject=Computer%20Science" className="hover:text-[#F4A62A] transition-colors">Computer Science</Link>
              </li>
              <li>
                <Link to="/explore?subject=Software%20Engineering" className="hover:text-[#F4A62A] transition-colors">Software Engineering</Link>
              </li>
              <li>
                <Link to="/explore?subject=Mathematics" className="hover:text-[#F4A62A] transition-colors">Calculus & Mathematics</Link>
              </li>
              <li>
                <Link to="/explore?subject=Physics" className="hover:text-[#F4A62A] transition-colors">Applied Physics</Link>
              </li>
              <li>
                <Link to="/explore?subject=Database%20Systems" className="hover:text-[#F4A62A] transition-colors">Database Systems</Link>
              </li>
              <li>
                <Link to="/past-papers?type=Final%20Term" className="hover:text-[#F4A62A] transition-colors">Final Term Archives</Link>
              </li>
            </ul>
          </div>

          {/* Student Help & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Student Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/faq" className="hover:text-[#F4A62A] transition-colors">Help & FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F4A62A] transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#F4A62A] transition-colors">Student Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#F4A62A] transition-colors">Create Free Account</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#F4A62A] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#F4A62A] transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} NOTEshare Academic Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
